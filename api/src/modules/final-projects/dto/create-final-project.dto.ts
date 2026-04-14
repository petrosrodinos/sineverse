import { IsString, IsOptional, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFinalProjectDto {
  @ApiProperty({ description: 'UUID of the user owner' })
  @IsString()
  user_uuid: string;

  @ApiProperty({ description: 'UUID of the associated project' })
  @IsString()
  project_uuid: string;

  @ApiPropertyOptional({ description: 'Title of the final project' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ description: 'Total duration in seconds' })
  @IsInt()
  @IsOptional()
  duration_sec?: number;
}
