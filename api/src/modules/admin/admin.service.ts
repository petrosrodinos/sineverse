import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import { CreditLedgerType, DocumentType, Prisma } from '@/generated/prisma';
import { AdminPurchasesQueryDto } from './dto/admin-purchases-query.dto';
import { AdminUsersQueryDto } from './dto/admin-users-query.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getOverview() {
    const [
      totalUsers,
      totalProjects,
      totalVideosCreated,
      totalImagesCreated,
      usageAggregate,
      purchasesAggregate,
      appFeesAggregate,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.project.count(),
      this.prisma.projectAsset.count({ where: { type: DocumentType.VIDEO } }),
      this.prisma.projectAsset.count({ where: { type: DocumentType.IMAGE } }),
      this.prisma.creditLedgerEntry.aggregate({
        where: { type: CreditLedgerType.USAGE },
        _sum: { delta_credits: true },
      }),
      this.prisma.creditPurchase.aggregate({
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
    ]);

    return {
      total_users: totalUsers,
      total_projects: totalProjects,
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
    };
  }

  async getUsers(query: AdminUsersQueryDto) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
    const skip = (page - 1) * limit;
    const sortBy = query.sort_by ?? 'created_at';
    const sortOrder = query.sort_order ?? 'desc';
    const search = query.search?.trim();

    const where: Prisma.UserWhereInput | undefined = search
      ? {
          OR: [
            { uuid: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { full_name: { contains: search, mode: 'insensitive' } },
          ],
        }
      : undefined;

    const [total, users] = await Promise.all([
      this.prisma.user.count({ where }),
      this.prisma.user.findMany({
        where,
        select: {
          uuid: true,
          full_name: true,
          email: true,
          role: true,
          credits_balance: true,
          created_at: true,
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
      }),
    ]);

    const usageByUser = users.length
      ? await this.prisma.creditLedgerEntry.groupBy({
          by: ['user_uuid'],
          where: {
            type: CreditLedgerType.USAGE,
            user_uuid: { in: users.map((user) => user.uuid) },
          },
          _sum: { delta_credits: true },
        })
      : [];

    const usageMap = new Map<string, number>(
      usageByUser.map((row) => [
        row.user_uuid,
        Math.abs(row._sum.delta_credits ?? 0),
      ]),
    );

    return {
      total,
      page,
      limit,
      items: users.map((user) => ({
        ...user,
        token_usage: usageMap.get(user.uuid) ?? 0,
      })),
    };
  }

  async getPurchases(query: AdminPurchasesQueryDto) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
    const skip = (page - 1) * limit;
    const sortBy = query.sort_by ?? 'created_at';
    const sortOrder = query.sort_order ?? 'desc';
    const search = query.search?.trim();

    const where: Prisma.CreditPurchaseWhereInput | undefined = search
      ? {
          OR: [
            { uuid: { contains: search, mode: 'insensitive' } },
            { user_uuid: { contains: search, mode: 'insensitive' } },
            { user: { email: { contains: search, mode: 'insensitive' } } },
          ],
        }
      : undefined;

    const [total, purchases] = await Promise.all([
      this.prisma.creditPurchase.count({ where }),
      this.prisma.creditPurchase.findMany({
        where,
        include: {
          user: {
            select: {
              uuid: true,
              email: true,
            },
          },
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
      }),
    ]);

    return {
      total,
      page,
      limit,
      items: purchases.map((purchase) => {
        const gross = purchase.gross_amount_cents ?? purchase.amount_cents;
        const stripeFees = purchase.stripe_fee_cents ?? 0;
        const net = purchase.net_amount_cents ?? gross - stripeFees;
        const appFees = Math.max(gross - net - stripeFees, 0);

        return {
          uuid: purchase.uuid,
          user_uuid: purchase.user_uuid,
          status: purchase.status,
          currency: purchase.currency,
          credits_amount: purchase.credits_amount,
          gross_amount_cents: gross,
          net_amount_cents: net,
          stripe_fee_cents: stripeFees,
          app_fee_cents: appFees,
          created_at: purchase.created_at,
          user: purchase.user,
        };
      }),
    };
  }
}
