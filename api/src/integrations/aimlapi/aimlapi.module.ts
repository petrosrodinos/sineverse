import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CreateVideoService } from './video/create-video.service';
import { CreateVideoAdapter } from './video/providers/create-video.adapter';
import { AimlApiService } from './aimlapi.service';

@Module({
    imports: [HttpModule],
    providers: [
        CreateVideoAdapter,
        CreateVideoService,
        AimlApiService,
    ],
    exports: [AimlApiService],
})
export class AimlApiModule { }
