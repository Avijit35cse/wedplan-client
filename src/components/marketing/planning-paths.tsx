import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import SectionHeading from "@/components/shared/section-heading";
import { SERVICES_HREF } from "@/lib/navigation";
import { planningPaths } from "@/lib/site-content";
import { cn } from "@/lib/utils";

export default function PlanningPaths() {
  return (
    <section className="section-y bg-cream/40">
      <div className="container-wedding">
        <SectionHeading
          align="center"
          eyebrow="Ways to begin"
          title={
            <>
              Start with the part that matters{" "}
              <span className="script-accent">most</span>.
            </>
          }
          description="Every celebration comes together differently. Choose a starting point and WedPlan will guide you through the services that fit."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {planningPaths.map((path) => (
            <article
              key={path.name}
              className={cn(
                "flex flex-col border p-7 transition-colors",
                path.featured
                  ? "border-gold/50 bg-surface"
                  : "border-line bg-surface/60 hover:border-sand"
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-[0.58rem] font-semibold tracking-[0.24em] text-gold uppercase">
                  {path.featured ? "A considered starting point" : "Planning path"}
                </p>
                {path.featured ? (
                  <span aria-hidden className="h-px w-8 bg-gold/60" />
                ) : null}
              </div>

              <h3 className="mt-5 font-display text-3xl leading-tight text-ink">
                {path.name}
              </h3>
              <p className="mt-2 font-display text-lg italic text-rose-deep">
                {path.tagline}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                {path.description}
              </p>

              <ul className="mt-6 space-y-3 border-t border-line/70 pt-6">
                {path.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                      <Check aria-hidden className="size-3" strokeWidth={2} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href={SERVICES_HREF}
                className="group mt-8 inline-flex items-center gap-2 text-[0.62rem] font-semibold tracking-[0.18em] text-ink uppercase transition-colors hover:text-gold"
              >
                Explore this path
                <ArrowRight
                  aria-hidden
                  className="size-3.5 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-xs leading-relaxed text-ink-muted">
          No packages to buy and no prices to compare — just the services you
          choose, at the prices each vendor lists.
        </p>
      </div>
    </section>
  );
}
