import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Crumb = {
  label: string;
  href?: string;
};

export default function PageBanner({
  eyebrow,
  title,
  description,
  image,
  breadcrumbs,
  children,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  image?: string;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-ink text-ivory",
        className
      )}
    >
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
      ) : null}

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/55 to-ink/90"
      />

      <div className="container-wedding relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
        {breadcrumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-[0.65rem] font-semibold tracking-[0.18em] text-ivory/60 uppercase">
              {breadcrumbs.map((crumb, index) => (
                <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-ivory"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-ivory/90">{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 ? (
                    <ChevronRight aria-hidden className="size-3 text-ivory/40" />
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        {eyebrow ? <p className="eyebrow text-champagne">{eyebrow}</p> : null}

        <h1 className="display-title mt-4 max-w-3xl text-4xl text-balance sm:text-5xl md:text-6xl">
          {title}
        </h1>

        {description ? (
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ivory/75 md:text-base">
            {description}
          </p>
        ) : null}

        {children}
      </div>
    </section>
  );
}
