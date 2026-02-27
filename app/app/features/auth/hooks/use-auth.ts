import { adminLoginToAccount, refreshAccountToken, signIn, signUp } from "../services/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { LoggedInUser, SignInUser, SignUpUser } from "../interfaces/auth.interface";
import { addToast } from "@heroui/toast";
import { useAuthStore } from "@/app/stores/auth";
import { Routes } from "@/config/routes";


export function useSignin() {
    const { login } = useAuthStore((state) => state);
    const router = useRouter();

    return useMutation({
        mutationFn: (data: SignInUser) => signIn(data),
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
            router.push(Routes.dashboard);
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
    const router = useRouter();

    return useMutation({
        mutationFn: (data: SignUpUser) => signUp(data),
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
            router.push(Routes.dashboard);
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