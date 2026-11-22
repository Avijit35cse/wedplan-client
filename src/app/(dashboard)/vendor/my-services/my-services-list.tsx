"use client";

import { useState, useTransition } from "react";
import {
  deleteVendorService,
  updateVendorService,
} from "./service-actions";

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

export default function MyServicesList({ services }: { services: Service[] }) {
  const [editingId, setEditingId] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleUpdate(formData: FormData) {
    setMessage("");
    startTransition(async () => {
      const result = await updateVendorService(formData);
      setMessage(result.message);
      if (result.success) window.location.reload();
    });
  }

  function handleDelete(serviceId: string) {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    setMessage("");
    startTransition(async () => {
      const result = await deleteVendorService(serviceId);
      setMessage(result.message);
      if (result.success) window.location.reload();
    });
  }

  if (services.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center">
        You haven't added any services yet.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {message && <p role="status" className="rounded-lg bg-gray-100 p-3">{message}</p>}

      {services.map((service) => (
        <article key={service._id} className="rounded-xl border bg-white p-5 shadow-sm">
          {editingId === service._id ? (
            <form action={handleUpdate} className="space-y-4">
              <input type="hidden" name="serviceId" value={service._id} />

              <label className="block">
                Service Name
                <input name="serviceName" defaultValue={service.serviceName} required className="mt-1 w-full rounded-lg border p-3" />
              </label>

              <label className="block">
                Category
                <input name="category" defaultValue={service.category} required className="mt-1 w-full rounded-lg border p-3" />
              </label>

              <label className="block">
                Description
                <textarea name="description" defaultValue={service.description} required rows={3} className="mt-1 w-full rounded-lg border p-3" />
              </label>

              <label className="block">
                Price (BDT)
                <input name="price" type="number" min="1" defaultValue={service.price} required className="mt-1 w-full rounded-lg border p-3" />
              </label>

              <label className="block">
                Location
                <input name="location" defaultValue={service.location} required className="mt-1 w-full rounded-lg border p-3" />
              </label>

              <label className="block">
                Image URL
                <input name="imageUrl" type="url" defaultValue={service.images?.[0] || ""} required className="mt-1 w-full rounded-lg border p-3" />
              </label>

              <div className="flex flex-wrap gap-3">
                <button type="submit" disabled={isPending} className="rounded-lg bg-rose-600 px-5 py-2 text-white disabled:opacity-50">
                  {isPending ? "Saving..." : "Save Changes"}
                </button>
                <button type="button" onClick={() => setEditingId("")} className="rounded-lg border px-5 py-2">
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-4 sm:flex-row">
              {service.images?.[0] && (
                <img src={service.images[0]} alt={service.serviceName} className="h-40 w-full rounded-lg object-cover sm:w-48" />
              )}

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-semibold">{service.serviceName}</h2>
                <p className="mt-1 text-sm text-gray-500">{service.category}</p>
                <p className="mt-2 text-gray-700">{service.description}</p>
                <p className="mt-2 font-medium">BDT {service.price.toLocaleString()}</p>
                <p className="text-sm text-gray-600">{service.location}</p>
                <p className="mt-2 text-sm">
                  Status: <span className="font-semibold capitalize">{service.status}</span>
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button type="button" onClick={() => setEditingId(service._id)} disabled={isPending} className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50">
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(service._id)} disabled={isPending} className="rounded-lg bg-red-600 px-4 py-2 text-white disabled:opacity-50">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
