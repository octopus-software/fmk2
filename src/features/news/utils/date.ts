const normalizeWpDate = (value?: string) => {
  if (!value) return "";
  return value.includes(" ") && !value.includes("T")
    ? value.replace(" ", "T")
    : value;
};

export const toTime = (value?: string) => {
  if (!value) return Number.NEGATIVE_INFINITY;
  const date = new Date(normalizeWpDate(value));
  return Number.isNaN(date.getTime())
    ? Number.NEGATIVE_INFINITY
    : date.getTime();
};

export const formatDate = (value?: string) => {
  if (!value) return "日付未設定";
  const date = new Date(normalizeWpDate(value));
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("ja-JP");
};

