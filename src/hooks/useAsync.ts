import { useCallback, useState } from "react";

interface AsyncState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

interface UseAsyncResult<TData, TArgs extends unknown[]> {
  data: TData | null;
  error: Error | null;
  isLoading: boolean;
  execute: (...args: TArgs) => Promise<TData>;
  reset: () => void;
}

export function useAsync<TData, TArgs extends unknown[]>(
  asyncFunction: (...args: TArgs) => Promise<TData>,
): UseAsyncResult<TData, TArgs> {
  const [state, setState] = useState<AsyncState<TData>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const execute = useCallback(
    async (...args: TArgs): Promise<TData> => {
      setState({ data: null, error: null, isLoading: true });
      try {
        const result = await asyncFunction(...args);
        setState({ data: result, error: null, isLoading: false });
        return result;
      } catch (error) {
        const normalizedError =
          error instanceof Error ? error : new Error("Unexpected error occurred.");
        setState({ data: null, error: normalizedError, isLoading: false });
        throw normalizedError;
      }
    },
    [asyncFunction],
  );

  const reset = useCallback((): void => {
    setState({ data: null, error: null, isLoading: false });
  }, []);

  return {
    data: state.data,
    error: state.error,
    isLoading: state.isLoading,
    execute,
    reset,
  };
}
