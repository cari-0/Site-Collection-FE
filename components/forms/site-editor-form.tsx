"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type Category = { id: string; name: string };

type SiteValues = {
  name?: string;
  slug?: string;
  url?: string;
  description?: string;
  features?: string | null;
  keywordsText?: string;
  tagsText?: string;
  status?: string;
  categoryId?: string;
};

export function SiteEditorForm({ siteId, initial }: { siteId?: string; initial?: SiteValues }) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    apiFetch<Category[]>("/api/admin/categories").then(setCategories).catch(() => undefined);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    const body = {
      name: String(form.get("name") ?? ""),
      slug: String(form.get("slug") ?? ""),
      url: String(form.get("url") ?? ""),
      description: String(form.get("description") ?? ""),
      features: String(form.get("features") ?? ""),
      keywords: String(form.get("keywords") ?? ""),
      tags: String(form.get("tags") ?? ""),
      status: String(form.get("status") ?? "published"),
      categoryId: String(form.get("categoryId") ?? ""),
    };
    try {
      if (siteId) {
        await apiFetch(`/api/admin/sites/${siteId}`, { method: "PATCH", body: JSON.stringify(body) });
      } else {
        await apiFetch("/api/admin/sites", { method: "POST", body: JSON.stringify(body) });
      }
      router.push("/admin/sites");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "저장에 실패했습니다.");
    } finally {
      setPending(false);
    }
  }

  const slugLocked = Boolean(siteId && initial?.status === "published");

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Field label="사이트 이름" name="name" required defaultValue={initial?.name} />
      <Field
        label="슬러그"
        name="slug"
        defaultValue={initial?.slug}
        required={!siteId}
        disabled={slugLocked}
        placeholder="비우면 이름에서 만듭니다"
      />
      <Field label="URL" name="url" type="url" required defaultValue={initial?.url} placeholder="https://" />
      <label className="block text-sm font-medium">
        카테고리
        <select
          name="categoryId"
          required
          defaultValue={initial?.categoryId ?? ""}
          className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2"
        >
          <option value="" disabled>
            선택
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <Field label="소개" name="description" required textarea defaultValue={initial?.description} />
      <Field label="특징(줄마다 한 줄)" name="features" textarea defaultValue={initial?.features ?? ""} />
      <Field label="키워드" name="keywords" placeholder="쉼표로 구분" defaultValue={initial?.keywordsText} />
      <Field label="태그" name="tags" placeholder="쉼표로 구분" defaultValue={initial?.tagsText} />
      <label className="block text-sm font-medium">
        상태
        <select name="status" defaultValue={initial?.status ?? "published"} className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2">
          <option value="published">published</option>
          <option value="unpublished">unpublished</option>
        </select>
      </label>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <button type="submit" disabled={pending} className="h-11 rounded-lg bg-point px-5 font-medium text-white disabled:opacity-60">
        {pending ? "저장 중…" : "저장"}
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
  defaultValue,
  disabled,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
  defaultValue?: string;
  disabled?: boolean;
}) {
  const className = "mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2 disabled:bg-background";
  return (
    <label className="block text-sm font-medium">
      {label}
      {textarea ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={4}
          defaultValue={defaultValue}
          disabled={disabled}
          className={className}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          className={className}
        />
      )}
    </label>
  );
}
