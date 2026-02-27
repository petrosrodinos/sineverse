import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './modules/internal/mail/mail.module';
import { SmsModule } from './modules/internal/sms/sms.module';
import { AiModule } from './modules/internal/ai/ai.module';
import { RedisModule } from './core/databases/redis/redis.module';
import { RedisCacheModule } from './modules/internal/redis-cache/redis-cache.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './shared/config/env/env.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { ScenesModule } from './modules/scenes/scenes.module';
import { SceneVariationsModule } from './modules/scene-variations/scene-variations.module';
import { SceneVideosModule } from './modules/scene-videos/scene-videos.module';
import { FinalProjectsModule } from './modules/final-projects/final-projects.module';

@Module({
  imports: [
    ConfigModule,
    MailModule,
    SmsModule,
    AiModule,
    RedisModule,
    RedisCacheModule,
    // GraphQLModule,
    AuthModule,
    ProjectsModule,
    ScenesModule,
    SceneVariationsModule,
    SceneVideosModule,
    FinalProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
