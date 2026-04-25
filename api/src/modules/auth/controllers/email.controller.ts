import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EmailAuthService } from '../services/email.service';
import { RegisterEmailDto } from '../dto/register-email.dto';
import { LoginEmailDto } from '../dto/login-email.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthResponse } from '../entities/auth-response.entity';
import { RegisterVisitorDto } from '../dto/register-visitor.dto';
import { CompleteVisitorDto } from '../dto/complete-visitor.dto';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { IpAddress } from '@/shared/decorators/ip-address.decorator';

@ApiTags('Email Authentication')
@Controller('auth/email')
export class EmailAuthController {
  constructor(private readonly authService: EmailAuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user with email and password' })
  @ApiBody({ type: RegisterEmailDto })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: AuthResponse,
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - User with this email already exists',
  })
  async registerWithEmail(@Body() dto: RegisterEmailDto) {
    return this.authService.registerWithEmail(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user with email and password' })
  @ApiBody({ type: LoginEmailDto })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    type: AuthResponse,
  })
  async loginWithEmail(@Body() dto: LoginEmailDto) {
    return this.authService.loginWithEmail(dto);
  }

  @Post('visitor')
  @ApiOperation({ summary: 'Create a visitor account for anonymous workflow' })
  @ApiBody({ type: RegisterVisitorDto })
  @ApiResponse({
    status: 201,
    description: 'Visitor registered successfully',
    type: AuthResponse,
  })
  registerVisitor(
    @Body() dto: RegisterVisitorDto,
    @IpAddress() ipAddress: string,
  ) {
    return this.authService.registerVisitor(dto, ipAddress);
  }

  @Post('complete-visitor')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Complete visitor account signup' })
  @ApiBody({ type: CompleteVisitorDto })
  @ApiResponse({
    status: 200,
    description: 'Visitor account completed successfully',
    type: AuthResponse,
  })
  completeVisitor(
    @CurrentUser('uuid') user_uuid: string,
    @Body() dto: CompleteVisitorDto,
  ) {
    return this.authService.completeVisitor(user_uuid, dto);
  }
}
