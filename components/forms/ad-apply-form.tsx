"use client";

export function AdApplyForm() {
  return (
    <form className="space-y-4" action="#" method="post">
      <Field label="사이트 이름" name="name" required />
      <Field label="URL" name="url" type="url" required placeholder="https://" />
      <Field label="소개" name="description" required textarea />
      <Field label="희망 키워드" name="keywords" placeholder="쉼표로 구분" />
      <label className="block text-sm font-medium">
        희망 기간
        <select name="periodType" className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-2">
          <option value="days7">7일</option>
          <option value="days30">30일</option>
          <option value="other">기타</option>
        </select>
      </label>
      <Field label="이메일" name="contactEmail" type="email" />
      <Field label="전화" name="contactPhone" />
      <button type="submit" className="h-11 rounded-lg bg-point px-5 font-medium text-white">
        광고 문의 보내기
      </button>
      <p className="text-sm text-muted">가격·결제는 문의 후 협의합니다. 서버 액션은 다음 단계에서 연결합니다.</p>
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
