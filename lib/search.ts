import { PAGE_SIZE } from "@/lib/constants";

export type SearchParams = {
  slug: string;
  page?: number;
};

export async function searchOrganic(_params: SearchParams) {
  return { items: [], total: 0, pageSize: PAGE_SIZE };
}
