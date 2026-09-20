"use client";

import { useEffect, useState } from "react";
import { StatusBadge } from "@/components/admin/status-badge";
import { apiFetch } from "@/lib/api";

type SubmissionRow = {
  id: string;
  name: string;
  url: string;
  description: string;
  keywordsText: string;
  status: string;
  createdAt: string;
};

export default function AdminSubmissionsPage() {
  const [items, setItems] = useState<SubmissionRow[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch<SubmissionRow[]>("/api/admin/submissions")
      .then(setItems)
      .catch((err) => setError(err instanceof Error ? err.message : "목록을 불러오지 못했습니다."));
  }, []);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">제보</h1>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      {items.length === 0 && !error ? (
        <p className="text-sm text-muted">대기 중인 제보가 없습니다.</p>
      ) : null}
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="rounded-xl border border-line bg-surface p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium">{item.name}</p>
              <StatusBadge status={item.status} />
            </div>
            <p className="mt-1 break-all text-sm text-muted">{item.url}</p>
            <p className="mt-2 text-sm leading-relaxed">{item.description}</p>
            {item.keywordsText ? <p className="mt-2 text-sm text-muted">키워드: {item.keywordsText}</p> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
