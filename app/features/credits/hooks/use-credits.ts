import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import {
  createCreditCheckout,
  getCreditPacks,
  getCreditsPurchases,
  getCreditsSummary,
  getCreditsUsage,
} from "../services/credits.services";

const QueryKeys = {
  summary: "credits-summary",
  packs: "credits-packs",
  usage: "credits-usage",
  purchases: "credits-purchases",
};

export const useCreditsSummary = () => {
  return useQuery({
    queryKey: [QueryKeys.summary],
    queryFn: getCreditsSummary,
  });
};

export const useCreditPacks = () => {
  return useQuery({
    queryKey: [QueryKeys.packs],
    queryFn: getCreditPacks,
  });
};

export const useCreditsUsage = () => {
  return useQuery({
    queryKey: [QueryKeys.usage],
    queryFn: getCreditsUsage,
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
