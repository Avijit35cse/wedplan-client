import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeImages } from "@/lib/images";
import { SERVICES_HREF } from "@/lib/navigation";

export default function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-ivory">
      <Image
        src={homeImages.cta}
        alt="A couple walking together after their wedding ceremony"
        fill
        sizes="100vw"
        className="object-cover object-center opacity-60"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/35"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-4 hidden border border-ivory/15 md:block"
      />

      <div className="container-wedding relative z-10 py-20 md:py-28">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-gold" />
            <p className="eyebrow text-champagne">Begin your planning</p>
          </div>

          <h2 className="display-title mt-5 text-[2.3rem] leading-[1.04] text-balance sm:text-5xl md:text-[3.4rem]">
            The day you have been imagining starts with one{" "}
            <span className="script-accent text-champagne">simple</span> step.
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-ivory/70 md:text-base">
            Create your free account, browse the vendors who feel right, and
            send your first booking request today.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/sign-up"
              className="group inline-flex h-12 items-center gap-3 bg-champagne px-7 text-[0.68rem] font-semibold tracking-[0.18em] text-ink uppercase transition-colors hover:bg-ivory"
            >
              Create your account
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href={SERVICES_HREF}
              className="inline-flex h-12 items-center border border-ivory/40 px-7 text-[0.68rem] font-semibold tracking-[0.18em] text-ivory uppercase transition-colors hover:bg-ivory hover:text-ink"
            >
              Browse services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
