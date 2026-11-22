
import Link from "next/link";
import {
  Check,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export default function SubscriptionSuccessPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <section className="w-full max-w-2xl overflow-hidden rounded-3xl border border-line bg-white text-center shadow-sm">
        <div className="bg-ink px-6 py-12 text-white sm:px-12">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full border border-green-300/30 bg-green-500/15 text-green-300">
            <Check size={38} strokeWidth={2.5} />
          </div>

          <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
            <Sparkles size={14} />
            WedPlan Premium
          </span>

          <h1 className="mt-4 font-serif text-4xl sm:text-5xl">
            Payment Successful!
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/70">
            Thank you for upgrading to WedPlan Premium. Your subscription
            is being activated.
          </p>
        </div>

        <div className="px-6 py-9 sm:px-12 sm:py-10">
          <div className="mx-auto flex max-w-md items-center justify-center gap-3 rounded-xl bg-ivory p-4 text-left">
            <ShieldCheck className="shrink-0 text-gold" size={25} />
            <p className="text-sm leading-6 text-ink-muted">
              Your payment has been completed. You can return to your
              vendor dashboard to continue managing your services.
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
