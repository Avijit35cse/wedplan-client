import Link from "next/link";

export default function SubscriptionSuccessPage() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center p-8 text-center">
      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful!
      </h1>
      <p className="mt-4 text-gray-600">
        Thank you for upgrading to WedPlan Premium.
      </p>
      <p className="mt-2 text-gray-600">
        Your subscription is being activated.
      </p>
      <Link
        href="/vendor/dashboard"
        className="mt-6 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white"
      >
        Back to Dashboard
      </Link>
    </main>
  );
}
