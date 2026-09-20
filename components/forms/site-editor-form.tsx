"use client";

export function SiteEditorForm() {
  return (
    <form className="space-y-4" action="#" method="post">
      <Field label="사이트 이름" name="name" required />
      <Field label="슬러그" name="slug" required />
      <Field label="URL" name="url" type="url" required />
      <Field label="소개" name="description" required textarea />
      <Field label="키워드" name="keywords" placeholder="쉼표로 구분" />
      <Field label="태그" name="tags" placeholder="쉼표로 구분" />
      <label className="block text-sm font-medium">
        상태
        <select name="status" className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2">
          <option value="published">published</option>
          <option value="unpublished">unpublished</option>
        </select>
      </label>
      <button type="submit" className="h-11 rounded-lg bg-point px-5 font-medium text-white">
        저장
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
}) {
  const className = "mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2";
  return (
    <label className="block text-sm font-medium">
      {label}
      {textarea ? (
        <textarea name={name} required={required} placeholder={placeholder} rows={4} className={className} />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} className={className} />
      )}
    </label>
  );
}
