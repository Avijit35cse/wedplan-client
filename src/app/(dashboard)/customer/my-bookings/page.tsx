
import { requireRole } from "@/lib/require-role";
import { backendFetch } from "@/lib/backend-api";
import CancelBookingButton from "./cancel-booking-button";
import PageBanner from "@/components/shared/page-banner";
import StatusBadge from "@/components/shared/status-badge";
import EmptyState from "@/components/shared/empty-state";
import {
  CalendarDays,
  MapPin,
  MessageSquare,
  ClipboardList,
  Clock3,
} from "lucide-react";

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

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

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

  const pendingCount = bookings.filter(
    (booking) => booking.status === "pending"
  ).length;

  const acceptedCount = bookings.filter(
    (booking) => booking.status === "accepted"
  ).length;

  return (
    <main className="min-h-screen bg-background">
      <PageBanner
        eyebrow="YOUR WEDPLAN JOURNEY"
        title={
          <>
            Your booking{" "}
            <span className="script-accent">requests.</span>
          </>
        }
        description="Keep track of your wedding service requests and stay updated as your plans come together."
      />

      <section className="section-y">
        <div className="container-wedding">
          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-line bg-white p-5">
              <div className="flex items-center gap-3 text-ink-muted">
                <ClipboardList className="size-4 text-gold" />
                <span className="text-xs font-semibold tracking-wide uppercase">
                  Total requests
                </span>
              </div>
              <p className="mt-4 font-display text-4xl text-ink">
                {bookings.length}
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-5">
              <div className="flex items-center gap-3 text-ink-muted">
                <Clock3 className="size-4 text-gold" />
                <span className="text-xs font-semibold tracking-wide uppercase">
                  Pending
                </span>
              </div>
              <p className="mt-4 font-display text-4xl text-ink">
                {pendingCount}
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-5">
              <div className="flex items-center gap-3 text-ink-muted">
                <CalendarDays className="size-4 text-gold" />
                <span className="text-xs font-semibold tracking-wide uppercase">
                  Accepted
                </span>
              </div>
              <p className="mt-4 font-display text-4xl text-ink">
                {acceptedCount}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <p className="eyebrow">YOUR ACTIVITY</p>
            <h2 className="display-title mt-3 text-3xl sm:text-4xl">
              Booking <span className="script-accent">history</span>
            </h2>
          </div>

          {error ? (
            <div className="rounded-2xl border border-rose/20 bg-rose/5 p-8 text-center">
              <p className="font-semibold text-rose">{error}</p>
              <p className="mt-2 text-sm text-ink-muted">
                Please try again later.
              </p>
            </div>
          ) : bookings.length === 0 ? (
            <EmptyState
              title="No bookings yet"
              description="Your booking requests will appear here once you contact a wedding service provider."
            />
          ) : (
            <div className="space-y-5">
              {bookings.map((booking) => (
                <article
                  key={booking._id}
                  className="rounded-2xl border border-line bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-7"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
                    <div>
                      <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-gold uppercase">
                        Booking reference
                      </p>
                      <h3 className="mt-2 font-display text-2xl text-ink">
                        #{booking._id.slice(-6)}
                      </h3>
                    </div>

                    <StatusBadge status={booking.status} />
                  </div>

                  <div className="grid gap-5 py-6 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <CalendarDays className="mt-0.5 size-4 shrink-0 text-gold" />
                      <div>
                        <p className="text-xs text-ink-muted">Event date</p>
                        <p className="mt-1 text-sm font-semibold text-ink">
                          {formatDate(booking.eventDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                      <div>
                        <p className="text-xs text-ink-muted">Event location</p>
                        <p className="mt-1 text-sm font-semibold text-ink">
                          {booking.eventLocation}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 sm:col-span-2">
                      <MessageSquare className="mt-0.5 size-4 shrink-0 text-gold" />
                      <div>
                        <p className="text-xs text-ink-muted">Your message</p>
                        <p className="mt-1 text-sm leading-6 text-ink">
                          {booking.message || "No message provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                    <p className="text-xs text-ink-muted">
                      Requested on {formatDate(booking.createdAt)}
                    </p>

                    {booking.status === "pending" && (
                      <CancelBookingButton bookingId={booking._id} />
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
