"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type StatsData = {
  published: number;
  pendingSubmissions: number;
  pendingAds: number;
  activeAds: number;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatsData>({
    published: 0,
    pendingSubmissions: 0,
    pendingAds: 0,
    activeAds: 0,
  });

  useEffect(() => {
    apiFetch<StatsData>("/api/admin/stats").then(setStats).catch(() => undefined);
  }, []);

  const items = [
    { label: "공개 사이트", value: String(stats.published), href: "/admin/sites" },
    { label: "대기 제보", value: String(stats.pendingSubmissions), href: "/admin/submissions" },
    { label: "대기 광고", value: String(stats.pendingAds), href: "/admin/ads" },
    { label: "진행 중 광고", value: String(stats.activeAds), href: "/admin/ads" },
  ];

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">대시보드</h1>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="block rounded-xl border border-line bg-surface p-4 hover:border-point">
              <p className="text-sm text-muted">{item.label}</p>
              <p className="mt-1 text-2xl font-semibold">{item.value}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
