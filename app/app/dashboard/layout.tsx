import { DashboardNavbar } from "@/components/layout/dashboard-navbar";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { dashboardSidebarItems } from "@/config/navigation/dashboard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar items={dashboardSidebarItems} />
      <div className="flex flex-1 flex-col min-h-screen">
        <DashboardNavbar />
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
