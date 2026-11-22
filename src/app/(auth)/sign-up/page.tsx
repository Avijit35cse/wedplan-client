
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  UserRound,
  Mail,
  LockKeyhole,
  Heart,
  BriefcaseBusiness,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import GoogleAuthButton from "@/components/auth/google-auth-button";
import { homeImages } from "@/lib/images";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"customer" | "vendor">("customer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        role,
        callbackURL: "/",
      });

      if (error) {
        setError(error.message ?? "Unable to create account. Please try again.");
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
          src={homeImages.cta}
          alt="An elegant wedding celebration"
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
              A new chapter begins here
            </span>

            <h2 className="display-title mt-6 text-5xl leading-[1.08] text-ivory xl:text-6xl">
              Plan your perfect day, one{" "}
              <span className="script-accent text-champagne">dream</span> at a
              time.
            </h2>

            <p className="mt-6 max-w-md text-sm leading-7 text-ivory/75">
              Join WedPlan to discover wedding professionals, explore services
              and bring your celebration to life.
            </p>

            <div className="mt-10 flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="text-[0.65rem] tracking-[0.22em] text-champagne uppercase">
                Your celebration starts here
              </span>
            </div>
          </div>

          <p className="text-xs tracking-wide text-ivory/55">
            © WedPlan. All rights reserved.
          </p>
        </div>
      </section>

      {/* Registration form */}
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

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <div className="mb-8">
            <span className="eyebrow text-gold">JOIN WEDPLAN</span>

            <h1 className="display-title mt-4 text-4xl leading-tight text-ink sm:text-5xl">
              Create your{" "}
              <span className="script-accent text-rose">account.</span>
            </h1>

            <p className="mt-4 text-sm leading-7 text-ink-muted">
              Start your wedding planning journey with us.
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs font-semibold tracking-wider text-ink uppercase"
              >
                Full name
              </label>

              <div className="relative">
                <UserRound className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-muted/60" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                  className="h-12 w-full border border-line bg-white/70 pr-4 pl-11 text-sm text-ink outline-none transition-all placeholder:text-ink-muted/45 focus:border-gold focus:bg-white"
                />
              </div>
            </div>

            {/* Email */}
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
                  className="h-12 w-full border border-line bg-white/70 pr-4 pl-11 text-sm text-ink outline-none transition-all placeholder:text-ink-muted/45 focus:border-gold focus:bg-white"
                />
              </div>
            </div>

            {/* Password */}
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
                  minLength={8}
                  required
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  className="h-12 w-full border border-line bg-white/70 pr-4 pl-11 text-sm text-ink outline-none transition-all placeholder:text-ink-muted/45 focus:border-gold focus:bg-white"
                />
              </div>
              <p className="mt-2 text-[0.7rem] text-ink-muted">
                Use at least 8 characters for your password.
              </p>
            </div>

            {/* Role selection */}
            <div>
              <p className="mb-3 text-xs font-semibold tracking-wider text-ink uppercase">
                I want to join as
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  aria-pressed={role === "customer"}
                  onClick={() => setRole("customer")}
                  className={`flex items-center gap-3 border p-3 text-left transition-all ${
                    role === "customer"
                      ? "border-rose bg-rose/5 ring-1 ring-rose/20"
                      : "border-line bg-white/60 hover:border-gold"
                  }`}
                >
                  <Heart
                    className={`size-5 shrink-0 ${
                      role === "customer" ? "text-rose" : "text-ink-muted"
                    }`}
                  />
                  <span>
                    <span className="block text-xs font-semibold text-ink">
                      Customer
                    </span>
                    <span className="mt-1 block text-[0.65rem] text-ink-muted">
                      Plan my wedding
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  aria-pressed={role === "vendor"}
                  onClick={() => setRole("vendor")}
                  className={`flex items-center gap-3 border p-3 text-left transition-all ${
                    role === "vendor"
                      ? "border-rose bg-rose/5 ring-1 ring-rose/20"
                      : "border-line bg-white/60 hover:border-gold"
                  }`}
                >
                  <BriefcaseBusiness
                    className={`size-5 shrink-0 ${
                      role === "vendor" ? "text-rose" : "text-ink-muted"
                    }`}
                  />
                  <span>
                    <span className="block text-xs font-semibold text-ink">
                      Vendor
                    </span>
                    <span className="mt-1 block text-[0.65rem] text-ink-muted">
                      Offer my services
                    </span>
                  </span>
                </button>
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
              className="group flex h-12 w-full items-center justify-center gap-3 bg-ink px-6 text-xs font-semibold tracking-[0.18em] text-ivory uppercase transition-colors hover:bg-rose disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
              {!loading && (
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-line" />
            <span className="text-[0.65rem] tracking-widest text-ink-muted uppercase">
              Or sign up with
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <GoogleAuthButton />

          <p className="mt-8 text-center text-sm text-ink-muted">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-rose underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              Sign in
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
