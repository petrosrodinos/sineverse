import { RoleType } from "../../user/interfaces/user.interfaces";

export interface SignInUser {
    email: string;
    password: string;
}

export interface SignUpUser {
    email: string;
    password: string;
}

export interface LoggedInUser {
    user_uuid: string | null;
    email: string | null;
    role: RoleType | null;
    access_token: string | null;
    expires_in: number | null;
    avatar?: string | null;
    full_name?: string | null;
    isLoggedIn?: boolean | null;
}

