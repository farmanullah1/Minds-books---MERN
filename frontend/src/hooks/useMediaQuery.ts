import { useState, useEffect } from 'react';

/**
 * useMediaQuery — reactively tracks a CSS media query.
 * @param query - e.g. '(max-width: 767px)'
 */
export function useMediaQuery(query: string): boolean {
  const getMatches = (q: string) => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(q).matches;
  };

  const [matches, setMatches] = useState(getMatches(query));

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Older browsers
    if (mql.addEventListener) {
      mql.addEventListener('change', handler);
    } else {
      mql.addListener(handler);
    }

    setMatches(mql.matches);

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', handler);
      } else {
        mql.removeListener(handler);
      }
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
