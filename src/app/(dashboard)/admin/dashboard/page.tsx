
import Link from "next/link";
import { requireRole } from "@/lib/require-role";
import { backendFetch } from "@/lib/backend-api";
import {
  Users,
  UserRound,
  Store,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  XCircle,
  CalendarDays,
  ArrowUpRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

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

  const statCards = stats
    ? [
        {
          label: "Total Users",
          value: stats.totalUsers,
          icon: Users,
          description: "All registered accounts",
        },
        {
          label: "Customers",
          value: stats.totalCustomers,
          icon: UserRound,
          description: "Registered customers",
        },
        {
          label: "Vendors",
          value: stats.totalVendors,
          icon: Store,
          description: "Registered service providers",
        },
        {
          label: "Total Services",
          value: stats.totalServices,
          icon: BriefcaseBusiness,
          description: "All submitted services",
        },
        {
          label: "Active Services",
          value: stats.activeServices,
          icon: CheckCircle2,
          description: "Approved services",
        },
        {
          label: "Pending Services",
          value: stats.pendingServices,
          icon: Clock3,
          description: "Awaiting your review",
          highlight: true,
        },
        {
          label: "Rejected Services",
          value: stats.rejectedServices,
          icon: XCircle,
          description: "Rejected submissions",
        },
        {
          label: "Total Bookings",
          value: stats.totalBookings,
          icon: CalendarDays,
          description: "Platform booking requests",
        },
      ]
    : [];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="mb-9 overflow-hidden rounded-3xl bg-ink px-6 py-9 text-white sm:px-10 sm:py-12">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
              <ShieldCheck size={15} />
              Administration
            </span>

            <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
              Welcome back, {session.user.name}
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
              Manage the WedPlan platform, monitor activity and review
              wedding service submissions from your dashboard.
            </p>
          </div>

          <div className="flex size-20 shrink-0 items-center justify-center self-start rounded-2xl border border-white/15 bg-white/10 text-champagne md:size-24">
            <ShieldCheck size={40} strokeWidth={1.3} />
          </div>
        </div>
      </section>

      {apiError && (
        <div className="mb-8 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          <AlertCircle size={20} className="mt-0.5 shrink-0" />
          <p>{apiError}</p>
        </div>
      )}

      {stats && (
        <>
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                Platform overview
              </p>
              <h2 className="mt-2 font-serif text-3xl text-ink">
                Platform Statistics
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                An overview of users, services and booking activity.
              </p>
            </div>

            <span className="text-xs text-ink-muted">
              Live platform data
            </span>
          </div>

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat) => {
              const Icon = stat.icon;

              return (
                <article
                  key={stat.label}
                  className={`rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                    stat.highlight
                      ? "border-rose/30 bg-rose/5"
                      : "border-line bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-ink-muted">
                      {stat.label}
                    </p>

                    <span
                      className={`flex size-10 items-center justify-center rounded-xl ${
                        stat.highlight
                          ? "bg-rose/10 text-wine"
                          : "bg-cream text-gold"
                      }`}
                    >
                      <Icon size={19} />
                    </span>
                  </div>

                  <p className="mt-5 font-serif text-4xl text-ink">
                    {stat.value.toLocaleString("en-BD")}
                  </p>

                  <p className="mt-2 text-xs text-ink-muted">
                    {stat.description}
                  </p>
                </article>
              );
            })}
          </section>

          <section className="mt-9 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div className="max-w-xl">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  Administration task
                </span>

                <h2 className="mt-2 font-serif text-2xl text-ink">
                  Review Pending Services
                </h2>

                <p className="mt-2 text-sm leading-6 text-ink-muted">
                  Review vendor submissions and approve or reject services
                  before they appear on the platform.
                </p>
              </div>

              <Link
                href="/admin/services"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-wine px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink"
              >
                Manage Services
                <ArrowUpRight size={17} />
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-xl bg-cream/60 p-4">
              <Clock3 size={20} className="shrink-0 text-gold" />
              <p className="text-sm text-ink-muted">
                <span className="font-semibold text-ink">
                  {stats.pendingServices.toLocaleString("en-BD")}
                </span>{" "}
                services currently waiting for review.
              </p>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
