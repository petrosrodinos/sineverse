import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CreateVideoService } from './video/create-video.service';
import { CreateVideoKlingService } from './video/providers/kling/create-video-kling.service';
import { VIDEO_PROVIDER_TOKEN } from './core/constants';

@Module({
    imports: [HttpModule],
    providers: [
        CreateVideoKlingService,
        CreateVideoService,
        {
            provide: VIDEO_PROVIDER_TOKEN,
            useFactory: (klingProvider: CreateVideoKlingService) => {
                return [klingProvider];
            },
            inject: [CreateVideoKlingService],
        },
    ],
    exports: [CreateVideoService],
})
export class AimlApiModule { }
