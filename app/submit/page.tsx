import type { Metadata } from "next";
import { SubmitForm } from "@/components/forms/submit-form";

export const metadata: Metadata = {
  title: "사이트 제보",
  robots: { index: false, follow: false },
};

export default function SubmitPage() {
  return (
    <section className="mx-auto max-w-[720px] space-y-6">
      <h1 className="text-2xl font-semibold">사이트 제보</h1>
      <p className="text-muted">유익한 한국 사이트를 알려 주세요. 연락처는 받지 않습니다.</p>
      <SubmitForm />
    </section>
  );
}
