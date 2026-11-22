"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export default function LogoutButton({
  className,
  showIcon = false,
}: {
  className?: string;
  showIcon?: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);

    try {
      await signOut();
      router.push("/sign-in");
      router.refresh();
    } catch {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className={cn(
        "inline-flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.18em] text-ink-muted uppercase transition-colors hover:text-ink disabled:opacity-50",
        className
      )}
    >
      {showIcon ? <LogOut aria-hidden className="size-4" /> : null}
      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
}
