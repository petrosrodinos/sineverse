import { Module } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import { RedisCacheController } from './redis-cache.controller';
import { CacheService } from '@/shared/services/cache/cache.service';

@Module({
  imports: [],
  controllers: [RedisCacheController],
  providers: [RedisCacheService, CacheService],
})
export class RedisCacheModule { }
