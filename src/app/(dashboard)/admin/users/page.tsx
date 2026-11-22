
import { requireRole } from "@/lib/require-role";
import { backendFetch } from "@/lib/backend-api";
import UserFilters from "./user-filters";
import {
  Users,
  UserRound,
  Store,
  ShieldCheck,
  Ban,
  AlertCircle,
} from "lucide-react";

export const instant = false;

type User = {
  _id: string;
  name: string;
  email: string;
  role: "customer" | "vendor" | "admin";
  image?: string | null;
  isPremium?: boolean;
  isBlocked?: boolean;
  createdAt?: string;
};

type UsersResponse = {
  success: boolean;
  total: number;
  users: User[];
};

export default async function AdminUsersPage() {
  await requireRole(["admin"]);

  let users: User[] = [];
  let error = "";

  try {
    const data = await backendFetch<UsersResponse>("/api/admin/users");
    users = data.users;
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Failed to load users";
  }

  const customers = users.filter((user) => user.role === "customer").length;
  const vendors = users.filter((user) => user.role === "vendor").length;
  const blockedUsers = users.filter((user) => user.isBlocked === true).length;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <section className="mb-9 overflow-hidden rounded-3xl bg-ink px-6 py-9 text-white sm:px-10 sm:py-12">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-champagne">
              <ShieldCheck size={15} />
              Platform administration
            </span>

            <h1 className="font-serif text-4xl leading-tight sm:text-5xl">
              Manage Users
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
              Manage customer and vendor accounts, review membership
              information and maintain a safe WedPlan community.
            </p>
          </div>

          <div className="flex size-20 shrink-0 items-center justify-center self-start rounded-2xl border border-white/15 bg-white/10 text-champagne md:size-24">
            <Users size={38} strokeWidth={1.3} />
          </div>
        </div>
      </section>

      {!error && (
        <section className="mb-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total Users",
              value: users.length,
              icon: Users,
              color: "bg-rose/10 text-wine",
            },
            {
              label: "Customers",
              value: customers,
              icon: UserRound,
              color: "bg-blue-50 text-blue-700",
            },
            {
              label: "Vendors",
              value: vendors,
              icon: Store,
              color: "bg-amber-50 text-amber-700",
            },
            {
              label: "Blocked Users",
              value: blockedUsers,
              icon: Ban,
              color: "bg-red-50 text-red-700",
            },
          ].map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className="rounded-2xl border border-line bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-ink-muted">{stat.label}</p>
                  <span
                    className={`flex size-11 items-center justify-center rounded-xl ${stat.color}`}
                  >
                    <Icon size={20} />
                  </span>
                </div>

                <p className="mt-4 font-serif text-3xl text-ink">
                  {stat.value.toLocaleString("en-BD")}
                </p>
              </article>
            );
          })}
        </section>
      )}

      <section>
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              Admin workspace
            </p>
            <h2 className="mt-2 font-serif text-3xl text-ink">
              All Platform Users
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              View account information and manage user access.
            </p>
          </div>

          {!error && (
            <span className="w-fit rounded-full border border-champagne bg-white px-4 py-2 text-sm font-semibold text-ink">
              {users.length} Registered Users
            </span>
          )}
        </div>

        {error && (
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {!error && users.length === 0 && (
          <div className="rounded-3xl border border-dashed border-champagne bg-white px-6 py-16 text-center">
            <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-cream text-gold">
              <Users size={29} />
            </span>

            <h3 className="mt-5 font-serif text-2xl text-ink">
              No users found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-muted">
              Registered platform users will appear here.
            </p>
          </div>
        )}

        {!error && users.length > 0 && <UserFilters users={users} />}
      </section>
    </main>
  );
}
