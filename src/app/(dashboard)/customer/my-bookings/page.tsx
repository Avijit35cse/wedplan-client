
import { requireRole } from "@/lib/require-role";
import { backendFetch } from "@/lib/backend-api";
import CancelBookingButton from "./cancel-booking-button";

export const instant = false;

type Booking = {
  _id: string;
  serviceId: string;
  eventDate: string;
  eventLocation: string;
  message: string;
  status: "pending" | "accepted" | "rejected" | "cancelled";
  createdAt: string;
};

type BookingResponse = {
  success: boolean;
  total: number;
  bookings: Booking[];
};

export default async function MyBookingsPage() {
  await requireRole(["customer"]);

  let bookings: Booking[] = [];
  let error = "";

  try {
    const data = await backendFetch<BookingResponse>(
      "/api/bookings/my-bookings"
    );
    bookings = data.bookings;
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Failed to load bookings";
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">My Bookings</h1>
      <p className="mt-2 text-gray-600">
        Track your wedding service booking requests.
      </p>

      {error && <p className="mt-6 text-red-500">{error}</p>}

      {!error && bookings.length === 0 && (
        <p className="mt-6">You have no bookings yet.</p>
      )}

      <div className="mt-6 space-y-4">
        {bookings.map((booking) => (
          <article
            key={booking._id}
            className="rounded-xl border p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-semibold">
                Booking #{booking._id.slice(-6)}
              </h2>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm capitalize">
                {booking.status}
              </span>
            </div>

            <div className="mt-3 space-y-2 text-sm">
              <p>
                <strong>Event Date:</strong>{" "}
                {new Date(booking.eventDate).toLocaleDateString("en-BD")}
              </p>

              <p>
                <strong>Event Location:</strong> {booking.eventLocation}
              </p>

              <p>
                <strong>Message:</strong> {booking.message || "No message"}
              </p>

              <p>
                <strong>Requested On:</strong>{" "}
                {new Date(booking.createdAt).toLocaleDateString("en-BD")}
              </p>
            </div>

            {booking.status === "pending" && (
              <CancelBookingButton bookingId={booking._id} />
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
