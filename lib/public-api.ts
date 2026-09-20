import { API_URL } from "@/lib/api";

export async function publicApi<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  if (response.status === 404) {
    throw new Error("NOT_FOUND");
  }
  if (!response.ok) {
    throw new Error(`요청 실패 (${response.status})`);
  }
  return (await response.json()) as T;
}
