import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/shared/section-heading";
import { SERVICES_HREF } from "@/lib/navigation";
import { serviceCategories } from "@/lib/site-content";

export default function CategoryGrid() {
  return (
    <section id="services" className="section-y bg-cream/40">
      <div className="container-wedding">
        <SectionHeading
          align="center"
          eyebrow="Our services"
          title={
            <>
              Every detail, in one{" "}
              <span className="script-accent">place</span>.
            </>
          }
          description="From the first photograph to the final toast, explore the vendors who make the day feel like yours."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((category, index) => (
            <Link
              key={category.name}
              href={`${SERVICES_HREF}?category=${encodeURIComponent(category.name)}`}
              className="group relative block overflow-hidden bg-ink"
            >
              <div className="relative aspect-4/5">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[0.58rem] font-semibold tracking-[0.24em] text-champagne/80 uppercase">
                  0{index + 1}
                </p>
                <h3 className="mt-2 font-display text-2xl text-ivory">
                  {category.label}
                </h3>
                <p className="mt-2 max-w-xs text-xs leading-relaxed text-ivory/65">
                  {category.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-[0.6rem] font-semibold tracking-[0.18em] text-ivory/90 uppercase">
                  Explore
                  <ArrowUpRight
                    aria-hidden
                    className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
