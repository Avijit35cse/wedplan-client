import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";

export const instant = false;

export default async function AuthRedirectPage() {
    const session = await getSession();

    if (!session) {
        redirect("/sign-in");
    }

    const role = session.user.role as string;

    if (role === "customer") {
        redirect("/customer/dashboard");
    }

    if (role === "vendor") {
        redirect("/vendor/dashboard");
    }

    if (role === "admin") {
        redirect("/admin/dashboard");
    }

    redirect("/");
}