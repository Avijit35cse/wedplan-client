import { cn } from "@/lib/utils";

export default function Wordmark({
  tone = "ink",
  compact = false,
  className,
}: {
  tone?: "ink" | "ivory";
  compact?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-display text-[1.55rem] tracking-[0.01em] xl:text-[1.7rem]",
          tone === "ivory" ? "text-ivory" : "text-ink"
        )}
      >
        Wed<span className="text-gold italic">Plan</span>
      </span>

      {!compact ? (
        <span
          className={cn(
            "mt-1.5 text-[0.52rem] font-semibold tracking-[0.42em] uppercase",
            tone === "ivory" ? "text-ivory/55" : "text-ink-muted/80"
          )}
        >
          Wedding Planning
        </span>
      ) : null}
    </span>
  );
}
