import type { Metadata } from "next";
import { AdApplyForm } from "@/components/forms/ad-apply-form";

export const metadata: Metadata = {
  title: "광고 문의",
  robots: { index: false, follow: false },
};

export default function AdApplyPage() {
  return (
    <section className="mx-auto max-w-[720px] space-y-6">
      <h1 className="text-2xl font-semibold">광고 문의</h1>
      <p className="text-muted">키워드 상단 노출은 문의 후 협의합니다. 결제 기능은 없습니다.</p>
      <AdApplyForm />
    </section>
  );
}
