import { ProjectType } from '@/generated/prisma';

export const ESTATE_WALKTHROUGH_CREDITS_PER_VIDEO = 10;

export const DOLLARS_PER_TOKEN = 0.00983;
export const DEFAULT_VIDEO_DURATION_SECONDS = 4;

export const MODEL_PROVIDER_COST_DOLLARS: Record<string, number> = {
  'klingai/video-v3-standard-image-to-video': 0.218,
  'klingai/video-v3-standard-text-to-video': 0.218,
  'klingai/video-v3-pro-text-to-video': 0.291,
  'klingai/video-v3-pro-image-to-video': 0.291,
  'kling-video/v1/standard/text-to-video': 0.029,
  'kling-video/v1/standard/image-to-video': 0.029,
  'klingai/v2.1-master-text-to-video': 0.294,
  'klingai/v2.1-master-image-to-video': 0.294,
  'runway-act-two': 0.065,
  'google/veo3': 0.26,
  'google/veo-3.0-fast': 0.105,
  'google/veo-3.1-t2v': 0.26,
  'google/veo-3.1-t2v-fast': 0.13,
  'google/veo-3.0-i2v': 0.455,
  'ltxv/ltxv-2': 0.78,
  'ltxv/ltxv-2-fast': 0.052,
  'bytedance/seedance-1-0-pro-t2v': 0.316,
  'bytedance/seedance-1-0-pro-fast': 0.156,
  'bytedance/seedance-1-0-lite-t2v': 0.065,
  'bytedance/seedance-1-0-lite-i2v': 0.065,
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
