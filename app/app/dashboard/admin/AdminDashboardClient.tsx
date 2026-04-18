"use client";

import { useState } from "react";
import { Tab, Tabs } from "@heroui/tabs";
import { AdminOverviewTab } from "./components/AdminOverviewTab";
import { AdminPurchasesTab } from "./components/AdminPurchasesTab";
import { AdminUsersTab } from "./components/AdminUsersTab";

export function AdminDashboardClient() {
  const [mainTab, setMainTab] = useState("overview");

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 sm:p-6">
      <div className="rounded-2xl border border-default-200 bg-gradient-to-br from-default-100 to-default-50 p-5 sm:p-6">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-default-500">
          System-wide analytics, user account monitoring, and credit purchase tracking.
        </p>
      </div>

      <Tabs
        aria-label="Admin tabs"
        variant="underlined"
        selectedKey={mainTab}
        onSelectionChange={(key) => setMainTab(String(key))}
      >
        <Tab key="overview" title="Overview">
          <AdminOverviewTab isActive={mainTab === "overview"} />
        </Tab>

        <Tab key="users" title="Users">
          <AdminUsersTab isActive={mainTab === "users"} />
        </Tab>

        <Tab key="purchases" title="Credit Purchases">
          <AdminPurchasesTab isActive={mainTab === "purchases"} />
        </Tab>
      </Tabs>
    </div>
  );
}
