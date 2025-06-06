"use client";
import { useAuth } from "@/context/AuthContext";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon } from "lucide-react";
import CustomerChartsPage from "./CustomerCharts";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="/dashboard">
              <HomeIcon className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Charts</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-2xl font-bold my-2">Customers Analytics</h2>
      <CustomerChartsPage />
    </div>
  );
}