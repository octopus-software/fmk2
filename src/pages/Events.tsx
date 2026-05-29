import { Link, useSearchParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { fetchEvents } from "@/features/events/api/fetchEvents";
import { EVENTS_PAGE_SIZE } from "@/features/events/constants/events";
import { formatEventDate, getEventImageUrl, isEventNew } from "@/features/events/utils/events";
import type { EventApiItem } from "@/features/events/types/events";
import { htmlToText, truncateText } from "@/features/news/utils/text";

const parsePublishDate = (value?: string, now = new Date()) => {
  if (!value) return null;

  const timeOnly = value.match(/^(\d{2}):(\d{2})(?::(\d{2}))?$/);
  if (timeOnly) {
    const [, hh, mm, ss] = timeOnly;
    const date = new Date(now);
    date.setHours(Number(hh), Number(mm), Number(ss ?? "0"), 0);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const normalized =
    value.includes(" ") && !value.includes("T")
      ? value.replace(" ", "T")
      : value;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getEventDateSortValue = (event: EventApiItem) => {
  const raw = event.acf?.event_date;
  if (raw && /^\d{8}$/.test(raw)) {
    return Number(raw);
  }

  const fallback = event.date ? new Date(event.date).getTime() : Number.NEGATIVE_INFINITY;
  return Number.isNaN(fallback) ? Number.NEGATIVE_INFINITY : fallback;
};

const isVisibleNow = (event: EventApiItem, now: Date) => {
  const startAt = parsePublishDate(event.acf?.publish_start_at, now);

  // イベント一覧は開始前のみ非表示。終了後は表示対象に含める。
  if (startAt && now < startAt) return false;
  return true;
};

export default function Events() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState<EventApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentPage = useMemo(() => {
    const raw = Number(searchParams.get("page") ?? "1");
    return Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 1;
  }, [searchParams]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(events.length / EVENTS_PAGE_SIZE));
  }, [events]);

  const pagedEvents = useMemo(() => {
    const start = (currentPage - 1) * EVENTS_PAGE_SIZE;
    return events.slice(start, start + EVENTS_PAGE_SIZE);
  }, [events, currentPage]);

  const pagerItems = useMemo<(number | "...")[]>(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

    if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];

    if (currentPage >= totalPages - 3) {
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  }, [currentPage, totalPages]);

  const onPageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === currentPage) return;

    const nextParams = new URLSearchParams(searchParams);
    if (nextPage === 1) {
      nextParams.delete("page");
    } else {
      nextParams.set("page", String(nextPage));
    }
    setSearchParams(nextParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const items = await fetchEvents();
        const now = new Date();
        const visibleItems = items
          .filter((event) => isVisibleNow(event, now))
          .sort((a, b) => getEventDateSortValue(b) - getEventDateSortValue(a));

        if (!cancelled) {
          setEvents(visibleItems);
          setError(null);
        }
      } catch {
        if (!cancelled) {
          setError("イベントの取得に失敗しました");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (currentPage <= totalPages) return;

    const nextParams = new URLSearchParams(searchParams);
    if (totalPages === 1) {
      nextParams.delete("page");
    } else {
      nextParams.set("page", String(totalPages));
    }
    setSearchParams(nextParams);
  }, [currentPage, searchParams, setSearchParams, totalPages]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl mb-4 uppercase tracking-wider">EVENT</h1>
            <p className="text-xl opacity-90">イベント一覧</p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav>
            <ol className="flex items-center gap-2 text-sm text-gray-600">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors">
                  ホーム
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900">イベント</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Events Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && <div className="text-center text-gray-600 py-8">読み込み中...</div>}
          {error && <div className="text-center text-red-500 py-8">{error}</div>}

          {!loading && !error && events.length === 0 && (
            <div className="text-center text-gray-600 py-8">イベントはありません</div>
          )}

          {!loading && !error && events.length > 0 && (
            <>
              <div className="mb-4 text-sm text-gray-600">
                {currentPage} / {totalPages} ページ・表示中 {pagedEvents.length} 件
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {pagedEvents.map((event) => (
                  <Link
                    key={event.id}
                    to={`/events/${event.id}`}
                    className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    <div className="relative">
                      {isEventNew(event.acf?.publish_start_at ?? event.date) && (
                        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded z-10">
                          NEW
                        </div>
                      )}
                      <ImageWithFallback
                        src={getEventImageUrl(event)}
                        alt={htmlToText(event.title?.rendered) || "イベント画像"}
                        className="w-full aspect-square object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="inline-block bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded mb-3">
                        {event.acf?.category ?? "カテゴリなし"}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {formatEventDate(event.acf?.event_date ?? event.date)}
                      </p>
                      <h3 className="text-base leading-relaxed mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                        {htmlToText(event.title?.rendered) || "タイトルなし"}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {truncateText(
                          htmlToText(event.content?.rendered) || "イベント詳細は準備中です",
                          80,
                        )}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage <= 1 || loading}
                  className="px-4 py-2 rounded border border-gray-300 text-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
                >
                  前へ
                </button>

                {pagerItems.map((item, index) => {
                  if (item === "...") {
                    return (
                      <span
                        key={`ellipsis-${index}`}
                        className="px-2 text-sm text-gray-500"
                      >
                        ...
                      </span>
                    );
                  }

                  const isActive = item === currentPage;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => onPageChange(item)}
                      className={`min-w-9 px-3 py-2 rounded border text-sm cursor-pointer ${
                        isActive
                          ? "border-purple-600 bg-purple-600 text-white"
                          : "border-gray-300 text-gray-700 hover:bg-gray-100"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages || loading}
                  className="px-4 py-2 rounded border border-gray-300 text-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
                >
                  次へ
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
