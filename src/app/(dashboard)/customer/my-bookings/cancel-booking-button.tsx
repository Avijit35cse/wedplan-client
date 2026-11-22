
"use client";

import { useState } from "react";
import { cancelBooking } from "./booking-actions";
import { X, AlertCircle } from "lucide-react";

export default function CancelBookingButton({
  bookingId,
}: {
  bookingId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [confirming, setConfirming] = useState(false);

  async function handleCancel() {
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
      setConfirming(false);
    }
  }

  return (
    <div className="w-full sm:w-auto">
      {!confirming ? (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-rose/30 px-5 py-2 text-xs font-semibold tracking-wide text-rose transition hover:bg-rose hover:text-white"
        >
          <X className="size-3.5" />
          Cancel booking
        </button>
      ) : (
        <div className="rounded-xl border border-rose/20 bg-rose/5 p-4 sm:min-w-72">
          <p className="flex items-center gap-2 text-sm font-semibold text-ink">
            <AlertCircle className="size-4 text-rose" />
            Cancel this booking?
          </p>
          <p className="mt-2 text-xs leading-5 text-ink-muted">
            Are you sure you want to cancel this booking request?
          </p>

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="rounded-full bg-rose px-4 py-2 text-xs font-semibold text-white transition hover:bg-ink disabled:opacity-50"
            >
              {loading ? "Cancelling..." : "Yes, cancel"}
            </button>

            <button
              type="button"
              onClick={() => setConfirming(false)}
              disabled={loading}
              className="rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink transition hover:bg-white disabled:opacity-50"
            >
              Keep booking
            </button>
          </div>
        </div>
      )}

      {message && (
        <p className="mt-2 text-sm text-ink-muted" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
