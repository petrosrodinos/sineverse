import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import {
  AssetRole,
  AuthRole,
  CreditLedgerType,
  Prisma,
} from '@/generated/prisma';
import * as bcrypt from 'bcrypt';
import { DocumentsService } from '../documents/documents.service';
import { AdminUsersQueryDto } from './dto/admin-users-query.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly documentsService: DocumentsService,
  ) {}

  async getMe(userUuid: string) {
    const user = await this.prisma.user.findUnique({
      where: { uuid: userUuid },
      select: {
        uuid: true,
        email: true,
        phone: true,
        full_name: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(userUuid: string, dto: UpdateProfileDto) {
    const user = await this.prisma.user.findUnique({
      where: { uuid: userUuid },
      select: { uuid: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { uuid: userUuid },
      data: { full_name: dto.full_name.trim() },
      select: {
        uuid: true,
        email: true,
        full_name: true,
      },
    });
  }

  async updatePassword(userUuid: string, dto: UpdatePasswordDto) {
    if (dto.current_password === dto.new_password) {
      throw new BadRequestException(
        'New password must be different from current password',
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { uuid: userUuid },
      select: { uuid: true, password: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(dto.current_password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(dto.new_password, 10);

    await this.prisma.user.update({
      where: { uuid: userUuid },
      data: { password: hashedPassword },
    });

    return { message: 'Password updated successfully' };
  }

  async getUsersForAdminDashboard(query: AdminUsersQueryDto) {
    const page = Math.max(1, Number(query.page) || 1);

    const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));

    const skip = (page - 1) * limit;

    const sortBy = query.sort_by ?? 'created_at';

    const sortOrder = query.sort_order ?? 'desc';

    const search = query.search?.trim();

    const where: Prisma.UserWhereInput | undefined = search
      ? {
          OR: [
            { uuid: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { full_name: { contains: search, mode: 'insensitive' } },
          ],
        }
      : undefined;

    const [total, users] = await Promise.all([
      this.prisma.user.count({ where }),
      this.prisma.user.findMany({
        where,
        select: {
          uuid: true,
          full_name: true,
          email: true,
          phone: true,
          role: true,
          credits_balance: true,
          created_at: true,
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
      }),
    ]);

    const userUuids = users.map((user) => user.uuid);

    const [usageByUser, imageGenerationsByUser, videoGenerationsByUser, projectsByUser, finalProjectsByUser] =
      users.length
        ? await Promise.all([
            this.prisma.creditLedgerEntry.groupBy({
              by: ['user_uuid'],
              where: {
                type: CreditLedgerType.USAGE,
                user_uuid: { in: userUuids },
              },
              _sum: { delta_credits: true },
            }),
            this.prisma.projectAsset.groupBy({
              by: ['user_uuid'],
              where: {
                user_uuid: { in: userUuids },
                role: AssetRole.GENERATED_IMAGE,
              },
              _count: { _all: true },
            }),
            this.prisma.projectAsset.groupBy({
              by: ['user_uuid'],
              where: {
                user_uuid: { in: userUuids },
                role: AssetRole.GENERATED_VIDEO,
              },
              _count: { _all: true },
            }),
            this.prisma.project.groupBy({
              by: ['user_uuid'],
              where: { user_uuid: { in: userUuids } },
              _count: { _all: true },
            }),
            this.prisma.finalProject.groupBy({
              by: ['user_uuid'],
              where: { user_uuid: { in: userUuids } },
              _count: { _all: true },
            }),
          ])
        : [[], [], [], [], []];

    const usageMap = new Map<string, number>(
      usageByUser.map((row) => [
        row.user_uuid,
        Math.abs(row._sum.delta_credits ?? 0),
      ]),
    );

    const imageGenerationsMap = new Map<string, number>(
      imageGenerationsByUser.map((row) => [row.user_uuid, row._count._all]),
    );

    const videoGenerationsMap = new Map<string, number>(
      videoGenerationsByUser.map((row) => [row.user_uuid, row._count._all]),
    );

    const projectsMap = new Map<string, number>(
      projectsByUser.map((row) => [row.user_uuid, row._count._all]),
    );

    const finalProjectsMap = new Map<string, number>(
      finalProjectsByUser.map((row) => [row.user_uuid, row._count._all]),
    );

    return {
      total,
      page,
      limit,
      items: users.map((user) => ({
        ...user,
        token_usage: usageMap.get(user.uuid) ?? 0,
        image_generations: imageGenerationsMap.get(user.uuid) ?? 0,
        video_generations: videoGenerationsMap.get(user.uuid) ?? 0,
        projects_count: projectsMap.get(user.uuid) ?? 0,
        final_projects_count: finalProjectsMap.get(user.uuid) ?? 0,
      })),
    };
  }

  async updateUserByAdmin(userUuid: string, dto: UpdateAdminUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { uuid: userUuid },
      select: { uuid: true, promotional_credits_balance: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const data: Prisma.UserUpdateInput = {};

    if (dto.email !== undefined) {
      const email = dto.email.trim().toLowerCase();

      if (!email) {
        throw new BadRequestException('Email cannot be empty');
      }

      data.email = email;
    }

    if (dto.full_name !== undefined) {
      const fullName = dto.full_name.trim();

      if (!fullName) {
        throw new BadRequestException('Full name cannot be empty');
      }

      data.full_name = fullName;
    }

    if (dto.phone !== undefined) {
      const normalizedPhone = dto.phone ? dto.phone.trim() : null;

      data.phone = normalizedPhone || null;
    }

    if (dto.role !== undefined) {
      if (!Object.values(AuthRole).includes(dto.role)) {
        throw new BadRequestException('Invalid role');
      }

      data.role = dto.role;
    }

    if (dto.credits_balance !== undefined) {
      const balance = Number(dto.credits_balance);

      if (!Number.isInteger(balance) || balance < 0) {
        throw new BadRequestException(
          'Credits balance must be a non-negative integer',
        );
      }

      data.credits_balance = balance;

      data.promotional_credits_balance = Math.min(
        user.promotional_credits_balance,
        balance,
      );
    }

    try {
      return await this.prisma.user.update({
        where: { uuid: userUuid },
        data,
        select: {
          uuid: true,
          full_name: true,
          email: true,
          phone: true,
          role: true,
          credits_balance: true,
          promotional_credits_balance: true,
          created_at: true,
          updated_at: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user', {
        cause: error,
      });
    }
  }

  async deleteUserByAdmin(userUuid: string) {
    const user = await this.prisma.user.findUnique({
      where: { uuid: userUuid },
      select: { uuid: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const projects = await this.prisma.project.findMany({
      where: { user_uuid: userUuid },
      select: { uuid: true },
    });

    for (const project of projects) {
      await this.documentsService.deleteProjectDocuments(project.uuid);
    }

    try {
      await this.prisma.user.delete({
        where: { uuid: userUuid },
      });

      return { success: true };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete user', {
        cause: error,
      });
    }
  }
}
