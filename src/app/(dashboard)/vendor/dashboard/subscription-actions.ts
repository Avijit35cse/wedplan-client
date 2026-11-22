"use server";

import { redirect } from "next/navigation";
import { backendFetch } from "@/lib/backend-api";

type CheckoutResponse = {
  success: boolean;
  url: string;
};

export async function createCheckoutSession() {
  const result = await backendFetch<CheckoutResponse>(
    "/api/payments/create-checkout-session",
    { method: "POST" }
  );

  if (!result.url) {
    throw new Error("Stripe checkout URL not found");
  }

  redirect(result.url);
}
