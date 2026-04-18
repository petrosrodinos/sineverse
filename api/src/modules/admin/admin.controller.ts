import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthRole } from '@/generated/prisma';
import { Roles } from '@/shared/decorators/roles.decorator';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { RolesGuard } from '@/shared/guards/roles.guard';
import { AdminService } from './admin.service';
import { AdminPurchasesQueryDto } from './dto/admin-purchases-query.dto';
import { AdminTestUsageLedgerDto } from './dto/admin-test-usage-ledger.dto';
import { AdminUsersQueryDto } from './dto/admin-users-query.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';

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

  @Patch('users/:user_uuid')
  @ApiOperation({ summary: 'Update user by admin' })
  updateUser(
    @Param('user_uuid') userUuid: string,
    @Body() dto: UpdateAdminUserDto,
  ) {
    return this.adminService.updateUser(userUuid, dto);
  }

  @Delete('users/:user_uuid')
  @ApiOperation({ summary: 'Delete user by admin (with storage cleanup)' })
  deleteUser(@Param('user_uuid') userUuid: string) {
    return this.adminService.deleteUser(userUuid);
  }

  @Post('credit-ledger/test-usage')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @ApiOperation({
    summary:
      'Record a usage credit_ledger_entry via production deduction path (admin)',
  })
  testRecordUsageLedgerDeduction(@Body() dto: AdminTestUsageLedgerDto) {
    return this.adminService.testRecordUsageLedgerDeduction(dto);
  }
}
