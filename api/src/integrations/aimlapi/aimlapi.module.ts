import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CreateVideoService } from './video/create-video.service';
import { CreateVideoAdapter } from './video/create-video.adapter';
import { CreateImageService } from './image/create-image.service';
import { CreateImageAdapter } from './image/create-image.adapter';
import { AimlApiService } from './aimlapi.service';

@Module({
    imports: [HttpModule],
    providers: [
        CreateVideoAdapter,
        CreateVideoService,
        CreateImageAdapter,
        CreateImageService,
        AimlApiService,
    ],
    exports: [AimlApiService],
})
export class AimlApiModule { }
