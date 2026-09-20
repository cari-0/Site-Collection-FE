import Link from "next/link";

export type SiteCardData = {
  slug: string;
  name: string;
  description: string;
  url: string;
  category?: string;
  tags?: string[];
  imageUrl?: string | null;
};

type SiteCardProps = {
  site: SiteCardData;
  ad?: boolean;
};

export function SiteCard({ site, ad = false }: SiteCardProps) {
  const tags = (site.tags ?? []).slice(0, 5);
  const initial = site.name.slice(0, 1);

  return (
    <article
      className={`relative overflow-hidden rounded-xl border border-line p-4 ${
        ad ? "border-l-4 border-l-ad-badge bg-ad-bg" : "bg-surface"
      }`}
    >
      {ad ? (
        <span className="absolute top-3 right-3 rounded bg-ad-badge-bg px-1.5 py-0.5 text-xs font-semibold text-ad-badge">
          AD
        </span>
      ) : null}
      <div className="flex gap-4">
        <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-point/10 text-xl font-semibold text-point sm:h-24 sm:w-24">
          {site.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={site.imageUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            initial
          )}
        </div>
        <div className="min-w-0 flex-1">
          <Link href={`/sites/${encodeURIComponent(site.slug)}`} className="block">
            <p className="text-xs text-muted">
              {site.category}
              {tags.length > 0 ? ` · ${tags.map((tag) => `#${tag}`).join(" ")}` : ""}
            </p>
            <h2 className="mt-1 text-lg font-semibold">{site.name}</h2>
            <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{site.description}</p>
          </Link>
          <a
            href={site.url}
            target="_blank"
            rel={ad ? "noopener sponsored" : "noopener noreferrer"}
            className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-lg border border-line bg-surface px-3 text-sm font-medium text-point sm:w-auto"
          >
            바로가기
          </a>
        </div>
      </div>
    </article>
  );
}
