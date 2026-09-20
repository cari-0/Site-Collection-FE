"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_NAME } from "@/lib/constants";
import { SearchForm } from "@/components/layout/search-form";

export function Header() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  const hideSearch = pathname === "/";

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-surface">
      <div className="mx-auto flex h-14 max-w-[800px] items-center justify-between gap-4 px-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
          {SITE_NAME}
        </Link>
        {!hideSearch ? <SearchForm size="header" /> : null}
      </div>
    </header>
  );
}
