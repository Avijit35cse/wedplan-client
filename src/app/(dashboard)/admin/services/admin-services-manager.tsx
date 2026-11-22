
"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Banknote,
  Store,
  Trash2,
  LoaderCircle,
  BriefcaseBusiness,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import ServiceStatusButtons from "./service-status-buttons";
import {
  changeServiceStatus,
  deleteAdminService,
} from "./service-actions";

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

type Props = {
  services: Service[];
};

export default function AdminServicesManager({ services }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [isPending, startTransition] = useTransition();
  const [activeServiceId, setActiveServiceId] = useState("");

  const categories = useMemo(
    () => [...new Set(services.map((service) => service.category))].sort(),
    [services]
  );

  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase();

    return services.filter((service) => {
      const matchesSearch =
        !query ||
        service.serviceName.toLowerCase().includes(query) ||
        service.vendorId.toLowerCase().includes(query) ||
        service.location.toLowerCase().includes(query);

      const matchesCategory =
        category === "all" || service.category === category;

      const matchesStatus = status === "all" || service.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [services, search, category, status]);

  function handleStatusChange(
    serviceId: string,
    nextStatus: "active" | "pending" | "rejected"
  ) {
    setActiveServiceId(serviceId);

    startTransition(async () => {
      const result = await changeServiceStatus(serviceId, nextStatus);

      if (!result.success) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        router.refresh();
      }

      setActiveServiceId("");
    });
  }

  function handleDelete(serviceId: string, serviceName: string) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${serviceName}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setActiveServiceId(serviceId);

    startTransition(async () => {
      const result = await deleteAdminService(serviceId);

      if (!result.success) {
        toast.error(result.message);
      } else {
        toast.success(result.message);
        router.refresh();
      }

      setActiveServiceId("");
    });
  }

  return (
    <section>
      <div className="mb-6 rounded-2xl border border-line bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink">
          <SlidersHorizontal size={17} className="text-gold" />
          Search and filter services
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, vendor or location..."
              className="h-12 w-full rounded-xl border border-line bg-ivory pl-10 pr-4 text-sm text-ink outline-none transition focus:border-gold"
            />
          </div>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-12 rounded-xl border border-line bg-ivory px-4 text-sm text-ink outline-none focus:border-gold"
          >
            <option value="all">All Categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-12 rounded-xl border border-line bg-ivory px-4 text-sm capitalize text-ink outline-none focus:border-gold"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink-muted">
            Showing{" "}
            <span className="font-semibold text-ink">
              {filteredServices.length}
            </span>{" "}
            of {services.length} services
          </p>

          {(search || category !== "all" || status !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("all");
                setStatus("all");
              }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-wine hover:underline"
            >
              <RotateCcw size={14} />
              Clear filters
            </button>
          )}
        </div>
      </div>

      {filteredServices.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-champagne bg-white px-6 py-16 text-center">
          <BriefcaseBusiness
            size={35}
            className="mx-auto text-gold"
            strokeWidth={1.3}
          />
          <h3 className="mt-4 font-serif text-2xl text-ink">
            No services found
          </h3>
          <p className="mt-2 text-sm text-ink-muted">
            Try changing your search or filter options.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {filteredServices.map((service) => {
            const updating =
              isPending && activeServiceId === service._id;

            return (
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
                      className="h-full w-full object-cover"
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

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
                        service.status === "active"
                          ? "bg-emerald-50 text-emerald-700"
                          : service.status === "rejected"
                            ? "bg-rose/10 text-wine"
                            : "bg-amber-50 text-amber-700"
                      }`}
                    >
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

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-medium text-ink-muted">
                        Change status:
                      </span>

                      <select
                        value={service.status}
                        disabled={updating}
                        onChange={(event) =>
                          handleStatusChange(
                            service._id,
                            event.target.value as
                              | "active"
                              | "pending"
                              | "rejected"
                          )
                        }
                        className="h-9 rounded-lg border border-line bg-white px-3 text-xs font-semibold capitalize text-ink outline-none focus:border-gold disabled:opacity-50"
                      >
                        <option value="pending">Pending</option>
                        <option value="active">Active</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      disabled={updating}
                      onClick={() =>
                        handleDelete(service._id, service.serviceName)
                      }
                      className="inline-flex h-9 items-center gap-2 rounded-lg border border-rose-200 px-3 text-xs font-semibold text-rose-700 transition hover:bg-rose-50 disabled:opacity-50"
                    >
                      {updating ? (
                        <LoaderCircle size={14} className="animate-spin" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                      Delete
                    </button>
                  </div>

                  {service.status === "pending" && (
                    <div className="mt-4">
                      <ServiceStatusButtons serviceId={service._id} />
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
