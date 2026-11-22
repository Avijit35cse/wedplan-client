import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.62rem] font-semibold tracking-[0.16em] uppercase",
  {
    variants: {
      tone: {
        default: "border-ink/15 bg-ink text-ivory",
        gold: "border-gold/40 bg-gold/10 text-[#8a6f3f]",
        rose: "border-rose/40 bg-rose/10 text-rose-deep",
        sage: "border-sage/40 bg-sage/10 text-sage",
        muted: "border-line bg-cream text-ink-muted",
        outline: "border-line bg-transparent text-ink-muted",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  }
);

function Badge({
  className,
  tone,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ tone }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
