import { Calendar } from "lucide-react";
import { Link } from "react-router";
import { newsItems } from "../data/newsData";

export default function News() {

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
                        <time className="text-sm">{news.date}</time>
                      </div>
                      <span
                        className={`${news.categoryColor} text-white text-xs px-4 py-1 rounded-full whitespace-nowrap`}
                      >
                        {news.category}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl mb-3 text-gray-900 hover:text-blue-600 transition-colors">
                        {news.title}
                      </h2>
                      <p className="text-gray-700 leading-relaxed">
                        {news.content}
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              1
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 rounded hover:bg-gray-100 transition-colors">
              2
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 rounded hover:bg-gray-100 transition-colors">
              3
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 rounded hover:bg-gray-100 transition-colors">
              次へ →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
