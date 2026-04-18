import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import {
  createCreditCheckout,
  getCreditPacks,
  getCreditsPurchases,
  getCreditsSummary,
  getCreditsUsage,
  getCreditsUsageStats,
} from "../services/credits.services";

const QueryKeys = {
  summary: "credits-summary",
  usageStats: "credits-usage-stats",
  packs: "credits-packs",
  usage: "credits-usage",
  purchases: "credits-purchases",
};

export const useCreditsSummary = () => {
  return useQuery({
    queryKey: [QueryKeys.summary],
    queryFn: getCreditsSummary,
    refetchInterval: 60_000,
  });
};

export const useCreditsUsageStats = () => {
  return useQuery({
    queryKey: [QueryKeys.usageStats],
    queryFn: getCreditsUsageStats,
    refetchInterval: 10000,
  });
};

type CreditPacksQueryOptions = {
  enabled?: boolean;
};

export const useCreditPacks = (options?: CreditPacksQueryOptions) => {
  return useQuery({
    queryKey: [QueryKeys.packs],
    queryFn: getCreditPacks,
    enabled: options?.enabled ?? true,
  });
};

export const useCreditsUsage = () => {
  return useQuery({
    queryKey: [QueryKeys.usage],
    queryFn: getCreditsUsage,
    refetchInterval: 10000,
  });
};

export const useCreditsPurchases = () => {
  return useQuery({
    queryKey: [QueryKeys.purchases],
    queryFn: getCreditsPurchases,
  });
};

export const useCreateCreditCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCreditCheckout,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.purchases] });
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.summary] });
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
        return;
      }
      addToast({
        title: "Checkout link unavailable",
        severity: "warning",
      });
    },
    onError: (error: any) => {
      addToast({
        title: "Could not start checkout",
        description: error?.response?.data?.message ?? error?.message,
        severity: "danger",
      });
    },
  });
};
