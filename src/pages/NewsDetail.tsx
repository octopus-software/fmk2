import { useParams, Link } from "react-router";
import { Calendar, ArrowLeft } from "lucide-react";
import { newsItems } from "../app/data/newsData";

export default function NewsDetail() {
  const { id } = useParams();
  const newsItem = newsItems.find((item) => item.id === Number(id));

  if (!newsItem) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4 text-gray-800">お知らせが見つかりません</h1>
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
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
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
        <article className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <time className="text-sm">{newsItem.date}</time>
            </div>
            <span
              className={`${newsItem.categoryColor} text-white text-xs px-4 py-1 rounded-full`}
            >
              {newsItem.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl mb-8 text-gray-900 leading-relaxed">
            {newsItem.title}
          </h1>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {newsItem.fullContent || newsItem.content}
            </div>
          </div>

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
        <div className="mt-12">
          <h2 className="text-2xl mb-6 text-gray-900">その他のお知らせ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsItems
              .filter((item) => item.id !== newsItem.id)
              .slice(0, 4)
              .map((item) => (
                <Link
                  key={item.id}
                  to={`/news/${item.id}`}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <time className="text-sm text-gray-600">{item.date}</time>
                    <span
                      className={`${item.categoryColor} text-white text-xs px-3 py-1 rounded-full`}
                    >
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-base text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
