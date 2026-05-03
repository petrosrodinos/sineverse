import { IsIn, IsOptional, IsString } from 'class-validator';
import {
  PaginationQueryDto,
  type SortOrder,
} from '@/shared/dto/pagination-query.dto';

export type AdminUsageSortField =
  | 'created_at'
  | 'delta_credits'
  | 'provider_charge_amount_usd'
  | 'provider_charge_amount'
  | 'app_fee_amount'
  | 'app_fee_amount_paid_eur'
  | 'app_fee_amount_promotional_eur'
  | 'usage_paid_credits_applied'
  | 'usage_promotional_credits_applied'
  | 'gross_charge_amount';

export class AdminUsageQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  user_uuid?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn([
    'created_at',
    'delta_credits',
    'provider_charge_amount_usd',
    'provider_charge_amount',
    'app_fee_amount',
    'app_fee_amount_paid_eur',
    'app_fee_amount_promotional_eur',
    'usage_paid_credits_applied',
    'usage_promotional_credits_applied',
    'gross_charge_amount',
  ])
  sort_by?: AdminUsageSortField = 'created_at';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort_order?: SortOrder = 'desc';
}
