export const visitorAuthConfig = {
  initialCredits: 60,
  defaultFullName: 'Visitor',
  provisionRateLimit: {
    maxRequests: 3,
    windowMs: 15 * 60 * 1000,
  },
} as const;
