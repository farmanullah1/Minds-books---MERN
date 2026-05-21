import { useCallback, useRef } from 'react';

/**
 * useThrottle — returns a throttled version of the provided function.
 * Ensures fn fires at most once per `limit` ms.
 * @param fn - function to throttle
 * @param limit - throttle limit in ms (default: 200)
 */
export function useThrottle<T extends (...args: any[]) => any>(fn: T, limit: number = 200): T {
  const lastCallRef = useRef<number>(0);

  const throttled = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCallRef.current >= limit) {
        lastCallRef.current = now;
        fn(...args);
      }
    },
    [fn, limit]
  );

  return throttled as T;
}

export default useThrottle;
