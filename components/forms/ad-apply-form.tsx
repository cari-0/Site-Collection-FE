"use client";

import { FormEvent, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type Category = { id: string; name: string };

export function AdApplyForm({ keyword = "" }: { keyword?: string }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  const [periodType, setPeriodType] = useState("days7");

  useEffect(() => {
    apiFetch<Category[]>("/api/categories")
      .then(setCategories)
      .catch(() => undefined);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    try {
      await apiFetch("/api/ads/apply", {
        method: "POST",
        body: JSON.stringify({
          name: String(form.get("name") ?? ""),
          url: String(form.get("url") ?? ""),
          description: String(form.get("description") ?? ""),
          categoryId: String(form.get("categoryId") ?? ""),
          keywords: String(form.get("keywords") ?? ""),
          periodType: String(form.get("periodType") ?? "days7"),
          periodNote: String(form.get("periodNote") ?? ""),
          contactEmail: String(form.get("contactEmail") ?? ""),
          contactPhone: String(form.get("contactPhone") ?? ""),
          website: String(form.get("website") ?? ""),
          consent: form.get("consent") === "on",
        }),
      });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "문의에 실패했습니다.");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <p className="rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed">
        접수되었습니다. 협의 후 연락드립니다.
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
      <Field label="소개" name="description" required textarea maxLength={300} />
      <label className="block text-sm font-medium">
        카테고리
        <select name="categoryId" required className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2">
          <option value="">선택</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <Field label="희망 키워드" name="keywords" required placeholder="쉼표로 구분, 1~5개" maxLength={200} defaultValue={keyword} />
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium">희망 기간</legend>
        {[
          { value: "days7", label: "7일" },
          { value: "days30", label: "30일" },
          { value: "other", label: "기타" },
        ].map((option) => (
          <label key={option.value} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="periodType"
              value={option.value}
              checked={periodType === option.value}
              onChange={() => setPeriodType(option.value)}
            />
            {option.label}
          </label>
        ))}
      </fieldset>
      {periodType === "other" ? (
        <Field label="기타 기간" name="periodNote" required placeholder="원하는 기간을 적어 주세요" />
      ) : null}
      <Field label="이메일" name="contactEmail" type="email" />
      <Field label="전화" name="contactPhone" />
      <label className="flex items-start gap-2 text-sm">
        <input name="consent" type="checkbox" required className="mt-1" />
        연락처는 광고 협의에만 사용합니다
      </label>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <p className="text-sm text-muted">비용은 문의 후 협의합니다</p>
      <button
        type="submit"
        disabled={pending}
        className="h-11 rounded-lg bg-point px-5 font-medium text-white disabled:opacity-60"
      >
        {pending ? "보내는 중…" : "광고 문의 보내기"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  textarea,
  maxLength,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
  maxLength?: number;
  defaultValue?: string;
}) {
  const className = "mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2";
  return (
    <label className="block text-sm font-medium">
      {label}
      {textarea ? (
        <textarea name={name} required={required} placeholder={placeholder} maxLength={maxLength} defaultValue={defaultValue} rows={4} className={className} />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} maxLength={maxLength} defaultValue={defaultValue} className={className} />
      )}
    </label>
  );
}
