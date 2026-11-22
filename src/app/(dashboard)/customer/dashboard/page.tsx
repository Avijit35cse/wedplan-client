
import LogoutButton from "@/components/auth/logout-button";
import { requireRole } from "@/lib/require-role";
import { backendFetch } from "@/lib/backend-api";

export const instant = false;

type BookingResponse = {
  success: boolean;
  total: number;
  bookings: unknown[];
};

type ServiceResponse = {
  success: boolean;
  total: number;
  services: unknown[];
};

export default async function CustomerDashboard() {
  const session = await requireRole(["customer"]);

  let bookingCount = 0;
  let serviceCount = 0;
  let apiError = "";

  try {
    const [bookingData, serviceData] = await Promise.all([
      backendFetch<BookingResponse>("/api/bookings/my-bookings"),
      backendFetch<ServiceResponse>("/api/services"),
    ]);

    bookingCount = bookingData.total;
    serviceCount = serviceData.total;
  } catch (error) {
    apiError =
      error instanceof Error ? error.message : "Failed to load dashboard data";
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Customer Dashboard</h1>

      <p className="mt-2">
        Welcome, {session.user.name}!
      </p>

      <p>Role: {session.user.role}</p>

      <div className="mt-4 space-y-2">
        <p>My Bookings: {bookingCount}</p>
        <p>Active Services: {serviceCount}</p>
      </div>

      {apiError && (
        <p className="mt-2 text-red-500">{apiError}</p>
      )}

      <div className="mt-4">
        <LogoutButton />
      </div>
    </main>
  );
}
