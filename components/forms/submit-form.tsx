"use client";

import { FormEvent, useState } from "react";
import { apiFetch } from "@/lib/api";

export function SubmitForm() {
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [existingSlug, setExistingSlug] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setExistingSlug("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    try {
      await apiFetch("/api/submissions", {
        method: "POST",
        body: JSON.stringify({
          name: String(form.get("name") ?? ""),
          url: String(form.get("url") ?? ""),
          description: String(form.get("description") ?? ""),
          keywords: String(form.get("keywords") ?? ""),
          website: String(form.get("website") ?? ""),
        }),
      });
      setDone(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "제보에 실패했습니다.";
      setError(message);
      const slug = (err as { slug?: string }).slug;
      if (slug) setExistingSlug(slug);
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <p className="rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed">
        제보가 접수되었습니다. 검토 후 공개되며, 별도 연락은 드리지 않습니다.
      </p>
    );
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <label className="absolute left-[-9999px]" aria-hidden="true">
        회사
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <Field label="사이트 이름" name="name" required maxLength={80} />
      <Field label="URL" name="url" required maxLength={500} placeholder="example.com" />
      <Field label="한 줄 소개" name="description" required textarea maxLength={400} />
      <Field label="관련 키워드" name="keywords" placeholder="쉼표로 구분" maxLength={200} />
      {error ? (
        <p className="text-sm text-danger">
          {error}
          {existingSlug ? (
            <>
              {" "}
              <a href={`/sites/${encodeURIComponent(existingSlug)}`} className="underline">
                등록된 페이지 보기
              </a>
            </>
          ) : null}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="h-11 rounded-lg bg-point px-5 font-medium text-white disabled:opacity-60"
      >
        {pending ? "보내는 중…" : "제보하기"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  placeholder,
  textarea,
  maxLength,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
  maxLength?: number;
}) {
  const className = "mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2";
  return (
    <label className="block text-sm font-medium">
      {label}
      {textarea ? (
        <textarea name={name} required={required} placeholder={placeholder} maxLength={maxLength} rows={4} className={className} />
      ) : (
        <input name={name} type="text" required={required} placeholder={placeholder} maxLength={maxLength} className={className} />
      )}
    </label>
  );
}
