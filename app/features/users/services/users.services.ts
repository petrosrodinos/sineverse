import {
  CurrentUserProfile,
  UpdatePasswordPayload,
  UpdateProfilePayload,
} from "../interfaces/users.interfaces";

import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";

export const getCurrentUserProfile = async (): Promise<CurrentUserProfile> => {
  const response = await axiosInstance.get<CurrentUserProfile>(
    ApiRoutes.users.me,
  );

  return response.data;
};

export const updateCurrentUserProfile = async (
  payload: UpdateProfilePayload,
) => {
  const response = await axiosInstance.patch(
    ApiRoutes.users.update_me,
    payload,
  );

  return response.data;
};

export const updateCurrentUserPassword = async (
  payload: UpdatePasswordPayload,
) => {
  const response = await axiosInstance.patch(
    ApiRoutes.users.update_password,
    payload,
  );

  return response.data;
};
