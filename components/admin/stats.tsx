type Stat = { label: string; value: string };

export function Stats({ items }: { items: Stat[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <li key={item.label} className="rounded-xl border border-line bg-surface p-4">
          <p className="text-sm text-muted">{item.label}</p>
          <p className="mt-1 text-2xl font-semibold">{item.value}</p>
        </li>
      ))}
    </ul>
  );
}
