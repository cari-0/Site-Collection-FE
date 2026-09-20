import { MAX_ADS_PER_KEYWORD } from "@/lib/constants";

export async function getActiveAds(_keywordSlug: string) {
  return { items: [], max: MAX_ADS_PER_KEYWORD };
}
