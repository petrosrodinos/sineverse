import { LucideIcon } from "lucide-react";

import { RoleType } from "@/features/user/interfaces/user.interfaces";
export interface DashboardSidebarItem {
  label: string;
  name: string;
  href: string;
  icon: LucideIcon;
  roles?: RoleType[];
}
