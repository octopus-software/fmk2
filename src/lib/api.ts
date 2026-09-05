import axios from "axios";

export const API_BASE_URL = "http://35.78.43.19/index.php?rest_route=/wp/v2";

const WP_MAX_PER_PAGE = 100;

/**
 * WordPress REST API から全ページを取得する
 * x-wp-totalpages ヘッダーを元に2ページ目以降を並列取得して結合する
 */
export const fetchAllWpPages = async <T>(
  url: string,
  extraParams: Record<string, unknown> = {},
): Promise<T[]> => {
  const baseParams = { per_page: WP_MAX_PER_PAGE, order: "desc", ...extraParams };

  const firstResponse = await axios.get(url, {
    params: { page: 1, ...baseParams },
  });

  const firstItems: T[] = Array.isArray(firstResponse.data) ? firstResponse.data : [];
  const totalPagesRaw = Number(firstResponse.headers["x-wp-totalpages"] ?? 1);
  const totalPages = Number.isFinite(totalPagesRaw) && totalPagesRaw > 1 ? totalPagesRaw : 1;

  if (totalPages === 1) return firstItems;

  const restResponses = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, i) =>
      axios.get(url, { params: { page: i + 2, ...baseParams } }),
    ),
  );

  const restItems = restResponses.flatMap<T>((r) => (Array.isArray(r.data) ? r.data : []));

  return [...firstItems, ...restItems];
};
