import { HomeFeed } from "@/components/home/home-feed";
import { SearchForm } from "@/components/layout/search-form";
import { type SiteCardData } from "@/components/site/site-card";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { publicApi } from "@/lib/public-api";

type Featured = {
  keywords: { slug: string; name: string }[];
  sites: SiteCardData[];
};

export default async function HomePage() {
  let keywords: Featured["keywords"] = [];
  let sites: Featured["sites"] = [];
  try {
    const featured = await publicApi<Featured>("/api/featured");
    keywords = featured.keywords;
    sites = (featured.sites ?? []).slice(0, 6);
  } catch {
    keywords = [];
    sites = [];
  }

  return (
    <section className="mx-auto flex max-w-[720px] flex-col items-center pt-10 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">{SITE_NAME}</h1>
      <p className="mt-3 text-muted">{SITE_TAGLINE}</p>
      <div className="mt-8 flex w-full justify-center">
        <SearchForm size="hero" />
      </div>
      <HomeFeed initial={{ keywords, sites }} />
    </section>
  );
}
