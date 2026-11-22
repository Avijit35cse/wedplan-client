import { requireRole } from "@/lib/require-role";
import { backendFetch } from "@/lib/backend-api";
import MyServicesList from "./my-services-list";

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

  return (
    <main className="p-6 md:p-8">
      <h1 className="text-2xl font-bold">My Services</h1>
      <p className="mt-2 mb-6 text-gray-600">
        View and manage your wedding services.
      </p>
      {error ? (
        <p className="rounded-lg bg-red-50 p-4 text-red-600">{error}</p>
      ) : (
        <MyServicesList services={services} />
      )}
    </main>
  );
}
