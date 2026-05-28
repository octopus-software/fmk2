import axios from "axios";
import { EVENTS_API_URL } from "../constants/events";
import type { EventApiItem } from "../types/events";

const WP_MAX_PER_PAGE = 100;

const buildParams = (page: number) => ({
  page,
  per_page: WP_MAX_PER_PAGE,
  order: "desc",
  _embed: true,
});

export const fetchEvents = async (): Promise<EventApiItem[]> => {
  const firstResponse = await axios.get(EVENTS_API_URL, {
    params: buildParams(1),
  });

  const firstItems = Array.isArray(firstResponse.data)
    ? (firstResponse.data as EventApiItem[])
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
      axios.get(EVENTS_API_URL, {
        params: buildParams(i + 2),
      }),
    ),
  );

  const restItems = restResponses.flatMap((response) => {
    return Array.isArray(response.data) ? (response.data as EventApiItem[]) : [];
  });

  return [...firstItems, ...restItems];
};

export const fetchEventById = async (id: number): Promise<EventApiItem> => {
  const response = await axios.get(`${EVENTS_API_URL}/${id}`, {
    params: { _embed: true },
  });

  return response.data as EventApiItem;
};

