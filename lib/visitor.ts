const KEY = "yusamo_vid";

export function getVisitorKey() {
  if (typeof window === "undefined") return "";
  let value = localStorage.getItem(KEY);
  if (!value) {
    value = crypto.randomUUID();
    localStorage.setItem(KEY, value);
  }
  return value;
}
