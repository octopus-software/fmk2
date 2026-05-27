import axios from "axios";
import { NEWS_API_URL } from "../constants/news";
import { toTime } from "../utils/date";
import type { NewsApiItem } from "../types/news";

const WP_MAX_PER_PAGE = 100;

export const fetchNews = async (): Promise<NewsApiItem[]> => {
  const firstResponse = await axios.get(NEWS_API_URL, {
    params: {
      page: 1,
      per_page: WP_MAX_PER_PAGE,
      order: "desc",
    },
  });

  const firstItems = Array.isArray(firstResponse.data)
    ? (firstResponse.data as NewsApiItem[])
    : [];
  const totalPagesRaw = Number(firstResponse.headers["x-wp-totalpages"] ?? 1);
  const totalPages = Number.isFinite(totalPagesRaw) && totalPagesRaw > 1
    ? totalPagesRaw
    : 1;

  if (totalPages === 1) {
    return firstItems;
  }

  const restResponses = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, i) =>
      axios.get(NEWS_API_URL, {
        params: {
          page: i + 2,
          per_page: WP_MAX_PER_PAGE,
          order: "desc",
        },
      }),
    ),
  );

  const restItems = restResponses.flatMap((response) => {
    return Array.isArray(response.data) ? (response.data as NewsApiItem[]) : [];
  });

  return [...firstItems, ...restItems];
};

export const filterStartedNews = (items: NewsApiItem[], now = Date.now()) => {
  return items.filter((item) => {
    const startAtTime = toTime(item.acf?.start_at);
    // start_at未設定/不正値は表示対象に含める
    return startAtTime === Number.NEGATIVE_INFINITY || startAtTime <= now;
  });
};

export const sortNewsByStartAtDesc = (items: NewsApiItem[]) => {
  return [...items].sort((a, b) => toTime(b.acf?.start_at) - toTime(a.acf?.start_at));
};
