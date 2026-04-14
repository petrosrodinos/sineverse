import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

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
      throw new BadRequestException('New password must be different from current password');
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
}
