
import { requireRole } from "@/lib/require-role";
import { backendFetch } from "@/lib/backend-api";
import ServiceStatusButtons from "./service-status-buttons";

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
    <main className="p-8">
      <h1 className="text-2xl font-bold">Pending Services</h1>
      <p className="mt-2 text-gray-600">
        Review vendor services and approve or reject them.
      </p>

      {error && <p className="mt-6 text-red-500">{error}</p>}

      {!error && services.length === 0 && (
        <p className="mt-6">No pending services found.</p>
      )}

      <div className="mt-6 space-y-4">
        {services.map((service) => (
          <article
            key={service._id}
            className="rounded-xl border p-5 shadow-sm"
          >
            {service.images?.[0] && (
              <img
                src={service.images[0]}
                alt={service.serviceName}
                className="mb-4 h-48 w-full rounded-lg object-cover"
              />
            )}

            <h2 className="text-lg font-semibold">
              {service.serviceName}
            </h2>

            <div className="mt-3 space-y-2 text-sm">
              <p><strong>Category:</strong> {service.category}</p>
              <p><strong>Description:</strong> {service.description}</p>
              <p>
                <strong>Price:</strong>{" "}
                ৳{service.price.toLocaleString("en-BD")}
              </p>
              <p><strong>Location:</strong> {service.location}</p>
              <p><strong>Vendor ID:</strong> {service.vendorId}</p>
              <p><strong>Status:</strong> {service.status}</p>
            </div>

            {service.status === "pending" && (
              <ServiceStatusButtons serviceId={service._id} />
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
