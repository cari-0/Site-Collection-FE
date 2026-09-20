"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { apiFetch, setAdminToken } from "@/lib/api";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    try {
      const result = await apiFetch<{ token: string }>("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({
          email: String(form.get("email") ?? ""),
          password: String(form.get("password") ?? ""),
        }),
      });
      setAdminToken(result.token);
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인에 실패했습니다.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      <label className="block text-sm font-medium">
        이메일
        <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-line px-3 py-2" />
      </label>
      <label className="block text-sm font-medium">
        비밀번호
        <input name="password" type="password" required className="mt-1 w-full rounded-lg border border-line px-3 py-2" />
      </label>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="h-11 w-full rounded-lg bg-point font-medium text-white disabled:opacity-60"
      >
        {pending ? "확인 중…" : "로그인"}
      </button>
    </form>
  );
}
