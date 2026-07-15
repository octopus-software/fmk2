import axios from "axios";
import { SHOPS_API_URL } from "../constants/shops";
import type { ShopApiItem, ShopItem } from "../types/shops";
import { fetchAllWpPages } from "@/lib/api";
import { toShopItem } from "../utils/shops";

export const fetchShops = async (): Promise<ShopItem[]> => {
  const items = await fetchAllWpPages<ShopApiItem>(SHOPS_API_URL, { _embed: true });
  return items.map(toShopItem);
};

export const fetchShopById = async (id: number): Promise<ShopItem> => {
  const response = await axios.get(`${SHOPS_API_URL}/${id}`, {
    params: { _embed: true },
  });
  return toShopItem(response.data as ShopApiItem);
};
