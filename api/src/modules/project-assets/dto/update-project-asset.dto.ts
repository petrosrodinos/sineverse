import { PartialType } from '@nestjs/swagger';
import { CreateProjectAssetDto } from './create-project-asset.dto';

export class UpdateProjectAssetDto extends PartialType(CreateProjectAssetDto) {}
