export interface User {
  id: string;
  uuid: string;
  email: string;
  role: RoleType;
  created_at: string;
  updated_at: string;
}

export const RoleTypes = {
  USER: "USER",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
  SUPPORT: "SUPPORT",
} as const;

export type RoleType = (typeof RoleTypes)[keyof typeof RoleTypes];
