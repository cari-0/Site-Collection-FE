import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteCard, type SiteCardData } from "@/components/site/site-card";
import { SiteDetail } from "@/components/site/site-detail";
import { publicApi } from "@/lib/public-api";

type Props = {
  params: Promise<{ slug: string }>;
};

type Detail = SiteCardData & {
  features?: string[];
  related?: SiteCardData[];
};

async function loadSite(slug: string) {
  try {
    return await publicApi<Detail>(`/api/sites/${encodeURIComponent(slug)}`);
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") return null;
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const site = await loadSite(slug);
  if (!site) return { title: decodeURIComponent(slug) };
  return { title: site.name, description: site.description };
}

export default async function SiteDetailPage({ params }: Props) {
  const { slug } = await params;
  const site = await loadSite(slug);
  if (!site) notFound();

  return (
    <div className="mx-auto max-w-[720px] space-y-10">
      <SiteDetail
        name={site.name}
        description={site.description}
        url={site.url}
        category={site.category}
        tags={site.tags}
        features={site.features}
      />
      {site.related && site.related.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-sm text-muted">비슷한 사이트</h2>
          {site.related.map((item) => (
            <SiteCard key={item.slug} site={item} />
          ))}
        </section>
      ) : null}
    </div>
  );
}
