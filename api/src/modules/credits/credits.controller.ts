import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CreditsService } from './credits.service';
import { CreditsPaginationQueryDto } from './dto/credits-query.dto';
import { CreateCreditCheckoutDto } from './dto/create-checkout.dto';

@ApiTags('Credits')
@Controller('credits')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class CreditsController {
  constructor(private readonly creditsService: CreditsService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Get current user credits summary' })
  getSummary(@CurrentUser('uuid') user_uuid: string) {
    return this.creditsService.getSummary(user_uuid);
  }

  @Get('usage-stats')
  @ApiOperation({ summary: 'Get total credits used with project-type breakdown' })
  getUsageStats(@CurrentUser('uuid') user_uuid: string) {
    return this.creditsService.getUsageStats(user_uuid);
  }

  @Get('packs')
  @ApiOperation({ summary: 'Get purchasable credit packs' })
  getPacks() {
    return this.creditsService.getPacks();
  }

  @Get('usage')
  @ApiOperation({ summary: 'Get credits usage history' })
  getUsage(
    @CurrentUser('uuid') user_uuid: string,
    @Query() query: CreditsPaginationQueryDto,
  ) {
    return this.creditsService.getUsage(user_uuid, query.page, query.limit);
  }

  @Get('purchases')
  @ApiOperation({ summary: 'Get credit purchase history' })
  getPurchases(
    @CurrentUser('uuid') user_uuid: string,
    @Query() query: CreditsPaginationQueryDto,
  ) {
    return this.creditsService.getPurchases(user_uuid, query.page, query.limit);
  }

  @Post('checkout')
  @ApiOperation({ summary: 'Create Stripe checkout session for credit pack' })
  createCheckout(
    @CurrentUser('uuid') user_uuid: string,
    @Body() dto: CreateCreditCheckoutDto,
  ) {
    return this.creditsService.createCheckoutSession(user_uuid, dto.pack_key);
  }
}
