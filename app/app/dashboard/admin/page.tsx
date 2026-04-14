import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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

  if (![RoleTypes.ADMIN, RoleTypes.SUPER_ADMIN].includes(session.role as RoleType)) {
    redirect(Routes.dashboard);
  }

  return <AdminDashboardClient />;
}
