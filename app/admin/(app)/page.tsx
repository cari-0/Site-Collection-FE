import { Stats } from "@/components/admin/stats";

export default function AdminDashboardPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">대시보드</h1>
      <Stats
        items={[
          { label: "공개 사이트", value: "0" },
          { label: "대기 제보", value: "0" },
          { label: "대기 광고", value: "0" },
        ]}
      />
    </section>
  );
}
