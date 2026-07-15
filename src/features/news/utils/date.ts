import { normalizeWpDate } from "@/lib/date";

export const toTime = (value?: string) => {
  if (!value) return Number.NEGATIVE_INFINITY;
  const date = new Date(normalizeWpDate(value));
  return Number.isNaN(date.getTime())
    ? Number.NEGATIVE_INFINITY
    : date.getTime();
};

