import { API_URL } from "@/lib/api";
import { getVisitorKey } from "@/lib/visitor";

export function reportSiteOpen(slug: string) {
  if (!slug) return;
  fetch(`${API_URL}/api/sites/${encodeURIComponent(slug)}/open`, {
    method: "POST",
    headers: { "X-Visitor-Key": getVisitorKey() },
    keepalive: true,
  }).catch(() => undefined);
}
