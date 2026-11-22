import type { ComponentProps } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        className={cn(
          "h-11 w-full appearance-none rounded-sm border border-line bg-surface px-4 pr-10 text-sm text-ink transition-colors outline-none",
          "focus:border-gold focus:ring-2 focus:ring-gold/20",
          "disabled:cursor-not-allowed disabled:opacity-60",
          "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/15",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink-muted"
      />
    </div>
  );
}

export { Select };
