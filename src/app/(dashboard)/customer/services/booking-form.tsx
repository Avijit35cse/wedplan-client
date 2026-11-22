
"use client";

import { useState } from "react";
import { createBooking } from "./booking-actions";

export default function BookingForm({
  serviceId,
}: {
  serviceId: string;
}) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setMessage("");

    try {
      const result = await createBooking(formData);
      setMessage(result.message);
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="mt-4 space-y-3">
      <input type="hidden" name="serviceId" value={serviceId} />

      <label className="block text-sm font-medium">
        Event Date
      </label>
      <input
        type="date"
        name="eventDate"
        min={new Date().toISOString().split("T")[0]}
        required
        className="w-full rounded-lg border px-3 py-2"
      />

      <label className="block text-sm font-medium">
        Event Location
      </label>
      <input
        type="text"
        name="eventLocation"
        placeholder="Enter event location"
        required
        className="w-full rounded-lg border px-3 py-2"
      />

      <label className="block text-sm font-medium">
        Message (Optional)
      </label>
      <textarea
        name="message"
        placeholder="Tell the vendor about your event..."
        className="w-full rounded-lg border px-3 py-2"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Request Booking"}
      </button>

      {message && (
        <p className="text-sm" role="status">
          {message}
        </p>
      )}
    </form>
  );
}
