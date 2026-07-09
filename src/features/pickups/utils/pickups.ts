import type { PickupApiItem } from "../types/pickups";
import { parseWpDate } from "@/lib/date";

export const isPickupVisibleNow = (item: PickupApiItem, now = new Date()) => {
  const start = parseWpDate(item.acf?.publish_start_at);
  const end = parseWpDate(item.acf?.publish_end_at);

  if (start && now < start) return false;
  if (end && now > end) return false;
  return true;
};

export const getPickupImageUrl = (item: PickupApiItem) => {
  const media = item._embedded?.["wp:featuredmedia"]?.[0];
  if (!media) return "";

  return (
    media.media_details?.sizes?.medium?.source_url ??
    media.media_details?.sizes?.large?.source_url ??
    media.media_details?.sizes?.full?.source_url ??
    media.source_url ??
    ""
  );
};

