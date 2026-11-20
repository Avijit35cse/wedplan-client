import LogoutButton from "@/components/auth/logout-button";
import { requireRole } from "@/lib/require-role";

export const instant = false;

export default async function VendorDashboard() {
  const session = await requireRole(["vendor"]);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Vendor Dashboard</h1>

      <p className="mt-2">
        Welcome, {session.user.name}!
      </p>

      <p>Role: {session.user.role}</p>
      <LogoutButton/>
    </main>
  );
}