import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "관리자 로그인",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <section className="mx-auto max-w-sm space-y-6 pt-16">
      <h1 className="text-2xl font-semibold">{SITE_NAME} 관리자</h1>
      <form className="space-y-3" action="#" method="post">
        <label className="block text-sm font-medium">
          이메일
          <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-line px-3 py-2" />
        </label>
        <label className="block text-sm font-medium">
          비밀번호
          <input name="password" type="password" required className="mt-1 w-full rounded-lg border border-line px-3 py-2" />
        </label>
        <button type="submit" className="h-11 w-full rounded-lg bg-point font-medium text-white">
          로그인
        </button>
      </form>
      <p className="text-sm text-muted">세션은 다음 단계에서 연결합니다.</p>
    </section>
  );
}
