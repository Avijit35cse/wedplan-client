    
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";

export default function LogoutButton() {
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
      onClick={handleLogout}
      disabled={loading}
      className="rounded-md border px-4 py-2 text-sm font-medium disabled:opacity-50"
    >
      {loading ? "Signing out..." : "Logout"}
    </button>
  );
}
