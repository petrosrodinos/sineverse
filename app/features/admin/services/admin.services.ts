import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import {
  AdminOverview,
  AdminPaginationResponse,
  AdminPurchaseRow,
  AdminPurchasesQuery,
  AdminUserRow,
  AdminUsersQuery,
  UpdateAdminUserPayload,
} from "../interfaces/admin.interfaces";

export const getAdminOverview = async (): Promise<AdminOverview> => {
  const response = await axiosInstance.get<AdminOverview>(ApiRoutes.admin.overview);
  return response.data;
};

export const getAdminUsers = async (
  query: AdminUsersQuery
): Promise<AdminPaginationResponse<AdminUserRow>> => {
  const response = await axiosInstance.get<AdminPaginationResponse<AdminUserRow>>(ApiRoutes.admin.users, {
    params: query,
  });
  return response.data;
};

export const getAdminPurchases = async (
  query: AdminPurchasesQuery
): Promise<AdminPaginationResponse<AdminPurchaseRow>> => {
  const response = await axiosInstance.get<AdminPaginationResponse<AdminPurchaseRow>>(ApiRoutes.admin.purchases, {
    params: query,
  });
  return response.data;
};

export const updateAdminUser = async (userUuid: string, payload: UpdateAdminUserPayload): Promise<AdminUserRow> => {
  const response = await axiosInstance.patch<AdminUserRow>(ApiRoutes.admin.user(userUuid), payload);
  return response.data;
};

export const deleteAdminUser = async (userUuid: string): Promise<{ success: boolean }> => {
  const response = await axiosInstance.delete<{ success: boolean }>(ApiRoutes.admin.user(userUuid));
  return response.data;
};
