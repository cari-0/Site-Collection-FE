"use client";

import { useEffect, useState } from "react";
import { Stats } from "@/components/admin/stats";
import { apiFetch } from "@/lib/api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ published: 0, pendingSubmissions: 0, pendingAds: 0 });

  useEffect(() => {
    apiFetch<typeof stats>("/api/admin/stats").then(setStats).catch(() => undefined);
  }, []);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">대시보드</h1>
      <Stats
        items={[
          { label: "공개 사이트", value: String(stats.published) },
          { label: "대기 제보", value: String(stats.pendingSubmissions) },
          { label: "대기 광고", value: String(stats.pendingAds) },
        ]}
      />
    </section>
  );
}
