import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import {
  CreditLedgerType,
  CreditPurchaseKind,
  CreditPurchaseStatus,
  ProjectType,
  Prisma,
} from '@/generated/prisma';
import Stripe from 'stripe';
import { StripeConfig } from '@/integrations/stripe/stripe.config';
import {
  CreditsConfig,
  DefaultCreditPacks,
  REGISTRATION_GIFT_CREDITS,
  RegistrationGiftCreditPackSeed,
} from '@/shared/config/credits/credits.constants';
import { calculateUsageCreditsValue } from './utils/credits-calculator';
import { CurrencyService } from '@/integrations/currency/currency.service';
import { calculateTokenBilling } from './utils/hybrid-billing';
import {
  DOLLARS_PER_TOKEN,
} from '@/shared/config/credits/credits.constants';
import { API_ERROR_CODE_INSUFFICIENT_CREDITS } from '@/shared/config/errors/api-error-codes';
import { AdminPurchasesQueryDto } from './dto/admin-purchases-query.dto';
import { AdminUsageQueryDto } from './dto/admin-usage-query.dto';
import { stripeCommissionPercentFromFeeAndAmount } from './utils/stripe-commission-percent.utils';
import { estateWalkthroughVideoConfig } from '@/shared/services/ai-helper/utils/estate-walkthrough-video.utils';

type BalanceTransactionRef =
  | string
  | Stripe.BalanceTransaction
  | null
  | undefined;

@Injectable()
export class CreditsService {
  private readonly logger = new Logger(CreditsService.name);
  private stripe: Stripe | null;
  private webhookSecret: string | undefined;

  constructor(
    private readonly prisma: PrismaService,
    private readonly stripeConfig: StripeConfig,
    private readonly configService: ConfigService,
    private readonly currencyService: CurrencyService,
  ) {
    this.stripe = this.stripeConfig.getStripeClient();

    this.webhookSecret = this.configService.get<string>(
      'STRIPE_WEBHOOK_SECRET',
    );
  }

