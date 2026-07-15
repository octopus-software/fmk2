// WordPress の日付文字列("YYYY-MM-DD HH:mm:ss")をISO形式に正規化する
export const normalizeWpDate = (value?: string): string => {
  if (!value) return "";
  return value.includes(" ") && !value.includes("T")
    ? value.replace(" ", "T")
    : value;
};

// 日付文字列をパースして Date を返す。パース不能なら null
export const parseWpDate = (value?: string): Date | null => {
  if (!value) return null;
  const date = new Date(normalizeWpDate(value));
  return Number.isNaN(date.getTime()) ? null : date;
};

// 日付文字列をパースする。"HH:MM" 形式の時刻のみの場合は now の日付に適用する
export const parseWpDateOrTime = (value?: string, now = new Date()): Date | null => {
  if (!value) return null;

  const timeOnly = value.match(/^(\d{2}):(\d{2})(?::(\d{2}))?$/);
  if (timeOnly) {
    const [, hh, mm, ss] = timeOnly;
    const date = new Date(now);
    date.setHours(Number(hh), Number(mm), Number(ss ?? "0"), 0);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  return parseWpDate(value);
};

// start 〜 end の期間内かどうかを判定する。null は制限なしとみなす
export const isWithinRange = (
  start: Date | null,
  end: Date | null,
  now: Date,
): boolean => {
  if (start && now < start) return false;
  if (end && now > end) return false;
  return true;
};

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"] as const;

// 日付を "YYYY年M月D日 (曜)" 形式にフォーマットする
export const formatJpDate = (value?: string): string => {
  const date = parseWpDate(value);
  if (!date) return "日付未設定";
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 (${WEEKDAYS[date.getDay()]})`;
};
