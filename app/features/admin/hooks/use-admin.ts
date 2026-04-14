import { useQuery } from "@tanstack/react-query";
import { getAdminOverview, getAdminPurchases, getAdminUsers } from "../services/admin.services";
import { AdminPurchasesQuery, AdminUsersQuery } from "../interfaces/admin.interfaces";

const QueryKeys = {
  overview: "admin-overview",
  users: "admin-users",
  purchases: "admin-purchases",
};

export const useAdminOverview = () => {
  return useQuery({
    queryKey: [QueryKeys.overview],
    queryFn: getAdminOverview,
  });
};

export const useAdminUsers = (query: AdminUsersQuery) => {
  return useQuery({
    queryKey: [QueryKeys.users, query],
    queryFn: () => getAdminUsers(query),
  });
};

export const useAdminPurchases = (query: AdminPurchasesQuery) => {
  return useQuery({
    queryKey: [QueryKeys.purchases, query],
    queryFn: () => getAdminPurchases(query),
  });
};
