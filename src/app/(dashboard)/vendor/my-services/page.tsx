
import Link from "next/link";
import { requireRole } from "@/lib/require-role";
import { backendFetch } from "@/lib/backend-api";
import MyServicesList from "./my-services-list";
import { Plus, BriefcaseBusiness, ArrowUpRight } from "lucide-react";

export const instant = false;

type Service = {
  _id: string;
  serviceName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  status: "pending" | "active" | "rejected";
  createdAt: string;
};

type ServicesResponse = {
  success: boolean;
  services: Service[];
};

export default async function MyServicesPage() {
  await requireRole(["vendor"]);

  let services: Service[] = [];
  let error = "";

  try {
    const result = await backendFetch<ServicesResponse>(
      "/api/services/my-services"
    );
    services = result.services || [];
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load services.";
  }

  const activeCount = services.filter(
    (service) => service.status === "active"
  ).length;

  const pendingCount = services.filter(
    (service) => service.status === "pending"
  ).length;

  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-ink text-ivory">
        <div className="absolute -right-24 -top-32 size-96 rounded-full border border-white/10" />
        <div className="absolute -right-12 -top-20 size-72 rounded-full border border-white/10" />

        <div className="container-wedding relative py-12 sm:py-16">
          <p className="eyebrow text-champagne">VENDOR WORKSPACE</p>

          <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-4xl sm:text-5xl">
                My <span className="script-accent">services.</span>
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-ivory/65">
                Manage your wedding service listings, update their details
                and keep your business information current.
              </p>
            </div>

            <Link
              href="/vendor/add-service"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-champagne px-6 py-3 text-xs font-bold text-ink transition hover:bg-ivory"
            >
              <Plus className="size-4" />
              Add a service
            </Link>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-wedding">
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-line bg-white p-5">
              <p className="text-xs font-semibold tracking-widest text-ink-muted uppercase">
                Total services
              </p>
              <p className="mt-3 font-display text-4xl text-ink">
                {services.length}
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-5">
              <p className="text-xs font-semibold tracking-widest text-ink-muted uppercase">
                Active services
              </p>
              <p className="mt-3 font-display text-4xl text-ink">
                {activeCount}
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-white p-5">
              <p className="text-xs font-semibold tracking-widest text-ink-muted uppercase">
                Pending review
              </p>
              <p className="mt-3 font-display text-4xl text-ink">
                {pendingCount}
              </p>
            </div>
          </div>

          <div className="mb-7 flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">YOUR LISTINGS</p>
              <h2 className="display-title mt-2 text-2xl sm:text-3xl">
                Service <span className="script-accent">directory.</span>
              </h2>
            </div>

            <div className="hidden items-center gap-2 text-sm text-ink-muted sm:flex">
              <BriefcaseBusiness className="size-4 text-gold" />
              {services.length} listings
            </div>
          </div>

          {error ? (
            <div
              role="alert"
              className="rounded-2xl border border-rose/20 bg-rose/5 p-6 text-sm text-rose"
            >
              {error}
            </div>
          ) : (
            <MyServicesList services={services} />
          )}

          <div className="mt-8 rounded-2xl border border-line bg-cream/50 p-6 sm:flex sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-2xl text-ink">
                Want to add another service?
              </h3>
              <p className="mt-2 text-sm text-ink-muted">
                Create another listing for your wedding business.
              </p>
            </div>

            <Link
              href="/vendor/add-service"
              className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-ink transition hover:text-gold sm:mt-0"
            >
              Add new service
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
