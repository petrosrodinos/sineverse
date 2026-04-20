import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";

import {
  deleteAdminUser,
  getAdminOverview,
  getAdminPurchases,
  getAdminUsers,
  updateAdminUser,
} from "../services/admin.services";
import {
  AdminPurchasesQuery,
  AdminUsersQuery,
  UpdateAdminUserPayload,
} from "../interfaces/admin.interfaces";

const QueryKeys = {
  overview: "admin-overview",
  users: "admin-users",
  purchases: "admin-purchases",
};

type AdminQueryOptions = {
  enabled?: boolean;
};

export const useAdminOverview = (options?: AdminQueryOptions) => {
  return useQuery({
    queryKey: [QueryKeys.overview],
    queryFn: getAdminOverview,
    enabled: options?.enabled ?? true,
  });
};

export const useAdminUsers = (
  query: AdminUsersQuery,
  options?: AdminQueryOptions,
) => {
  return useQuery({
    queryKey: [QueryKeys.users, query],
    queryFn: () => getAdminUsers(query),
    enabled: options?.enabled ?? true,
  });
};

export const useAdminPurchases = (
  query: AdminPurchasesQuery,
  options?: AdminQueryOptions,
) => {
  return useQuery({
    queryKey: [QueryKeys.purchases, query],
    queryFn: () => getAdminPurchases(query),
    enabled: options?.enabled ?? true,
  });
};

export const useUpdateAdminUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userUuid,
      payload,
    }: {
      userUuid: string;
      payload: UpdateAdminUserPayload;
    }) => updateAdminUser(userUuid, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.users] });

      addToast({ title: "User updated", severity: "success" });
    },
    onError: (error: any) => {
      addToast({
        title: "Could not update user",
        description: error?.response?.data?.message ?? error?.message,
        severity: "danger",
      });
    },
  });
};

export const useDeleteAdminUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userUuid: string) => deleteAdminUser(userUuid),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.users] });

      await queryClient.invalidateQueries({ queryKey: [QueryKeys.overview] });

      addToast({ title: "User deleted", severity: "success" });
    },
    onError: (error: any) => {
      addToast({
        title: "Could not delete user",
        description: error?.response?.data?.message ?? error?.message,
        severity: "danger",
      });
    },
  });
};
