import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import {
  CreditPack,
  CreditPurchaseItem,
  CreditsSummary,
  CreditsUsageItem,
  CreateCreditCheckoutPayload,
  CreateCreditCheckoutResponse,
  PaginatedResponse,
} from "../interfaces/credits.interfaces";

export const getCreditsSummary = async (): Promise<CreditsSummary> => {
  const response = await axiosInstance.get<CreditsSummary>(ApiRoutes.credits.summary);
  return response.data;
};

export const getCreditPacks = async (): Promise<CreditPack[]> => {
  const response = await axiosInstance.get<CreditPack[]>(ApiRoutes.credits.packs);
  return response.data;
};

export const getCreditsUsage = async (): Promise<PaginatedResponse<CreditsUsageItem>> => {
  const response = await axiosInstance.get<PaginatedResponse<CreditsUsageItem>>(ApiRoutes.credits.usage);
  return response.data;
};

export const getCreditsPurchases = async (): Promise<PaginatedResponse<CreditPurchaseItem>> => {
  const response = await axiosInstance.get<PaginatedResponse<CreditPurchaseItem>>(ApiRoutes.credits.purchases);
  return response.data;
};

export const createCreditCheckout = async (
  payload: CreateCreditCheckoutPayload,
): Promise<CreateCreditCheckoutResponse> => {
  const response = await axiosInstance.post<CreateCreditCheckoutResponse>(ApiRoutes.credits.checkout, payload);
  return response.data;
};
