import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthRole } from '@/generated/prisma';
import { Roles } from '@/shared/decorators/roles.decorator';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { RolesGuard } from '@/shared/guards/roles.guard';
import { AdminService } from './admin.service';
import { AdminPurchasesQueryDto } from './dto/admin-purchases-query.dto';
import { AdminUsersQueryDto } from './dto/admin-users-query.dto';

@ApiTags('Admin')
@Controller('admin/dashboard')
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
@Roles(AuthRole.ADMIN, AuthRole.SUPER_ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('overview')
  @ApiOperation({ summary: 'Get admin overview analytics' })
  getOverview() {
    return this.adminService.getOverview();
  }

  @Get('users')
  @ApiOperation({ summary: 'Get users for admin dashboard' })
  getUsers(@Query() query: AdminUsersQueryDto) {
    return this.adminService.getUsers(query);
  }

  @Get('purchases')
  @ApiOperation({ summary: 'Get credit purchases for admin dashboard' })
  getPurchases(@Query() query: AdminPurchasesQueryDto) {
    return this.adminService.getPurchases(query);
  }
}
