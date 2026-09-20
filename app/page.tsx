import Link from "next/link";
import { SearchForm } from "@/components/layout/search-form";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { publicApi } from "@/lib/public-api";

type Featured = {
  keywords: { slug: string; name: string }[];
};

export default async function HomePage() {
  let keywords: Featured["keywords"] = [];
  try {
    const featured = await publicApi<Featured>("/api/featured");
    keywords = featured.keywords;
  } catch {
    keywords = [];
  }

  return (
    <section className="mx-auto flex max-w-[720px] flex-col items-center pt-10 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">{SITE_NAME}</h1>
      <p className="mt-3 text-muted">{SITE_TAGLINE}</p>
      <div className="mt-8 flex w-full justify-center">
        <SearchForm size="hero" />
      </div>
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
    </section>
  );
}
