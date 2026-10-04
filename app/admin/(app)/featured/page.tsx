"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";

type FeaturedKeyword = { id: string; name: string; slug: string };
type FeaturedSite = { id: string; siteId: string; name: string; slug: string };
type SiteRow = { id: string; name: string; status: string };
type KeywordRow = { id: string; name: string; slug: string };

export default function AdminFeaturedPage() {
  const [keywords, setKeywords] = useState<FeaturedKeyword[]>([]);
  const [sites, setSites] = useState<FeaturedSite[]>([]);
  const [allSites, setAllSites] = useState<SiteRow[]>([]);
  const [allKeywords, setAllKeywords] = useState<KeywordRow[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");
  const [keywordName, setKeywordName] = useState("");
  const [siteQuery, setSiteQuery] = useState("");
  const [siteId, setSiteId] = useState("");

  async function reload() {
    const [featured, nextSites, nextKeywords] = await Promise.all([
      apiFetch<{ keywords: FeaturedKeyword[]; sites: FeaturedSite[] }>("/api/admin/featured"),
      apiFetch<SiteRow[]>("/api/admin/sites"),
      apiFetch<KeywordRow[]>("/api/admin/keywords"),
    ]);
    setKeywords(featured.keywords);
    setSites(featured.sites);
    setAllSites(nextSites.filter((site) => site.status === "published"));
    setAllKeywords(nextKeywords);
  }

  useEffect(() => {
    reload().catch((err) => setError(err instanceof Error ? err.message : "목록을 불러오지 못했습니다."));
  }, []);

  const selectedSite = allSites.find((site) => site.id === siteId);
  const takenSiteIds = new Set(sites.map((item) => item.siteId));
  const siteMatches = useMemo(() => {
    const needle = siteQuery.trim().toLowerCase();
    if (!needle) return [];
    return allSites
      .filter((site) => !takenSiteIds.has(site.id) && site.name.toLowerCase().includes(needle))
      .slice(0, 12);
  }, [allSites, siteQuery, takenSiteIds]);

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

  async function addKeyword(event: FormEvent) {
    event.preventDefault();
    const name = keywordName.trim();
    if (!name) return;
    await run("kw-add", async () => {
      await apiFetch("/api/admin/featured/keywords", { method: "POST", body: JSON.stringify({ name }) });
      setKeywordName("");
    });
  }

  async function addSite(event: FormEvent) {
    event.preventDefault();
    if (!siteId) return;
    await run("site-add", async () => {
      await apiFetch("/api/admin/featured/sites", { method: "POST", body: JSON.stringify({ siteId }) });
      setSiteId("");
      setSiteQuery("");
    });
  }

  return (
    <section className="space-y-8">
      <h1 className="text-2xl font-semibold">추천</h1>
      {error ? <p className="text-sm text-danger">{error}</p> : null}

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">인기 검색어</h2>
        <p className="text-sm text-muted">메인 ‘지금 많이 찾는’에 이 순서로 나갑니다.</p>
        <form className="flex flex-wrap gap-2" onSubmit={addKeyword}>
          <input
            value={keywordName}
            onChange={(event) => setKeywordName(event.target.value)}
            list="keyword-options"
            placeholder="키워드 이름"
            className="h-10 min-w-[200px] flex-1 rounded-lg border border-line px-3"
          />
          <datalist id="keyword-options">
            {allKeywords.map((item) => (
              <option key={item.id} value={item.name} />
            ))}
          </datalist>
          <button
            type="submit"
            disabled={busy === "kw-add" || !keywordName.trim()}
            className="h-10 rounded-lg bg-point px-4 text-sm font-medium text-white disabled:opacity-60"
          >
            추가
          </button>
        </form>
        <ol className="space-y-2">
          {keywords.length === 0 ? <p className="text-sm text-muted">아직 없습니다.</p> : null}
          {keywords.map((item, index) => (
            <li key={item.id} className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2">
              <span className="w-6 tabular-nums text-sm font-semibold text-point">{index + 1}</span>
              <span className="min-w-0 flex-1 text-sm">{item.name}</span>
              <MoveButtons
                disabled={Boolean(busy)}
                onUp={() => run(`kw-up-${item.id}`, () => apiFetch(`/api/admin/featured/keywords/${item.id}/move`, { method: "PATCH", body: JSON.stringify({ direction: "up" }) }))}
                onDown={() => run(`kw-down-${item.id}`, () => apiFetch(`/api/admin/featured/keywords/${item.id}/move`, { method: "PATCH", body: JSON.stringify({ direction: "down" }) }))}
                onRemove={() => run(`kw-del-${item.id}`, () => apiFetch(`/api/admin/featured/keywords/${item.id}`, { method: "DELETE" }))}
              />
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">추천 사이트</h2>
        <p className="text-sm text-muted">메인에 카드로 나갑니다. 최대 6곳.</p>
        <form className="space-y-2" onSubmit={addSite}>
          {selectedSite ? (
            <div className="flex items-center justify-between gap-2 rounded-lg border border-line px-3 py-2">
              <span className="text-sm">{selectedSite.name}</span>
              <button type="button" className="text-sm text-muted" onClick={() => { setSiteId(""); setSiteQuery(""); }}>
                다시 찾기
              </button>
            </div>
          ) : (
            <div className="relative">
              <input
                value={siteQuery}
                onChange={(event) => setSiteQuery(event.target.value)}
                placeholder="사이트 이름 검색"
                className="h-10 w-full rounded-lg border border-line px-3"
              />
              {siteQuery.trim() ? (
                <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-line bg-surface shadow-sm">
                  {siteMatches.length === 0 ? (
                    <li className="px-3 py-2 text-sm text-muted">찾는 사이트가 없습니다.</li>
                  ) : (
                    siteMatches.map((site) => (
                      <li key={site.id}>
                        <button type="button" className="w-full px-3 py-2 text-left text-sm hover:bg-ad-bg" onClick={() => { setSiteId(site.id); setSiteQuery(""); }}>
                          {site.name}
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              ) : null}
            </div>
          )}
          <button
            type="submit"
            disabled={busy === "site-add" || !siteId || sites.length >= 6}
            className="h-10 rounded-lg bg-point px-4 text-sm font-medium text-white disabled:opacity-60"
          >
            추가
          </button>
        </form>
        <ol className="space-y-2">
          {sites.length === 0 ? <p className="text-sm text-muted">아직 없습니다.</p> : null}
          {sites.map((item, index) => (
            <li key={item.id} className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2">
              <span className="w-6 tabular-nums text-sm font-semibold text-point">{index + 1}</span>
              <span className="min-w-0 flex-1 text-sm">{item.name}</span>
              <MoveButtons
                disabled={Boolean(busy)}
                onUp={() => run(`site-up-${item.id}`, () => apiFetch(`/api/admin/featured/sites/${item.id}/move`, { method: "PATCH", body: JSON.stringify({ direction: "up" }) }))}
                onDown={() => run(`site-down-${item.id}`, () => apiFetch(`/api/admin/featured/sites/${item.id}/move`, { method: "PATCH", body: JSON.stringify({ direction: "down" }) }))}
                onRemove={() => run(`site-del-${item.id}`, () => apiFetch(`/api/admin/featured/sites/${item.id}`, { method: "DELETE" }))}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function MoveButtons({
  disabled,
  onUp,
  onDown,
  onRemove,
}: {
  disabled?: boolean;
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
}) {
  const btn = "h-8 rounded-lg border border-line px-2 text-xs disabled:opacity-40";
  return (
    <div className="flex shrink-0 gap-1">
      <button type="button" className={btn} disabled={disabled} onClick={onUp}>
        위
      </button>
      <button type="button" className={btn} disabled={disabled} onClick={onDown}>
        아래
      </button>
      <button type="button" className={btn} disabled={disabled} onClick={onRemove}>
        빼기
      </button>
    </div>
  );
}
