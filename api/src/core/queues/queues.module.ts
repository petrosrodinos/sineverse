import { Module, Global, Logger } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import type { RedisOptions } from 'ioredis';
import { REDIS_OPTIONS } from '../databases/redis/redis.constants';

@Global()
@Module({
    imports: [
        BullModule.forRootAsync({
            inject: [REDIS_OPTIONS],
            useFactory: (redisOptions: RedisOptions | null) => {
                const logger = new Logger('QueuesModule');

                if (!redisOptions) {
                    logger.warn('Redis options not provided, using defaults for BullMQ');
                    return {
                        connection: {
                            host: 'localhost',
                            port: 6379,
                        }
                    };
                }

                return {
                    connection: redisOptions,
                };
            },
        }),
    ],
    exports: [BullModule],
})
export class QueuesModule { }
