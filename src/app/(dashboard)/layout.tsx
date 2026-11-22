import { Suspense, type ReactNode } from "react";
import DashboardShell from "@/components/layout/dashboard-shell";
import SiteFooter from "@/components/layout/site-footer";
import { getSession } from "@/lib/get-session";
import type { NavUser } from "@/lib/navigation";

export const instant = false;

async function DashboardShellSlot({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  const user: NavUser | null = session?.user
    ? {
        name: session.user.name,
        email: session.user.email,
        role: String(session.user.role ?? "customer"),
        image: session.user.image ?? null,
      }
    : null;

  return <DashboardShell user={user}>{children}</DashboardShell>;
}

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Suspense
        fallback={
          <div className="h-20 border-b border-line bg-ivory/95" />
        }
      >
        <DashboardShellSlot>{children}</DashboardShellSlot>
      </Suspense>

      <SiteFooter variant="minimal" />
    </div>
  );
}