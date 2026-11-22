"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Wordmark from "@/components/layout/wordmark";
import LogoutButton from "@/components/auth/logout-button";
import { navForRole, type NavUser } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export default function DashboardHeader({ user }: { user: NavUser | null }) {
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
    <header className="sticky top-0 z-50 border-b border-line bg-ivory/95 backdrop-blur-md">
      <div className="container-wedding flex h-20 items-center justify-between gap-6">
        <div className="flex min-w-0 items-center gap-8">
          <Link href="/" aria-label="WedPlan home" className="shrink-0">
            <Wordmark compact />
          </Link>

          <nav aria-label="Dashboard" className="hidden items-center gap-7 lg:flex">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-active={isActive(item.href)}
                className={cn(
                  "link-underline text-[0.68rem] font-semibold tracking-[0.18em] uppercase transition-colors",
                  isActive(item.href)
                    ? "text-ink"
                    : "text-ink-muted hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          {user ? (
            <div className="text-right leading-tight">
              <p className="max-w-56 truncate text-sm text-ink">{user.name}</p>
              <p className="mt-1 text-[0.6rem] font-semibold tracking-[0.22em] text-gold uppercase">
                {user.role}
              </p>
            </div>
          ) : null}

          <LogoutButton />
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="dashboard-mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex size-11 items-center justify-center border border-line text-ink lg:hidden"
        >
          {open ? (
            <X aria-hidden className="size-5" />
          ) : (
            <Menu aria-hidden className="size-5" />
          )}
        </button>
      </div>

      {open ? (
        <div
          id="dashboard-mobile-nav"
          className="fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto border-t border-line bg-ivory px-5 pt-8 pb-10 lg:hidden"
        >
          {user ? (
            <p className="text-[0.62rem] font-semibold tracking-[0.2em] text-gold uppercase">
              {user.role} account
            </p>
          ) : null}

          <nav aria-label="Dashboard mobile" className="mt-4 flex flex-col">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                data-active={isActive(item.href)}
                className={cn(
                  "border-b border-line/70 py-4 font-display text-2xl",
                  isActive(item.href) ? "text-ink" : "text-ink-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="inline-flex h-12 items-center justify-center border border-ink px-6 text-[0.7rem] font-semibold tracking-[0.18em] text-ink uppercase"
            >
              Back to website
            </Link>
            <LogoutButton className="justify-center py-3" />
          </div>
        </div>
      ) : null}
    </header>
  );
}
