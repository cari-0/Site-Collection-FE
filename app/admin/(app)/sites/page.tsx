import Link from "next/link";
import { StatusBadge } from "@/components/admin/status-badge";

export default function AdminSitesPage() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">사이트</h1>
        <Link href="/admin/sites/new" className="rounded-lg bg-point px-4 py-2 text-sm font-medium text-white">
          새 사이트
        </Link>
      </div>
      <p className="text-sm text-muted">
        목록은 DB 연결 후 채워집니다. <StatusBadge status="published" />
      </p>
    </section>
  );
}
