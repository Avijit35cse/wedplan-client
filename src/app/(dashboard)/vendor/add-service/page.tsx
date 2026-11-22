
import Link from "next/link";
import { requireRole } from "@/lib/require-role";
import AddServiceForm from "./add-service-form";
import { ArrowLeft, Plus, ShieldCheck } from "lucide-react";

export const instant = false;

export default async function AddServicePage() {
  await requireRole(["vendor"]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Link
        href="/vendor/my-services"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-ink-muted transition hover:text-rose"
      >
        <ArrowLeft size={16} />
        Back to My Services
      </Link>

      <section className="mb-9 overflow-hidden rounded-3xl bg-ink px-6 py-9 text-white sm:px-10 sm:py-12">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
              <Plus size={15} />
              Grow your business
            </span>

            <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
              Add a Wedding Service
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
              Showcase your expertise and connect with couples planning their
              special day. Share your service details to get started.
            </p>
          </div>

          <div className="flex size-20 shrink-0 items-center justify-center self-start rounded-2xl border border-white/15 bg-white/10 text-champagne md:size-24">
            <Plus size={38} strokeWidth={1.3} />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-line bg-cream/60 p-4">
          <ShieldCheck className="mt-0.5 shrink-0 text-gold" size={21} />
          <div>
            <h2 className="text-sm font-semibold text-ink">
              Admin approval required
            </h2>
            <p className="mt-1 text-xs leading-5 text-ink-muted sm:text-sm">
              Your submitted service will be reviewed by an administrator
              before it becomes publicly available.
            </p>
          </div>
        </div>

        <AddServiceForm />
      </div>
    </main>
  );
}
