import { IsEnum, IsOptional, IsUUID } from 'class-validator';
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
}
