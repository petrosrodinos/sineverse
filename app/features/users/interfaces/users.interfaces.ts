export interface CurrentUserProfile {
  uuid: string;
  email: string;
  phone: string | null;
  full_name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfilePayload {
  full_name: string;
}

export interface UpdatePasswordPayload {
  current_password: string;
  new_password: string;
}
