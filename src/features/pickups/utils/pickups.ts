import type { PickupApiItem } from "../types/pickups";
import { parseWpDate, isWithinRange } from "@/lib/date";

export const isPickupVisibleNow = (item: PickupApiItem, now = new Date()) =>
  isWithinRange(
    parseWpDate(item.acf?.publish_start_at),
    parseWpDate(item.acf?.publish_end_at),
    now,
  );

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

