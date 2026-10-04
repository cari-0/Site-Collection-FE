"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteCard, type SiteCardData } from "@/components/site/site-card";
import { publicApi } from "@/lib/public-api";

const REFRESH_MS = 60_000;

type Feed = {
  keywords: { slug: string; name: string }[];
  sites: SiteCardData[];
};

export function HomeFeed({ initial }: { initial: Feed }) {
  const [keywords, setKeywords] = useState(initial.keywords);
  const [sites, setSites] = useState(initial.sites);

  useEffect(() => {
    const timer = window.setInterval(() => {
      publicApi<Feed>("/api/featured")
        .then((next) => {
          setKeywords(next.keywords ?? []);
          setSites((next.sites ?? []).slice(0, 6));
        })
        .catch(() => undefined);
    }, REFRESH_MS);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      {keywords.length > 0 ? (
        <div className="mt-12 w-full">
          <h2 className="text-[13px] font-medium tracking-wide text-muted">지금 많이 찾는</h2>
          <ol className="mt-3 flex flex-wrap justify-center gap-2">
            {keywords.map((keyword, index) => (
              <li key={keyword.slug}>
                <Link
                  href={`/k/${encodeURIComponent(keyword.slug)}`}
                  className="inline-flex h-9 items-center rounded-full border border-line bg-surface px-3.5 text-sm hover:border-point hover:text-point"
                >
                  <span className="mr-2 tabular-nums font-semibold text-point">{index + 1}</span>
                  {keyword.name}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
      {sites.length > 0 ? (
        <div className="mt-12 w-full text-left">
          <h2 className="text-center text-[13px] font-medium tracking-wide text-muted">방금 열어본 사이트</h2>
          <div className="mt-3 space-y-3">
            {sites.map((site) => (
              <SiteCard key={site.slug} site={site} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
