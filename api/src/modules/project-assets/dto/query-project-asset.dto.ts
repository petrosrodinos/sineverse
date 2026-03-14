import { IsEnum, IsInt, IsOptional, IsUUID, Min } from 'class-validator';
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

    @ApiPropertyOptional({ enum: DocumentType, description: 'Filter by type' })
    @IsEnum(DocumentType)
    @IsOptional()
    type?: DocumentType;

    @ApiPropertyOptional({ enum: AssetStatus, description: 'Filter by status' })
    @IsEnum(AssetStatus)
    @IsOptional()
    status?: AssetStatus;

    @ApiPropertyOptional({ description: 'Page number for pagination', default: 1 })
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
