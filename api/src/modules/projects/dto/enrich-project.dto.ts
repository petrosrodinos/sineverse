import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class EnrichProjectDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    directions?: string;
}