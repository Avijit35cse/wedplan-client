
"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  CalendarDays,
  BriefcaseBusiness,
  PlusCircle,
  ClipboardList,
  ShieldCheck,
  Users,
  CreditCard,
  Search,
  Home,
} from "lucide-react";

import Wordmark from "@/components/layout/wordmark";
import LogoutButton from "@/components/auth/logout-button";
import { navForRole, type NavUser } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const icons: Record<string, typeof LayoutDashboard> = {
  "/customer/dashboard": LayoutDashboard,
  "/customer/services": Search,
  "/customer/my-bookings": CalendarDays,
  "/vendor/dashboard": LayoutDashboard,
  "/vendor/my-services": BriefcaseBusiness,
  "/vendor/add-service": PlusCircle,
  "/vendor/booking-requests": ClipboardList,
  "/admin/dashboard": LayoutDashboard,
  "/admin/services": ShieldCheck,
  "/admin/users": Users,
  "/admin/transactions": CreditCard,
};

function UserAvatar({ user }: { user: NavUser }) {
  const initials =
    user.name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "U";

  return (
    <div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-champagne bg-cream text-sm font-semibold text-ink">
      {user.image ? (
        <Image
          src={user.image}
          alt={`${user.name}'s profile`}
          fill
          sizes="40px"
          unoptimized
          className="object-cover"
        />
      ) : (
        initials
      )}
    </div>
  );
}

function UserIdentity({ user }: { user: NavUser }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <UserAvatar user={user} />
      <div className="min-w-0 leading-tight">
        <p className="max-w-40 truncate text-sm font-medium text-ink">
          {user.name}
        </p>
        <p className="mt-1 text-[0.6rem] font-semibold tracking-[0.18em] text-gold uppercase">
          {user.role}
        </p>
      </div>
    </div>
  );
}

export default function DashboardShell({
  user,
  children,
}: {
  user: NavUser | null;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = navForRole(user?.role);

  useEffect(() => {
    if (!open) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-line bg-ivory/95 px-5 backdrop-blur-md lg:px-8">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open dashboard menu"
            aria-expanded={open}
            className="inline-flex size-10 items-center justify-center border border-line text-ink lg:hidden"
          >
            <Menu className="size-5" />
          </button>

          <Link href="/" aria-label="WedPlan home">
            <Wordmark compact />
          </Link>

          <span className="hidden border-l border-line pl-4 text-[0.65rem] font-semibold tracking-[0.2em] text-ink-muted uppercase sm:inline">
            {user?.role ?? "Dashboard"} Portal
          </span>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="hidden sm:block">
                <UserIdentity user={user} />
              </div>
              <div className="sm:hidden">
                <UserAvatar user={user} />
              </div>
            </>
          ) : null}
          <LogoutButton />
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-5rem)]">
        <aside className="sticky top-20 hidden h-[calc(100vh-5rem)] w-64 shrink-0 flex-col border-r border-line bg-ivory px-5 py-8 lg:flex">
          <div className="mb-7 px-3">
            <p className="text-[0.62rem] font-semibold tracking-[0.2em] text-gold uppercase">
              Workspace
            </p>
            <p className="mt-2 font-display text-2xl capitalize text-ink">
              {user?.role ?? "Account"}
            </p>
          </div>

          <nav
            aria-label="Dashboard sidebar"
            className="flex flex-1 flex-col gap-1"
          >
            {links.map((item) => {
              const Icon = icons[item.href] ?? LayoutDashboard;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center gap-3 px-3 text-sm transition-colors",
                    active
                      ? "bg-cream font-semibold text-ink"
                      : "text-ink-muted hover:bg-cream/70 hover:text-ink"
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/"
            className="mt-6 flex items-center gap-3 border-t border-line px-3 pt-5 text-xs font-semibold tracking-[0.12em] text-ink-muted uppercase transition-colors hover:text-ink"
          >
            <Home className="size-4" />
            Back to website
          </Link>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Close dashboard menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ink/40"
          />

          <aside className="absolute inset-y-0 left-0 flex w-[min(20rem,85vw)] flex-col overflow-y-auto border-r border-line bg-ivory px-5 py-8 shadow-xl">
            <div className="mb-8 flex items-center justify-between">
              <Wordmark compact />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close dashboard menu"
                className="inline-flex size-10 items-center justify-center border border-line text-ink"
              >
                <X className="size-5" />
              </button>
            </div>

            {user ? (
              <div className="mb-7 border-b border-line px-3 pb-6">
                <UserIdentity user={user} />
              </div>
            ) : null}

            <p className="mb-4 px-3 text-[0.62rem] font-semibold tracking-[0.2em] text-gold uppercase">
              {user?.role ?? "Account"} Workspace
            </p>

            <nav
              aria-label="Mobile dashboard sidebar"
              className="flex flex-1 flex-col gap-1"
            >
              {links.map((item) => {
                const Icon = icons[item.href] ?? LayoutDashboard;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-12 items-center gap-3 px-3 text-sm transition-colors",
                      active
                        ? "bg-cream font-semibold text-ink"
                        : "text-ink-muted hover:bg-cream/70 hover:text-ink"
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="mt-6 flex items-center gap-3 border-t border-line px-3 pt-5 text-xs font-semibold tracking-[0.12em] text-ink-muted uppercase"
            >
              <Home className="size-4" />
              Back to website
            </Link>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
