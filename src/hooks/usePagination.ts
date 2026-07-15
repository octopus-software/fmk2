import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";

export const buildPagerItems = (
  totalPages: number,
  currentPage: number,
): (number | "...")[] => {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
  if (currentPage >= totalPages - 3) {
    return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
};

export const usePagination = <T>(items: T[], pageSize: number) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = useMemo(() => {
    const raw = Number(searchParams.get("page") ?? "1");
    return Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 1;
  }, [searchParams]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(items.length / pageSize)),
    [items.length, pageSize],
  );

  const pagedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, currentPage, pageSize]);

  const pagerItems = useMemo(
    () => buildPagerItems(totalPages, currentPage),
    [totalPages, currentPage],
  );

  // currentPage がデータ範囲を超えている場合に最終ページへ補正する
  useEffect(() => {
    if (currentPage <= totalPages) return;
    const nextParams = new URLSearchParams(searchParams);
    if (totalPages === 1) {
      nextParams.delete("page");
    } else {
      nextParams.set("page", String(totalPages));
    }
    setSearchParams(nextParams);
  }, [currentPage, searchParams, setSearchParams, totalPages]);

  const onPageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === currentPage) return;
    const nextParams = new URLSearchParams(searchParams);
    if (nextPage === 1) {
      nextParams.delete("page");
    } else {
      nextParams.set("page", String(nextPage));
    }
    setSearchParams(nextParams);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return { currentPage, totalPages, pagedItems, pagerItems, onPageChange };
};
