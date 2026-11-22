
"use client";

import { useState } from "react";
import { updateServiceStatus } from "./service-actions";

export default function ServiceStatusButtons({
  serviceId,
}: {
  serviceId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleUpdate(action: "approve" | "reject") {
    const confirmed = window.confirm(
      `Are you sure you want to ${action} this service?`
    );

    if (!confirmed) return;

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
    }
  }

  return (
    <div className="mt-4 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => handleUpdate("approve")}
        disabled={loading}
        className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white disabled:opacity-50"
      >
        {loading ? "Updating..." : "Approve"}
      </button>

      <button
        type="button"
        onClick={() => handleUpdate("reject")}
        disabled={loading}
        className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white disabled:opacity-50"
      >
        {loading ? "Updating..." : "Reject"}
      </button>

      {message && (
        <p className="w-full text-sm" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
