import type { ShopApiItem, ShopItem } from "../types/shops";
import { htmlToText } from "@/features/news/utils/text";

const getShopImageUrl = (item: ShopApiItem): string => {
  const media = item._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return "";
  return (
    media.media_details?.sizes?.large?.source_url ??
    media.media_details?.sizes?.full?.source_url ??
    media.source_url ??
    media.media_details?.sizes?.medium?.source_url ??
    ""
  );
};

// APIのfloorは "1" "2" などの数字。表示用に "1F" "2F" へ正規化する
const normalizeFloor = (floor?: string): string => {
  if (!floor) return "";
  return /^\d+$/.test(floor) ? `${floor}F` : floor;
};

export const getFloorColor = (floor: string): string => {
  const colors: Record<string, string> = {
    "1F": "bg-blue-100 text-blue-600",
    "2F": "bg-orange-100 text-orange-600",
    "3F": "bg-green-100 text-green-600",
    "4F": "bg-pink-100 text-pink-600",
    "5F": "bg-purple-100 text-purple-600",
  };
  return colors[floor] || "bg-gray-100 text-gray-600";
};

export const toShopItem = (item: ShopApiItem): ShopItem => ({
  id: item.id,
  name: item.acf?.name ?? item.title.rendered,
  category: item.acf?.category ?? "",
  floor: normalizeFloor(item.acf?.floor),
  description: item.acf?.description ?? "",
  image: getShopImageUrl(item),
  hours: item.acf?.open_hours,
  phone: item.acf?.tel,
  website: item.acf?.website_url,
  fullDescription: item.content?.rendered ? htmlToText(item.content.rendered) : undefined,
});
