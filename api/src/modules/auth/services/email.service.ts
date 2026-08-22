import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { RegisterEmailDto } from '../dto/register-email.dto';
import { LoginEmailDto } from '../dto/login-email.dto';
import { RegisterVisitorDto } from '../dto/register-visitor.dto';
import { CompleteVisitorDto } from '../dto/complete-visitor.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateJwtService } from '@/shared/utils/jwt/jwt.service';
import { AuthRoles } from '../interfaces/auth.interface';
import { visitorAuthConfig } from '../config/visitor-auth.config';
import { assertVisitorProvisionRateLimit } from '../utils/visitor-rate-limit.utils';
import { CreditsService } from '@/modules/credits/credits.service';

@Injectable()
export class EmailAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: CreateJwtService,
    private readonly creditsService: CreditsService,
  ) {}

  async registerWithEmail(dto: RegisterEmailDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          role: AuthRoles.USER,
          full_name: dto.full_name,
          phone: dto.phone,
        },
      });

      try {
        await this.creditsService.grantRegistrationBonus(user.uuid);
      } catch {}

      const token = await this.jwtService.signToken({
        uuid: user.uuid,
        role: user.role,
      });

      const expires_in = this.jwtService.getExpirationTime(token);

      delete user.password;

      return { access_token: token, expires_in: expires_in, user: user };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async registerVisitor(dto: RegisterVisitorDto, ipAddress: string) {
    try {
      assertVisitorProvisionRateLimit(
        ipAddress,
        visitorAuthConfig.provisionRateLimit.maxRequests,
        visitorAuthConfig.provisionRateLimit.windowMs,
      );

      const user = await this.prisma.user.create({
        data: {
          role: AuthRoles.VISITOR,
          full_name: dto.full_name ?? visitorAuthConfig.defaultFullName,
        },
      });

      try {
        await this.creditsService.grantRegistrationBonus(user.uuid);
      } catch {}

      const token = await this.jwtService.signToken({
        uuid: user.uuid,
        role: user.role,
      });

      const expires_in = this.jwtService.getExpirationTime(token);

      delete user.password;

      return { access_token: token, expires_in: expires_in, user: user };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async completeVisitor(
    user_uuid: string,
    dto: CompleteVisitorDto,
  ) {
    try {
      const currentUser = await this.prisma.user.findUnique({
        where: { uuid: user_uuid },
      });

      if (!currentUser) {
        throw new UnauthorizedException('Invalid visitor session');
      }

      if (currentUser.role !== AuthRoles.VISITOR) {
        throw new BadRequestException('Account is already registered');
      }

      const existingUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = await this.prisma.user.update({
        where: { uuid: user_uuid },
        data: {
          email: dto.email,
          password: hashedPassword,
          full_name: dto.full_name ?? currentUser.full_name,
          role: AuthRoles.USER,
        },
      });

      const token = await this.jwtService.signToken({
        uuid: user.uuid,
        role: user.role,
      });

      const expires_in = this.jwtService.getExpirationTime(token);

      delete user.password;

      return { access_token: token, expires_in: expires_in, user: user };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async loginWithEmail(dto: LoginEmailDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      if (user.role === AuthRoles.VISITOR || !user.password) {
        throw new UnauthorizedException('Complete signup before login');
      }

      const password_match = await bcrypt.compare(dto.password, user.password);

      if (!password_match) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const token = await this.jwtService.signToken({
        uuid: user.uuid,
        role: user.role,
      });

      const expires_in = this.jwtService.getExpirationTime(token);

      delete user.password;

      return { access_token: token, expires_in: expires_in, user: user };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
