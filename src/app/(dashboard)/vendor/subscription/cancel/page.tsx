import Link from "next/link";
import {
  X,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export default function SubscriptionCancelPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <section className="w-full max-w-2xl overflow-hidden rounded-3xl border border-line bg-white text-center shadow-sm">
        <div className="bg-ink px-6 py-12 text-white sm:px-12">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full border border-rose-300/30 bg-rose-500/15 text-rose-300">
            <X size={38} strokeWidth={2.5} />
          </div>

          <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
            <Sparkles size={14} />
            WedPlan Premium
          </span>

          <h1 className="mt-4 font-serif text-4xl sm:text-5xl">
            Payment Cancelled
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/70">
            Your checkout was cancelled. No payment has been completed.
            You can continue using your current plan or upgrade whenever
            you are ready.
          </p>
        </div>

        <div className="px-6 py-9 sm:px-12 sm:py-10">
          <div className="mx-auto flex max-w-md items-center justify-center gap-3 rounded-xl bg-ivory p-4 text-left">
            <ShieldCheck className="shrink-0 text-gold" size={25} />
            <p className="text-sm leading-6 text-ink-muted">
              Your account has not been upgraded. You can return to
              your vendor dashboard and continue managing your services.
            </p>
          </div>

          <Link
            href="/vendor/dashboard"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-wine px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-ink"
          >
            Back to Dashboard
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}