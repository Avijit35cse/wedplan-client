
import { requireRole } from "@/lib/require-role";
import { backendFetch } from "@/lib/backend-api";
import BookingStatusButtons from "./booking-status-buttons";
import {
  CalendarDays,
  MapPin,
  ClipboardList,
  Clock3,
  Inbox,
  AlertCircle,
} from "lucide-react";

export const instant = false;

type Booking = {
  _id: string;
  serviceId: string;
  customerId: string;
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

const statusStyles: Record<Booking["status"], string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  accepted: "bg-green-50 text-green-700 border-green-200",
  rejected: "bg-rose/10 text-wine border-rose/20",
  cancelled: "bg-gray-100 text-gray-600 border-gray-200",
};

export default async function VendorBookingRequestsPage() {
  await requireRole(["vendor"]);

  let bookings: Booking[] = [];
  let error = "";

  try {
    const data = await backendFetch<BookingResponse>(
      "/api/bookings/vendor-requests"
    );
    bookings = data.bookings;
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Failed to load booking requests";
  }

  const pendingCount = bookings.filter(
    (booking) => booking.status === "pending"
  ).length;

  const acceptedCount = bookings.filter(
    (booking) => booking.status === "accepted"
  ).length;

  const rejectedCount = bookings.filter(
    (booking) => booking.status === "rejected"
  ).length;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="mb-9 overflow-hidden rounded-3xl bg-ink px-6 py-9 text-white sm:px-10 sm:py-12">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
              <Inbox size={15} />
              Vendor workspace
            </span>

            <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
              Booking Requests
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
              Review customer requests, check event details and manage your
              upcoming wedding service bookings.
            </p>
          </div>

          <div className="flex size-20 shrink-0 items-center justify-center self-start rounded-2xl border border-white/15 bg-white/10 text-champagne md:size-24">
            <CalendarDays size={38} strokeWidth={1.3} />
          </div>
        </div>
      </section>

      {!error && (
        <section className="mb-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Total Requests",
              value: bookings.length,
              icon: ClipboardList,
            },
            {
              label: "Pending",
              value: pendingCount,
              icon: Clock3,
            },
            {
              label: "Accepted",
              value: acceptedCount,
              icon: CalendarDays,
            },
            {
              label: "Rejected",
              value: rejectedCount,
              icon: Inbox,
            },
          ].map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-line bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-ink-muted">{stat.label}</p>
                  <span className="flex size-10 items-center justify-center rounded-xl bg-cream text-gold">
                    <Icon size={19} />
                  </span>
                </div>

                <p className="mt-4 font-serif text-3xl text-ink">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </section>
      )}

      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          Booking management
        </p>
        <h2 className="mt-2 font-serif text-3xl text-ink">
          Customer Requests
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          Review the details of each booking request below.
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          <AlertCircle size={20} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {!error && bookings.length === 0 && (
        <div className="rounded-3xl border border-dashed border-champagne bg-white px-6 py-16 text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-cream text-gold">
            <Inbox size={29} />
          </span>
          <h3 className="mt-5 font-serif text-2xl text-ink">
            No booking requests yet
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-muted">
            When customers request one of your services, their booking details
            will appear here.
          </p>
        </div>
      )}

      {!error && bookings.length > 0 && (
        <div className="space-y-5">
          {bookings.map((booking) => (
            <article
              key={booking._id}
              className="rounded-2xl border border-line bg-white p-5 shadow-sm transition hover:shadow-md sm:p-7"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-ink-muted">
                    Booking reference
                  </p>
                  <h3 className="mt-1 font-serif text-xl text-ink">
                    #{booking._id.slice(-6).toUpperCase()}
                  </h3>
                </div>

                <span
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${statusStyles[booking.status]}`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="grid gap-5 py-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-ink-muted">
                    Service ID
                  </p>
                  <p className="mt-1 break-all text-sm font-medium text-ink">
                    {booking.serviceId}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-ink-muted">
                    Customer ID
                  </p>
                  <p className="mt-1 break-all text-sm font-medium text-ink">
                    {booking.customerId}
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CalendarDays
                    size={18}
                    className="mt-0.5 shrink-0 text-gold"
                  />
                  <div>
                    <p className="text-xs text-ink-muted">Event Date</p>
                    <p className="mt-1 text-sm font-medium text-ink">
                      {new Date(booking.eventDate).toLocaleDateString("en-BD", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0 text-gold"
                  />
                  <div>
                    <p className="text-xs text-ink-muted">Event Location</p>
                    <p className="mt-1 text-sm font-medium text-ink">
                      {booking.eventLocation}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-ivory/70 p-4">
                <p className="text-xs font-semibold text-ink-muted">
                  Customer Message
                </p>
                <p className="mt-2 text-sm leading-6 text-ink">
                  {booking.message || "No message provided."}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-ink-muted">
                <Clock3 size={14} />
                Requested on{" "}
                {new Date(booking.createdAt).toLocaleDateString("en-BD", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>

              {booking.status === "pending" && (
                <BookingStatusButtons bookingId={booking._id} />
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
