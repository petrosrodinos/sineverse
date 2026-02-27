"use client"
import { DashboardNavbar } from "@/components/layout/dashboard-navbar";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { dashboardSidebarItems } from "@/config/navigation/dashboard";
import { useSession } from "next-auth/react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar items={dashboardSidebarItems} />
      <div className="flex flex-1 flex-col min-h-screen">
        <DashboardNavbar />
        <div className="flex-1 overflow-auto">
          username: {session?.full_name}
          token: {session?.access_token}
          {children}
        </div>
      </div>
    </div>
  );
}
