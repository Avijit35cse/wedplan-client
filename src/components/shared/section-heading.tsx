import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
  descriptionClassName,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className
      )}
    >
      {eyebrow ? (
        <div
          className={cn(
            "flex items-center gap-3",
            align === "center" && "justify-center"
          )}
        >
          <span aria-hidden className="h-px w-8 bg-gold/70" />
          <span className="eyebrow">{eyebrow}</span>
          {align === "center" ? (
            <span aria-hidden className="h-px w-8 bg-gold/70" />
          ) : null}
        </div>
      ) : null}

      <h2
        className={cn(
          "display-title mt-4 text-[2.1rem] leading-[1.08] text-ink sm:text-4xl md:text-[2.9rem]",
          titleClassName
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "mt-5 text-[0.95rem] leading-relaxed text-ink-muted",
            descriptionClassName
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
