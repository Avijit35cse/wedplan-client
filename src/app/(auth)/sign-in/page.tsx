
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        setError(error.message ?? "Invalid email or password.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  // Google sign-in

  const handleGoogleSignIn = async () => {
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
    <main className="flex min-h-screen items-center justify-center p-6">
      <form
        onSubmit={handleSignIn}
        className="w-full max-w-md space-y-5 rounded-xl border p-8 shadow-sm"
      >
        <div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-500">
            Sign in to your WedPlan account.
          </p>
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-md border p-3"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-md border p-3"
            placeholder="Your password"
          />
        </div>

        {error && (
          <p className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-black p-3 font-medium text-white disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* google */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full rounded-md border p-3 font-medium disabled:opacity-50"
        >
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="font-medium text-black underline">
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}
