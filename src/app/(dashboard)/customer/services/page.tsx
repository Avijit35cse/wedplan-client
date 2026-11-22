
import { Suspense } from "react";
import { Search, SlidersHorizontal, MapPin, Sparkles } from "lucide-react";
import ServiceFilters from "./service-filters";
import BookingForm from "./booking-form";
import ServiceImage from "@/components/shared/service-image";
import PageBanner from "@/components/shared/page-banner";
import EmptyState from "@/components/shared/empty-state";

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

async function getServices(filters: {
    search?: string;
    category?: string;
    location?: string;
    sort?: string;
}): Promise<Service[]> {
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

function formatPrice(price: number) {
    return `৳${price.toLocaleString("en-BD")}`;
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
        <main className="min-h-screen bg-background">
            <PageBanner
                eyebrow="THE WEDPLAN DIRECTORY"
                title={
                    <>
                        Find the perfect{" "}
                        <span className="script-accent">wedding services.</span>
                    </>
                }
                description="Explore trusted wedding professionals and discover the people who can bring your celebration to life."
            />

            <section className="section-y">
                <div className="container-wedding">
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="eyebrow flex items-center gap-2">
                                <Sparkles className="size-3.5" />
                                CURATED FOR YOUR DAY
                            </p>
                            <h2 className="display-title mt-3 text-3xl sm:text-4xl">
                                Explore the <span className="script-accent">directory</span>
                            </h2>
                            <p className="mt-3 max-w-xl text-sm leading-7 text-ink-muted">
                                Browse available services, compare options and send a booking request directly to a vendor.
                            </p>
                        </div>

                        <p className="text-sm text-ink-muted">
                            {services.length} {services.length === 1 ? "service" : "services"} found
                        </p>
                    </div>

                    <div className="surface-panel rounded-2xl p-4 sm:p-6">
                        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink">
                            <SlidersHorizontal className="size-4 text-gold" />
                            Refine your search
                        </div>
                        <Suspense
                            fallback={
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                    {Array.from({ length: 4 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="h-12 animate-pulse rounded-xl bg-champagne/40"
                                        />
                                    ))}
                                </div>
                            }
                        >
                            <ServiceFilters />
                        </Suspense>
                    </div>

                    {error ? (
                        <div className="mt-10 rounded-2xl border border-rose/20 bg-rose/5 p-8 text-center">
                            <p className="font-semibold text-rose">{error}</p>
                            <p className="mt-2 text-sm text-ink-muted">
                                Please check your connection and try again.
                            </p>
                        </div>
                    ) : services.length === 0 ? (
                        <div className="mt-12">
                            <EmptyState
                                title="No services found"
                                description="Try changing your search or filters to discover available wedding services."
                            />
                        </div>
                    ) : (
                        <div className="mt-10 grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {services.map((service) => (
                                <article
                                    key={service._id}
                                    className="group overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5"
                                >
                                    <div className="relative">
                                        <ServiceImage
                                            src={service.images?.[0]}
                                            alt={service.serviceName}
                                            className="aspect-[4/3] w-full"
                                        />
                                        <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-ivory/95 px-3 py-1.5 text-[0.62rem] font-bold tracking-[0.14em] text-ink uppercase shadow-sm">
                                            {service.category}
                                        </span>
                                    </div>

                                    <div className="p-5 sm:p-6">
                                        <div className="flex items-start justify-between gap-3">
                                            <h3 className="font-display text-2xl leading-tight text-ink">
                                                {service.serviceName}
                                            </h3>
                                        </div>

                                        <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-muted">
                                            <MapPin className="size-3.5 shrink-0 text-rose" />
                                            {service.location}
                                        </p>

                                        <p className="mt-4 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-ink-muted">
                                            {service.description}
                                        </p>

                                        <div className="mt-5 flex items-center justify-between border-y border-line py-4">
                                            <span className="text-xs tracking-wide text-ink-muted">
                                                Starting price
                                            </span>
                                            <span className="font-display text-2xl font-semibold text-rose">
                                                {formatPrice(service.price)}
                                            </span>
                                        </div>

                                        <details className="group/booking mt-5">
                                            <summary className="flex cursor-pointer list-none items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-xs font-semibold tracking-[0.12em] text-white uppercase transition-colors hover:bg-rose [&::-webkit-details-marker]:hidden">
                                                <Search className="size-3.5" />
                                                Request booking
                                            </summary>
                                            <div className="mt-5 border-t border-line pt-5">
                                                <BookingForm serviceId={service._id} />
                                            </div>
                                        </details>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
