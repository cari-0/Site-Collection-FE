"use client";

import { use, useEffect, useState } from "react";
import { SiteEditorForm } from "@/components/forms/site-editor-form";
import { apiFetch } from "@/lib/api";

type SiteDetail = {
  name: string;
  slug: string;
  url: string;
  description: string;
  features?: string | null;
  keywordsText?: string;
  tagsText?: string;
  status: string;
  categoryId: string;
};

export default function AdminEditSitePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [site, setSite] = useState<SiteDetail | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch<SiteDetail>(`/api/admin/sites/${id}`)
      .then(setSite)
      .catch((err) => setError(err instanceof Error ? err.message : "불러오지 못했습니다."));
  }, [id]);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">사이트 수정</h1>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      {site ? <SiteEditorForm siteId={id} initial={site} /> : !error ? <p className="text-sm text-muted">불러오는 중…</p> : null}
    </section>
  );
}
