
"use server";

import { backendFetch } from "@/lib/backend-api";
import { revalidatePath } from "next/cache";

type BookingResponse = {
  success: boolean;
  message: string;
  booking?: {
    _id: string;
    status: string;
  };
};

export async function createBooking(formData: FormData) {
  const serviceId = formData.get("serviceId");
  const eventDate = formData.get("eventDate");
  const eventLocation = formData.get("eventLocation");
  const message = formData.get("message");

  if (
    typeof serviceId !== "string" ||
    typeof eventDate !== "string" ||
    typeof eventLocation !== "string" ||
    typeof message !== "string"
  ) {
    return { success: false, message: "Invalid booking information" };
  }

  try {
    const result = await backendFetch<BookingResponse>("/api/bookings", {
      method: "POST",
      body: JSON.stringify({
        serviceId,
        eventDate,
        eventLocation,
        message,
      }),
    });

    revalidatePath("/customer/dashboard");
    revalidatePath("/customer/services");

    return {
      success: result.success,
      message: result.message,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Booking request failed",
    };
  }
}
