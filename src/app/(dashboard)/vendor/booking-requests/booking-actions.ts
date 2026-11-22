
"use server";

import { backendFetch } from "@/lib/backend-api";
import { revalidatePath } from "next/cache";

type BookingStatusResponse = {
  success: boolean;
  message: string;
};

export async function updateBookingStatus(
  bookingId: string,
  status: "accepted" | "rejected"
) {
  if (!bookingId) {
    return { success: false, message: "Invalid booking ID" };
  }

  try {
    const result = await backendFetch<BookingStatusResponse>(
      `/api/bookings/${bookingId}/status`,
      {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }
    );

    revalidatePath("/vendor/booking-requests");
    revalidatePath("/vendor/dashboard");
    revalidatePath("/customer/my-bookings");

    return {
      success: result.success,
      message: result.message,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update booking",
    };
  }
}
