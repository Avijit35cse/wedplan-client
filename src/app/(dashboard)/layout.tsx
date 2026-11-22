import { Suspense, type ReactNode } from "react";
import DashboardHeader from "@/components/layout/dashboard-header";
import SiteFooter from "@/components/layout/site-footer";
import { getSession } from "@/lib/get-session";
import type { NavUser } from "@/lib/navigation";

export const instant = false;

async function DashboardHeaderSlot() {
  const session = await getSession();

  const user: NavUser | null = session?.user
    ? {
        name: session.user.name,
        email: session.user.email,
        role: String(session.user.role ?? "customer"),
        image: session.user.image ?? null,
      }
    : null;

  return <DashboardHeader user={user} />;
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
          <div className="sticky top-0 z-50 h-20 border-b border-line bg-ivory/95" />
        }
      >
        <DashboardHeaderSlot />
      </Suspense>

      <div className="flex-1">{children}</div>

      <SiteFooter variant="minimal" />
    </div>
  );
}
