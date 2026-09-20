import { HeartButton } from "@/components/site/heart-button";

type SiteDetailProps = {
  slug: string;
  name: string;
  description: string;
  url: string;
  category?: string;
  tags?: string[];
  features?: string[];
  heartCount?: number;
};

export function SiteDetail({
  slug,
  name,
  description,
  url,
  category,
  tags = [],
  features = [],
  heartCount = 0,
}: SiteDetailProps) {
  return (
    <article className="space-y-6">
      <header>
        <p className="text-sm text-muted">{category}</p>
        <h1 className="mt-1 text-2xl font-semibold">{name}</h1>
        <p className="mt-3 text-base leading-relaxed">{description}</p>
      </header>
      {features.length > 0 ? (
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      ) : null}
      {tags.length > 0 ? (
        <p className="text-sm text-muted">{tags.map((tag) => `#${tag}`).join(" ")}</p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">
        <HeartButton slug={slug} initialCount={heartCount} showCount />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center rounded-lg bg-point px-5 font-medium text-white"
        >
          사이트로 이동
        </a>
      </div>
    </article>
  );
}
