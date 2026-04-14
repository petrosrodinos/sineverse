import { IsIn, IsOptional, IsString } from 'class-validator';
import { AdminPaginationQueryDto } from './admin-pagination-query.dto';

export type AdminUsersSortField =
  | 'created_at'
  | 'full_name'
  | 'email'
  | 'role'
  | 'credits_balance';
export type AdminSortOrder = 'asc' | 'desc';

export class AdminUsersQueryDto extends AdminPaginationQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(['created_at', 'full_name', 'email', 'role', 'credits_balance'])
  sort_by?: AdminUsersSortField = 'created_at';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort_order?: AdminSortOrder = 'desc';
}
