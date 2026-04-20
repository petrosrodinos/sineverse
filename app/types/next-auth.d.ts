declare module "next-auth" {
  interface Session {
    access_token: string;
    avatar?: string;
    email: string;
    full_name: string;
    isLoggedIn: boolean;
    user_uuid: string;
    expires_in: number;
    role: string;
  }

  interface User {
    access_token: string;
    avatar?: string;
    email: string;
    full_name: string;
    isLoggedIn: boolean;
    user_uuid: string;
    expires_in: number;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    avatar?: string;
    email: string;
    full_name: string;
    isLoggedIn: boolean;
    user_uuid: string;
    expires_in: number;
    role: string;
  }
}
