"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { StatusBadge } from "@/components/admin/status-badge";
import { apiFetch } from "@/lib/api";

type SiteRow = {
  id: string;
  name: string;
  slug: string;
  url: string;
  status: string;
  category?: { id: string; name: string };
};

type Category = { id: string; name: string };

export default function AdminSitesPage() {
  const [sites, setSites] = useState<SiteRow[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [target, setTarget] = useState<SiteRow | null>(null);

  useEffect(() => {
    Promise.all([apiFetch<SiteRow[]>("/api/admin/sites"), apiFetch<Category[]>("/api/admin/categories")])
      .then(([rows, cats]) => {
        setSites(rows);
        setCategories(cats);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "목록을 불러오지 못했습니다."));
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return sites.filter((site) => {
      if (categoryId && site.category?.id !== categoryId) return false;
      if (!needle) return true;
      return [site.name, site.slug, site.url, site.category?.name ?? ""].some((value) =>
        value.toLowerCase().includes(needle),
      );
    });
  }, [sites, query, categoryId]);

  async function confirmRemove() {
    if (!target) return;
    setPending(true);
    setError("");
    try {
      await apiFetch(`/api/admin/sites/${target.id}`, { method: "DELETE" });
      setSites((rows) => rows.filter((row) => row.id !== target.id));
      setTarget(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "삭제에 실패했습니다.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">사이트</h1>
        <Link href="/admin/sites/new" className="rounded-lg bg-point px-4 py-2 text-sm font-medium text-white">
          새 사이트
        </Link>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="이름, 주소, 슬러그 검색"
          className="h-10 min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 text-sm"
        />
        <select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          className="h-10 rounded-lg border border-line bg-surface px-3 text-sm sm:w-44"
        >
          <option value="">전체 장르</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <p className="text-sm text-muted">
        {filtered.length}곳{query || categoryId ? ` · 전체 ${sites.length}곳 중` : ""}
      </p>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      {sites.length === 0 && !error ? <p className="text-sm text-muted">아직 등록된 사이트가 없습니다.</p> : null}
      {sites.length > 0 && filtered.length === 0 ? (
        <p className="text-sm text-muted">조건에 맞는 사이트가 없습니다.</p>
      ) : null}
      <ul className="divide-y divide-line overflow-x-auto rounded-xl border border-line bg-surface">
        {filtered.map((site) => (
          <li key={site.id} className="flex items-center gap-3 px-4 py-3">
            <Link href={`/admin/sites/${site.id}`} className="min-w-0 flex-1 hover:text-point">
              <span className="font-medium">{site.name}</span>
              <span className="ml-2 text-sm text-muted">{site.category?.name}</span>
            </Link>
            <StatusBadge status={site.status} />
            <button
              type="button"
              onClick={() => setTarget(site)}
              className="shrink-0 text-sm text-danger hover:underline"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
      {target ? (
        <ConfirmDialog
          title="사이트를 삭제할까요?"
          message={`${target.name}을(를) 삭제하면 목록과 검색에서 바로 사라집니다. 되돌릴 수 없습니다.`}
          pending={pending}
          onConfirm={confirmRemove}
          onCancel={() => (pending ? undefined : setTarget(null))}
        />
      ) : null}
    </section>
  );
}
