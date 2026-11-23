
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { MapPin, ArrowLeft, Tag } from "lucide-react";
import BookingForm from "@/app/(dashboard)/customer/services/booking-form";
import ServiceImage from "@/components/shared/service-image";
import { getSession } from "@/lib/get-session";

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

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ServiceDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const role = session.user.role;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("Backend API URL is not configured");
  }

  const response = await fetch(
    `${apiUrl.replace(/\/+$/, "")}/api/services/${id}`,
    { cache: "no-store" }
  );

  if (response.status === 404 || response.status === 400) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to load service details");
  }

  const data = await response.json();
  const service: Service = data.service;

  if (!service) notFound();

  return (
    <main className="min-h-screen bg-background">
      <section className="section-y">
        <div className="container-wedding">
          <Link
            href="/services"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-ink-muted hover:text-rose"
          >
            <ArrowLeft className="size-4" />
            Back to services
          </Link>

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <ServiceImage
                src={service.images?.[0]}
                alt={service.serviceName}
                className="aspect-[4/3] w-full overflow-hidden rounded-2xl"
              />

              {service.images?.length > 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {service.images.slice(1).map((image, index) => (
                    <ServiceImage
                      key={`${image}-${index}`}
                      src={image}
                      alt={`${service.serviceName} ${index + 2}`}
                      className="aspect-square w-full overflow-hidden rounded-xl"
                    />
                  ))}
                </div>
              )}
            </div>

            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-champagne/50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink">
                <Tag className="size-3.5" />
                {service.category}
              </span>

              <h1 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl">
                {service.serviceName}
              </h1>

              <p className="mt-4 flex items-center gap-2 text-sm text-ink-muted">
                <MapPin className="size-4 text-rose" />
                {service.location}
              </p>

              <div className="my-7 border-y border-line py-5">
                <p className="text-xs uppercase tracking-wider text-ink-muted">
                  Starting price
                </p>
                <p className="mt-2 font-display text-3xl font-semibold text-rose">
                  ৳{service.price.toLocaleString("en-BD")}
                </p>
              </div>

              <h2 className="font-display text-2xl text-ink">
                About this service
              </h2>

              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-ink-muted">
                {service.description}
              </p>

              <div className="mt-8 rounded-2xl border border-line bg-white p-5 sm:p-7">
                {role === "customer" ? (
                  <>
                    <h2 className="font-display text-2xl text-ink">
                      Request a booking
                    </h2>
                    <p className="mb-5 mt-2 text-sm text-ink-muted">
                      Share your event details with the vendor.
                    </p>
                    <BookingForm serviceId={service._id} />
                  </>
                ) : (
                  <>
                    <h2 className="font-display text-2xl text-ink">
                      Customer Booking
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-ink-muted">
                      Only customer accounts can request a booking for this service.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
