const styles: Record<string, string> = {
  published: "bg-point/10 text-point",
  unpublished: "bg-line text-muted",
  pending: "bg-ad-badge-bg text-ad-badge",
  approved: "bg-point/10 text-point",
  rejected: "bg-danger/10 text-danger",
  converted: "bg-point/10 text-point",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${styles[status] ?? "bg-line text-muted"}`}>
      {status}
    </span>
  );
}
