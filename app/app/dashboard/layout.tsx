import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { dashboardSidebarItems } from "@/config/dashboard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <DashboardSidebar items={dashboardSidebarItems} />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
