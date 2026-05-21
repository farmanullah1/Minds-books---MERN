import { useCallback, useRef } from 'react';

/**
 * useDebounce — returns a debounced version of the provided function.
 * @param fn - function to debounce
 * @param delay - debounce delay in ms (default: 300)
 */
export function useDebounce<T extends (...args: any[]) => any>(fn: T, delay: number = 300): T {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounced = useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay]
  );

  return debounced as T;
}

export default useDebounce;
