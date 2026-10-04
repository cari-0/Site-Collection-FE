"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { StatusBadge } from "@/components/admin/status-badge";
import { apiFetch } from "@/lib/api";

type AdRequestRow = {
  id: string;
  name: string;
  url: string;
  description: string;
  keywordsText: string;
  periodType: string;
  periodNote: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  status: string;
  category: { name: string } | null;
  site: { id: string; name: string; slug: string } | null;
};

type AdSlotRow = {
  id: string;
  startsOn: string;
  endsOn: string;
  priority: number;
  phase: string;
  site: { id: string; name: string; slug: string };
  keyword: { name: string; slug: string };
};

type SiteRow = { id: string; name: string; status: string; keywordsText?: string };

function todayYmd() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Seoul" });
}

function addDays(ymd: string, days: number) {
  const date = new Date(`${ymd}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export default function AdminAdsPage() {
  const [tab, setTab] = useState<"requests" | "slots">("requests");
  const [requests, setRequests] = useState<AdRequestRow[]>([]);
  const [slots, setSlots] = useState<AdSlotRow[]>([]);
  const [sites, setSites] = useState<SiteRow[]>([]);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");
  const [convertId, setConvertId] = useState("");
  const [rejectId, setRejectId] = useState("");
  const [newSlot, setNewSlot] = useState(false);
  const [editingId, setEditingId] = useState("");

  async function reload() {
    const [nextRequests, nextSlots, nextSites] = await Promise.all([
      apiFetch<AdRequestRow[]>("/api/admin/ads/requests"),
      apiFetch<AdSlotRow[]>("/api/admin/ads/slots"),
      apiFetch<SiteRow[]>("/api/admin/sites"),
    ]);
    setRequests(nextRequests);
    setSlots(nextSlots);
    setSites(nextSites.filter((site) => site.status === "published"));
  }

  useEffect(() => {
    reload().catch((err) => setError(err instanceof Error ? err.message : "목록을 불러오지 못했습니다."));
  }, []);

  const converting = requests.find((item) => item.id === convertId);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">광고</h1>
      <div className="flex gap-2">
        <TabButton active={tab === "requests"} onClick={() => setTab("requests")}>
          문의
        </TabButton>
        <TabButton active={tab === "slots"} onClick={() => setTab("slots")}>
          슬롯
        </TabButton>
      </div>
      {error ? <p className="text-sm text-danger">{error}</p> : null}

      {tab === "requests" ? (
        <ul className="space-y-3">
          {requests.length === 0 ? <p className="text-sm text-muted">광고 문의가 없습니다.</p> : null}
          {requests.map((item) => (
            <li key={item.id} className="rounded-xl border border-line bg-surface p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">{item.name}</p>
                <StatusBadge status={item.status} />
              </div>
              <p className="mt-1 break-all text-sm text-muted">{item.url}</p>
              <p className="mt-2 text-sm leading-relaxed">{item.description}</p>
              <p className="mt-2 text-sm text-muted">
                {item.category?.name ?? "기타"} · {item.keywordsText} ·{" "}
                {item.periodType === "days7" ? "7일" : item.periodType === "days30" ? "30일" : item.periodNote || "기타"}
              </p>
              <p className="mt-1 text-sm text-muted">
                {item.contactEmail ?? "이메일 없음"} · {item.contactPhone ?? "전화 없음"}
              </p>
              {item.status === "pending" ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={busyId === item.id}
                    onClick={() => setConvertId(item.id)}
                    className="h-9 rounded-lg bg-point px-4 text-sm font-medium text-white disabled:opacity-60"
                  >
                    슬롯 만들기
                  </button>
                  <button
                    type="button"
                    disabled={busyId === item.id}
                    onClick={() => setRejectId(item.id)}
                    className="h-9 rounded-lg border border-line px-4 text-sm font-medium disabled:opacity-60"
                  >
                    거절
                  </button>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => {
              setEditingId("");
              setNewSlot(true);
            }}
            className="h-9 rounded-lg bg-point px-4 text-sm font-medium text-white"
          >
            슬롯 추가
          </button>
          {newSlot ? (
            <SlotForm
              sites={sites}
              requireSite
              pending={busyId === "new"}
              onCancel={() => setNewSlot(false)}
              onSubmit={async (body) => {
                setBusyId("new");
                setError("");
                try {
                  await apiFetch("/api/admin/ads/slots", { method: "POST", body: JSON.stringify(body) });
                  setNewSlot(false);
                  await reload();
                } catch (err) {
                  setError(err instanceof Error ? err.message : "슬롯 저장에 실패했습니다.");
                } finally {
                  setBusyId("");
                }
              }}
            />
          ) : null}
          <ul className="space-y-3">
            {slots.length === 0 ? <p className="text-sm text-muted">슬롯이 없습니다.</p> : null}
            {slots.map((slot) => (
              <li key={slot.id} className="rounded-xl border border-line bg-surface p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium">{slot.site.name}</p>
                  <StatusBadge status={slot.phase} />
                </div>
                <p className="mt-1 text-sm text-muted">
                  {slot.keyword.name} · {slot.startsOn} ~ {slot.endsOn} · 우선 {slot.priority}
                </p>
                {editingId === slot.id ? (
                  <SlotForm
                    hideSite
                    defaultKeyword={slot.keyword.name}
                    defaultStartsOn={slot.startsOn}
                    defaultEndsOn={slot.endsOn}
                    defaultPriority={slot.priority}
                    pending={busyId === slot.id}
                    onCancel={() => setEditingId("")}
                    onSubmit={async (body) => {
                      setBusyId(slot.id);
                      setError("");
                      try {
                        await apiFetch(`/api/admin/ads/slots/${slot.id}`, {
                          method: "PATCH",
                          body: JSON.stringify({
                            startsOn: body.startsOn,
                            endsOn: body.endsOn,
                            priority: body.priority,
                          }),
                        });
                        setEditingId("");
                        await reload();
                      } catch (err) {
                        setError(err instanceof Error ? err.message : "슬롯 수정에 실패했습니다.");
                      } finally {
                        setBusyId("");
                      }
                    }}
                  />
                ) : (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={Boolean(busyId)}
                      onClick={() => {
                        setNewSlot(false);
                        setEditingId(slot.id);
                      }}
                      className="h-9 rounded-lg bg-point px-4 text-sm font-medium text-white disabled:opacity-60"
                    >
                      수정
                    </button>
                    {slot.phase !== "ended" ? (
                      <button
                        type="button"
                        disabled={Boolean(busyId)}
                        onClick={async () => {
                          setBusyId(slot.id);
                          setError("");
                          try {
                            await apiFetch(`/api/admin/ads/slots/${slot.id}`, {
                              method: "PATCH",
                              body: JSON.stringify({ endNow: true }),
                            });
                            await reload();
                          } catch (err) {
                            setError(err instanceof Error ? err.message : "종료에 실패했습니다.");
                          } finally {
                            setBusyId("");
                          }
                        }}
                        className="h-9 rounded-lg border border-line px-4 text-sm font-medium disabled:opacity-60"
                      >
                        오늘 종료
                      </button>
                    ) : null}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {converting ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl border border-line bg-surface p-5">
            <h2 className="text-lg font-semibold">슬롯 만들기</h2>
            <p className="mt-1 text-sm text-muted">{converting.name} · {converting.keywordsText}</p>
            <SlotForm
              sites={sites}
              defaultKeyword={converting.keywordsText.split(/[,，]/)[0]?.trim() ?? ""}
              defaultPeriod={converting.periodType}
              pending={busyId === converting.id}
              onCancel={() => setConvertId("")}
              onSubmit={async (body) => {
                setBusyId(converting.id);
                setError("");
                try {
                  await apiFetch(`/api/admin/ads/requests/${converting.id}/convert`, {
                    method: "POST",
                    body: JSON.stringify(body),
                  });
                  setConvertId("");
                  await reload();
                } catch (err) {
                  setError(err instanceof Error ? err.message : "슬롯 만들기에 실패했습니다.");
                } finally {
                  setBusyId("");
                }
              }}
            />
          </div>
        </div>
      ) : null}

      {rejectId ? (
        <ConfirmDialog
          title="광고 문의를 거절할까요?"
          message="거절하면 노출되지 않습니다. 연락은 직접 하시면 됩니다."
          confirmLabel="거절"
          pending={busyId === rejectId}
          pendingLabel="거절 중…"
          onCancel={() => setRejectId("")}
          onConfirm={async () => {
            setBusyId(rejectId);
            setError("");
            try {
              await apiFetch(`/api/admin/ads/requests/${rejectId}/reject`, {
                method: "PATCH",
                body: JSON.stringify({}),
              });
              setRejectId("");
              await reload();
            } catch (err) {
              setError(err instanceof Error ? err.message : "거절에 실패했습니다.");
            } finally {
              setBusyId("");
            }
          }}
        />
      ) : null}
    </section>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 rounded-lg px-4 text-sm font-medium ${
        active ? "bg-point text-white" : "border border-line"
      }`}
    >
      {children}
    </button>
  );
}

