import type { Metadata } from "next";
import Link from "next/link";
import { AdApplySlot } from "@/components/site/ad-apply-slot";
import { AdCard } from "@/components/site/ad-card";
import { SiteCard, type SiteCardData } from "@/components/site/site-card";
import { nameFromSlug } from "@/lib/keywords";
import { publicApi } from "@/lib/public-api";

type Props = {
  params: Promise<{ slug: string }>;
};

type Landing = {
  name: string;
  ads: SiteCardData[];
  sites: SiteCardData[];
  total: number;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = nameFromSlug(slug);
  const description = `${name}에 맞는 사이트를 모았습니다.`;
  return {
    title: name,
    description,
    openGraph: { title: name, description },
  };
}

export default async function KeywordLandingPage({ params }: Props) {
  const { slug } = await params;
  let landing: Landing;
  try {
    landing = await publicApi<Landing>(`/api/k/${encodeURIComponent(slug)}`);
  } catch {
    landing = { name: nameFromSlug(slug), ads: [], sites: [], total: 0 };
  }

  return (
    <section className="mx-auto max-w-[800px] space-y-8">
      <h1 className="text-2xl font-semibold">{landing.name}</h1>
      {landing.sites.length > 0 ? (
        <div className="space-y-3">
          <p className="text-[13px] text-muted">광고</p>
          {landing.ads.length > 0 ? (
            landing.ads.map((site) => <AdCard key={site.slug} site={site} />)
          ) : (
            <AdApplySlot keyword={landing.name} />
          )}
        </div>
      ) : null}
      {landing.sites.length > 0 ? (
        <div className="space-y-3">
          <p className="text-[13px] text-muted">{landing.total}곳</p>
          {landing.sites.map((site) => (
            <SiteCard key={site.slug} site={site} />
          ))}
        </div>
      ) : (
        <p className="text-muted">아직 이 키워드에 맞는 사이트가 없습니다.</p>
      )}
      <p>
        <Link href="/submit" className="text-point underline">
          관련 사이트를 제보하기
        </Link>
      </p>
    </section>
  );
}
