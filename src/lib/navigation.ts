
export type AppRole = "customer" | "vendor" | "admin";

export type NavUser = {
  name: string;
  email: string;
  role: string;
  image?: string | null;
};

/**
 * Canonical browse-services destination.
 * Phase 4 introduces the public /services route; until then the existing
 * customer browse page keeps every link working.
 */
export const SERVICES_HREF = "/services";

export const publicNav = [
  { label: "Home", href: "/" },
  { label: "Browse services", href: SERVICES_HREF },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Gallery", href: "/#gallery" },
] as const;

export const roleNav: Record<AppRole, { label: string; href: string }[]> = {
  customer: [
    { label: "Dashboard", href: "/customer/dashboard" },
    { label: "Browse services", href: SERVICES_HREF },
    { label: "My bookings", href: "/customer/my-bookings" },
  ],
  vendor: [
    { label: "Dashboard", href: "/vendor/dashboard" },
    { label: "My services", href: "/vendor/my-services" },
    { label: "Add service", href: "/vendor/add-service" },
    { label: "Booking requests", href: "/vendor/booking-requests" },
  ],
    admin: [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Manage users", href: "/admin/users" },
    { label: "Service moderation", href: "/admin/services" },
    { label: "Transactions", href: "/admin/transactions" },
  ],
};

export function navForRole(role?: string | null) {
  if (role === "customer" || role === "vendor" || role === "admin") {
    return roleNav[role];
  }

  return [];
}

export function roleHome(role?: string | null) {
  if (role === "customer") return "/customer/dashboard";
  if (role === "vendor") return "/vendor/dashboard";
  if (role === "admin") return "/admin/dashboard";
  return "/";
}
