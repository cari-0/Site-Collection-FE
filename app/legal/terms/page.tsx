import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = { title: "이용약관" };

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-[720px] space-y-4 leading-relaxed">
      <h1 className="text-2xl font-semibold">이용약관</h1>
      <p className="text-muted">{SITE_NAME}는 큐레이션된 사이트 모음입니다. 본문은 오픈 전에 확정합니다.</p>
    </article>
  );
}
