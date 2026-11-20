import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";

type UserRole = "customer" | "vendor" | "admin";

export const requireRole = async (allowedRoles: UserRole[]) => {
  const session = await getSession();

  // User is not logged in
  if (!session) {
    redirect("/sign-in");
  }

  // Check user's role
  const userRole = session.user.role as UserRole;

  if (!allowedRoles.includes(userRole)) {
    redirect("/");
  }

  return session;
};