import { cn } from "@/lib/utils";

export default function Ornament({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("flex items-center justify-center gap-3 text-gold", className)}
    >
      <span className="h-px w-10 bg-gold/50" />
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path
          d="M5 0L6.1 3.9L10 5L6.1 6.1L5 10L3.9 6.1L0 5L3.9 3.9L5 0Z"
          fill="currentColor"
        />
      </svg>
      <span className="h-px w-10 bg-gold/50" />
    </div>
  );
}
