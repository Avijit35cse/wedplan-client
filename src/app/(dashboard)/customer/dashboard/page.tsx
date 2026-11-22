
import Link from "next/link";
import { requireRole } from "@/lib/require-role";
import { backendFetch } from "@/lib/backend-api";
import {
  CalendarDays,
  Search,
  ArrowUpRight,
  ClipboardList,
  Sparkles,
} from "lucide-react";

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
      error instanceof Error
        ? error.message
        : "Failed to load dashboard data";
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-ink text-ivory">
        <div className="absolute -right-24 -top-32 size-96 rounded-full border border-white/10" />
        <div className="absolute -right-12 -top-20 size-72 rounded-full border border-white/10" />

        <div className="container-wedding relative py-14 sm:py-20">
          <p className="eyebrow text-champagne">
            YOUR PERSONAL WEDDING SPACE
          </p>

          <div className="mt-5 max-w-2xl">
            <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Welcome back,{" "}
              <span className="script-accent">
                {session.user.name}
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-ivory/65 sm:text-base">
              Your wedding journey starts here. Explore trusted services
              and keep track of your booking requests in one place.
            </p>
          </div>

          <Link
            href="/customer/services"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-champagne px-6 py-3 text-xs font-bold tracking-wide text-ink transition hover:bg-ivory"
          >
            Explore services
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="section-y">
        <div className="container-wedding">
          <div className="mb-8">
            <p className="eyebrow">YOUR OVERVIEW</p>
            <h2 className="display-title mt-3 text-3xl sm:text-4xl">
              Your wedding <span className="script-accent">at a glance.</span>
            </h2>
          </div>

          {apiError && (
            <div
              role="alert"
              className="mb-6 rounded-xl border border-rose/20 bg-rose/5 p-4 text-sm text-rose"
            >
              {apiError}
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <article className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-xl bg-champagne/40 text-gold">
                  <ClipboardList className="size-5" />
                </div>
                <span className="text-xs font-semibold tracking-widest text-ink-muted uppercase">
                  Booking activity
                </span>
              </div>

              <p className="mt-7 font-display text-5xl text-ink">
                {bookingCount}
              </p>

              <h3 className="mt-2 text-sm font-semibold text-ink">
                My booking requests
              </h3>

              <p className="mt-2 text-sm leading-6 text-ink-muted">
                Keep track of the wedding services you have requested.
              </p>

              <Link
                href="/customer/my-bookings"
                className="mt-6 inline-flex items-center gap-2 border-b border-gold/50 pb-1 text-xs font-bold tracking-wide text-ink transition hover:text-gold"
              >
                View my bookings
                <ArrowUpRight className="size-4" />
              </Link>
            </article>

            <article className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-xl bg-rose/10 text-rose">
                  <Sparkles className="size-5" />
                </div>
                <span className="text-xs font-semibold tracking-widest text-ink-muted uppercase">
                  Service directory
                </span>
              </div>

              <p className="mt-7 font-display text-5xl text-ink">
                {serviceCount}
              </p>

              <h3 className="mt-2 text-sm font-semibold text-ink">
                Available services
              </h3>

              <p className="mt-2 text-sm leading-6 text-ink-muted">
                Discover wedding services available on WedPlan.
              </p>

              <Link
                href="/customer/services"
                className="mt-6 inline-flex items-center gap-2 border-b border-gold/50 pb-1 text-xs font-bold tracking-wide text-ink transition hover:text-gold"
              >
                Browse services
                <ArrowUpRight className="size-4" />
              </Link>
            </article>
          </div>

          <div className="mt-8 rounded-2xl border border-line bg-cream/50 p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-gold">
                  <CalendarDays className="size-5" />
                </div>

                <div>
                  <p className="font-display text-2xl text-ink">
                    Planning something beautiful?
                  </p>
                  <p className="mt-2 text-sm leading-6 text-ink-muted">
                    Find the right wedding professionals for your special day.
                  </p>
                </div>
              </div>

              <Link
                href="/customer/services"
                className="inline-flex shrink-0 items-center gap-2 text-xs font-bold tracking-wide text-ink transition hover:text-gold"
              >
                <Search className="size-4" />
                Find services
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
