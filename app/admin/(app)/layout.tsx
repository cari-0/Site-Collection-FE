import type { ReactNode } from "react";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

const nav = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/sites", label: "사이트" },
  { href: "/admin/submissions", label: "제보" },
  { href: "/admin/ads", label: "광고" },
  { href: "/admin/featured", label: "추천" },
];

export default function AdminAppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[1080px] flex-col gap-6 md:flex-row">
      <aside className="w-full shrink-0 md:w-48">
        <p className="mb-3 text-sm font-semibold">{SITE_NAME} 관리</p>
        <nav className="flex flex-col gap-1 text-sm">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-lg px-3 py-2 hover:bg-surface hover:text-point">
              {item.label}
            </Link>
          ))}
          <Link href="/admin/login" className="rounded-lg px-3 py-2 text-muted hover:text-foreground">
            로그인
          </Link>
        </nav>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
