import { SiteCard, type SiteCardData } from "@/components/site/site-card";

export function AdCard({ site }: { site: SiteCardData }) {
  return <SiteCard site={site} ad />;
}
