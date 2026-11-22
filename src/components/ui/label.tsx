import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "mb-2 block text-[0.68rem] font-semibold tracking-[0.16em] text-ink-muted uppercase",
        className
      )}
      {...props}
    />
  );
}

export { Label };
