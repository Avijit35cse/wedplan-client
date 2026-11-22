
import ServiceFilters from "./service-filters";

export const instant = false;

type Service = {
  _id: string;
  serviceName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  images: string[];
};

type ServicesResponse = {
  success: boolean;
  total: number;
  services: Service[];
};

type PageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    location?: string;
    sort?: string;
  }>;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getServices(
  filters: PageProps["searchParams"] extends Promise<infer T> ? T : never
): Promise<Service[]> {
  if (!API_URL) {
    throw new Error("Backend API URL is not configured");
  }

  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  const query = params.toString();
  const response = await fetch(
    `${API_URL}/api/services${query ? `?${query}` : ""}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to load services");
  }

  const data: ServicesResponse = await response.json();
  return data.services;
}

export default async function CustomerServicesPage({
  searchParams,
}: PageProps) {
  const filters = await searchParams;

  let services: Service[] = [];
  let error = "";

  try {
    services = await getServices(filters);
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Something went wrong";
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Explore Services</h1>
      <p className="mt-2 text-gray-600">
        Find the right wedding services for your special day.
      </p>

      <ServiceFilters />

      {error && <p className="mt-6 text-red-500">{error}</p>}

      {!error && services.length === 0 && (
        <p className="mt-6">No active services found.</p>
      )}

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article
            key={service._id}
            className="overflow-hidden rounded-xl border bg-white shadow-sm"
          >
            {service.images?.[0] && (
              <img
                src={service.images[0]}
                alt={service.serviceName}
                className="h-48 w-full object-cover"
              />
            )}

            <div className="space-y-2 p-4">
              <h2 className="text-lg font-semibold">
                {service.serviceName}
              </h2>
              <p className="text-sm text-gray-500">
                {service.category} · {service.location}
              </p>
              <p className="text-sm">{service.description}</p>
              <p className="font-bold">
                ৳{service.price.toLocaleString("en-BD")}
              </p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
