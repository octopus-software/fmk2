import { Calendar } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

type NewsApiItem = {
  id: number;
  date?: string;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  acf?: {
    category?: string;
    start_at?: string;
  };
};

const htmlToText = (value?: string) => {
  if (!value) return "";

  if (typeof window !== "undefined" && "DOMParser" in window) {
    const doc = new DOMParser().parseFromString(value, "text/html");
    return (doc.body.textContent ?? "").replace(/\s+/g, " ").trim();
  }

  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
};

const formatDate = (value?: string) => {
  if (!value) return "日付未設定";
  const normalized =
    value.includes(" ") && !value.includes("T")
      ? value.replace(" ", "T")
      : value;
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("ja-JP");
};

const toTime = (value?: string) => {
  if (!value) return Number.NEGATIVE_INFINITY;
  const normalized =
    value.includes(" ") && !value.includes("T")
      ? value.replace(" ", "T")
      : value;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime())
    ? Number.NEGATIVE_INFINITY
    : date.getTime();
};

export default function News() {
  const [newsItems, setNewsItems] = useState<NewsApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://35.78.43.19/index.php?rest_route=/wp/v2/news")
      .then((response) => {
        const items = Array.isArray(response.data)
          ? (response.data as NewsApiItem[])
          : [];
        const now = Date.now();
        const visible = items.filter((item) => {
          const startAtTime = toTime(item.acf?.start_at);
          // start_atが未設定/不正なら表示対象に含める
          return (
            startAtTime === Number.NEGATIVE_INFINITY ||
            startAtTime <= now
          );
        });
        const sorted = [...visible].sort(
          (a, b) =>
            toTime(b.acf?.start_at) -
            toTime(a.acf?.start_at),
        );
        setNewsItems(sorted);
        setError(null);
      })
      .catch(() => {
        setError("お知らせの取得に失敗しました");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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

          {!loading && !error && newsItems.length === 0 && (
            <div className="text-center text-gray-600 py-8">
              お知らせはありません
            </div>
          )}

          {!loading && !error && newsItems.length > 0 && (
            <div className="space-y-6">
              {newsItems.map((news) => (
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
                          {htmlToText(news.content?.rendered) || "本文なし"}
                        </p>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
