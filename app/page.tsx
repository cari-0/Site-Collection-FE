import Link from "next/link";
import { SearchForm } from "@/components/layout/search-form";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

const featuredKeywords = [
  { slug: "키작녀-쇼핑몰", name: "키작녀 쇼핑몰" },
  { slug: "무료-디자인-소스", name: "무료 디자인 소스" },
  { slug: "취업-포트폴리오", name: "취업 포트폴리오" },
];

export default function HomePage() {
  return (
    <section className="mx-auto flex max-w-[720px] flex-col items-center pt-10 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">{SITE_NAME}</h1>
      <p className="mt-3 text-muted">{SITE_TAGLINE}</p>
      <div className="mt-8 w-full">
        <SearchForm size="hero" />
      </div>
      <ul className="mt-8 flex flex-wrap justify-center gap-2">
        {featuredKeywords.map((keyword) => (
          <li key={keyword.slug}>
            <Link
              href={`/k/${encodeURIComponent(keyword.slug)}`}
              className="inline-flex h-9 items-center rounded-full border border-line bg-surface px-3 text-sm hover:border-point hover:text-point"
            >
              {keyword.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
