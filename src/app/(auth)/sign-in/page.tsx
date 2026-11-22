
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, LockKeyhole, Mail } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import GoogleAuthButton from "@/components/auth/google-auth-button";
import { homeImages } from "@/lib/images";

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
        callbackURL: "/auth/redirect",
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

  return (
    <main className="grid min-h-screen bg-ivory lg:grid-cols-2">
      {/* Left visual panel */}
      <section className="relative hidden min-h-screen overflow-hidden bg-ink lg:block">
        <Image
          src={homeImages.introMain}
          alt="A beautiful wedding celebration"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/15" />

        <div className="relative z-10 flex min-h-screen flex-col justify-between p-12 xl:p-16">
          <Link
            href="/"
            className="font-serif text-3xl tracking-wide text-ivory"
          >
            WedPlan<span className="text-gold">.</span>
          </Link>

          <div className="max-w-lg pb-8">
            <span className="eyebrow text-champagne">
              Your story, beautifully planned
            </span>

            <h2 className="display-title mt-6 text-5xl leading-[1.08] text-ivory xl:text-6xl">
              Every beautiful beginning starts with a{" "}
              <span className="script-accent text-champagne">dream.</span>
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-ivory/75">
              Find the right wedding professionals, discover inspiration and
              bring every detail of your celebration together.
            </p>

            <div className="mt-10 flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-[0.65rem] tracking-[0.22em] text-champagne uppercase">
                Make your moments memorable
              </span>
            </div>
          </div>

          <p className="text-xs tracking-wide text-ivory/55">
            © WedPlan. All rights reserved.
          </p>
        </div>
      </section>

      {/* Right form panel */}
      <section className="flex min-h-screen flex-col px-6 py-7 sm:px-12 lg:px-16 xl:px-24">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium tracking-wider text-ink-muted transition-colors hover:text-rose"
          >
            <ArrowLeft className="size-4" />
            BACK TO HOME
          </Link>

          <Link
            href="/"
            className="font-serif text-2xl tracking-wide text-ink lg:hidden"
          >
            WedPlan<span className="text-rose">.</span>
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          <div className="mb-10">
            <span className="eyebrow text-gold">WELCOME BACK</span>

            <h1 className="display-title mt-4 text-4xl leading-tight text-ink sm:text-5xl">
              Sign in to your{" "}
              <span className="script-accent text-rose">account.</span>
            </h1>

            <p className="mt-4 text-sm leading-7 text-ink-muted">
              Continue planning your special day with WedPlan.
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-semibold tracking-wider text-ink uppercase"
              >
                Email address
              </label>

              <div className="relative">
                <Mail className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-muted/60" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-13 w-full border border-line bg-white/70 pr-4 pl-11 text-sm text-ink outline-none transition-all placeholder:text-ink-muted/45 focus:border-gold focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-semibold tracking-wider text-ink uppercase"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-muted/60" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="h-13 w-full border border-line bg-white/70 pr-4 pl-11 text-sm text-ink outline-none transition-all placeholder:text-ink-muted/45 focus:border-gold focus:bg-white"
                />
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group flex h-13 w-full items-center justify-center gap-3 bg-ink px-6 text-xs font-semibold tracking-[0.18em] text-ivory uppercase transition-colors hover:bg-rose disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && (
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              )}
            </button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <span className="h-px flex-1 bg-line" />
            <span className="text-[0.65rem] tracking-widest text-ink-muted uppercase">
              Or continue with
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <GoogleAuthButton />

          <p className="mt-9 text-center text-sm text-ink-muted">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-rose underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        <p className="pb-3 text-center text-[0.65rem] tracking-wide text-ink-muted/60">
          A beautiful celebration begins with a thoughtful plan.
        </p>
      </section>
    </main>
  );
}
