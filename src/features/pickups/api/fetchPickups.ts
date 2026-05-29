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

export const fetchPickups = async (): Promise<PickupApiItem[]> => {
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

  if (totalPages === 1) return firstItems;

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

export const fetchPickupById = async (id: number): Promise<PickupApiItem> => {
  const response = await axios.get(`${PICKUPS_API_URL}/${id}`, {
    params: { _embed: true },
  });

  return response.data as PickupApiItem;
};

