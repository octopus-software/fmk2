import { Link } from "react-router";
import { ChevronRight } from "lucide-react";

export default function Sitemap() {
  const sitemapSections = [
    {
      title: "フィールズ南柏トップページ",
      links: [{ name: "トップページ", path: "/" }],
    },
    {
      title: "インフォメーション",
      links: [
        { name: "フィールズ南柏からのお知らせ", path: "/news" },
        { name: "イベント情報", path: "/events" },
      ],
    },
    {
      title: "フロア案内",
      links: [
        { name: "フロアマップ　全体", path: "/floor-guide" },
        { name: "フロアマップ　4階", path: "/floor-guide#4F" },
        { name: "フロアマップ　3階", path: "/floor-guide#3F" },
        { name: "フロアマップ　2階", path: "/floor-guide#2F" },
        { name: "フロアマップ　1階", path: "/floor-guide#1F" },
      ],
    },
    {
      title: "ショップリスト",
      links: [{ name: "ショップリスト", path: "/#floor" }],
    },
    {
      title: "フィールズ南柏までのアクセス",
      links: [
        { name: "車でのアクセス", path: "/access#car" },
        { name: "電車でのアクセス", path: "/access#train" },
        { name: "駐輪場のご案内", path: "/access#bycle" },
      ],
    },
    {
      title: "館内サービスのご案内",
      links: [{ name: "館内サービスのご案内", path: "/about" }],
    },
    {
      title: "問い合わせ",
      links: [{ name: "問い合わせ", path: "/contact" }],
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl mb-4 uppercase tracking-wider">
              SITEMAP
            </h1>
            <p className="text-xl opacity-90">サイトマップ</p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav>
            <ol className="flex items-center gap-2 text-sm text-gray-600">
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-600 transition-colors"
                >
                  ホーム
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900">サイトマップ</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden p-8 md:p-12">
          <div className="space-y-8">
            {sitemapSections.map((section, index) => (
              <div key={index}>
                <h2 className="text-2xl mb-4 text-gray-900 border-b border-gray-200 pb-2">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.path}
                        className="flex items-center gap-2 text-lg text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Back to Home */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>ホームに戻る</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}