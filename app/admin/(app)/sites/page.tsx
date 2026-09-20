"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { StatusBadge } from "@/components/admin/status-badge";
import { apiFetch } from "@/lib/api";

type SiteRow = {
  id: string;
  name: string;
  slug: string;
  status: string;
  category?: { name: string };
};

export default function AdminSitesPage() {
  const [sites, setSites] = useState<SiteRow[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch<SiteRow[]>("/api/admin/sites")
      .then(setSites)
      .catch((err) => setError(err instanceof Error ? err.message : "목록을 불러오지 못했습니다."));
  }, []);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">사이트</h1>
        <Link href="/admin/sites/new" className="rounded-lg bg-point px-4 py-2 text-sm font-medium text-white">
          새 사이트
        </Link>
      </div>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      {sites.length === 0 && !error ? <p className="text-sm text-muted">아직 등록된 사이트가 없습니다.</p> : null}
      <ul className="divide-y divide-line overflow-x-auto rounded-xl border border-line bg-surface">
        {sites.map((site) => (
          <li key={site.id}>
            <Link href={`/admin/sites/${site.id}`} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-background">
              <span>
                <span className="font-medium">{site.name}</span>
                <span className="ml-2 text-sm text-muted">{site.category?.name}</span>
              </span>
              <StatusBadge status={site.status} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
