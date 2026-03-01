import { DashboardNavbar } from "@/components/layout/dashboard-navbar";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { dashboardSidebarItems } from "@/config/navigation/dashboard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar items={dashboardSidebarItems} />
      <div className="flex flex-1 flex-col h-full min-w-0">
        <DashboardNavbar />
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