  async assertSufficientCredits(
    user_uuid: string,
    required_credits: number,
    detail?: {
      items_count?: number;
      credits_per_item?: number;
    },
  ): Promise<void> {
    if (required_credits <= 0) {
      return;
    }

    const user = await this.prisma.user.findUnique({
      where: { uuid: user_uuid },
      select: { credits_balance: true },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.credits_balance < required_credits) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          code: API_ERROR_CODE_INSUFFICIENT_CREDITS,
          required_credits,
          balance: user.credits_balance,
          ...(detail?.items_count !== undefined
            ? { items_count: detail.items_count }
            : {}),
          ...(detail?.credits_per_item !== undefined
            ? { credits_per_item: detail.credits_per_item }
            : {}),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async grantRegistrationBonus(user_uuid: string): Promise<void> {
    const idempotencyKey = `registration_gift:${user_uuid}`;

    const existingLedger = await this.prisma.creditLedgerEntry.findUnique({
      where: { idempotency_key: idempotencyKey },
    });

    if (existingLedger) {
      return;
    }

    await this.ensureDefaultCreditPacks();

    const pack = await this.prisma.creditPack.findUnique({
      where: { key: RegistrationGiftCreditPackSeed.key },
    });

    if (!pack) {
      this.logger.error(
        `grantRegistrationBonus: pack ${RegistrationGiftCreditPackSeed.key} missing user=${user_uuid}`,
      );

      return;
    }

    try {
      await this.prisma.$transaction(
        async (tx) => {
          const dup = await tx.creditLedgerEntry.findUnique({
            where: { idempotency_key: idempotencyKey },
          });

          if (dup) {
            return;
          }

          const purchase = await tx.creditPurchase.create({
            data: {
              user_uuid,
              credit_pack_uuid: pack.uuid,
              kind: CreditPurchaseKind.APP_GIFT,
              status: CreditPurchaseStatus.SUCCEEDED,
              credits_amount: REGISTRATION_GIFT_CREDITS,
              amount_cents: 0,
              gross_amount_cents: 0,
              net_amount_cents: 0,
              currency: pack.currency,
              metadata: { origin: 'registration' },
            },
          });

          const updatedUser = await tx.user.update({
            where: { uuid: user_uuid },
            data: { credits_balance: { increment: REGISTRATION_GIFT_CREDITS } },
            select: { credits_balance: true },
          });

          await tx.creditLedgerEntry.create({
            data: {
              user_uuid,
              type: CreditLedgerType.PURCHASE,
              delta_credits: REGISTRATION_GIFT_CREDITS,
              balance_after: updatedUser.credits_balance,
              source: 'registration_gift',
              source_ref_uuid: purchase.uuid,
              idempotency_key: idempotencyKey,
              metadata: {
                credit_purchase_uuid: purchase.uuid,
                pack_key: pack.key,
              },
            },
          });
        },
        {
          maxWait: 5000,
          timeout: 15000,
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        },
      );
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);

      this.logger.error(
        `grantRegistrationBonus failed user=${user_uuid}: ${detail}`,
      );

      throw error;
    }
  }

  async getSummary(user_uuid: string) {
    const user = await this.prisma.user.findUnique({
      where: { uuid: user_uuid },
      select: { credits_balance: true },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const [purchasesAggregate, usageAggregate] = await Promise.all([
      this.prisma.creditLedgerEntry.aggregate({
        where: { user_uuid, type: CreditLedgerType.PURCHASE },
        _sum: { delta_credits: true },
      }),
      this.prisma.creditLedgerEntry.aggregate({
        where: { user_uuid, type: CreditLedgerType.USAGE },
        _sum: { delta_credits: true },
      }),
    ]);

    return {
      balance: user.credits_balance,
      purchased_credits: purchasesAggregate._sum.delta_credits ?? 0,
      used_credits: Math.abs(usageAggregate._sum.delta_credits ?? 0),
    };
  }

  async getUsageStats(user_uuid: string): Promise<{
    total_credits_used: number;
    film_credits_used: number;
    estate_credits_used: number;
    other_credits_used: number;
  }> {
    const user = await this.prisma.user.findUnique({
      where: { uuid: user_uuid },
      select: { uuid: true },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const [aggregate, groups] = await Promise.all([
      this.prisma.creditLedgerEntry.aggregate({
        where: { user_uuid, type: CreditLedgerType.USAGE },
        _sum: { delta_credits: true },
      }),
      this.prisma.creditLedgerEntry.groupBy({
        by: ['project_type'],
        where: { user_uuid, type: CreditLedgerType.USAGE },
        _sum: { delta_credits: true },
      }),
    ]);

    let film_credits_used = 0;

    let estate_credits_used = 0;

    let other_credits_used = 0;

    for (const row of groups) {
      const segment = Math.abs(row._sum.delta_credits ?? 0);

      if (row.project_type === ProjectType.FILM) {
        film_credits_used = segment;
      } else if (row.project_type === ProjectType.ESTATE) {
        estate_credits_used = segment;
      } else {
        other_credits_used += segment;
      }
    }

    return {
      total_credits_used: Math.abs(aggregate._sum.delta_credits ?? 0),
      film_credits_used,
      estate_credits_used,
      other_credits_used,
    };
  }

  async getPacks() {
    await this.ensureDefaultCreditPacks();

    return this.prisma.creditPack.findMany({
      where: { active: true },
      orderBy: { amount_cents: 'asc' },
    });
  }

  async syncDefaultCreditPacks() {
    await this.ensureDefaultCreditPacks();

    return this.prisma.creditPack.findMany({
      orderBy: { amount_cents: 'asc' },
    });
  }

  async getUsage(user_uuid: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const where: Prisma.CreditLedgerEntryWhereInput = {
      user_uuid,
      type: CreditLedgerType.USAGE,
    };

    const [total, items] = await Promise.all([
      this.prisma.creditLedgerEntry.count({ where }),
      this.prisma.creditLedgerEntry.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
    ]);

    const sourceRefUuids = Array.from(
      new Set(
        items
          .map((item) => item.source_ref_uuid)
          .filter((uuid): uuid is string => typeof uuid === 'string' && !!uuid),
      ),
    );

    const projectAssets = sourceRefUuids.length
      ? await this.prisma.projectAsset.findMany({
          where: { uuid: { in: sourceRefUuids } },
          select: { uuid: true, raw_response: true },
        })
      : [];

    const rawResponseByAssetUuid = new Map<string, Prisma.JsonValue | null>(
      projectAssets.map((asset) => [asset.uuid, asset.raw_response]),
    );

    return {
      total,
      page,
      limit,
      items: items.map((item) => ({
        ...item,
        raw_response:
          (item.source_ref_uuid
            ? (rawResponseByAssetUuid.get(item.source_ref_uuid) ?? null)
            : null) ?? null,
      })),
    };
  }

  async getUsageForAdminDashboard(query: AdminUsageQueryDto) {
    const page = Math.max(1, Number(query.page) || 1);

    const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));

    const skip = (page - 1) * limit;

    const sortBy = query.sort_by ?? 'created_at';

    const sortOrder = query.sort_order ?? 'desc';

    const userUuid = query.user_uuid?.trim();

    const search = query.search?.trim();

    const andParts: Prisma.CreditLedgerEntryWhereInput[] = [
      { type: CreditLedgerType.USAGE },
    ];

    if (search) {
      andParts.push({
        OR: [
          { uuid: { contains: search, mode: 'insensitive' } },
          { user_uuid: { contains: search, mode: 'insensitive' } },
          { source: { contains: search, mode: 'insensitive' } },
          { source_ref_uuid: { contains: search, mode: 'insensitive' } },
          { user: { email: { contains: search, mode: 'insensitive' } } },
        ],
      });
    }

    if (userUuid) {
      andParts.push({ user_uuid: userUuid });
    }

    const where: Prisma.CreditLedgerEntryWhereInput = { AND: andParts };

    const [total, items] = await Promise.all([
      this.prisma.creditLedgerEntry.count({ where }),
      this.prisma.creditLedgerEntry.findMany({
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

    const sourceRefUuids = Array.from(
      new Set(
        items
          .map((item) => item.source_ref_uuid)
          .filter((uuid): uuid is string => typeof uuid === 'string' && !!uuid),
      ),
    );

    const projectAssets = sourceRefUuids.length
      ? await this.prisma.projectAsset.findMany({
          where: { uuid: { in: sourceRefUuids } },
          select: { uuid: true, raw_response: true },
        })
      : [];

    const rawResponseByAssetUuid = new Map<string, Prisma.JsonValue | null>(
      projectAssets.map((asset) => [asset.uuid, asset.raw_response]),
    );

    return {
      total,
      page,
      limit,
      items: items.map((item) => ({
        ...item,
        raw_response:
          (item.source_ref_uuid
            ? (rawResponseByAssetUuid.get(item.source_ref_uuid) ?? null)
            : null) ?? null,
      })),
    };
  }

  async getPurchases(user_uuid: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const where: Prisma.CreditPurchaseWhereInput = { user_uuid };

    const [total, items] = await Promise.all([
      this.prisma.creditPurchase.count({ where }),
      this.prisma.creditPurchase.findMany({
        where,
        include: { credit_pack: true },
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
    ]);

    return { total, page, limit, items };
  }

  async createCheckoutSession(user_uuid: string, pack_key: string) {
    if (!this.stripe) {
      throw new BadRequestException('Stripe is not configured');
    }

    await this.ensureDefaultCreditPacks();

    const user = await this.prisma.user.findUnique({
      where: { uuid: user_uuid },
      select: { uuid: true, email: true },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const pack = await this.prisma.creditPack.findUnique({
      where: { key: pack_key },
    });

    if (!pack || !pack.active) {
      throw new BadRequestException('Credit pack not found');
    }

    let stripePriceId = pack.stripe_price_id;

    if (!stripePriceId) {
      const synced = await this.syncPackToStripe(pack.uuid);

      stripePriceId = synced.stripe_price_id;
    }

    if (!stripePriceId) {
      throw new InternalServerErrorException(
        'Stripe price is missing for selected pack',
      );
    }

    const purchase = await this.prisma.creditPurchase.create({
      data: {
        user_uuid,
        credit_pack_uuid: pack.uuid,
        kind: CreditPurchaseKind.STRIPE_PURCHASE,
        status: CreditPurchaseStatus.PENDING,
        credits_amount: pack.credits_amount,
        amount_cents: pack.amount_cents,
        gross_amount_cents: pack.amount_cents,
        currency: pack.currency,
        metadata: { pack_key: pack.key },
      },
    });

    const appUrl =
      this.configService.get<string>('APP_URL') ?? 'http://localhost:3000';

    const successUrl = `${appUrl}/dashboard/credits?checkout=success`;

    const cancelUrl = `${appUrl}/dashboard/credits?checkout=cancel`;

    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: user.email,
      payment_method_types: ['card'],
      line_items: [{ price: stripePriceId, quantity: 1 }],
      metadata: {
        context: 'credit_purchase',
        user_uuid,
        credit_pack_key: pack.key,
        credit_purchase_uuid: purchase.uuid,
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    await this.prisma.creditPurchase.update({
      where: { uuid: purchase.uuid },
      data: { stripe_session_id: session.id },
    });

    return { session_id: session.id, checkout_url: session.url };
  }

  calculateUsageCredits(
    providerCreditsUsed: number,
    projectType: ProjectType,
  ): number {
    const multiplier = CreditsConfig.projectTypeMultipliers[projectType] ?? 1;

    return calculateUsageCreditsValue({
      providerCreditsUsed,
      baseMarkupPercent: CreditsConfig.baseMarkupPercent,
      projectTypeMultiplier: multiplier,
    });
  }

  async recordUsageDeduction(params: {
    user_uuid: string;
    project_type: ProjectType;
    provider_charge_usd: number;
    source_ref_uuid: string;
    fixed_credits_deduction?: number;
    metadata?: Prisma.JsonObject;
  }) {
    const {
      user_uuid,
      project_type,
      provider_charge_usd,
      source_ref_uuid,
      fixed_credits_deduction,
      metadata,
    } = params;

    if (provider_charge_usd < 0) {
      return null;
    }

    const metadataObj = metadata as Record<string, unknown> | undefined;

    const isEstateWalkthrough =
      metadataObj?.workflow_source ===
      estateWalkthroughVideoConfig.workflowSource;

    const effectiveProjectType = isEstateWalkthrough
      ? ProjectType.ESTATE
      : project_type;

    const projectTypeMultiplier =
      CreditsConfig.projectTypeMultipliers[effectiveProjectType] ?? 1;

    const appFeeMultiplier = Math.max(projectTypeMultiplier, 0);

    let fxSnapshot: { rate: number; source: string; timestamp: Date };

    try {
      fxSnapshot = await this.currencyService.getUsdToEurRate();
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);

      this.logger.warn(
        `recordUsageDeduction FX unavailable, using parity user=${user_uuid} ref=${source_ref_uuid}: ${detail}`,
      );

      fxSnapshot = {
        rate: 1,
        source: 'parity',
        timestamp: new Date(),
      };
    }

    const billing = calculateTokenBilling({
      providerChargeUsd: provider_charge_usd,
      appFeeMultiplier,
      dollarsPerToken: DOLLARS_PER_TOKEN,
      fxRateUsdToEur: fxSnapshot.rate,
    });

    const deduct =
      typeof fixed_credits_deduction === 'number'
        ? Math.max(Math.floor(fixed_credits_deduction), 0)
        : this.calculateUsageCredits(
            billing.providerCredits,
            effectiveProjectType,
          );

    const ledgerMetadata = metadata
      ? (Object.fromEntries(
          Object.entries(metadata).filter(
            ([key]) => key !== 'fixed_credits_deduction',
          ),
        ) as Prisma.JsonObject)
      : undefined;

    const idempotencyKey = `usage:${source_ref_uuid}`;

    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.creditLedgerEntry.findUnique({
        where: { idempotency_key: idempotencyKey },
      });

      if (existing) {
        return existing;
      }

      const user = await tx.user.findUnique({
        where: { uuid: user_uuid },
        select: { credits_balance: true },
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      if (user.credits_balance < deduct) {
        throw new BadRequestException('Insufficient credits');
      }

      const updatedUser = await tx.user.update({
        where: { uuid: user_uuid },
        data: { credits_balance: { decrement: deduct } },
        select: { credits_balance: true },
      });

      return tx.creditLedgerEntry.create({
        data: {
          user_uuid,
          type: CreditLedgerType.USAGE,
          delta_credits: -deduct,
          balance_after: updatedUser.credits_balance,
          project_type,
          source: 'aiml_usage',
          source_ref_uuid,
          idempotency_key: idempotencyKey,
          provider_credits_used: billing.providerCredits,
          fee_tokens: billing.feeTokens,
          gross_tokens: billing.grossTokens,
          provider_charge_amount_usd: new Prisma.Decimal(provider_charge_usd),
          provider_charge_amount: new Prisma.Decimal(billing.providerChargeEur),
          app_fee_rate: new Prisma.Decimal(appFeeMultiplier),
          app_fee_amount: new Prisma.Decimal(billing.appFeeAmountEur),
          gross_charge_amount: new Prisma.Decimal(billing.grossChargeAmountEur),
          fx_rate_usd_to_eur: new Prisma.Decimal(fxSnapshot.rate),
          fx_source: fxSnapshot.source,
          fx_timestamp: fxSnapshot.timestamp,
          metadata: ledgerMetadata,
        },
      });
    });
  }

  async handleStripeWebhook(body: any, signature?: string) {
    let event: Stripe.Event;

    if (this.stripe && signature && this.webhookSecret) {
      try {
        event = this.stripe.webhooks.constructEvent(
          body,
          signature,
          this.webhookSecret,
        );
      } catch {
        event = body as Stripe.Event;
      }
    } else {
      event = body as Stripe.Event;
    }

    if (!event?.type) {
      throw new BadRequestException('Invalid Stripe event');
    }

    switch (event.type) {
      case 'checkout.session.completed':
        await this.fulfillCreditPurchaseFromCheckout(
          event.data.object as Stripe.Checkout.Session,
        );

        break;

      case 'checkout.session.expired':
        await this.markPurchaseExpired(
          (event.data.object as Stripe.Checkout.Session).id,
        );

        break;

      case 'payment_intent.succeeded':
        await this.attachPaymentIntent(
          event.data.object as Stripe.PaymentIntent,
        );

        break;

      case 'charge.updated':
        await this.handleChargeUpdated(event.data.object as Stripe.Charge);

        break;

      default:
        break;
    }

    return { received: true };
  }

  private async fulfillCreditPurchaseFromCheckout(
    session: Stripe.Checkout.Session,
  ) {
    if (session.metadata?.context !== 'credit_purchase') {
      return;
    }

    const purchaseUuid = session.metadata?.credit_purchase_uuid;

    if (!purchaseUuid) {
      return;
    }

    await this.prisma.$transaction(async (tx) => {
      const purchase = await tx.creditPurchase.findUnique({
        where: { uuid: purchaseUuid },
      });

      if (!purchase) {
        return;
      }

      if (purchase.status === CreditPurchaseStatus.SUCCEEDED) {
        return;
      }

      const paymentIntentId =
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent?.id;

      let stripeChargeId: string | null = null;

      let receiptUrl: string | null = null;

      let stripeFeeCents: number | null = null;

      let stripeCommissionPercent: Prisma.Decimal | null = null;

      const grossAmountCents = session.amount_total ?? purchase.amount_cents;

      if (this.stripe && paymentIntentId) {
        const paymentIntent = await this.stripe.paymentIntents.retrieve(
          paymentIntentId,
          {
            expand: ['latest_charge'],
          },
        );

        const latestCharge =
          paymentIntent.latest_charge as Stripe.Charge | null;

        stripeChargeId = latestCharge?.id ?? null;

        receiptUrl = latestCharge?.receipt_url ?? null;
      }

      const feeDetails = await this.stripeFeeDetailsForCheckoutSession(
        session.id,
      );

      if (feeDetails) {
        stripeFeeCents = feeDetails.feeCents;

        stripeCommissionPercent = stripeCommissionPercentFromFeeAndAmount(
          feeDetails.feeCents,
          feeDetails.grossAmountCents,
        );
      }

      const netAmountCents =
        stripeFeeCents !== null ? grossAmountCents - stripeFeeCents : null;

      const updatedUser = await tx.user.update({
        where: { uuid: purchase.user_uuid },
        data: { credits_balance: { increment: purchase.credits_amount } },
        select: { credits_balance: true },
      });

      await tx.creditPurchase.update({
        where: { uuid: purchase.uuid },
        data: {
          status: CreditPurchaseStatus.SUCCEEDED,
          stripe_session_id: session.id,
          stripe_payment_intent_id: paymentIntentId ?? null,
          stripe_charge_id: stripeChargeId,
          stripe_receipt_url: receiptUrl,
          gross_amount_cents: grossAmountCents,
          stripe_fee_cents: stripeFeeCents,
          stripe_commission_percent: stripeCommissionPercent,
          net_amount_cents: netAmountCents,
        },
      });

      await tx.creditLedgerEntry.upsert({
        where: { idempotency_key: `purchase:${purchase.uuid}` },
        update: {},
        create: {
          user_uuid: purchase.user_uuid,
          type: CreditLedgerType.PURCHASE,
          delta_credits: purchase.credits_amount,
          balance_after: updatedUser.credits_balance,
          source: 'stripe_checkout',
          source_ref_uuid: purchase.uuid,
          idempotency_key: `purchase:${purchase.uuid}`,
          metadata: {
            stripe_session_id: session.id,
            amount_cents: purchase.amount_cents,
          },
        },
      });
    });
  }

  private async markPurchaseExpired(sessionId: string) {
    if (!sessionId) {
      return;
    }

    await this.prisma.creditPurchase.updateMany({
      where: {
        stripe_session_id: sessionId,
        status: CreditPurchaseStatus.PENDING,
      },
      data: {
        status: CreditPurchaseStatus.EXPIRED,
      },
    });
  }

  private async attachPaymentIntent(paymentIntent: Stripe.PaymentIntent) {
    const purchaseUuid = paymentIntent.metadata?.credit_purchase_uuid;

    if (!purchaseUuid) {
      return;
    }

    await this.prisma.creditPurchase.updateMany({
      where: { uuid: purchaseUuid },
      data: { stripe_payment_intent_id: paymentIntent.id },
    });
  }

  private async handleChargeUpdated(charge: Stripe.Charge) {
    const paymentIntent = charge.payment_intent;

    const paymentIntentId =
      typeof paymentIntent === 'string' ? paymentIntent : paymentIntent?.id;

    if (!paymentIntentId || !this.stripe) {
      return;
    }

    const feeDetails = await this.balanceTransactionFeeDetails(
      charge.balance_transaction as BalanceTransactionRef,
    );

    if (!feeDetails) {
      return;
    }

    try {
      const sessions = await this.stripe.checkout.sessions.list({
        payment_intent: paymentIntentId,
        limit: 1,
      });

      const sessionId = sessions.data[0]?.id;

      if (!sessionId) {
        return;
      }

      await this.updatePurchaseStripeFeeBySession(sessionId, feeDetails);
    } catch (error) {
      console.warn(
        '[stripe webhook] charge.updated: could not map payment intent to session',
        error,
      );
    }
  }

  private async balanceTransactionFeeDetails(
    balanceTransaction: BalanceTransactionRef,
  ): Promise<{ feeCents: number; grossAmountCents: number } | null> {
    if (balanceTransaction == null || !this.stripe) {
      return null;
    }

    try {
      const bt =
        typeof balanceTransaction === 'object'
          ? balanceTransaction
          : await this.stripe.balanceTransactions.retrieve(balanceTransaction);

      const fee = bt.fee ?? 0;

      const grossAmountCents = bt.amount ?? 0;

      if (typeof fee !== 'number' || fee < 0) {
        return null;
      }

      if (typeof grossAmountCents !== 'number') {
        return null;
      }

      return { feeCents: fee, grossAmountCents };
    } catch (error) {
      console.warn(
        '[stripe webhook] could not resolve balance transaction fee',
        error,
      );

      return null;
    }
  }

  private async stripeFeeDetailsForCheckoutSession(
    sessionId: string,
  ): Promise<{ feeCents: number; grossAmountCents: number } | null> {
    if (!this.stripe) {
      return null;
    }

    try {
      const full = await this.stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['payment_intent.latest_charge.balance_transaction'],
      });

      const pi = full.payment_intent;

      if (!pi || typeof pi === 'string') {
        return null;
      }

      const charge = pi.latest_charge;

      if (!charge || typeof charge === 'string') {
        return null;
      }

      return this.balanceTransactionFeeDetails(
        charge.balance_transaction as BalanceTransactionRef,
      );
    } catch (error) {
      console.warn(
        '[stripe webhook] could not resolve checkout session fee',
        error,
      );

      return null;
    }
  }

  private async updatePurchaseStripeFeeBySession(
    sessionId: string,
    feeDetails: { feeCents: number; grossAmountCents: number },
  ): Promise<void> {
    const purchase = await this.prisma.creditPurchase.findFirst({
      where: { stripe_session_id: sessionId },
      select: { uuid: true, gross_amount_cents: true, amount_cents: true },
    });

    if (!purchase) {
      return;
    }

    const grossAmountCents =
      purchase.gross_amount_cents ?? purchase.amount_cents;

    const netAmountCents = grossAmountCents - feeDetails.feeCents;

    const stripeCommissionPercent = stripeCommissionPercentFromFeeAndAmount(
      feeDetails.feeCents,
      feeDetails.grossAmountCents,
    );

    await this.prisma.creditPurchase.update({
      where: { uuid: purchase.uuid },
      data: {
        stripe_fee_cents: feeDetails.feeCents,
        stripe_commission_percent: stripeCommissionPercent,
        net_amount_cents: netAmountCents,
      },
    });
  }

  private async ensureDefaultCreditPacks() {
    for (const pack of DefaultCreditPacks) {
      await this.prisma.creditPack.upsert({
        where: { key: pack.key },
        create: {
          key: pack.key,
          name: pack.name,
          credits_amount: pack.credits_amount,
          amount_cents: pack.amount_cents,
          currency: pack.currency,
          active: pack.active ?? true,
        },
        update: {
          name: pack.name,
          credits_amount: pack.credits_amount,
          amount_cents: pack.amount_cents,
          currency: pack.currency,
          active: pack.active ?? true,
        },
      });
    }

    await this.prisma.creditPack.upsert({
      where: { key: RegistrationGiftCreditPackSeed.key },
      create: {
        key: RegistrationGiftCreditPackSeed.key,
        name: RegistrationGiftCreditPackSeed.name,
        credits_amount: RegistrationGiftCreditPackSeed.credits_amount,
        amount_cents: RegistrationGiftCreditPackSeed.amount_cents,
        currency: RegistrationGiftCreditPackSeed.currency,
        active: RegistrationGiftCreditPackSeed.active ?? false,
      },
      update: {
        name: RegistrationGiftCreditPackSeed.name,
        credits_amount: RegistrationGiftCreditPackSeed.credits_amount,
        amount_cents: RegistrationGiftCreditPackSeed.amount_cents,
        currency: RegistrationGiftCreditPackSeed.currency,
        active: RegistrationGiftCreditPackSeed.active ?? false,
      },
    });

    const packs = await this.prisma.creditPack.findMany({
      where: { key: { in: DefaultCreditPacks.map((p) => p.key) } },
    });

    for (const pack of packs) {
      if (!pack.stripe_product_id || !pack.stripe_price_id) {
        await this.syncPackToStripe(pack.uuid);
      }
    }
  }

  private async syncPackToStripe(packUuid: string) {
    const pack = await this.prisma.creditPack.findUnique({
      where: { uuid: packUuid },
    });

    if (!pack) {
      throw new BadRequestException('Credit pack not found');
    }

    if (!this.stripe) {
      return pack;
    }

    let productId = pack.stripe_product_id;

    if (!productId) {
      const product = await this.stripe.products.create({
        name: pack.name,
        metadata: {
          context: 'credit_pack',
          pack_key: pack.key,
          credits_amount: String(pack.credits_amount),
        },
      });

      productId = product.id;
    }

    let priceId = pack.stripe_price_id;

    if (!priceId) {
      const price = await this.stripe.prices.create({
        product: productId,
        unit_amount: pack.amount_cents,
        currency: pack.currency,
      });

      priceId = price.id;
    }

    return this.prisma.creditPack.update({
      where: { uuid: pack.uuid },
      data: {
        stripe_product_id: productId,
        stripe_price_id: priceId,
      },
    });
  }

  async getPurchasesForAdminDashboard(query: AdminPurchasesQueryDto) {
    const page = Math.max(1, Number(query.page) || 1);

    const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));

    const skip = (page - 1) * limit;

    const sortBy = query.sort_by ?? 'created_at';

    const sortOrder = query.sort_order ?? 'desc';

    const search = query.search?.trim();

    const packKey = query.pack_key?.trim();

    const statusFilter = query.status;

    const andParts: Prisma.CreditPurchaseWhereInput[] = [];

    if (search) {
      andParts.push({
        OR: [
          { uuid: { contains: search, mode: 'insensitive' } },
          { user_uuid: { contains: search, mode: 'insensitive' } },
          { user: { email: { contains: search, mode: 'insensitive' } } },
        ],
      });
    }

    if (packKey) {
      andParts.push({ credit_pack: { key: packKey } });
    }

    if (statusFilter) {
      andParts.push({ status: statusFilter });
    }

    const where: Prisma.CreditPurchaseWhereInput | undefined =
      andParts.length > 0 ? { AND: andParts } : undefined;

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
          credit_pack: {
            select: {
              key: true,
              name: true,
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
          kind: purchase.kind,
          status: purchase.status,
          currency: purchase.currency,
          credits_amount: purchase.credits_amount,
          gross_amount_cents: gross,
          net_amount_cents: net,
          stripe_fee_cents: stripeFees,
          stripe_commission_percent:
            purchase.stripe_commission_percent !== null
              ? Number(purchase.stripe_commission_percent)
              : null,
          app_fee_cents: appFees,
          created_at: purchase.created_at,
          user: purchase.user,
          credit_pack: purchase.credit_pack,
        };
      }),
    };
  }
}
