import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center border border-dashed border-sand/80 bg-cream/40 px-6 py-16 text-center",
        className
      )}
    >
      {Icon ? (
        <span className="mb-5 flex size-14 items-center justify-center rounded-full border border-line bg-surface text-gold">
          <Icon aria-hidden className="size-6" strokeWidth={1.25} />
        </span>
      ) : null}

      <h3 className="font-display text-2xl text-ink">{title}</h3>

      {description ? (
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
          {description}
        </p>
      ) : null}

      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
