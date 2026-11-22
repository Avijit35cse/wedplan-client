import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Wordmark from "@/components/layout/wordmark";
import { SERVICES_HREF } from "@/lib/navigation";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Browse services", href: SERVICES_HREF },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Gallery", href: "/#gallery" },
];

const coupleLinks = [
  { label: "Create an account", href: "/sign-up" },
  { label: "Sign in", href: "/sign-in" },
  { label: "My bookings", href: "/customer/my-bookings" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SiteFooter({
  variant = "full",
}: {
  variant?: "full" | "minimal";
}) {
  if (variant === "minimal") {
    return (
      <footer className="border-t border-line bg-ivory">
        <div className="container-wedding flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <Wordmark compact />
          <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-ink-muted uppercase">
            © WedPlan. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-line bg-cream/60">
      <div className="container-wedding grid gap-12 py-16 md:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr_1.2fr] xl:py-20">
        <div>
          <Wordmark />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
            Thoughtfully curated wedding vendors and planning tools for
            celebrations that feel entirely your own.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.66rem] font-semibold tracking-[0.16em] text-ink-muted uppercase transition-colors hover:text-gold"
            >
              Instagram
              <ArrowUpRight aria-hidden className="size-3" strokeWidth={1.5} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.66rem] font-semibold tracking-[0.16em] text-ink-muted uppercase transition-colors hover:text-gold"
            >
              Facebook
              <ArrowUpRight aria-hidden className="size-3" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <FooterColumn title="Explore" links={exploreLinks} />
        <FooterColumn title="For couples" links={coupleLinks} />

        <div>
          <p className="eyebrow">Contact</p>
          <ul className="mt-5 space-y-3 text-sm text-ink-muted">
            <li>
              <a
                href="mailto:hello@wedplan.com"
                className="inline-flex items-center gap-2.5 transition-colors hover:text-ink"
              >
                <Mail aria-hidden className="size-4 text-gold" strokeWidth={1.5} />
                hello@wedplan.com
              </a>
            </li>
            <li>
              <a
                href="tel:+8801700000000"
                className="inline-flex items-center gap-2.5 transition-colors hover:text-ink"
              >
                <Phone aria-hidden className="size-4 text-gold" strokeWidth={1.5} />
                +880 1700 000000
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5">
              <MapPin aria-hidden className="size-4 text-gold" strokeWidth={1.5} />
              Dhaka, Bangladesh
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line/80">
        <div className="container-wedding flex flex-col items-center justify-between gap-3 py-6 text-center text-[0.66rem] font-semibold tracking-[0.16em] text-ink-muted uppercase sm:flex-row sm:text-left">
          <p>© WedPlan. All rights reserved.</p>
          <p>Wedding planning, beautifully organised.</p>
        </div>
      </div>
    </footer>
  );
}
