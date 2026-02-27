import { PartialType } from '@nestjs/swagger';
import { CreateSceneVideoDto } from './create-scene-video.dto';

export class UpdateSceneVideoDto extends PartialType(CreateSceneVideoDto) {}