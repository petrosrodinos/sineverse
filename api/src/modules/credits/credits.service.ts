import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/core/databases/prisma/prisma.service';
import {
  CreditLedgerType,
  CreditPurchaseStatus,
  ProjectType,
  Prisma,
} from '@/generated/prisma';
import Stripe from 'stripe';
import { StripeConfig } from '@/integrations/stripe/stripe.config';
import {
  CreditsConfig,
  DefaultCreditPacks,
} from '@/shared/config/credits/credits.constants';
import { calculateUsageCreditsValue } from './utils/credits-calculator';
import { CurrencyService } from '@/integrations/currency/currency.service';
import { calculateHybridMoneyFields } from './utils/hybrid-billing';

type BalanceTransactionRef =
  | string
  | Stripe.BalanceTransaction
  | null
  | undefined;

@Injectable()
export class CreditsService {
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

    return { total, page, limit, items };
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
    provider_credits_used: number;
    source_ref_uuid: string;
    provider_charge_amount?: number | null;
    metadata?: Prisma.JsonObject;
  }) {
    const {
      user_uuid,
      project_type,
      provider_credits_used,
      source_ref_uuid,
      metadata,
      provider_charge_amount,
    } = params;
    if (provider_credits_used < 0) {
      return null;
    }

    const deduct = this.calculateUsageCredits(
      provider_credits_used,
      project_type,
    );
    const appFeeRate = this.calculateUsageAppFeeRate(project_type);
    const providerChargeUsd =
      typeof provider_charge_amount === 'number' && provider_charge_amount > 0
        ? provider_charge_amount
        : null;
    const fxResult =
      providerChargeUsd !== null
        ? await this.currencyService.convertUsdToEur(providerChargeUsd)
        : null;
    const hybridMoney =
      providerChargeUsd !== null && fxResult
        ? calculateHybridMoneyFields({
            providerChargeUsd,
            fxRateUsdToEur: fxResult.rate,
            appFeeRate,
          })
        : null;
    const providerCharge = hybridMoney?.providerCharge ?? null;
    const appFeeAmount = hybridMoney?.appFeeAmount ?? null;
    const grossChargeAmount = hybridMoney?.grossChargeAmount ?? null;
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
          provider_charge_amount_usd:
            providerChargeUsd !== null
              ? new Prisma.Decimal(providerChargeUsd)
              : null,
          provider_charge_amount:
            providerCharge !== null ? new Prisma.Decimal(providerCharge) : null,
          app_fee_rate: new Prisma.Decimal(appFeeRate),
          app_fee_amount:
            appFeeAmount !== null ? new Prisma.Decimal(appFeeAmount) : null,
          gross_charge_amount:
            grossChargeAmount !== null
              ? new Prisma.Decimal(grossChargeAmount)
              : null,
          fx_rate_usd_to_eur: fxResult
            ? new Prisma.Decimal(fxResult.rate)
            : null,
          fx_source: fxResult?.source ?? null,
          fx_timestamp: fxResult?.timestamp ?? null,
          metadata,
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
      stripeFeeCents = await this.stripeFeeCentsForCheckoutSession(session.id);
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
          credit_purchase_uuid: purchase.uuid,
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

    const stripeFeeCents = await this.balanceTransactionFeeCents(
      charge.balance_transaction as BalanceTransactionRef,
    );
    if (stripeFeeCents === null) {
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
      await this.updatePurchaseStripeFeeBySession(sessionId, stripeFeeCents);
    } catch (error) {
      console.warn(
        '[stripe webhook] charge.updated: could not map payment intent to session',
        error,
      );
    }
  }

  private async balanceTransactionFeeCents(
    balanceTransaction: BalanceTransactionRef,
  ): Promise<number | null> {
    if (balanceTransaction == null || !this.stripe) {
      return null;
    }
    try {
      const bt =
        typeof balanceTransaction === 'object'
          ? balanceTransaction
          : await this.stripe.balanceTransactions.retrieve(balanceTransaction);
      const fee = bt.fee ?? 0;
      return typeof fee === 'number' && fee >= 0 ? fee : null;
    } catch (error) {
      console.warn(
        '[stripe webhook] could not resolve balance transaction fee',
        error,
      );
      return null;
    }
  }

  private async stripeFeeCentsForCheckoutSession(
    sessionId: string,
  ): Promise<number | null> {
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
      return this.balanceTransactionFeeCents(
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
    stripeFeeCents: number,
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
    const netAmountCents = grossAmountCents - stripeFeeCents;

    await this.prisma.creditPurchase.update({
      where: { uuid: purchase.uuid },
      data: {
        stripe_fee_cents: stripeFeeCents,
        net_amount_cents: netAmountCents,
      },
    });
  }

  private calculateUsageAppFeeRate(projectType: ProjectType): number {
    const multiplier = CreditsConfig.projectTypeMultipliers[projectType] ?? 1;
    return (1 + CreditsConfig.baseMarkupPercent) * multiplier - 1;
  }

  private async ensureDefaultCreditPacks() {
    for (const pack of DefaultCreditPacks) {
      await this.prisma.creditPack.upsert({
        where: { key: pack.key },
        create: pack,
        update: {
          name: pack.name,
          credits_amount: pack.credits_amount,
          amount_cents: pack.amount_cents,
          currency: pack.currency,
          active: true,
        },
      });
    }

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
}
