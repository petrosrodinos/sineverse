import {
  IsEnum,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';
import { ProjectType } from '@/generated/prisma';

export class AdminTestUsageLedgerDto {
  @IsUUID()
  user_uuid: string;

  @IsEnum(ProjectType)
  project_type: ProjectType;

  @IsInt()
  @Min(0)
  provider_credits_used: number;

  @IsUUID()
  source_ref_uuid: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  fixed_credits_deduction?: number;

  @IsOptional()
  @IsNumber()
  @Min(0.000001)
  provider_charge_amount?: number;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
