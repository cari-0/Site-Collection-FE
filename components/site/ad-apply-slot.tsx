import Link from "next/link";

export function AdApplySlot({ keyword }: { keyword: string }) {
  return (
    <article className="relative overflow-hidden rounded-xl border border-line border-l-4 border-l-ad-badge bg-ad-bg p-4">
      <span
        className="absolute top-3 right-3 rounded bg-ad-badge-bg px-1.5 py-0.5 text-xs font-semibold text-ad-badge"
        aria-label="광고"
      >
        AD
      </span>
      <p className="pr-12 text-xs text-muted">이 자리 · 광고</p>
      <h2 className="mt-1 text-lg font-semibold">‘{keyword}’ 맨 위에 올리고 싶다면</h2>
      <p className="mt-1 text-sm leading-relaxed text-muted">
        검색 상단의 노란 카드는 광고입니다. 실제 사이트는 협의 후에만 올라갑니다.
      </p>
      <Link
        href={`/ads/apply?keyword=${encodeURIComponent(keyword)}`}
        className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-lg border border-line bg-surface px-3 text-sm font-medium text-point sm:w-auto"
      >
        광고 문의하기
      </Link>
    </article>
  );
}
