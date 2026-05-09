import { useAsync } from "../../../hooks/useAsync";
import { createEvent } from "../../../services/events/events.service";

export function useCreateEvent() {
  const {
    execute: submit,
    isLoading: isSubmitting,
    error,
  } = useAsync(createEvent);

  return { submit, isSubmitting, error };
}
