"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import { getVisitorKey } from "@/lib/visitor";

type HeartButtonProps = {
  slug: string;
  initialCount?: number;
  showCount?: boolean;
  compact?: boolean;
};

export function HeartButton({
  slug,
  initialCount = 0,
  showCount = false,
  compact = false,
}: HeartButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const key = getVisitorKey();
    fetch(`${API_URL}/api/sites/${encodeURIComponent(slug)}/heart`, {
      headers: { "X-Visitor-Key": key },
    })
      .then((res) => res.json())
      .then((data: { heartCount?: number; liked?: boolean }) => {
        if (typeof data.heartCount === "number") setCount(data.heartCount);
        setLiked(Boolean(data.liked));
      })
      .catch(() => undefined);
  }, [slug]);

  async function onClick(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (pending) return;
    setPending(true);
    try {
      const response = await fetch(`${API_URL}/api/sites/${encodeURIComponent(slug)}/heart`, {
        method: "POST",
        headers: { "X-Visitor-Key": getVisitorKey() },
      });
      const data = (await response.json()) as { heartCount?: number; liked?: boolean };
      if (typeof data.heartCount === "number") setCount(data.heartCount);
      setLiked(Boolean(data.liked));
    } catch {
      /* ignore */
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      aria-pressed={liked}
      aria-label={liked ? "하트 취소" : "하트"}
      className={
        compact
          ? `flex h-7 w-7 items-center justify-center rounded-full text-sm shadow-sm ${
              liked ? "bg-white/95 text-point" : "bg-white/90 text-muted hover:text-point"
            }`
          : `inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-sm font-medium ${
              liked ? "border-point/30 bg-point/10 text-point" : "border-line bg-surface text-muted hover:text-point"
            }`
      }
    >
      <span aria-hidden>{liked ? "♥" : "♡"}</span>
      {showCount ? <span className="tabular-nums">{count}</span> : null}
    </button>
  );
}
