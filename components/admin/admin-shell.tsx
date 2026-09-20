"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { apiFetch, getAdminToken, setAdminToken } from "@/lib/api";
import { SITE_NAME } from "@/lib/constants";

const nav = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/sites", label: "사이트" },
  { href: "/admin/submissions", label: "제보" },
  { href: "/admin/ads", label: "광고" },
  { href: "/admin/featured", label: "추천" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    apiFetch("/api/admin/me")
      .then(() => setReady(true))
      .catch(() => {
        setAdminToken(null);
        router.replace("/admin/login");
      });
  }, [pathname, router]);

  function logout() {
    setAdminToken(null);
    router.replace("/admin/login");
  }

  if (!ready) {
    return <p className="text-sm text-muted">관리자 확인 중…</p>;
  }

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
          <button type="button" onClick={logout} className="rounded-lg px-3 py-2 text-left text-muted hover:text-foreground">
            로그아웃
          </button>
        </nav>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
