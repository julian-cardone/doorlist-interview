import { useAsync } from "../../../hooks/useAsync";
import { getEventById } from "../../../services/events/events.service";

export function useGetEvent() {
  const {
    execute: fetch,
    isLoading: isfetchting,
    error,
  } = useAsync(getEventById);

  return { fetch, isfetchting, error };
}
