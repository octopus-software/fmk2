import axios from "axios";
import { PICKUPS_API_URL } from "../constants/pickups";
import type { PickupApiItem } from "../types/pickups";
import { fetchAllWpPages } from "@/lib/api";

export const fetchPickups = (): Promise<PickupApiItem[]> =>
  fetchAllWpPages<PickupApiItem>(PICKUPS_API_URL, { _embed: true });

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
