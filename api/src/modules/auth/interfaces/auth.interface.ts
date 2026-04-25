export const AuthRoles = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  VISITOR: 'VISITOR',
  SUPPORT: 'SUPPORT',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

export type AuthRole = (typeof AuthRoles)[keyof typeof AuthRoles];
