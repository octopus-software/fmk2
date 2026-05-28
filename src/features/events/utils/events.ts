import type { EventApiItem } from "../types/events";

const normalizeWpDate = (value?: string) => {
  if (!value) return "";
  return value.includes(" ") && !value.includes("T")
    ? value.replace(" ", "T")
    : value;
};

const parseYmd = (value: string) => {
  if (!/^\d{8}$/.test(value)) return null;
  const yyyy = Number(value.slice(0, 4));
  const mm = Number(value.slice(4, 6)) - 1;
  const dd = Number(value.slice(6, 8));
  const date = new Date(yyyy, mm, dd);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const formatEventDate = (value?: string) => {
  if (!value) return "日付未設定";

  const ymdDate = parseYmd(value);
  if (ymdDate) return ymdDate.toLocaleDateString("ja-JP");

  const date = new Date(normalizeWpDate(value));
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("ja-JP");
};

export const formatEventTime = (value?: string) => {
  if (!value) return "";
  const match = value.match(/(\d{2}:\d{2})(?::\d{2})?/);
  return match ? match[1] : value;
};

export const formatEventTimeRange = (startAt?: string, endAt?: string) => {
  const start = formatEventTime(startAt);
  const end = formatEventTime(endAt);

  if (start && end) return `${start} 〜 ${end}`;
  if (start) return start;
  if (end) return end;
  return "";
};

export const isEventNew = (publishedAt?: string, now = Date.now()) => {
  if (!publishedAt) return false;
  const published = new Date(normalizeWpDate(publishedAt));
  const publishedTime = published.getTime();
  if (Number.isNaN(publishedTime)) return false;

  const NEW_TERM_MS = 1000 * 60 * 60 * 24 * 14;
  return now - publishedTime <= NEW_TERM_MS;
};

export const getEventImageUrl = (item: EventApiItem) => {
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
