import { Calendar } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import {
  fetchNews,
  filterStartedNews,
  sortNewsByStartAtDesc,
} from "@/features/news/api/fetchNews";
import {
  NEWS_PAGE_SIZE,
  NEWS_PREVIEW_MAX_CHARS,
} from "@/features/news/constants/news";
import type { NewsApiItem } from "@/features/news/types/news";
import { formatDate } from "@/features/news/utils/date";
import { htmlToText, truncateText } from "@/features/news/utils/text";

export default function News() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allNewsItems, setAllNewsItems] = useState<NewsApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentPage = useMemo(() => {
    const raw = Number(searchParams.get("page") ?? "1");
    return Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 1;
  }, [searchParams]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(allNewsItems.length / NEWS_PAGE_SIZE));
  }, [allNewsItems]);

  const pagedNewsItems = useMemo(() => {
    const start = (currentPage - 1) * NEWS_PAGE_SIZE;
    return allNewsItems.slice(start, start + NEWS_PAGE_SIZE);
  }, [allNewsItems, currentPage]);

  const pagerItems = useMemo<(number | "...")[]>(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
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
        const items = await fetchNews();
        const visible = filterStartedNews(items);
        const sorted = sortNewsByStartAtDesc(visible);

        if (!cancelled) {
          setAllNewsItems(sorted);
          setError(null);
        }
      } catch {
        if (!cancelled) {
          setError("お知らせの取得に失敗しました");
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
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl mb-4 uppercase tracking-wider">NEWS</h1>
            <p className="text-xl opacity-90">お知らせ一覧</p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav>
            <ol className="flex items-center gap-2 text-sm text-gray-600">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors">
                  ホーム
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900">お知らせ</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* News List */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="text-center text-gray-600 py-8">
              読み込み中...
            </div>
          )}

          {error && (
            <div className="text-center text-red-500 py-8">
              {error}
            </div>
          )}

          {!loading && !error && allNewsItems.length === 0 && (
            <div className="text-center text-gray-600 py-8">
              お知らせはありません
            </div>
          )}

          {!loading && !error && allNewsItems.length > 0 && (
            <>
              <div className="mb-4 text-sm text-gray-600">
                {currentPage} / {totalPages} ページ・表示中 {pagedNewsItems.length} 件
              </div>

              <div className="space-y-6">
                {pagedNewsItems.map((news) => (
                  <Link
                    key={news.id}
                    to={`/news/${news.id}`}
                    className="block"
                  >
                    <article className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex items-center gap-3 md:flex-col md:items-start md:min-w-[120px]">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <time className="text-sm">
                              {formatDate(news.acf?.start_at ?? news.date)}
                            </time>
                          </div>
                          <span className="bg-blue-500 text-white text-xs px-4 py-1 rounded-full whitespace-nowrap">
                            {news.acf?.category ?? "カテゴリなし"}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl mb-3 text-gray-900 hover:text-blue-600 transition-colors">
                            {news.title?.rendered ?? "タイトルなし"}
                          </h2>
                          <p className="text-gray-700 leading-relaxed line-clamp-3">
                            {truncateText(
                              htmlToText(news.content?.rendered) || "本文なし",
                              NEWS_PREVIEW_MAX_CHARS,
                            )}
                          </p>
                        </div>
                      </div>
                    </article>
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
                          ? "border-blue-600 bg-blue-600 text-white"
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
