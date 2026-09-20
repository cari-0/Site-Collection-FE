import { slugToDisplayName, toSlug } from "@/lib/slug";

export function nameFromSlug(slug: string): string {
  return slugToDisplayName(slug);
}

export function slugFromName(name: string): string {
  return toSlug(name);
}
