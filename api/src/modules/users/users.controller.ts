import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthRole } from '@/generated/prisma';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { Roles } from '@/shared/decorators/roles.decorator';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { RolesGuard } from '@/shared/guards/roles.guard';
import { AdminUsersQueryDto } from './dto/admin-users-query.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current authenticated user profile' })
  getMe(@CurrentUser('uuid') user_uuid: string) {
    return this.usersService.getMe(user_uuid);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current user profile' })
  updateMe(
    @CurrentUser('uuid') user_uuid: string,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(user_uuid, dto);
  }

  @Patch('me/password')
  @ApiOperation({ summary: 'Update current user password' })
  updateMyPassword(
    @CurrentUser('uuid') user_uuid: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(user_uuid, dto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(AuthRole.ADMIN, AuthRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'List users (admin)' })
  listUsersAdmin(@Query() query: AdminUsersQueryDto) {
    return this.usersService.getUsersForAdminDashboard(query);
  }

  @Patch(':user_uuid')
  @UseGuards(RolesGuard)
  @Roles(AuthRole.ADMIN, AuthRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Update user (admin)' })
  updateUserAdmin(
    @Param('user_uuid') userUuid: string,
    @Body() dto: UpdateAdminUserDto,
  ) {
    return this.usersService.updateUserByAdmin(userUuid, dto);
  }

  @Delete(':user_uuid')
  @UseGuards(RolesGuard)
  @Roles(AuthRole.ADMIN, AuthRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Delete user (admin)' })
  deleteUserAdmin(@Param('user_uuid') userUuid: string) {
    return this.usersService.deleteUserByAdmin(userUuid);
  }
}
