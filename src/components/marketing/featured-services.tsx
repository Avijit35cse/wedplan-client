import Link from "next/link";
import { ArrowRight, MapPin, Store } from "lucide-react";
import EmptyState from "@/components/shared/empty-state";
import ServiceImage from "@/components/shared/service-image";
import { formatPrice } from "@/lib/format";
import { SERVICES_HREF } from "@/lib/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Service = {
  _id: string;
  serviceName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  images?: string[];
};

async function getFeaturedServices(): Promise<{
  services: Service[];
  failed: boolean;
}> {
  if (!API_URL) {
    return { services: [], failed: true };
  }

  try {
    const response = await fetch(`${API_URL}/api/services?sort=newest`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return { services: [], failed: true };
    }

    const data: { services?: Service[] } = await response.json();

    return {
      services: (data.services ?? []).slice(0, 6),
      failed: false,
    };
  } catch {
    return { services: [], failed: true };
  }
}

export function FeaturedServicesSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((item) => (
        <div key={item} className="border border-line bg-surface">
          <div className="aspect-4/5 animate-pulse bg-cream" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-2/3 animate-pulse bg-cream" />
            <div className="h-3 w-1/2 animate-pulse bg-cream" />
            <div className="h-3 w-full animate-pulse bg-cream" />
            <div className="h-9 w-full animate-pulse bg-cream" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function FeaturedServices() {
  const { services, failed } = await getFeaturedServices();

  if (services.length === 0) {
    return (
      <EmptyState
        icon={Store}
        title={
          failed
            ? "Featured services are unavailable"
            : "New services are on their way"
        }
        description={
          failed
            ? "We could not load featured services right now. You can still browse the full directory."
            : "Our vendors are preparing their listings. Browse the directory to see everything available today."
        }
        action={
          <Link
            href={SERVICES_HREF}
            className="inline-flex h-11 items-center gap-2 bg-ink px-6 text-[0.66rem] font-semibold tracking-[0.18em] text-ivory uppercase transition-colors hover:bg-[#3a3129]"
          >
            Browse all services
            <ArrowRight aria-hidden className="size-3.5" />
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <article
          key={service._id}
          className="group flex flex-col border border-line bg-surface"
        >
          <div className="relative aspect-4/5 overflow-hidden">
            <ServiceImage
              src={service.images?.[0]}
              alt={service.serviceName}
              className="h-full w-full [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-105"
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            />
            <span className="absolute top-4 left-4 max-w-[80%] truncate bg-ivory/90 px-3 py-1 text-[0.56rem] font-semibold tracking-[0.16em] text-ink uppercase">
              {service.category}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-5">
            <h3 className="font-display text-xl leading-snug text-ink">
              {service.serviceName}
            </h3>

            <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-ink-muted">
              <MapPin aria-hidden className="size-3.5 text-gold" />
              {service.location}
            </p>

            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-muted">
              {service.description}
            </p>

            <div className="mt-auto flex items-center justify-between gap-4 border-t border-line/70 pt-4">
              <span className="font-display text-xl text-ink">
                {formatPrice(service.price)}
              </span>

              <Link
                href={`${SERVICES_HREF}?search=${encodeURIComponent(service.serviceName)}`}
                className="inline-flex items-center gap-1.5 text-[0.6rem] font-semibold tracking-[0.16em] text-ink uppercase transition-colors hover:text-gold"
              >
                View service
                <ArrowRight aria-hidden className="size-3.5" />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
