
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  X,
  CalendarDays,
} from "lucide-react";
import UserStatusButton from "./user-status-button";

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

type UserFiltersProps = {
  users: User[];
};

function formatDate(date?: string) {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "Date unavailable";

  return parsedDate.toLocaleDateString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function UserFilters({ users }: UserFiltersProps) {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        user.name?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query);

      const matchesRole = role === "all" || user.role === role;

      const matchesStatus =
        status === "all" ||
        (status === "blocked" && user.isBlocked === true) ||
        (status === "active" && user.isBlocked !== true);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, role, status]);

  const hasFilters = search !== "" || role !== "all" || status !== "all";

  const clearFilters = () => {
    setSearch("");
    setRole("all");
    setStatus("all");
  };

  return (
    <>
      <div className="mb-5 rounded-2xl border border-line bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink">
          <SlidersHorizontal size={17} className="text-gold" />
          Search & Filter Users
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr_auto]">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or email..."
              className="h-12 w-full rounded-xl border border-line bg-ivory pl-11 pr-4 text-sm text-ink outline-none transition placeholder:text-ink-muted focus:border-gold focus:ring-2 focus:ring-gold/15"
            />
          </div>

          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className="h-12 w-full rounded-xl border border-line bg-ivory px-4 text-sm text-ink outline-none focus:border-gold"
            aria-label="Filter by role"
          >
            <option value="all">All Roles</option>
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
            <option value="admin">Admin</option>
          </select>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-12 w-full rounded-xl border border-line bg-ivory px-4 text-sm text-ink outline-none focus:border-gold"
            aria-label="Filter by account status"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>

          <button
            type="button"
            onClick={clearFilters}
            disabled={!hasFilters}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-line px-4 text-sm font-semibold text-ink-muted transition hover:bg-cream disabled:cursor-not-allowed disabled:opacity-40"
          >
            <X size={16} />
            Clear
          </button>
        </div>

        <p className="mt-4 border-t border-line pt-4 text-xs text-ink-muted">
          Showing{" "}
          <span className="font-semibold text-ink">
            {filteredUsers.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-ink">{users.length}</span>{" "}
          users
        </p>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-champagne bg-white px-6 py-12 text-center">
          <Search size={28} className="mx-auto text-gold" />
          <h3 className="mt-4 font-serif text-xl text-ink">
            No matching users
          </h3>
          <p className="mt-2 text-sm text-ink-muted">
            Try changing your search term or filters.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="border-b border-line bg-ivory">
                <tr className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  <th className="px-5 py-4">User</th>
                  <th className="px-5 py-4">Role</th>
                  <th className="px-5 py-4">Membership</th>
                  <th className="px-5 py-4">Joined</th>
                  <th className="px-5 py-4">Account Status</th>
                  <th className="px-5 py-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-line">
                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="transition hover:bg-ivory/60"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-cream text-sm font-semibold text-wine">
                          {user.image ? (
                            <Image
                              src={user.image}
                              alt={user.name || "User"}
                              fill
                              sizes="44px"
                              unoptimized
                              className="object-cover"
                            />
                          ) : (
                            user.name?.charAt(0).toUpperCase() || "U"
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="font-semibold text-ink">
                            {user.name || "Unnamed User"}
                          </p>
                          <p className="mt-1 text-xs text-ink-muted">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-cream px-3 py-1.5 text-xs font-semibold capitalize text-ink">
                        {user.role}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      {user.role === "vendor" && user.isPremium ? (
                        <span className="text-xs font-semibold text-amber-700">
                          Premium
                        </span>
                      ) : (
                        <span className="text-xs text-ink-muted">
                          {user.role === "vendor" ? "Free" : "Standard"}
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-2 text-xs text-ink-muted">
                        <CalendarDays size={14} />
                        {formatDate(user.createdAt)}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
                          user.isBlocked
                            ? "bg-red-50 text-red-700"
                            : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <UserStatusButton
                        userId={user._id}
                        isBlocked={user.isBlocked === true}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
