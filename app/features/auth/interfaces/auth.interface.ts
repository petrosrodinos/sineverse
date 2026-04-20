import { RoleType } from "../../user/interfaces/user.interfaces";

export interface SignInUser {
  email: string;
  password: string;
}

export interface SignUpUser {
  full_name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  expires_in: string;
  user: {
    uuid: string;
    email: string;
    role: RoleType;
    avatar?: string;
    full_name?: string;
  };
}

export interface LoggedInUser {
  id: string;
  user_uuid: string | null;
  email: string | null;
  role: RoleType | null;
  access_token: string | null;
  expires_in: number | null;
  avatar?: string | null;
  full_name?: string | null;
  isLoggedIn?: boolean | null;
}
