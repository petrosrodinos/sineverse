import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  StreamableFile,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Prisma } from '@/generated/prisma';

function transformValue(value: unknown): unknown {
  if (value === null || value === undefined) return value;
  if (value instanceof Prisma.Decimal) return value.toNumber();
  if (value instanceof Date) return value;
  if (value instanceof StreamableFile) return value;
  if (Buffer.isBuffer(value)) return value;
  if (value instanceof Uint8Array) return value;
  if (Array.isArray(value)) return value.map(transformValue);
  if (typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(value as object)) {
      result[key] = transformValue((value as Record<string, unknown>)[key]);
    }
    return result;
  }
  return value;
}

@Injectable()
export class DecimalTransformInterceptor implements NestInterceptor {
  intercept(_ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(map(transformValue));
  }
}
