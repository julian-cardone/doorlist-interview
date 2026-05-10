import { useRef } from "react";

export function useHorizontalWheelScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  function handleWheel(event: React.WheelEvent<T>) {
    const element = ref.current;
    if (!element) return;

    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

    event.preventDefault();
    element.scrollLeft += event.deltaY;
  }

  return { ref, onWheel: handleWheel };
}
