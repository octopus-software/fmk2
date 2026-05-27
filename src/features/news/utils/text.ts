export const htmlToText = (value?: string) => {
  if (!value) return "";

  if (typeof window !== "undefined" && "DOMParser" in window) {
    const doc = new DOMParser().parseFromString(value, "text/html");
    return (doc.body.textContent ?? "").replace(/\s+/g, " ").trim();
  }

  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
};

export const truncateText = (value: string, maxChars: number) => {
  if (value.length <= maxChars) return value;
  return `${value.slice(0, maxChars).trimEnd()}...`;
};

