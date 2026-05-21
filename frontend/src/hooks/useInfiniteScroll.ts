import { useState, useEffect, useCallback, useRef } from 'react';

interface UseInfiniteScrollOptions {
  /** Initial page number */
  initialPage?: number;
  /** Fetch function: receives page number, returns array of items and whether more pages exist */
  fetchFn: (page: number) => Promise<{ data: any[]; hasMore: boolean }>;
  /** Root margin for the IntersectionObserver sentinel */
  rootMargin?: string;
}

interface UseInfiniteScrollReturn {
  items: any[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  sentinelRef: React.RefCallback<HTMLElement>;
  reset: () => void;
}

/**
 * useInfiniteScroll — drives a paginated infinite-scroll list.
 * Attach `sentinelRef` to a sentinel element at the bottom of your list.
 */
export function useInfiniteScroll({
  initialPage = 1,
  fetchFn,
  rootMargin = '200px',
}: UseInfiniteScrollOptions): UseInfiniteScrollReturn {
  const [items, setItems]     = useState<any[]>([]);
  const [page, setPage]       = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const observerRef           = useRef<IntersectionObserver | null>(null);

  const load = useCallback(async (pageNum: number) => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn(pageNum);
      setItems((prev) => (pageNum === initialPage ? result.data : [...prev, ...result.data]));
      setHasMore(result.hasMore);
    } catch (e: any) {
      setError(e?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [fetchFn, hasMore, loading, initialPage]);

  // Load first page on mount
  useEffect(() => { load(initialPage); }, []); // eslint-disable-line

  // Subsequent page loads
  useEffect(() => {
    if (page > initialPage) load(page);
  }, [page]); // eslint-disable-line

  // Sentinel observer
  const sentinelRef: React.RefCallback<HTMLElement> = useCallback((node) => {
    if (observerRef.current) observerRef.current.disconnect();
    if (!node || !hasMore) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((p) => p + 1);
        }
      },
      { rootMargin }
    );
    observerRef.current.observe(node);
  }, [hasMore, loading, rootMargin]);

  const reset = useCallback(() => {
    setItems([]);
    setPage(initialPage);
    setHasMore(true);
    setError(null);
  }, [initialPage]);

  return { items, loading, error, hasMore, sentinelRef, reset };
}

export default useInfiniteScroll;
