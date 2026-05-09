import { useState } from "react";
import { createEvent } from "../../../services/events/events.service";
import type { EventFormData } from "../models/event";

export function useCreateEvent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(data: EventFormData) {
    setIsSubmitting(true);
    setError(null);
    try {
      await createEvent(data);
      // TODO: navigate to the new event page on success
    } catch {
      setError("Failed to create event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return { submit, isSubmitting, error };
}
