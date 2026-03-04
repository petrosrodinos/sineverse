import { Module, Global, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { REDIS_OPTIONS } from './redis.constants';
import type { RedisOptions } from 'ioredis';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: REDIS_OPTIONS,
            useFactory: (configService: ConfigService): RedisOptions | null => {
                const logger = new Logger('RedisModule');

                const redisUrl = configService.get<string>('REDIS_URL');

                if (!redisUrl) {
                    logger.warn('REDIS_URL not set, BullMQ will use default localhost:6379');
                    return {
                        host: 'localhost',
                        port: 6379,
                    };
                }

                try {
                    const url = new URL(redisUrl.includes('://') ? redisUrl : `redis://${redisUrl}`);
                    return {
                        host: url.hostname,
                        port: parseInt(url.port, 10) || 6379,
                        password: url.password || undefined,
                        username: url.username || undefined,
                        maxRetriesPerRequest: null,
                        reconnectOnError: () => false,
                    };
                } catch (error) {
                    logger.error(`Invalid REDIS_URL: ${redisUrl}, falling back to localhost:6379`);
                    return {
                        host: 'localhost',
                        port: 6379,
                    };
                }
            },
            inject: [ConfigService],
        },
    ],
    exports: [REDIS_OPTIONS],
})
export class RedisModule { }
