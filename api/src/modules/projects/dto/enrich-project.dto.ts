import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class EnrichProjectDto {
  @ApiPropertyOptional({
    description: 'Directions for the project',
    example: 'Add more details to the project',
  })
  @IsString()
  @IsOptional()
  directions?: string;
}
