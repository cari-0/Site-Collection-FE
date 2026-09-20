import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = { title: "개인정보 처리방침" };

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-[720px] space-y-4 leading-relaxed">
      <h1 className="text-2xl font-semibold">개인정보 처리방침</h1>
      <p className="text-muted">
        {SITE_NAME}는 일반 회원가입이 없습니다. 광고 문의 연락처만 협의 목적으로 받습니다. 본문은 오픈 전에 확정합니다.
      </p>
    </article>
  );
}
