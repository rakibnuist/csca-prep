import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AppSidebar } from "@/components/app/app-sidebar";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in?next=/app/dashboard");

  return (
    <div className="min-h-screen bg-paper lg:flex">
      <AppSidebar user={{ name: user.name, email: user.email, role: user.role }} />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
