import {
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsInt,
  IsUUID,
  Min,
} from 'class-validator';
import { ProjectType } from '@/generated/prisma';

export class AdminTestUsageLedgerDto {
  @IsUUID()
  user_uuid: string;

  @IsEnum(ProjectType)
  project_type: ProjectType;

  @IsNumber()
  @Min(0)
  provider_charge_usd: number;

  @IsUUID()
  source_ref_uuid: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  fixed_credits_deduction?: number;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
