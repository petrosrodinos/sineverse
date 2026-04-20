import { authOptions } from "@/features/auth/config/auth-options";
import { AdminDashboardClient } from "./AdminDashboardClient";
import { RoleType, RoleTypes } from "@/features/user/interfaces/user.interfaces";
import { Routes } from "@/config/routes";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
