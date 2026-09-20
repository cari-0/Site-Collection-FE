import { AD_RATE_LIMIT, SUBMIT_RATE_LIMIT } from "@/lib/constants";

export async function hashIp(ip: string): Promise<string> {
  const data = new TextEncoder().encode(ip);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function canSubmit(_ipHash: string): Promise<boolean> {
  void SUBMIT_RATE_LIMIT;
  return true;
}

export async function canApplyAd(_ipHash: string): Promise<boolean> {
  void AD_RATE_LIMIT;
  return true;
}
