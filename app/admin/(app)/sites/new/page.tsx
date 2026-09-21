"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SiteEditorForm } from "@/components/forms/site-editor-form";
import { apiFetch } from "@/lib/api";

type SubmissionDraft = {
  id: string;
  name: string;
  url: string;
  description: string;
  keywordsText: string;
  status: string;
};

export default function AdminNewSitePage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted">불러오는 중…</p>}>
      <NewSiteForm />
    </Suspense>
  );
}

function NewSiteForm() {
  const search = useSearchParams();
  const from = search.get("from") ?? "";
  const [draft, setDraft] = useState<SubmissionDraft | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(Boolean(from));

  useEffect(() => {
    if (!from) return;
    apiFetch<SubmissionDraft>(`/api/admin/submissions/${from}`)
      .then((row) => {
        if (row.status !== "pending") {
          throw new Error("이미 처리된 제보입니다.");
        }
        setDraft(row);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "제보를 불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, [from]);

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">{from ? "제보로 사이트 등록" : "사이트 등록"}</h1>
      {from && draft ? (
        <p className="text-sm text-muted">제보 내용이 채워져 있습니다. 수정한 뒤 저장하면 공개됩니다.</p>
      ) : null}
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      {loading ? <p className="text-sm text-muted">불러오는 중…</p> : null}
      {!loading && !error ? (
        <SiteEditorForm
          submissionId={draft?.id}
          initial={
            draft
              ? {
                  name: draft.name,
                  url: draft.url,
                  description: draft.description,
                  keywordsText: draft.keywordsText,
                  status: "published",
                }
              : undefined
          }
        />
      ) : null}
    </section>
  );
}
