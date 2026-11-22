
import { requireRole } from "@/lib/require-role";
import { backendFetch } from "@/lib/backend-api";
import ServiceStatusButtons from "./service-status-buttons";
import {
  BriefcaseBusiness,
  MapPin,
  Banknote,
  Store,
  Inbox,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

export const instant = false;

type Service = {
  _id: string;
  serviceName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  vendorId: string;
  status: string;
  images?: string[];
};

type ServicesResponse = {
  success: boolean;
  total: number;
  services: Service[];
};

export default async function AdminServicesPage() {
  await requireRole(["admin"]);

  let services: Service[] = [];
  let error = "";

  try {
    const data = await backendFetch<ServicesResponse>(
      "/api/admin/services/pending"
    );
    services = data.services;
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Failed to load pending services";
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="mb-9 overflow-hidden rounded-3xl bg-ink px-6 py-9 text-white sm:px-10 sm:py-12">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
              <ShieldCheck size={15} />
              Platform moderation
            </span>

            <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
              Service Management
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
              Review vendor submissions, check service information and
              maintain the quality of services listed on WedPlan.
            </p>
          </div>

          <div className="flex size-20 shrink-0 items-center justify-center self-start rounded-2xl border border-white/15 bg-white/10 text-champagne md:size-24">
            <BriefcaseBusiness size={38} strokeWidth={1.3} />
          </div>
        </div>
      </section>

      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            Admin workspace
          </p>
          <h2 className="mt-2 font-serif text-3xl text-ink">
            Pending Submissions
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            Review each service before making an approval decision.
          </p>
        </div>

        {!error && (
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
            <Inbox size={16} />
            {services.length} Pending
          </span>
        )}
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          <AlertCircle size={20} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {!error && services.length === 0 && (
        <div className="rounded-3xl border border-dashed border-champagne bg-white px-6 py-16 text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-cream text-gold">
            <ShieldCheck size={29} />
          </span>

          <h3 className="mt-5 font-serif text-2xl text-ink">
            All caught up!
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-muted">
            There are no pending service submissions to review right now.
          </p>
        </div>
      )}

      {!error && services.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((service) => (
            <article
              key={service._id}
              className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:shadow-md"
            >
              {service.images?.[0] ? (
                <div className="h-56 overflow-hidden bg-cream">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.images[0]}
                    alt={service.serviceName}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex h-56 items-center justify-center bg-cream text-gold">
                  <BriefcaseBusiness size={42} strokeWidth={1.2} />
                </div>
              )}

              <div className="p-5 sm:p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-rose/10 px-3 py-1.5 text-xs font-semibold text-wine">
                    {service.category}
                  </span>

                  <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold capitalize text-amber-700">
                    {service.status}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-ink">
                  {service.serviceName}
                </h3>

                <p className="mt-3 text-sm leading-6 text-ink-muted">
                  {service.description}
                </p>

                <div className="mt-5 grid gap-4 rounded-xl bg-ivory/70 p-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <Banknote
                      size={19}
                      className="mt-0.5 shrink-0 text-gold"
                    />
                    <div>
                      <p className="text-xs text-ink-muted">Service Price</p>
                      <p className="mt-1 text-sm font-semibold text-ink">
                        ৳{service.price.toLocaleString("en-BD")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin
                      size={19}
                      className="mt-0.5 shrink-0 text-gold"
                    />
                    <div>
                      <p className="text-xs text-ink-muted">Location</p>
                      <p className="mt-1 text-sm font-semibold text-ink">
                        {service.location}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-start gap-3">
                  <Store
                    size={17}
                    className="mt-0.5 shrink-0 text-gold"
                  />
                  <div className="min-w-0">
                    <p className="text-xs text-ink-muted">Vendor ID</p>
                    <p className="mt-1 break-all text-xs font-medium text-ink">
                      {service.vendorId}
                    </p>
                  </div>
                </div>

                {service.status === "pending" && (
                  <ServiceStatusButtons serviceId={service._id} />
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
