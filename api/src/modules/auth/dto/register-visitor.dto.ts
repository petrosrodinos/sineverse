import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class RegisterVisitorDto {
  @ApiPropertyOptional({
    description: 'Optional visitor display name',
    example: 'Guest User',
  })
  @IsString()
  @IsOptional()
  full_name?: string;
}
