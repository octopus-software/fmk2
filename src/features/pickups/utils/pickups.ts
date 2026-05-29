import type { PickupApiItem } from "../types/pickups";

const normalizeWpDate = (value?: string) => {
  if (!value) return "";
  return value.includes(" ") && !value.includes("T")
    ? value.replace(" ", "T")
    : value;
};

export const parsePickupDate = (value?: string) => {
  if (!value) return null;

  const date = new Date(normalizeWpDate(value));
  return Number.isNaN(date.getTime()) ? null : date;
};

export const isPickupVisibleNow = (item: PickupApiItem, now = new Date()) => {
  const start = parsePickupDate(item.acf?.publish_start_at);
  const end = parsePickupDate(item.acf?.publish_end_at);

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

