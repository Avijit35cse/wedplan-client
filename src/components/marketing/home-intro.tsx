import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import SectionHeading from "@/components/shared/section-heading";
import { homeImages } from "@/lib/images";
import { SERVICES_HREF } from "@/lib/navigation";

const benefits = [
  "Admin-reviewed vendor listings you can trust",
  "Clear service details, locations and pricing",
  "Booking requests managed from one dashboard",
];

export default function HomeIntro() {
  return (
    <section className="section-y bg-background">
      <div className="container-wedding grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-4/5 overflow-hidden">
            <Image
              src={homeImages.introMain}
              alt="A couple sharing a quiet moment at their wedding"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="absolute right-4 -bottom-8 hidden w-44 overflow-hidden border-4 border-background sm:block md:w-52">
            <div className="relative aspect-square">
              <Image
                src={homeImages.introDetail}
                alt="A couple holding hands on their wedding day"
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
          </div>

          <div
            aria-hidden
            className="absolute top-8 -left-4 hidden h-24 w-px bg-gold/60 lg:block"
          />
        </div>

        <div className="lg:pl-4">
          <SectionHeading
            eyebrow="Welcome to WedPlan"
            title={
              <>
                Planning a wedding should feel as{" "}
                <span className="script-accent">beautiful</span> as the day
                itself.
              </>
            }
            description="WedPlan brings your venue, photographer, florist and every other detail together — so you can spend less time searching and more time celebrating."
          />

          <ul className="mt-8 space-y-4">
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <Check aria-hidden className="size-3" strokeWidth={2} />
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          <Link
            href={SERVICES_HREF}
            className="group mt-9 inline-flex items-center gap-3 border-b border-ink/30 pb-2 text-[0.68rem] font-semibold tracking-[0.18em] text-ink uppercase transition-colors hover:border-gold hover:text-gold"
          >
            Discover our services
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
