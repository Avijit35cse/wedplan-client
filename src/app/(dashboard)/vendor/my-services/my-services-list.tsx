
"use client";

import Image from "next/image";

import { useState, useTransition } from "react";
import {
  deleteVendorService,
  updateVendorService,
} from "./service-actions";
import {
  MapPin,
  Pencil,
  Trash2,
  X,
  Save,
  AlertCircle,
  ImageIcon,
} from "lucide-react";

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

const inputClass =
  "mt-2 min-h-11 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink-muted/50 focus:border-gold focus:ring-2 focus:ring-gold/10";

function StatusLabel({ status }: { status: Service["status"] }) {
  const styles = {
    active: "bg-green-50 text-green-700 border-green-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    rejected: "bg-rose/10 text-rose border-rose/20",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[0.65rem] font-bold tracking-wide capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function MyServicesList({
  services,
}: {
  services: Service[];
}) {
  const [editingId, setEditingId] = useState("");
  const [confirmingId, setConfirmingId] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleUpdate(formData: FormData) {
    setMessage("");

    startTransition(async () => {
      const result = await updateVendorService(formData);
      setMessage(result.message);

      if (result.success) {
        window.location.reload();
      }
    });
  }

  function handleDelete(serviceId: string) {
    setMessage("");

    startTransition(async () => {
      const result = await deleteVendorService(serviceId);
      setMessage(result.message);

      if (result.success) {
        window.location.reload();
      } else {
        setConfirmingId("");
      }
    });
  }

  if (services.length === 0) {
    return (
      <div className="rounded-2xl border border-line bg-white px-6 py-14 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-cream text-gold">
          <ImageIcon className="size-6" />
        </div>

        <h3 className="mt-5 font-display text-2xl text-ink">
          No services yet
        </h3>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-ink-muted">
          You haven&apos;t added any services yet. Your service listings
          will appear here after you create them.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {message && (
        <p
          role="status"
          className="rounded-xl border border-line bg-white p-4 text-sm text-ink"
        >
          {message}
        </p>
      )}

      {services.map((service) => (
        <article
          key={service._id}
          className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-shadow hover:shadow-md"
        >
          {editingId === service._id ? (
            <form action={handleUpdate} className="p-5 sm:p-7">
              <input
                type="hidden"
                name="serviceId"
                value={service._id}
              />

              <div className="mb-7 flex items-center justify-between gap-3">
                <div>
                  <p className="eyebrow">SERVICE MANAGEMENT</p>
                  <h3 className="mt-2 font-display text-2xl text-ink">
                    Edit service
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setEditingId("")}
                  disabled={isPending}
                  aria-label="Close edit form"
                  className="flex size-10 items-center justify-center rounded-full border border-line text-ink-muted transition hover:bg-cream"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-xs font-semibold text-ink">
                  Service name
                  <input
                    name="serviceName"
                    defaultValue={service.serviceName}
                    required
                    className={inputClass}
                  />
                </label>

                <label className="text-xs font-semibold text-ink">
                  Category
                  <input
                    name="category"
                    defaultValue={service.category}
                    required
                    className={inputClass}
                  />
                </label>

                <label className="text-xs font-semibold text-ink sm:col-span-2">
                  Description
                  <textarea
                    name="description"
                    defaultValue={service.description}
                    required
                    rows={4}
                    className={inputClass}
                  />
                </label>

                <label className="text-xs font-semibold text-ink">
                  Price (BDT)
                  <input
                    name="price"
                    type="number"
                    min="1"
                    defaultValue={service.price}
                    required
                    className={inputClass}
                  />
                </label>

                <label className="text-xs font-semibold text-ink">
                  Location
                  <input
                    name="location"
                    defaultValue={service.location}
                    required
                    className={inputClass}
                  />
                </label>

                <label className="text-xs font-semibold text-ink sm:col-span-2">
                  Image URL
                  <input
                    name="imageUrl"
                    type="url"
                    defaultValue={service.images?.[0] || ""}
                    required
                    className={inputClass}
                  />
                </label>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-xs font-bold text-white transition hover:bg-gold disabled:opacity-50"
                >
                  <Save className="size-4" />
                  {isPending ? "Saving..." : "Save changes"}
                </button>

                <button
                  type="button"
                  onClick={() => setEditingId("")}
                  disabled={isPending}
                  className="rounded-full border border-line px-6 py-3 text-xs font-semibold text-ink transition hover:bg-cream"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col sm:flex-row">
              <div className="relative h-52 shrink-0 bg-cream sm:h-auto sm:w-64">
                {service.images?.[0] ? (
                  <Image src={service.images[0]} alt={service.serviceName} width={640} height={416} className="h-full min-h-52 w-full object-cover" />
                ) : (
                  <div className="flex h-full min-h-52 items-center justify-center text-gold">
                    <ImageIcon className="size-10" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1 p-5 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[0.65rem] font-bold tracking-[0.16em] text-gold uppercase">
                      {service.category}
                    </p>

                    <h3 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
                      {service.serviceName}
                    </h3>
                  </div>

                  <StatusLabel status={service.status} />
                </div>

                <p className="mt-4 line-clamp-3 text-sm leading-6 text-ink-muted">
                  {service.description}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <p className="font-semibold text-ink">
                    <span className="text-xs text-ink-muted">Price</span>
                    <span className="ml-2 text-lg">
                      ৳{service.price.toLocaleString("en-BD")}
                    </span>
                  </p>

                  <p className="flex items-center gap-2 text-sm text-ink-muted">
                    <MapPin className="size-4 text-gold" />
                    {service.location}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-5">
                  <button
                    type="button"
                    onClick={() => {
                      setMessage("");
                      setConfirmingId("");
                      setEditingId(service._id);
                    }}
                    disabled={isPending}
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-bold text-white transition hover:bg-gold disabled:opacity-50"
                  >
                    <Pencil className="size-3.5" />
                    Edit service
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMessage("");
                      setConfirmingId(service._id);
                    }}
                    disabled={isPending}
                    className="inline-flex items-center gap-2 rounded-full border border-rose/30 px-5 py-2.5 text-xs font-bold text-rose transition hover:bg-rose hover:text-white disabled:opacity-50"
                  >
                    <Trash2 className="size-3.5" />
                    Delete
                  </button>
                </div>

                {confirmingId === service._id && (
                  <div className="mt-5 rounded-xl border border-rose/20 bg-rose/5 p-4">
                    <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                      <AlertCircle className="size-4 text-rose" />
                      Delete this service?
                    </p>

                    <p className="mt-2 text-xs leading-5 text-ink-muted">
                      This action will remove this service listing.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleDelete(service._id)}
                        disabled={isPending}
                        className="rounded-full bg-rose px-5 py-2 text-xs font-bold text-white transition hover:bg-ink disabled:opacity-50"
                      >
                        {isPending ? "Deleting..." : "Yes, delete"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setConfirmingId("")}
                        disabled={isPending}
                        className="rounded-full border border-line bg-white px-5 py-2 text-xs font-semibold text-ink transition hover:bg-cream"
                      >
                        Keep service
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

