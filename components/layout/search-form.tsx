"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toSlug } from "@/lib/slug";

type SearchFormProps = {
  size?: "hero" | "header";
  defaultValue?: string;
};

export function SearchForm({ size = "header", defaultValue = "" }: SearchFormProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);
  const isHero = size === "hero";

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const slug = toSlug(query);
    if (!slug) return;
    router.push(`/k/${encodeURIComponent(slug)}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={
        isHero
          ? "mx-auto flex h-[52px] w-full max-w-[560px] items-center rounded-full border border-line bg-surface pl-5 pr-1.5"
          : "flex h-10 w-full max-w-[360px] items-center rounded-lg border border-line bg-surface pl-3 pr-1"
      }
    >
      <label className="sr-only" htmlFor={`search-${size}`}>
        검색어
      </label>
      <input
        id={`search-${size}`}
        name="q"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="찾고 싶은 사이트를 검색하세요"
        className={`min-w-0 flex-1 border-0 bg-transparent text-foreground outline-none placeholder:text-muted ${
          isHero ? "text-base" : "text-sm"
        }`}
      />
      <button
        type="submit"
        className={`shrink-0 bg-point font-medium text-white transition-opacity duration-150 hover:opacity-90 ${
          isHero ? "h-10 rounded-full px-5" : "h-8 rounded-md px-3 text-sm"
        }`}
      >
        검색
      </button>
    </form>
  );
}
