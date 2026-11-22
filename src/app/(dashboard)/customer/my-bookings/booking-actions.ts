
"use server";

import { backendFetch } from "@/lib/backend-api";
import { revalidatePath } from "next/cache";

type CancelResponse = {
  success: boolean;
  message: string;
};

export async function cancelBooking(bookingId: string) {
  if (!bookingId) {
    return { success: false, message: "Invalid booking ID" };
  }

  try {
    const result = await backendFetch<CancelResponse>(
      `/api/bookings/${bookingId}/cancel`,
      {
        method: "PATCH",
      }
    );

    revalidatePath("/customer/my-bookings");
    revalidatePath("/customer/dashboard");

    return {
      success: result.success,
      message: result.message,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to cancel booking",
    };
  }
}
