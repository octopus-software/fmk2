import axios from "axios";
import { NEWS_API_URL } from "../constants/news";
import { toTime } from "../utils/date";
import type { NewsApiItem } from "../types/news";
import { fetchAllWpPages } from "@/lib/api";

export const fetchNews = (): Promise<NewsApiItem[]> =>
  fetchAllWpPages<NewsApiItem>(NEWS_API_URL);

/**
 * IDに紐づくお知らせを取得する
 * @param id
 */
export const fetchNewsById = async (id: number): Promise<NewsApiItem> => {
  // お知らせ詳細をID指定で取得する
  const response = await axios.get(`${NEWS_API_URL}/${id}`);
  return response.data as NewsApiItem;
};

export const filterStartedNews = (items: NewsApiItem[], now = Date.now()) => {
  return items.filter((item) => {
    const startAtTime = toTime(item.acf?.start_at);
    // start_at未設定/不正値は表示対象に含める
    return startAtTime === Number.NEGATIVE_INFINITY || startAtTime <= now;
  });
};

export const sortNewsByStartAtDesc = (items: NewsApiItem[]) => {
  // 一覧表示は start_at の新しい順にそろえる
  return [...items].sort((a, b) => toTime(b.acf?.start_at) - toTime(a.acf?.start_at));
};
