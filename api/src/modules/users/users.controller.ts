import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

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
  updateMe(@CurrentUser('uuid') user_uuid: string, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(user_uuid, dto);
  }

  @Patch('me/password')
  @ApiOperation({ summary: 'Update current user password' })
  updateMyPassword(@CurrentUser('uuid') user_uuid: string, @Body() dto: UpdatePasswordDto) {
    return this.usersService.updatePassword(user_uuid, dto);
  }
}
