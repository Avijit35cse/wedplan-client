import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StatTone = "default" | "gold" | "rose" | "sage";

const toneClasses: Record<StatTone, string> = {
  default: "bg-surface",
  gold: "bg-gold/10",
  rose: "bg-rose/10",
  sage: "bg-sage/10",
};

export default function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "default",
  className,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: LucideIcon;
  tone?: StatTone;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-sm border border-line p-6",
        toneClasses[tone],
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[0.62rem] font-semibold tracking-[0.2em] text-ink-muted uppercase">
            {label}
          </p>
          <p className="mt-3 font-display text-4xl leading-none text-ink">
            {value}
          </p>
          {hint ? (
            <p className="mt-3 text-xs leading-relaxed text-ink-muted">
              {hint}
            </p>
          ) : null}
        </div>

        {Icon ? (
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line/80 text-gold">
            <Icon aria-hidden className="size-4" strokeWidth={1.5} />
          </span>
        ) : null}
      </div>
    </div>
  );
}
