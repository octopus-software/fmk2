import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router";
import { Calendar, ArrowLeft } from "lucide-react";
import {
  fetchNews,
  fetchNewsById,
  filterStartedNews,
  sortNewsByStartAtDesc,
} from "@/features/news/api/fetchNews";
import type { NewsApiItem } from "@/features/news/types/news";
import { toTime } from "@/features/news/utils/date";
import { htmlToText } from "@/features/news/utils/text";

const formatNewsDetailDate = (value?: string) => {
  if (!value) return "日付未設定";

  const normalized = value.includes(" ") && !value.includes("T")
    ? value.replace(" ", "T")
    : value;
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return value;

  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 (${weekdays[date.getDay()]})`;
};

export default function NewsDetail() {
  const { id } = useParams();
  const newsId = useMemo(() => Number(id), [id]);

  const [newsItem, setNewsItem] = useState<NewsApiItem | null>(null);
  const [relatedItems, setRelatedItems] = useState<NewsApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!Number.isFinite(newsId) || newsId <= 0) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const [detail, list] = await Promise.all([
          fetchNewsById(newsId),
          fetchNews(),
        ]);

        const related = sortNewsByStartAtDesc(filterStartedNews(list))
          .filter((item) => item.id !== newsId)
          .slice(0, 4);

        if (!cancelled) {
          // start_atが未来のお知らせは詳細ページで404扱い
          if (toTime(detail.acf?.start_at) > Date.now()) {
            setNotFound(true);
            setNewsItem(null);
            setRelatedItems([]);
            setError(null);
            return;
          }

          setNotFound(false);
          setNewsItem(detail);
          setRelatedItems(related);
          setError(null);
        }
      } catch (e: unknown) {
        if (!cancelled) {
          const status = (e as { response?: { status?: number } })?.response?.status;
          if (status === 404) {
            setNotFound(true);
            setError(null);
          } else {
            setNotFound(false);
            setError("お知らせの取得に失敗しました");
          }
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
  }, [newsId]);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4 text-gray-800">404: お知らせが見つかりません</h1>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>お知らせ一覧に戻る</span>
          </Link>
        </div>
      </div>
    );
  }

  if (error || !newsItem) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4 text-gray-800">{error ?? "お知らせが見つかりません"}</h1>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>お知らせ一覧に戻る</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen text-sm md:text-base">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-blue-600 transition-colors">
                ホーム
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/news" className="hover:text-blue-600 transition-colors">
                お知らせ
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">詳細</li>
          </ol>
        </nav>

        {/* Article */}
        <article className="bg-white rounded-lg shadow-lg p-6 md:p-12">
          {/* Meta Info */}
          <div className="flex flex-col items-start gap-2 mb-6 pb-6 border-b border-gray-200 md:flex-row md:flex-wrap md:items-center md:gap-4">
            <span className="bg-blue-500 text-white text-[11px] md:text-xs px-4 py-1 rounded-full">
              {newsItem.acf?.category ?? "カテゴリなし"}
            </span>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <time className="text-xs md:text-sm">{formatNewsDetailDate(newsItem.acf?.start_at ?? newsItem.date)}</time>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-lg md:text-2xl mb-8 text-gray-900 leading-relaxed">
            {htmlToText(newsItem.title?.rendered) || "タイトルなし"}
          </h1>

          {/* Content */}
          {newsItem.content?.rendered ? (
            <div
              className="wp-content"
              dangerouslySetInnerHTML={{ __html: newsItem.content.rendered }}
            />
          ) : (
            <p>本文なし</p>
          )}

          {/* Back Button */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>お知らせ一覧に戻る</span>
            </Link>
          </div>
        </article>

        {/* Related News */}
        {relatedItems.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl md:text-2xl mb-6 text-gray-900">その他のお知らせ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedItems.map((item) => (
                <Link
                  key={item.id}
                  to={`/news/${item.id}`}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex flex-col items-start gap-2 mb-3 md:flex-row md:items-center md:gap-3">
                    <span className="bg-blue-500 text-white text-[11px] md:text-xs px-3 py-1 rounded-full">
                      {item.acf?.category ?? "カテゴリなし"}
                    </span>
                    <time className="text-xs md:text-sm text-gray-600">
                      {formatNewsDetailDate(item.acf?.start_at ?? item.date)}
                    </time>
                  </div>
                  <h3 className="text-sm md:text-base text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                    {htmlToText(item.title?.rendered) || "タイトルなし"}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
