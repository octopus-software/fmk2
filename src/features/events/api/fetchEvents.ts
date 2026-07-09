import axios from "axios";
import { EVENTS_API_URL } from "../constants/events";
import type { EventApiItem } from "../types/events";
import { fetchAllWpPages } from "@/lib/api";

export const fetchEvents = (): Promise<EventApiItem[]> =>
  fetchAllWpPages<EventApiItem>(EVENTS_API_URL, { _embed: true });

/**
 * IDに紐づくイベント情報を取得する
 * @param id
 */
export const fetchEventById = async (id: number): Promise<EventApiItem> => {
  // 詳細では埋め込みメディアも同時取得する
  const response = await axios.get(`${EVENTS_API_URL}/${id}`, {
    params: { _embed: true },
  });

  return response.data as EventApiItem;
};
