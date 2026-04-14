import { IsIn, IsOptional, IsString } from 'class-validator';
import { AdminPaginationQueryDto } from './admin-pagination-query.dto';
import { AdminSortOrder } from './admin-users-query.dto';

export type AdminPurchasesSortField =
  | 'created_at'
  | 'status'
  | 'gross_amount_cents'
  | 'net_amount_cents'
  | 'stripe_fee_cents'
  | 'credits_amount';

export class AdminPurchasesQueryDto extends AdminPaginationQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn([
    'created_at',
    'status',
    'gross_amount_cents',
    'net_amount_cents',
    'stripe_fee_cents',
    'credits_amount',
  ])
  sort_by?: AdminPurchasesSortField = 'created_at';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort_order?: AdminSortOrder = 'desc';
}
