import { ProjectType } from '@/generated/prisma';

export const CreditsConfig = {
  baseMarkupPercent: 0.1,
  projectTypeMultipliers: {
    [ProjectType.ESTATE]: 2,
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
