
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import Wordmark from "@/components/layout/wordmark";
import LogoutButton from "@/components/auth/logout-button";
import { publicNav, roleHome, type NavUser } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function SiteUserAvatar({ user }: { user: NavUser }) {
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

export default function SiteHeader({
  user = null,
  variant = "overlay",
}: {
  user?: NavUser | null;
  variant?: "overlay" | "solid";
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const overlay = variant === "overlay" && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        overlay
          ? "bg-transparent"
          : "border-b border-line/80 bg-ivory/95 backdrop-blur-md"
      )}
    >
      <div className="container-wedding flex h-20 items-center justify-between gap-6 xl:h-24">
        <Link
          href="/"
          aria-label="WedPlan home"
          onClick={() => setOpen(false)}
        >
          <Wordmark tone={overlay ? "ivory" : "ink"} />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 lg:flex"
        >
          {publicNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "link-underline text-[0.68rem] font-semibold tracking-[0.2em] uppercase transition-colors",
                overlay
                  ? "text-ivory/80 hover:text-ivory"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          {user ? (
            <>
              <Link
                href={roleHome(user.role)}
                className={cn(
                  "flex items-center gap-3 transition-colors",
                  overlay
                    ? "text-ivory/80 hover:text-ivory"
                    : "text-ink-muted hover:text-ink"
                )}
              >
                <SiteUserAvatar user={user} />
                <span className="flex flex-col text-left leading-tight">
                  <span className="max-w-32 truncate text-sm font-medium">
                    {user.name}
                  </span>
                  <span className="mt-1 text-[0.58rem] font-semibold tracking-[0.16em] uppercase">
                    Dashboard
                  </span>
                </span>
              </Link>

              <LogoutButton
                className={
                  overlay ? "text-ivory/70 hover:text-ivory" : undefined
                }
              />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className={cn(
                  "text-[0.68rem] font-semibold tracking-[0.2em] uppercase transition-colors",
                  overlay
                    ? "text-ivory/80 hover:text-ivory"
                    : "text-ink-muted hover:text-ink"
                )}
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className={cn(
                  "inline-flex h-11 items-center border px-6 text-[0.68rem] font-semibold tracking-[0.2em] uppercase transition-colors",
                  overlay
                    ? "border-ivory/50 text-ivory hover:bg-ivory hover:text-ink"
                    : "border-ink text-ink hover:bg-ink hover:text-ivory"
                )}
              >
                Get started
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="site-mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className={cn(
            "inline-flex size-11 items-center justify-center border lg:hidden",
            overlay ? "border-ivory/40 text-ivory" : "border-line text-ink"
          )}
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
          id="site-mobile-nav"
          className="fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto border-t border-line bg-ivory px-5 pt-8 pb-10 text-ink lg:hidden"
        >
          {user ? (
            <div className="mb-6 flex items-center gap-3 border-b border-line pb-6">
              <SiteUserAvatar user={user} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">
                  {user.name}
                </p>
                <p className="mt-1 text-[0.6rem] font-semibold tracking-[0.16em] text-gold uppercase">
                  {user.role}
                </p>
              </div>
            </div>
          ) : null}

          <nav aria-label="Mobile" className="flex flex-col">
            {publicNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line/70 py-4 font-display text-2xl text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            {user ? (
              <>
                <Link
                  href={roleHome(user.role)}
                  onClick={() => setOpen(false)}
                  className="inline-flex h-12 items-center justify-center bg-ink px-6 text-[0.7rem] font-semibold tracking-[0.18em] text-ivory uppercase"
                >
                  Go to dashboard
                </Link>
                <LogoutButton className="justify-center py-3" />
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-12 items-center justify-center border border-ink px-6 text-[0.7rem] font-semibold tracking-[0.18em] text-ink uppercase"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-12 items-center justify-center bg-ink px-6 text-[0.7rem] font-semibold tracking-[0.18em] text-ivory uppercase"
                >
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
