import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreditsService } from '../credits/credits.service';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import {
  CreditLedgerType,
  CreditPurchaseStatus,
  DocumentType,
  Prisma,
} from '@/generated/prisma';
import { AdminTestUsageLedgerDto } from './dto/admin-test-usage-ledger.dto';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly creditsService: CreditsService,
  ) {}

  async getOverview() {
    const [
      totalUsers,
      totalProjects,
      totalFinalProjects,
      totalVideosCreated,
      totalImagesCreated,
      usageAggregate,
      purchasesAggregate,
      appFeesAggregate,
      aimlApiCostAggregate,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.project.count(),
      this.prisma.finalProject.count(),
      this.prisma.projectAsset.count({ where: { type: DocumentType.VIDEO } }),
      this.prisma.projectAsset.count({ where: { type: DocumentType.IMAGE } }),
      this.prisma.creditLedgerEntry.aggregate({
        where: { type: CreditLedgerType.USAGE },
        _sum: { delta_credits: true },
      }),
      this.prisma.creditPurchase.aggregate({
        where: { status: CreditPurchaseStatus.SUCCEEDED },
        _sum: {
          gross_amount_cents: true,
          net_amount_cents: true,
          stripe_fee_cents: true,
        },
      }),
      this.prisma.creditLedgerEntry.aggregate({
        where: { type: CreditLedgerType.USAGE },
        _sum: { app_fee_amount: true },
      }),
      this.prisma.creditLedgerEntry.aggregate({
        where: { type: CreditLedgerType.USAGE, source: 'aiml_usage' },
        _sum: {
          provider_charge_amount_usd: true,
          provider_charge_amount: true,
        },
      }),
    ]);

    return {
      total_users: totalUsers,
      total_projects: totalProjects,
      total_final_projects: totalFinalProjects,
      total_videos_created: totalVideosCreated,
      total_images_created: totalImagesCreated,
      total_token_usage: Math.abs(usageAggregate._sum.delta_credits ?? 0),
      total_gross_revenue_cents:
        purchasesAggregate._sum.gross_amount_cents ?? 0,
      total_net_revenue_cents: purchasesAggregate._sum.net_amount_cents ?? 0,
      total_stripe_fees_cents: purchasesAggregate._sum.stripe_fee_cents ?? 0,
      total_app_fees_collected: Number(
        appFeesAggregate._sum.app_fee_amount ?? 0,
      ),
      total_aimlapi_provider_cost: {
        usd: Number(aimlApiCostAggregate._sum.provider_charge_amount_usd ?? 0),
        eur: Number(aimlApiCostAggregate._sum.provider_charge_amount ?? 0),
      },
    };
  }

  async testRecordUsageLedgerDeduction(dto: AdminTestUsageLedgerDto) {
    if (
      dto.provider_credits_used < 1 &&
      dto.fixed_credits_deduction === undefined
    ) {
      throw new BadRequestException(
        'Provide fixed_credits_deduction or provider_credits_used >= 1',
      );
    }

    this.logger.log(
      `testRecordUsageLedgerDeduction user=${dto.user_uuid} ref=${dto.source_ref_uuid} project_type=${dto.project_type} fixed=${dto.fixed_credits_deduction ?? 'n/a'} usd=${dto.provider_charge_amount ?? 'n/a'}`,
    );

    return this.creditsService.recordUsageDeduction({
      user_uuid: dto.user_uuid,
      project_type: dto.project_type,
      provider_credits_used: dto.provider_credits_used,
      source_ref_uuid: dto.source_ref_uuid,
      fixed_credits_deduction: dto.fixed_credits_deduction,
      provider_charge_amount: dto.provider_charge_amount,
      ...(dto.metadata ? { metadata: dto.metadata as Prisma.JsonObject } : {}),
    });
  }
}
