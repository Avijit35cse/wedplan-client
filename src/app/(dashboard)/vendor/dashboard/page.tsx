
import Link from "next/link";
import { requireRole } from "@/lib/require-role";
import { backendFetch } from "@/lib/backend-api";
import { createCheckoutSession } from "./subscription-actions";
import {
  BriefcaseBusiness,
  ClipboardList,
  Plus,
  ArrowUpRight,
  Crown,
  Sparkles,
  Settings2,
} from "lucide-react";

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
            VENDOR WORKSPACE
          </p>

          <div className="mt-5 max-w-2xl">
            <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Welcome back,{" "}
              <span className="script-accent">
                {session.user.name}
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-ivory/65 sm:text-base">
              Manage your wedding services, review booking requests
              and grow your presence on WedPlan.
            </p>
          </div>

          <Link
            href="/vendor/add-service"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-champagne px-6 py-3 text-xs font-bold tracking-wide text-ink transition hover:bg-ivory"
          >
            <Plus className="size-4" />
            Add a service
          </Link>
        </div>
      </section>

      <section className="section-y">
        <div className="container-wedding">
          <div className="mb-8">
            <p className="eyebrow">YOUR BUSINESS OVERVIEW</p>
            <h2 className="display-title mt-3 text-3xl sm:text-4xl">
              Your vendor <span className="script-accent">workspace.</span>
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
                  <BriefcaseBusiness className="size-5" />
                </div>
                <span className="text-xs font-semibold tracking-widest text-ink-muted uppercase">
                  Service management
                </span>
              </div>

              <p className="mt-7 font-display text-5xl text-ink">
                {serviceCount}
              </p>

              <h3 className="mt-2 text-sm font-semibold text-ink">
                My services
              </h3>

              <p className="mt-2 text-sm leading-6 text-ink-muted">
                Manage the wedding services you offer on WedPlan.
              </p>

              <Link
                href="/vendor/my-services"
                className="mt-6 inline-flex items-center gap-2 border-b border-gold/50 pb-1 text-xs font-bold tracking-wide text-ink transition hover:text-gold"
              >
                Manage services
                <ArrowUpRight className="size-4" />
              </Link>
            </article>

            <article className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-xl bg-rose/10 text-rose">
                  <ClipboardList className="size-5" />
                </div>
                <span className="text-xs font-semibold tracking-widest text-ink-muted uppercase">
                  Customer activity
                </span>
              </div>

              <p className="mt-7 font-display text-5xl text-ink">
                {bookingCount}
              </p>

              <h3 className="mt-2 text-sm font-semibold text-ink">
                Booking requests
              </h3>

              <p className="mt-2 text-sm leading-6 text-ink-muted">
                Review and respond to customer booking requests.
              </p>

              <Link
                href="/vendor/booking-requests"
                className="mt-6 inline-flex items-center gap-2 border-b border-gold/50 pb-1 text-xs font-bold tracking-wide text-ink transition hover:text-gold"
              >
                View requests
                <ArrowUpRight className="size-4" />
              </Link>
            </article>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1.2fr]">
            <div className="rounded-2xl border border-line bg-cream/50 p-6 sm:p-8">
              <div className="flex size-11 items-center justify-center rounded-full bg-white text-gold">
                <Settings2 className="size-5" />
              </div>

              <h3 className="mt-5 font-display text-2xl text-ink">
                Manage your business
              </h3>

              <p className="mt-2 text-sm leading-6 text-ink-muted">
                Keep your service listings updated and manage your
                customer requests.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/vendor/my-services"
                  className="rounded-full border border-line bg-white px-5 py-2.5 text-xs font-semibold text-ink transition hover:border-gold"
                >
                  My services
                </Link>

                <Link
                  href="/vendor/booking-requests"
                  className="rounded-full border border-line bg-white px-5 py-2.5 text-xs font-semibold text-ink transition hover:border-gold"
                >
                  Booking requests
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-ink p-6 text-ivory sm:p-8">
              <div className="absolute -right-10 -top-10 size-48 rounded-full border border-white/10" />

              <div className="relative">
                <div className="flex items-center gap-2 text-champagne">
                  <Crown className="size-5" />
                  <span className="text-xs font-bold tracking-[0.18em] uppercase">
                    Premium membership
                  </span>
                </div>

                <h3 className="mt-5 font-display text-3xl">
                  Take your business further.
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-ivory/65">
                  Upgrade to Premium to unlock the additional
                  service-listing benefits available with your plan.
                </p>

                <form action={createCheckoutSession} className="mt-7">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 rounded-full bg-champagne px-6 py-3 text-xs font-bold tracking-wide text-ink transition hover:bg-ivory"
                  >
                    <Sparkles className="size-4" />
                    Upgrade to Premium
                    <ArrowUpRight className="size-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
