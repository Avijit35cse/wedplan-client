
import { requireRole } from "@/lib/require-role";
import { backendFetch } from "@/lib/backend-api";
import AdminServicesManager from "./admin-services-manager";
import {
  BriefcaseBusiness,
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
  status: "pending" | "active" | "rejected";
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
      "/api/admin/services"
    );
    services = data.services;
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Failed to load services";
  }

  const pendingCount = services.filter(
    (service) => service.status === "pending"
  ).length;

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
              Review vendor submissions, manage service status and
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
            All Services
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            Search, filter, review and manage all vendor services.
          </p>
        </div>

        {!error && (
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
            <ShieldCheck size={16} />
            {pendingCount} Pending Review
          </span>
        )}
      </div>

      {error ? (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          <AlertCircle size={20} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      ) : (
        <AdminServicesManager services={services} />
      )}
    </main>
  );
}
