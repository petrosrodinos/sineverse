import { ProjectType } from '@/generated/prisma';
import { VideoModels } from '@/integrations/aimlapi/core/constants';

export const ESTATE_WALKTHROUGH_CREDITS_PER_VIDEO = 10;

export const REGISTRATION_GIFT_CREDITS = 50;

export const REGISTRATION_GIFT_CREDIT_PACK_KEY = 'APP_REGISTRATION_GIFT' as const;

export const DOLLARS_PER_TOKEN = 0.00983;
export const DEFAULT_VIDEO_DURATION_SECONDS = 4;

export const MODEL_PROVIDER_COST_DOLLARS: Record<string, number> = {
  [VideoModels.KLING_VIDEO_V3_STANDARD_IMAGE]: 0.218,
  [VideoModels.KLING_VIDEO_V3_STANDARD]: 0.218,
  [VideoModels.KLING_VIDEO_V3_PRO]: 0.291,
  [VideoModels.KLING_VIDEO_V3_PRO_IMAGE]: 0.291,
  [VideoModels.KLING_VIDEO_V2_6_PRO_IMAGE]: 0.091,
  [VideoModels.KLING_VIDEO_O1_IMAGE]: 0.118,
  [VideoModels.KLING_V2_5_TURBO_PRO_IMAGE]: 0.091,
  [VideoModels.KLING_V1_PRO_IMAGE_TO_VIDEO]: 0.103,
  [VideoModels.KLING_V1_6_MULTI_IMAGE_TO_VIDEO]: 0.059,
  [VideoModels.KLING_V2_1_STANDARD_IMAGE_TO_VIDEO]: 0.0728,
  [VideoModels.KLING_STANDARD_TEXT_TO_VIDEO]: 0.029,
  [VideoModels.KLING_STANDARD_IMAGE_TO_VIDEO]: 0.029,
  [VideoModels.KLING_2_1]: 0.294,
  [VideoModels.KLING_2_1_IMAGE]: 0.294,
  [VideoModels.RUNWAY_ACT_TWO]: 0.065,
  [VideoModels.VEO_3]: 0.26,
  [VideoModels.VEO_3_FAST]: 0.105,
  [VideoModels.VEO_3_1]: 0.26,
  [VideoModels.VEO_3_1_FAST]: 0.13,
  [VideoModels.VEO_2_IMAGE]: 0.455,
  [VideoModels.VEO_3_1_IMAGE]: 0.104,
  [VideoModels.VEO_2_IMAGE_LEGACY]: 0.455,
  [VideoModels.WAN_2_5_IMAGE_PREVIEW]: 0.065,
  [VideoModels.LTXV_2]: 0.78,
  [VideoModels.LTXV_2_FAST]: 0.052,
  [VideoModels.SEEDANCE_1_0_PRO]: 0.316,
  [VideoModels.SEEDANCE_1_0_PRO_FAST]: 0.156,
  [VideoModels.SEEDANCE_1_0_LITE_TEXT]: 0.065,
  [VideoModels.SEEDANCE_1_0_LITE_IMAGE]: 0.065,
};

export const CreditUsageLedgerMetadata = {
  GENERATION_MODEL: 'generation_model',
  GENERATION_ASSET_TYPE: 'generation_asset_type',
} as const;

export const CreditsConfig = {
  baseMarkupPercent: 0.1,
  projectTypeMultipliers: {
    [ProjectType.ESTATE]: 4,
    [ProjectType.FILM]: 1.25,
  },
} as const;

export type CreditPackSeed = {
  key: string;
  name: string;
  credits_amount: number;
  amount_cents: number;
  currency: string;
  active?: boolean;
};

export const RegistrationGiftCreditPackSeed: CreditPackSeed = {
  key: REGISTRATION_GIFT_CREDIT_PACK_KEY,
  name: 'Registration gift',
  credits_amount: REGISTRATION_GIFT_CREDITS,
  amount_cents: 0,
  currency: 'eur',
  active: false,
};

export const DefaultCreditPacks: CreditPackSeed[] = [
  {
    key: 'starter_50',
    name: 'Starter 50 Credits',
    credits_amount: 50,
    amount_cents: 500,
    currency: 'eur',
  },
  {
    key: 'creator_250',
    name: 'Creator 250 Credits',
    credits_amount: 250,
    amount_cents: 2000,
    currency: 'eur',
  },
  {
    key: 'studio_700',
    name: 'Studio 700 Credits',
    credits_amount: 700,
    amount_cents: 5000,
    currency: 'eur',
  },
];
