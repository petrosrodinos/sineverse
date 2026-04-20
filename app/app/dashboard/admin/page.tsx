import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { AdminDashboardClient } from "./AdminDashboardClient";

import { authOptions } from "@/features/auth/config/auth-options";
import {
  RoleType,
  RoleTypes,
} from "@/features/user/interfaces/user.interfaces";
import { Routes } from "@/config/routes";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.access_token) {
    redirect(Routes.auth.sign_in);
  }

  const role = session.role as RoleType;

  if (role !== RoleTypes.ADMIN && role !== RoleTypes.SUPER_ADMIN) {
    redirect(Routes.dashboard);
  }

  return <AdminDashboardClient />;
}
