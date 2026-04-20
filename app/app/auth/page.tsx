import { redirect } from "next/navigation";

import { Routes } from "@/config/routes";

export default function AuthPage() {
  redirect(Routes.auth.sign_in);
}
