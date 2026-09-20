import { StatusBadge } from "@/components/admin/status-badge";

export default function AdminSubmissionsPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">제보</h1>
      <p className="text-sm text-muted">
        대기함은 DB 연결 후 채워집니다. <StatusBadge status="pending" />
      </p>
    </section>
  );
}
