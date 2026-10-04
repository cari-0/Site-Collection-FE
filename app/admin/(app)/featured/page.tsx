"use client";

import { FormEvent, type ReactNode, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type Flag = { id: string; name: string; slug: string; count: number };
type Trend = { keywordId: string; name: string; slug: string; count: number; pinned: boolean; hidden: boolean };

type AdminFeatured = {
  pinned: Flag[];
  hidden: Flag[];
  trending: Trend[];
};

export default function AdminFeaturedPage() {
  const [data, setData] = useState<AdminFeatured>({ pinned: [], hidden: [], trending: [] });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");
  const [name, setName] = useState("");

  async function reload() {
    setData(await apiFetch<AdminFeatured>("/api/admin/featured"));
  }

  useEffect(() => {
    reload().catch((err) => setError(err instanceof Error ? err.message : "목록을 불러오지 못했습니다."));
  }, []);

  async function run(key: string, work: () => Promise<void>) {
    setBusy(key);
    setError("");
    try {
      await work();
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "처리에 실패했습니다.");
    } finally {
      setBusy("");
    }
  }

  async function setKeyword(action: "pin" | "hide", keywordName = name) {
    const value = keywordName.trim();
    if (!value) return;
    await run(`${action}-${value}`, async () => {
      await apiFetch("/api/admin/featured/keywords", {
        method: "POST",
        body: JSON.stringify({ name: value, action }),
      });
      setName("");
    });
  }

  return (
    <section className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">인기 검색어</h1>
        <p className="mt-2 text-sm text-muted">
          메인은 최근 7일 검색 횟수 순입니다. 고정은 항상 위에, 숨김은 검색이 많아도 안 나갑니다. 화면은 1분마다 바뀝니다.
        </p>
      </div>
      {error ? <p className="text-sm text-danger">{error}</p> : null}

      <form
        className="flex flex-wrap gap-2"
        onSubmit={(event: FormEvent) => {
          event.preventDefault();
          void setKeyword("pin");
        }}
      >
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="등록된 키워드 이름"
          className="h-10 min-w-[200px] flex-1 rounded-lg border border-line px-3"
        />
        <button
          type="submit"
          disabled={busy.startsWith("pin") || !name.trim()}
          className="h-10 rounded-lg bg-point px-4 text-sm font-medium text-white disabled:opacity-60"
        >
          고정
        </button>
        <button
          type="button"
          disabled={busy.startsWith("hide") || !name.trim()}
          onClick={() => void setKeyword("hide")}
          className="h-10 rounded-lg border border-line px-4 text-sm disabled:opacity-60"
        >
          숨김
        </button>
      </form>

      <Block title="고정">
        {data.pinned.length === 0 ? <p className="text-sm text-muted">없습니다.</p> : null}
        <ol className="space-y-2">
          {data.pinned.map((item, index) => (
            <li key={item.id} className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2">
              <span className="w-6 tabular-nums text-sm font-semibold text-point">{index + 1}</span>
              <span className="min-w-0 flex-1 text-sm">{item.name}</span>
              <span className="text-xs text-muted">{item.count}회</span>
              <button
                type="button"
                className="h-8 rounded-lg border border-line px-2 text-xs"
                disabled={Boolean(busy)}
                onClick={() =>
                  run(`up-${item.id}`, () =>
                    apiFetch(`/api/admin/featured/keywords/${item.id}/move`, {
                      method: "PATCH",
                      body: JSON.stringify({ direction: "up" }),
                    }).then(() => undefined),
                  )
                }
              >
                위
              </button>
              <button
                type="button"
                className="h-8 rounded-lg border border-line px-2 text-xs"
                disabled={Boolean(busy)}
                onClick={() =>
                  run(`down-${item.id}`, () =>
                    apiFetch(`/api/admin/featured/keywords/${item.id}/move`, {
                      method: "PATCH",
                      body: JSON.stringify({ direction: "down" }),
                    }).then(() => undefined),
                  )
                }
              >
                아래
              </button>
              <button
                type="button"
                className="h-8 rounded-lg border border-line px-2 text-xs"
                disabled={Boolean(busy)}
                onClick={() =>
                  run(`del-${item.id}`, () =>
                    apiFetch(`/api/admin/featured/keywords/${item.id}`, { method: "DELETE" }).then(() => undefined),
                  )
                }
              >
                해제
              </button>
            </li>
          ))}
        </ol>
      </Block>

      <Block title="숨김">
        {data.hidden.length === 0 ? <p className="text-sm text-muted">없습니다.</p> : null}
        <ul className="space-y-2">
          {data.hidden.map((item) => (
            <li key={item.id} className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2">
              <span className="min-w-0 flex-1 text-sm">{item.name}</span>
              <span className="text-xs text-muted">{item.count}회</span>
              <button
                type="button"
                className="h-8 rounded-lg border border-line px-2 text-xs"
                disabled={Boolean(busy)}
                onClick={() =>
                  run(`unhide-${item.id}`, () =>
                    apiFetch(`/api/admin/featured/keywords/${item.id}`, { method: "DELETE" }).then(() => undefined),
                  )
                }
              >
                해제
              </button>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="최근 7일 검색">
        {data.trending.length === 0 ? <p className="text-sm text-muted">아직 검색 기록이 없습니다.</p> : null}
        <ul className="space-y-2">
          {data.trending.map((item) => (
            <li key={item.keywordId} className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2">
              <span className="min-w-0 flex-1 text-sm">{item.name}</span>
              <span className="text-xs text-muted">{item.count}회</span>
              {item.pinned ? <span className="text-xs text-point">고정</span> : null}
              {item.hidden ? <span className="text-xs text-muted">숨김</span> : null}
              <button
                type="button"
                className="h-8 rounded-lg border border-line px-2 text-xs"
                disabled={Boolean(busy) || item.pinned}
                onClick={() => void setKeyword("pin", item.name)}
              >
                고정
              </button>
              <button
                type="button"
                className="h-8 rounded-lg border border-line px-2 text-xs"
                disabled={Boolean(busy) || item.hidden}
                onClick={() => void setKeyword("hide", item.name)}
              >
                숨김
              </button>
            </li>
          ))}
        </ul>
      </Block>
    </section>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}
