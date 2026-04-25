import { HttpException, HttpStatus } from '@nestjs/common';

const visitorRequestLog = new Map<string, number[]>();

export function assertVisitorProvisionRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number,
): void {
  const now = Date.now();
  const requests = visitorRequestLog.get(key) ?? [];
  const validRequests = requests.filter((timestamp) => now - timestamp < windowMs);

  if (validRequests.length >= maxRequests) {
    throw new HttpException(
      'Too many visitor session requests',
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }

  validRequests.push(now);
  visitorRequestLog.set(key, validRequests);
}
