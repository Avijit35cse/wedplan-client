
"use client";

import { useState } from "react";
import { updateBookingStatus } from "./booking-actions";
import { Check, X, AlertCircle, LoaderCircle } from "lucide-react";

export default function BookingStatusButtons({
  bookingId,
}: {
  bookingId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmStatus, setConfirmStatus] = useState<
    "accepted" | "rejected" | null
  >(null);

  async function handleUpdate(status: "accepted" | "rejected") {
    setLoading(true);
    setMessage("");

    try {
      const result = await updateBookingStatus(bookingId, status);
      setMessage(result.message);

      if (result.success) {
        window.location.reload();
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setConfirmStatus(null);
    }
  }

  return (
    <div className="mt-6 border-t border-line pt-5">
      {confirmStatus ? (
        <div className="rounded-xl border border-champagne bg-cream/50 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 shrink-0 text-gold" size={19} />
            <div className="flex-1">
              <p className="text-sm font-semibold text-ink">
                {confirmStatus === "accepted"
                  ? "Accept this booking request?"
                  : "Reject this booking request?"}
              </p>
              <p className="mt-1 text-xs leading-5 text-ink-muted">
                {confirmStatus === "accepted"
                  ? "The customer’s booking request will be marked as accepted."
                  : "The customer’s booking request will be marked as rejected."}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdate(confirmStatus)}
                  disabled={loading}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition disabled:opacity-50 ${
                    confirmStatus === "accepted"
                      ? "bg-green-700 hover:bg-green-800"
                      : "bg-wine hover:bg-ink"
                  }`}
                >
                  {loading ? (
                    <LoaderCircle size={15} className="animate-spin" />
                  ) : (
                    <Check size={15} />
                  )}
                  {loading ? "Updating..." : "Confirm"}
                </button>

                <button
                  type="button"
                  onClick={() => setConfirmStatus(null)}
                  disabled={loading}
                  className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink-muted transition hover:bg-cream disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setConfirmStatus("accepted")}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 disabled:opacity-50"
          >
            <Check size={16} />
            Accept Request
          </button>

          <button
            type="button"
            onClick={() => setConfirmStatus("rejected")}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-wine transition hover:border-wine hover:bg-rose/5 disabled:opacity-50"
          >
            <X size={16} />
            Reject Request
          </button>
        </div>
      )}

      {message && (
        <p role="status" className="mt-3 text-sm text-ink-muted">
          {message}
        </p>
      )}
    </div>
  );
}
