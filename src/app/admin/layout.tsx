import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login?callbackUrl=/admin");
  if (session.user.role !== "admin") redirect("/login?callbackUrl=/admin&error=notadmin");

  return (
    <div className="flex h-screen overflow-hidden bg-muted/20">
      <AdminSidebar userName={session.user.name ?? session.user.email ?? "Admin"} role={session.user.role} />
      <div className="flex flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
