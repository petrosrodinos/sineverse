import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateEstateScenesFromImagesDto {
  @ApiProperty({ description: 'UUID of the associated project' })
  @IsString()
  project_uuid: string;
}
