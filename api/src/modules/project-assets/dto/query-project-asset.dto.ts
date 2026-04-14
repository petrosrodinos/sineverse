import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { AssetStatus, DocumentType } from '@/generated/prisma';

export class ProjectAssetQueryDto {
  @ApiPropertyOptional({ description: 'Filter by project UUID' })
  @IsUUID()
  @IsOptional()
  project_uuid?: string;

  @ApiPropertyOptional({ description: 'Filter by scene UUID' })
  @IsUUID()
  @IsOptional()
  scene_uuid?: string;

  @ApiPropertyOptional({ description: 'Filter by scene variation UUID' })
  @IsUUID()
  @IsOptional()
  scene_variation_uuid?: string;

  @ApiPropertyOptional({
    description: 'Filter by types (comma separated)',
    type: String,
  })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({
    description: 'Filter by selected variation state',
    type: Boolean,
  })
  @IsBoolean()
  @Type(() => Boolean)
  @IsOptional()
  selected?: boolean;

  @ApiPropertyOptional({
    description: 'Filter by roles (comma separated)',
    type: String,
  })
  @IsString()
  @IsOptional()
  role?: string;

  @ApiPropertyOptional({ enum: AssetStatus, description: 'Filter by status' })
  @IsEnum(AssetStatus)
  @IsOptional()
  status?: AssetStatus;

  @ApiPropertyOptional({
    description: 'Page number for pagination',
    default: 1,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ description: 'Number of items per page', default: 10 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  limit?: number;
}
