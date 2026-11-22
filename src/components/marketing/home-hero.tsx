import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Send, ShieldCheck, Sparkles } from "lucide-react";
import { homeImages } from "@/lib/images";
import { SERVICES_HREF } from "@/lib/navigation";

const valueProps = [
  {
    icon: Sparkles,
    title: "Curated categories",
    text: "Six wedding service categories, thoughtfully organised.",
  },
  {
    icon: ShieldCheck,
    title: "Admin-approved",
    text: "Every listing is reviewed before it goes live.",
  },
  {
    icon: Send,
    title: "Direct requests",
    text: "Send your booking details straight to the vendor.",
  },
];

export default function HomeHero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-ivory">
      <Image
        src={homeImages.hero}
        alt="A newlywed couple embracing at their wedding"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-4 hidden border border-ivory/15 md:block"
      />

      <div className="container-wedding relative z-10 w-full pt-36 pb-14 md:pb-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-px w-10 bg-gold" />
            <p className="eyebrow text-champagne">
              Wedding planning, thoughtfully curated
            </p>
          </div>

          <h1 className="display-title mt-6 text-[2.85rem] leading-[1.02] text-balance sm:text-6xl lg:text-[4.6rem]">
            Every love story deserves a{" "}
            <span className="script-accent text-champagne">beautiful</span>{" "}
            beginning.
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-ivory/75 md:text-base">
            Discover trusted venues, photographers, florists and planners —
            then book them in one beautifully organised place.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href={SERVICES_HREF}
              className="group inline-flex h-12 items-center gap-3 bg-champagne px-7 text-[0.68rem] font-semibold tracking-[0.18em] text-ink uppercase transition-colors hover:bg-ivory"
            >
              Browse services
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="#how-it-works"
              className="inline-flex h-12 items-center border border-ivory/40 px-7 text-[0.68rem] font-semibold tracking-[0.18em] text-ivory uppercase transition-colors hover:bg-ivory hover:text-ink"
            >
              How it works
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-6 border-t border-ivory/20 pt-7 sm:grid-cols-3">
          {valueProps.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3">
              <Icon
                aria-hidden
                className="mt-0.5 size-4 shrink-0 text-gold"
                strokeWidth={1.5}
              />
              <div>
                <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-ivory uppercase">
                  {title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-ivory/55">
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="absolute right-8 bottom-8 hidden flex-col items-center gap-3 lg:flex"
      >
        <span className="text-[0.52rem] tracking-[0.3em] text-ivory/50 uppercase [writing-mode:vertical-rl]">
          Scroll to explore
        </span>
        <span className="h-12 w-px bg-ivory/30" />
      </div>
    </section>
  );
}
