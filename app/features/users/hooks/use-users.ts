import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToast } from "@heroui/toast";
import { getCurrentUserProfile, updateCurrentUserPassword, updateCurrentUserProfile } from "../services/users.services";
import { UpdatePasswordPayload, UpdateProfilePayload } from "../interfaces/users.interfaces";

const QueryKeys = {
  me: "users-me",
};

export const useCurrentUserProfile = () => {
  return useQuery({
    queryKey: [QueryKeys.me],
    queryFn: getCurrentUserProfile,
  });
};

export const useUpdateCurrentUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateCurrentUserProfile(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.me] });
      addToast({ title: "Username updated", severity: "success" });
    },
    onError: (error: any) => {
      addToast({
        title: "Could not update username",
        description: error?.response?.data?.message ?? error?.message,
        severity: "danger",
      });
    },
  });
};

export const useUpdateCurrentUserPassword = () => {
  return useMutation({
    mutationFn: (payload: UpdatePasswordPayload) => updateCurrentUserPassword(payload),
    onSuccess: () => {
      addToast({ title: "Password updated", severity: "success" });
    },
    onError: (error: any) => {
      addToast({
        title: "Could not update password",
        description: error?.response?.data?.message ?? error?.message,
        severity: "danger",
      });
    },
  });
};
