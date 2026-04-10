import { useEffect, useMemo, useState } from "react";

//generic pagination hook for any list of items.
type UsePaginateProps<T> = {
  items: T[];
  itemsPerPage?: number;
};

const usePaginate = <T>({ items, itemsPerPage = 8 }: UsePaginateProps<T>) => {
  const [page, setPage] = useState(1);

  // Ensure itemsPerPage is at least 1 to avoid division by zero.
  const safeItemsPerPage = Math.max(1, itemsPerPage);

  const pageCount = Math.ceil(items.length / safeItemsPerPage);

  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * safeItemsPerPage;
    const end = start + safeItemsPerPage;
    return items.slice(start, end);
  }, [page, items, safeItemsPerPage]);

  return { paginatedItems, pageCount, page, setPage };
};

export default usePaginate;
