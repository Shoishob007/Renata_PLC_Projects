import AuthenticatedSidebarLayout from "@/components/SidebarLayout";
export default function Layout({ children }) {
  return <AuthenticatedSidebarLayout>{children}</AuthenticatedSidebarLayout>;
}