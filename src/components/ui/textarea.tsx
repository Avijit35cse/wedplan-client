import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-sm border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-ink transition-colors outline-none",
        "placeholder:text-ink-muted/60",
        "focus:border-gold focus:ring-2 focus:ring-gold/20",
        "disabled:cursor-not-allowed disabled:opacity-60",
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/15",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
