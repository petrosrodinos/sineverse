import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AssetStatus, DocumentType } from '@/generated/prisma';

export class CreateProjectAssetDto {
    @ApiProperty({ description: 'The UUID of the project this asset belongs to' })
    @IsUUID()
    @IsNotEmpty()
    project_uuid: string;

    @ApiPropertyOptional({ description: 'The UUID of the scene this asset belongs to' })
    @IsUUID()
    @IsOptional()
    scene_uuid?: string;

    @ApiPropertyOptional({ description: 'The UUID of the scene variation this asset belongs to' })
    @IsUUID()
    @IsOptional()
    scene_variation_uuid?: string;

    @ApiProperty({ enum: DocumentType, description: 'The type of the document' })
    @IsEnum(DocumentType)
    @IsNotEmpty()
    type: DocumentType;
}
