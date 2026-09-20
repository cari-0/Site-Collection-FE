"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_NAME } from "@/lib/constants";

const links = [
  { href: "/submit", label: "제보하기" },
  { href: "/ads/apply", label: "광고 문의" },
  { href: "/legal/terms", label: "약관" },
  { href: "/legal/privacy", label: "개인정보" },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-[800px] flex-col gap-3 px-4 py-8 text-sm text-muted">
        <nav className="flex flex-wrap gap-x-4 gap-y-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-point">
              {link.label}
            </Link>
          ))}
        </nav>
        <p>© {SITE_NAME}</p>
      </div>
    </footer>
  );
}
