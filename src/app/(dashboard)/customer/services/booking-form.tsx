
"use client";

import { useState } from "react";
import { CalendarDays, MapPin, MessageSquare, Send } from "lucide-react";
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
    <form action={handleSubmit} className="space-y-4">
      <input type="hidden" name="serviceId" value={serviceId} />

      <div>
        <label
          htmlFor={`event-date-${serviceId}`}
          className="mb-2 flex items-center gap-2 text-xs font-semibold text-ink"
        >
          <CalendarDays className="size-3.5 text-gold" />
          Event date
        </label>
        <input
          id={`event-date-${serviceId}`}
          type="date"
          name="eventDate"
          min={new Date().toISOString().split("T")[0]}
          required
          className="h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/10"
        />
      </div>

      <div>
        <label
          htmlFor={`event-location-${serviceId}`}
          className="mb-2 flex items-center gap-2 text-xs font-semibold text-ink"
        >
          <MapPin className="size-3.5 text-gold" />
          Event location
        </label>
        <input
          id={`event-location-${serviceId}`}
          type="text"
          name="eventLocation"
          placeholder="Where will your event take place?"
          required
          className="h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-ink outline-none transition placeholder:text-ink-muted/60 focus:border-gold focus:ring-2 focus:ring-gold/10"
        />
      </div>

      <div>
        <label
          htmlFor={`booking-message-${serviceId}`}
          className="mb-2 flex items-center gap-2 text-xs font-semibold text-ink"
        >
          <MessageSquare className="size-3.5 text-gold" />
          Message
          <span className="font-normal text-ink-muted">(Optional)</span>
        </label>
        <textarea
          id={`booking-message-${serviceId}`}
          name="message"
          rows={3}
          placeholder="Tell the vendor a little about your event..."
          className="w-full resize-y rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink-muted/60 focus:border-gold focus:ring-2 focus:ring-gold/10"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-rose px-5 py-3 text-xs font-semibold tracking-[0.12em] text-white uppercase transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Send className="size-3.5" />
        {loading ? "Submitting..." : "Send booking request"}
      </button>

      {message && (
        <p
          className="rounded-xl border border-line bg-ivory p-3 text-sm leading-6 text-ink"
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
