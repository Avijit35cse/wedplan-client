"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function GoogleAuthButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleAuth = async () => {
    setError("");
    setLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      setError("Unable to continue with Google.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {error && (
        <p className="rounded-md bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleGoogleAuth}
        disabled={loading}
        className="w-full rounded-md border p-3 font-medium disabled:opacity-50"
      >
        {loading ? "Connecting to Google..." : "Continue with Google"}
      </button>
    </div>
  );
}