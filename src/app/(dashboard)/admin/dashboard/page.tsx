
import LogoutButton from "@/components/auth/logout-button";
import { requireRole } from "@/lib/require-role";
import { backendFetch } from "@/lib/backend-api";

export const instant = false;

type StatsResponse = {
  success: boolean;
  stats: {
    totalUsers: number;
    totalCustomers: number;
    totalVendors: number;
    totalServices: number;
    activeServices: number;
    pendingServices: number;
    rejectedServices: number;
    totalBookings: number;
  };
};

export default async function AdminDashboard() {
  const session = await requireRole(["admin"]);

  let stats: StatsResponse["stats"] | null = null;
  let apiError = "";

  try {
    const data = await backendFetch<StatsResponse>("/api/admin/stats");
    stats = data.stats;
  } catch (error) {
    apiError =
      error instanceof Error ? error.message : "Failed to load statistics";
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <p className="mt-2">Welcome, {session.user.name}!</p>
      <p>Role: {session.user.role}</p>

      {stats && (
        <div className="mt-6 space-y-2">
          <h2 className="text-xl font-semibold">Platform Statistics</h2>
          <p>Total Users: {stats.totalUsers}</p>
          <p>Total Customers: {stats.totalCustomers}</p>
          <p>Total Vendors: {stats.totalVendors}</p>
          <p>Total Services: {stats.totalServices}</p>
          <p>Active Services: {stats.activeServices}</p>
          <p>Pending Services: {stats.pendingServices}</p>
          <p>Rejected Services: {stats.rejectedServices}</p>
          <p>Total Bookings: {stats.totalBookings}</p>
        </div>
      )}

      {apiError && (
        <p className="mt-2 text-red-500">{apiError}</p>
      )}

      <div className="mt-4">
        <LogoutButton />
      </div>
    </main>
  );
}
