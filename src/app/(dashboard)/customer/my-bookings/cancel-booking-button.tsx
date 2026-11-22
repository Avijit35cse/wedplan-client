
"use client";

import { useState } from "react";
import { cancelBooking } from "./booking-actions";

export default function CancelBookingButton({
  bookingId,
}: {
  bookingId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleCancel() {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    setLoading(true);
    setMessage("");

    try {
      const result = await cancelBooking(bookingId);
      setMessage(result.message);

      if (result.success) {
        window.location.reload();
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={handleCancel}
        disabled={loading}
        className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white disabled:opacity-50"
      >
        {loading ? "Cancelling..." : "Cancel Booking"}
      </button>

      {message && (
        <p className="mt-2 text-sm" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
