import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES_HREF } from "@/lib/navigation";
import { planningSteps } from "@/lib/site-content";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative isolate overflow-hidden bg-ink text-ivory">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,#f4ede3_1px,transparent_0)] [background-size:26px_26px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 size-96 rounded-full border border-ivory/10"
      />

      <div className="container-wedding relative z-10 section-y">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-gold/70" />
              <span className="eyebrow text-champagne">How it works</span>
            </div>

            <h2 className="display-title mt-4 text-[2.1rem] leading-[1.08] text-balance sm:text-4xl md:text-[2.9rem]">
              Three quiet steps between{" "}
              <span className="script-accent text-champagne">yes</span> and the
              day itself.
            </h2>

            <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-ivory/65">
              WedPlan keeps the searching, the requests and the confirmations in
              one place, so the planning feels as calm as the celebration.
            </p>

            <Link
              href={SERVICES_HREF}
              className="group mt-9 inline-flex h-12 items-center gap-3 bg-champagne px-7 text-[0.68rem] font-semibold tracking-[0.18em] text-ink uppercase transition-colors hover:bg-ivory"
            >
              Start browsing
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <ol className="space-y-8 lg:space-y-10">
            {planningSteps.map((step, index) => (
              <li
                key={step.title}
                className="flex gap-5 border-b border-ivory/15 pb-8 last:border-none last:pb-0 sm:gap-7"
              >
                <span
                  aria-hidden
                  className="font-display text-4xl leading-none text-gold/70 sm:text-5xl"
                >
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-display text-2xl text-ivory">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-ivory/60">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