function SlotForm({
  sites = [],
  defaultPeriod = "days7",
  defaultStartsOn,
  defaultEndsOn,
  defaultPriority = 0,
  defaultKeyword = "",
  requireSite,
  hideSite,
  pending,
  onSubmit,
  onCancel,
}: {
  sites?: SiteRow[];
  defaultKeyword?: string;
  defaultPeriod?: string;
  defaultStartsOn?: string;
  defaultEndsOn?: string;
  defaultPriority?: number;
  requireSite?: boolean;
  hideSite?: boolean;
  pending?: boolean;
  onSubmit: (body: { startsOn: string; endsOn: string; priority: number; siteId?: string }) => Promise<void>;
  onCancel: () => void;
}) {
  const start = useMemo(() => defaultStartsOn || todayYmd(), [defaultStartsOn]);
  const endDefault = defaultEndsOn || (defaultPeriod === "days30" ? addDays(start, 29) : addDays(start, 6));
  const [siteQuery, setSiteQuery] = useState("");
  const [siteId, setSiteId] = useState("");
  const selected = sites.find((site) => site.id === siteId);
  const matches = useMemo(() => {
    const needle = siteQuery.trim().toLowerCase();
    if (!needle) return [];
    return sites.filter((site) => site.name.toLowerCase().includes(needle)).slice(0, 12);
  }, [sites, siteQuery]);
  const keywordLabel = hideSite
    ? defaultKeyword
    : selected?.keywordsText || (requireSite ? "" : "사이트를 고르면 자동으로 들어갑니다");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (requireSite && !siteId) return;
    const form = new FormData(event.currentTarget);
    await onSubmit({
      startsOn: String(form.get("startsOn") ?? ""),
      endsOn: String(form.get("endsOn") ?? ""),
      priority: Number(form.get("priority") ?? 0),
      ...(siteId ? { siteId } : {}),
    });
  }

  return (
    <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
      {hideSite ? null : (
        <div>
          <p className="text-sm font-medium">사이트 {requireSite ? "" : "(비우면 문의 URL로 연결/등록)"}</p>
          {selected ? (
            <div className="mt-1 flex items-center justify-between gap-2 rounded-lg border border-line px-3 py-2">
              <span className="text-sm">{selected.name}</span>
              <button type="button" className="text-sm text-muted" onClick={() => { setSiteId(""); setSiteQuery(""); }}>
                다시 찾기
              </button>
            </div>
          ) : (
            <div className="relative mt-1">
              <input
                value={siteQuery}
                onChange={(event) => setSiteQuery(event.target.value)}
                placeholder="사이트 이름 검색"
                className="w-full rounded-lg border border-line px-3 py-2"
              />
              {siteQuery.trim() ? (
                <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-line bg-surface shadow-sm">
                  {matches.length === 0 ? (
                    <li className="px-3 py-2 text-sm text-muted">찾는 사이트가 없습니다.</li>
                  ) : (
                    matches.map((site) => (
                      <li key={site.id}>
                        <button
                          type="button"
                          className="w-full px-3 py-2 text-left text-sm hover:bg-ad-bg"
                          onClick={() => {
                            setSiteId(site.id);
                            setSiteQuery("");
                          }}
                        >
                          <span>{site.name}</span>
                          {site.keywordsText ? (
                            <span className="mt-0.5 block text-xs text-muted">{site.keywordsText}</span>
                          ) : null}
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              ) : null}
            </div>
          )}
        </div>
      )}
      <p className="text-sm">
        <span className="font-medium">키워드</span>
        <span className="mt-1 block text-muted">{keywordLabel || "이 사이트에 키워드가 없습니다."}</span>
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          시작일
          <input name="startsOn" type="date" required defaultValue={start} className="mt-1 w-full rounded-lg border border-line px-3 py-2" />
        </label>
        <label className="block text-sm font-medium">
          종료일
          <input name="endsOn" type="date" required defaultValue={endDefault} className="mt-1 w-full rounded-lg border border-line px-3 py-2" />
        </label>
      </div>
      <label className="block text-sm font-medium">
        우선순위
        <input name="priority" type="number" min={0} defaultValue={defaultPriority} className="mt-1 w-full rounded-lg border border-line px-3 py-2" />
      </label>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="h-10 rounded-lg border border-line px-4 text-sm">
          취소
        </button>
        <button
          type="submit"
          disabled={pending || (requireSite && !siteId) || Boolean(selected && !selected.keywordsText)}
          className="h-10 rounded-lg bg-point px-4 text-sm font-medium text-white disabled:opacity-60"
        >
          {pending ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}
