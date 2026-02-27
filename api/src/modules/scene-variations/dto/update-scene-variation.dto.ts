import { PartialType } from '@nestjs/swagger';
import { CreateSceneVariationDto } from './create-scene-variation.dto';

export class UpdateSceneVariationDto extends PartialType(CreateSceneVariationDto) {}
