import { IsIn, IsOptional, IsString } from 'class-validator';
import {
  PaginationQueryDto,
  type SortOrder,
} from '@/shared/dto/pagination-query.dto';

export type AdminUsersSortField =
  | 'created_at'
  | 'full_name'
  | 'email'
  | 'role'
  | 'credits_balance';

export class AdminUsersQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(['created_at', 'full_name', 'email', 'role', 'credits_balance'])
  sort_by?: AdminUsersSortField = 'created_at';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sort_order?: SortOrder = 'desc';
}
