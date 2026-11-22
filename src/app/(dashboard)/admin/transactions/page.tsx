
import { requireRole } from "@/lib/require-role";
import { backendFetch } from "@/lib/backend-api";
import {
  CreditCard,
  Receipt,
  CalendarDays,
  Mail,
  AlertCircle,
  ShieldCheck,
  Wallet,
  ArrowUpRight,
} from "lucide-react";

export const instant = false;

type Transaction = {
  _id: string;
  userId: string;
  vendorEmail: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  stripeSessionId: string;
  stripeSubscriptionId: string;
  createdAt: string;
};

type TransactionsResponse = {
  success: boolean;
  message: string;
  transactions: Transaction[];
};

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatAmount(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
  }).format(amount);
}

export default async function AdminTransactionsPage() {
  await requireRole(["admin"]);

  let transactions: Transaction[] = [];
  let error = "";

  try {
    const data = await backendFetch<TransactionsResponse>(
      "/api/admin/transactions"
    );

    transactions = data.transactions;
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Failed to load transactions";
  }


  const paidCount = transactions.filter(
    (transaction) => transaction.status === "paid"
  ).length;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="mb-9 overflow-hidden rounded-3xl bg-ink px-6 py-9 text-white sm:px-10 sm:py-12">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
              <ShieldCheck size={15} />
              Financial overview
            </span>

            <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
              Transactions
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
              Monitor vendor subscription payments and review the
              transaction history recorded through Stripe.
            </p>
          </div>

          <div className="flex size-20 shrink-0 items-center justify-center self-start rounded-2xl border border-white/15 bg-white/10 text-champagne md:size-24">
            <CreditCard size={38} strokeWidth={1.3} />
          </div>
        </div>
      </section>

      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          <AlertCircle size={20} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {!error && (
        <>
          <section className="mb-8 grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-ink-muted">
                  Total Transactions
                </p>
                <span className="flex size-10 items-center justify-center rounded-xl bg-cream text-gold">
                  <Receipt size={19} />
                </span>
              </div>

              <p className="mt-5 font-serif text-4xl text-ink">
                {transactions.length.toLocaleString("en-BD")}
              </p>

              <p className="mt-2 text-xs text-ink-muted">
                Recorded payment transactions
              </p>
            </article>

            <article className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-ink-muted">
                  Successful Payments
                </p>
                <span className="flex size-10 items-center justify-center rounded-xl bg-rose/10 text-wine">
                  <Wallet size={19} />
                </span>
              </div>

              <p className="mt-5 font-serif text-4xl text-ink">
                {paidCount.toLocaleString("en-BD")}
              </p>

              <p className="mt-2 text-xs text-ink-muted">
                Transactions recorded as paid
              </p>
            </article>
          </section>

          <section className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-3 border-b border-line p-5 sm:flex-row sm:items-center sm:p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  Admin workspace
                </p>

                <h2 className="mt-2 font-serif text-2xl text-ink">
                  Payment History
                </h2>

                <p className="mt-1 text-sm text-ink-muted">
                  Stripe subscription transaction records.
                </p>
              </div>

              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-ivory px-4 py-2 text-sm font-semibold text-ink-muted">
                <Receipt size={16} />
                {transactions.length} Records
              </span>
            </div>

            {transactions.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-cream text-gold">
                  <CreditCard size={29} />
                </span>

                <h3 className="mt-5 font-serif text-2xl text-ink">
                  No transactions yet
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-muted">
                  Transaction records will appear here after vendors
                  complete their Premium subscription payments.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-line">
                {transactions.map((transaction) => (
                  <article
                    key={transaction._id}
                    className="p-5 transition hover:bg-ivory/50 sm:p-6"
                  >
                    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cream text-gold">
                            <CreditCard size={19} />
                          </span>

                          <div className="min-w-0">
                            <p className="break-all text-sm font-semibold text-ink">
                              {transaction.vendorEmail || "Email unavailable"}
                            </p>

                            <p className="mt-1 text-xs text-ink-muted">
                              Vendor ID: {transaction.userId}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-muted">
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDays size={14} />
                            {formatDate(transaction.createdAt)}
                          </span>

                          <span className="inline-flex items-center gap-1.5">
                            <Mail size={14} />
                            {transaction.paymentMethod || "Payment method unavailable"}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4 sm:flex-nowrap lg:border-0 lg:pt-0">
                        <div>
                          <p className="text-xs text-ink-muted">
                            Transaction Amount
                          </p>

                          <p className="mt-1 font-serif text-2xl text-ink">
                            {formatAmount(
                              transaction.amount,
                              transaction.currency
                            )}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
                              transaction.status === "paid"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {transaction.status}
                          </span>

                          <ArrowUpRight
                            size={17}
                            className="text-ink-muted"
                          />
                        </div>
                      </div>
                    </div>

                    <details className="mt-4">
                      <summary className="w-fit cursor-pointer text-xs font-semibold text-wine transition hover:text-ink">
                        View transaction references
                      </summary>

                      <div className="mt-3 grid gap-3 rounded-xl bg-ivory/70 p-4 text-xs sm:grid-cols-2">
                        <div className="min-w-0">
                          <p className="text-ink-muted">Stripe Session ID</p>
                          <p className="mt-1 break-all font-medium text-ink">
                            {transaction.stripeSessionId || "Not available"}
                          </p>
                        </div>

                        <div className="min-w-0">
                          <p className="text-ink-muted">Stripe Subscription ID</p>
                          <p className="mt-1 break-all font-medium text-ink">
                            {transaction.stripeSubscriptionId || "Not available"}
                          </p>
                        </div>
                      </div>
                    </details>
                  </article>
                ))}
              </div>
            )}
          </section>

          <p className="mt-4 text-xs leading-5 text-ink-muted">
            Payment records are displayed from the server database.
            Administrators cannot manually change payment status from this page.
          </p>
        </>
      )}
    </main>
  );
}


