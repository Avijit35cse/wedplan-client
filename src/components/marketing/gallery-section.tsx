import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/section-heading";
import { homeImages } from "@/lib/images";
import { SERVICES_HREF } from "@/lib/navigation";

export default function GallerySection() {
  const [ceremony, details, vows, table, celebration] = homeImages.gallery;

  return (
    <section id="gallery" className="section-y bg-background">
      <div className="container-wedding">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="The gallery"
            title={
              <>
                Moments worth{" "}
                <span className="script-accent">remembering</span>.
              </>
            }
            description="A look at the celebrations our vendors help bring to life — the quiet details, the shared glances and the joy in between."
          />

          <Link
            href={SERVICES_HREF}
            className="group inline-flex shrink-0 items-center gap-3 border-b border-ink/30 pb-2 text-[0.68rem] font-semibold tracking-[0.18em] text-ink uppercase transition-colors hover:border-gold hover:text-gold"
          >
            Find your vendors
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          <figure className="group relative col-span-2 aspect-4/3 overflow-hidden bg-cream">
            <Image
              src={ceremony.src}
              alt={ceremony.label}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-5 text-[0.6rem] font-semibold tracking-[0.2em] text-ivory uppercase">
              {ceremony.label}
            </figcaption>
          </figure>

          <figure className="group relative aspect-3/4 overflow-hidden bg-cream">
            <Image
              src={details.src}
              alt={details.label}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4 text-[0.58rem] font-semibold tracking-[0.2em] text-ivory uppercase">
              {details.label}
            </figcaption>
          </figure>

          <figure className="group relative aspect-3/4 overflow-hidden bg-cream">
            <Image
              src={vows.src}
              alt={vows.label}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4 text-[0.58rem] font-semibold tracking-[0.2em] text-ivory uppercase">
              {vows.label}
            </figcaption>
          </figure>

          <figure className="group relative aspect-3/4 overflow-hidden bg-cream">
            <Image
              src={table.src}
              alt={table.label}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4 text-[0.58rem] font-semibold tracking-[0.2em] text-ivory uppercase">
              {table.label}
            </figcaption>
          </figure>

          <figure className="group relative col-span-2 aspect-4/3 overflow-hidden bg-cream md:aspect-auto">
            <Image
              src={celebration.src}
              alt={celebration.label}
              fill
              sizes="(min-width: 768px) 25vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-5 text-[0.6rem] font-semibold tracking-[0.2em] text-ivory uppercase">
              {celebration.label}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
