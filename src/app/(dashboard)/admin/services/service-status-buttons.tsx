
"use client";

import { useState } from "react";
import { updateServiceStatus } from "./service-actions";
import {
  Check,
  X,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

export default function ServiceStatusButtons({
  serviceId,
}: {
  serviceId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState<
    "approve" | "reject" | null
  >(null);

  async function handleUpdate(action: "approve" | "reject") {
    setLoading(true);
    setMessage("");

    try {
      const result = await updateServiceStatus(serviceId, action);
      setMessage(result.message);

      if (result.success) {
        window.location.reload();
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setConfirmAction(null);
    }
  }

  return (
    <div className="mt-6 border-t border-line pt-5">
      {confirmAction ? (
        <div className="rounded-xl border border-champagne bg-cream/50 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 shrink-0 text-gold" size={20} />

            <div className="flex-1">
              <p className="text-sm font-semibold text-ink">
                {confirmAction === "approve"
                  ? "Approve this service?"
                  : "Reject this service?"}
              </p>

              <p className="mt-1 text-xs leading-5 text-ink-muted">
                {confirmAction === "approve"
                  ? "This service will be approved and become available according to the platform's existing rules."
                  : "This service will be marked as rejected."}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdate(confirmAction)}
                  disabled={loading}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition disabled:opacity-50 ${
                    confirmAction === "approve"
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
                  onClick={() => setConfirmAction(null)}
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
            onClick={() => setConfirmAction("approve")}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 disabled:opacity-50"
          >
            <Check size={16} />
            Approve Service
          </button>

          <button
            type="button"
            onClick={() => setConfirmAction("reject")}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-wine transition hover:border-wine hover:bg-rose/5 disabled:opacity-50"
          >
            <X size={16} />
            Reject Service
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

