import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/forms/admin-login-form";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "관리자 로그인",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <section className="mx-auto max-w-sm space-y-6 pt-16">
      <h1 className="text-2xl font-semibold">{SITE_NAME} 관리자</h1>
      <AdminLoginForm />
    </section>
  );
}
