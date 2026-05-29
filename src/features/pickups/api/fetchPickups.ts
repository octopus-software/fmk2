import axios from "axios";
import { PICKUPS_API_URL } from "../constants/pickups";
import type { PickupApiItem } from "../types/pickups";

const WP_MAX_PER_PAGE = 100;

const buildParams = (page: number) => ({
  page,
  per_page: WP_MAX_PER_PAGE,
  order: "desc",
  _embed: true,
});

/**
 * ピックアップ情報一覧を取得する
 */
export const fetchPickups = async (): Promise<PickupApiItem[]> => {
  // まず1ページ目を取得し、ヘッダーから総ページ数を判定する
  const firstResponse = await axios.get(PICKUPS_API_URL, {
    params: buildParams(1),
  });

  const firstItems = Array.isArray(firstResponse.data)
    ? (firstResponse.data as PickupApiItem[])
    : [];

  const totalPagesRaw = Number(firstResponse.headers["x-wp-totalpages"] ?? 1);
  const totalPages = Number.isFinite(totalPagesRaw) && totalPagesRaw > 1
    ? totalPagesRaw
    : 1;

  // 1ページのみなら追加リクエスト不要
  if (totalPages === 1) return firstItems;

  // 2ページ目以降を並列取得して結合する
  const restResponses = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, i) =>
      axios.get(PICKUPS_API_URL, {
        params: buildParams(i + 2),
      }),
    ),
  );

  const restItems = restResponses.flatMap((response) => {
    return Array.isArray(response.data) ? (response.data as PickupApiItem[]) : [];
  });

  return [...firstItems, ...restItems];
};

/**
 * IDに紐づくピックアップ情報を取得する
 * @param id
 */
export const fetchPickupById = async (id: number): Promise<PickupApiItem> => {
  // 詳細では埋め込みメディアも同時取得する
  const response = await axios.get(`${PICKUPS_API_URL}/${id}`, {
    params: { _embed: true },
  });

  return response.data as PickupApiItem;
};
