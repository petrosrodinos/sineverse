import { AuthRole } from '@/generated/prisma';

export class UpdateAdminUserDto {
  email?: string;
  full_name?: string;
  phone?: string | null;
  role?: AuthRole;
  credits_balance?: number;
}
