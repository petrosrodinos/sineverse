import axios, { isAxiosError } from "axios";
import { getSession, signOut } from "next-auth/react";

import { Routes } from "../routes";

import { API_ERROR_CODE_INSUFFICIENT_CREDITS } from "./api-error-codes";

import { environments } from "@/config/environments";
import { isTokenExpired } from "@/lib/token";
import { useApiErrorModalStore } from "@/stores/api-error-modal.store";

const axiosInstance = axios.create({
  baseURL: environments.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const session: any = await getSession();

  const { access_token, expires_in } = session || {};

  if (expires_in && isTokenExpired(expires_in)) {
    signOut({ callbackUrl: Routes.auth.sign_in });

    return Promise.reject(new Error("Token expired"));
  }

  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (isAxiosError(error)) {
      const data = error.response?.data as
        | {
            code?: string;
            required_credits?: number;
            balance?: number;
            items_count?: number;
            credits_per_item?: number;
          }
        | undefined;

      if (
        data?.code === API_ERROR_CODE_INSUFFICIENT_CREDITS &&
        typeof data.required_credits === "number" &&
        typeof data.balance === "number"
      ) {
        useApiErrorModalStore.getState().openInsufficientCredits({
          required_credits: data.required_credits,
          balance: data.balance,
          items_count: data.items_count,
          credits_per_item: data.credits_per_item,
        });
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
