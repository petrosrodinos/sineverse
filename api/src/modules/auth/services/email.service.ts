import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { RegisterEmailDto } from '../dto/register-email.dto';
import { LoginEmailDto } from '../dto/login-email.dto';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateJwtService } from '@/shared/utils/jwt/jwt.service';
import { AuthRoles } from '../interfaces/auth.interface';
import { SendgridMailService } from '@/integrations/notifications/sendgrid/services/mail.service';

@Injectable()
export class EmailAuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: CreateJwtService,
    ) { }

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

            const token = await this.jwtService.signToken({
                uuid: user.uuid,
                role: user.role,
            });

            const expires_in = this.jwtService.getExpirationTime(token);

            delete user.password;

            return { access_token: token, expires_in: expires_in, user: user };
        } catch (error) {
            console.log(error);
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
