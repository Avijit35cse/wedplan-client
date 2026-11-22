import LogoutButton from "@/components/auth/logout-button";
import { requireRole } from "@/lib/require-role";
import { backendFetch } from "@/lib/backend-api";
import { createCheckoutSession } from "./subscription-actions";

export const instant = false;

type ServiceResponse = {
  success: boolean;
  services: unknown[];
};

type BookingResponse = {
  success: boolean;
  total: number;
  bookings: unknown[];
};

export default async function VendorDashboard() {
  const session = await requireRole(["vendor"]);

  let serviceCount = 0;
  let bookingCount = 0;
  let apiError = "";

  try {
    const [serviceData, bookingData] = await Promise.all([
      backendFetch<ServiceResponse>("/api/services/my-services"),
      backendFetch<BookingResponse>("/api/bookings/vendor-requests"),
    ]);

    serviceCount = serviceData.services.length;
    bookingCount = bookingData.total;
  } catch (error) {
    apiError =
      error instanceof Error ? error.message : "Failed to load dashboard data";
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Vendor Dashboard</h1>

      <p className="mt-2">Welcome, {session.user.name}!</p>
      <p>Role: {session.user.role}</p>

      <div className="mt-4 space-y-2">
        <p>My Services: {serviceCount}</p>
        <p>Booking Requests: {bookingCount}</p>
      </div>

      {apiError && (
        <p className="mt-2 text-red-500">{apiError}</p>
      )}

      <form action={createCheckoutSession} className="mt-6">
        <button
          type="submit"
          className="rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700"
        >
          Upgrade to Premium
        </button>
      </form>

      <div className="mt-4">
        <LogoutButton />
      </div>
    </main>
  );
}
