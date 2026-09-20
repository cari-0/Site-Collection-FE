export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

const TOKEN_KEY = "yusamo_admin_token";

export function getAdminToken() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) sessionStorage.setItem(TOKEN_KEY, token);
  else sessionStorage.removeItem(TOKEN_KEY);
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  const token = getAdminToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, { ...init, headers });
  const data = (await response.json().catch(() => ({}))) as T & { message?: string | string[] };
  if (!response.ok) {
    const message = Array.isArray(data.message) ? data.message.join(" ") : data.message;
    throw new Error(message || `요청 실패 (${response.status})`);
  }
  return data;
}

export async function apiUpload(file: File) {
  const headers = new Headers();
  const token = getAdminToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);
  const body = new FormData();
  body.append("file", file);
  const response = await fetch(`${API_URL}/api/uploads`, { method: "POST", headers, body });
  const data = (await response.json().catch(() => ({}))) as {
    imageUrl?: string;
    imageKey?: string;
    message?: string | string[];
  };
  if (!response.ok) {
    const message = Array.isArray(data.message) ? data.message.join(" ") : data.message;
    throw new Error(message || "이미지 업로드에 실패했습니다.");
  }
  return { imageUrl: data.imageUrl ?? "", imageKey: data.imageKey ?? "" };
}
