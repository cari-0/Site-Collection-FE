"use client";

import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [items, setItems] = useState<SubmissionRow[]>([]);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");

  useEffect(() => {
    apiFetch<SubmissionRow[]>("/api/admin/submissions")
      .then(setItems)
      .catch((err) => setError(err instanceof Error ? err.message : "목록을 불러오지 못했습니다."));
  }, []);

  async function remove(id: string) {
    if (!window.confirm("이 제보를 삭제할까요?")) return;
    setBusyId(id);
    setError("");
    try {
      await apiFetch(`/api/admin/submissions/${id}`, { method: "DELETE" });
      setItems((rows) => rows.filter((row) => row.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "삭제에 실패했습니다.");
    } finally {
      setBusyId("");
    }
  }

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
            {item.status === "pending" ? (
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={busyId === item.id}
                  onClick={() => router.push(`/admin/sites/new?from=${encodeURIComponent(item.id)}`)}
                  className="h-9 rounded-lg bg-point px-4 text-sm font-medium text-white disabled:opacity-60"
                >
                  등록
                </button>
                <button
                  type="button"
                  disabled={busyId === item.id}
                  onClick={() => remove(item.id)}
                  className="h-9 rounded-lg border border-line px-4 text-sm font-medium disabled:opacity-60"
                >
                  삭제
                </button>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
