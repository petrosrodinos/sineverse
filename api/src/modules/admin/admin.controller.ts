import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
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
import { AdminTestUsageLedgerDto } from './dto/admin-test-usage-ledger.dto';

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
