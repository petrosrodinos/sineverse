import { adminLoginToAccount, refreshAccountToken } from "../services/auth";
import { useMutation } from "@tanstack/react-query";
import type { LoggedInUser, SignInUser, SignUpUser } from "../interfaces/auth.interface";
import { addToast } from "@heroui/toast";
import { useAuthStore } from "@/app/stores/auth";
import { Routes } from "@/config/routes";
import { signIn, getSession } from "next-auth/react"


export function useSignin() {
    const { login } = useAuthStore((state) => state);

    return useMutation({
        mutationFn: async (data: SignInUser): Promise<LoggedInUser> => {
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: true,
                callbackUrl: Routes.dashboard,
            })

            if (!result?.ok) {
                throw new Error("Could not sign in: Invalid credentials");
            }

            const session = await getSession();
            if (!session) {
                throw new Error("Session could not be retrieved");
            }

            return {
                id: (session as any).user_uuid,
                user_uuid: (session as any).user_uuid,
                email: (session as any).email,
                role: (session as any).role,
                access_token: (session as any).access_token,
                expires_in: (session as any).expires_in,
                avatar: (session as any).avatar,
                full_name: (session as any).full_name,
                isLoggedIn: true,
            } as LoggedInUser;
        },
        onSuccess: (data: LoggedInUser) => {
            login({
                ...data,
                isLoggedIn: true,
            });
            addToast({
                title: "Login successful",
                description: "You have successfully logged in",
                color: "success",
            });
        },
        onError: (error: any) => {
            addToast({
                title: "Could not sign in",
                description: error?.message || "An unexpected error occurred",
                color: "danger",
            });
        },
    });
}


export function useSignup() {
    const { login } = useAuthStore((state) => state);

    return useMutation({
        mutationFn: async (data: SignUpUser): Promise<LoggedInUser> => {
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                full_name: data.full_name,
                action: "register",
                redirect: true,
                callbackUrl: Routes.dashboard,
            })

            if (!result?.ok) {
                throw new Error("Could not sign up: Invalid credentials or user exists");
            }

            const session = await getSession();
            if (!session) {
                throw new Error("Session could not be retrieved");
            }

            return {
                id: (session as any).user_uuid,
                user_uuid: (session as any).user_uuid,
                email: (session as any).email,
                role: (session as any).role,
                access_token: (session as any).access_token,
                expires_in: (session as any).expires_in,
                avatar: (session as any).avatar,
                full_name: (session as any).full_name,
                isLoggedIn: true,
            } as LoggedInUser;
        },
        onSuccess: (data: LoggedInUser) => {
            login({
                ...data,
                isLoggedIn: true,
            });
            addToast({
                title: "Register successful",
                description: "You have successfully registered in",
                color: "success",
            });
        },
        onError: (error: any) => {
            addToast({
                title: "Could not sign up",
                description: error?.message || "An unexpected error occurred",
                color: "danger",
            });
        },
    });
}


export function useRefreshAccountToken() {
    const { login } = useAuthStore((state) => state);
    return useMutation({
        mutationFn: () => refreshAccountToken(),
        onSuccess: (data: LoggedInUser) => {
            login({ ...data, isLoggedIn: true });
        },
    });
}

export function useAdminLoginToAccount() {
    const { login } = useAuthStore((state) => state);

    return useMutation({
        mutationFn: (account_uuid: string) => adminLoginToAccount(account_uuid),
        onSuccess: (data: LoggedInUser) => {
            addToast({
                title: "Admin login successful",
                description: "You have successfully logged in as admin",
                color: "success",
            });
            login({
                ...data,
                isLoggedIn: true,
            });
        },
        onError: (error: any) => {
            addToast({
                title: "Could not admin login to account",
                description: error.message,
                color: "danger",
            });
        },
    });
}