import { Link } from "react-router";
import { Building2 } from "lucide-react";
import { shopsItems } from "../app/data/shopsData";
import { ImageWithFallback } from "../app/components/figma/ImageWithFallback";

export default function FloorGuide() {
  const floors = [
    {
      id: "6F",
      name: "6F",
      description: "レストラン・カフェ",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: "5F",
      name: "5F",
      description: "エンターテインメント",
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: "4F",
      name: "4F",
      description: "書籍・家電・雑貨・フィットネス",
      color: "bg-pink-100 text-pink-600",
    },
    {
      id: "3F",
      name: "3F",
      description: "レストラン・カフェ",
      color: "bg-green-100 text-green-600",
    },
    {
      id: "2F",
      name: "2F",
      description: "ファッション・雑貨・サービス",
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: "1F",
      name: "1F",
      description: "食品・日用品・サービス",
      color: "bg-blue-100 text-blue-600",
    },
  ];

  const getShopsByFloor = (floor: string) => {
    return shopsItems.filter((shop) => shop.floor === floor);
  };

  const getCategoryName = (category: string) => {
    const categories: Record<string, string> = {
      fashion: "ファッション",
      food: "グルメ",
      grocery: "食品・日用品",
      service: "サービス",
    };
    return categories[category] || category;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl mb-4 uppercase tracking-wider">
              FLOOR GUIDE
            </h1>
            <p className="text-xl opacity-90">フロアガイド</p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
              <li className="text-gray-900">フロアガイド</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {floors.map((floor) => {
          const shops = getShopsByFloor(floor.id);

          return (
            <section
              key={floor.id}
              id={floor.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden mb-8"
            >
              {/* Floor Header */}
              <div className="bg-gray-100 p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div
                    className={`${floor.color} px-6 py-3 rounded-lg`}
                  >
                    <span className="text-2xl font-bold">
                      {floor.name}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl text-gray-900">
                      {floor.description}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {shops.length}店舗
                    </p>
                  </div>
                </div>
              </div>

              {/* Floor Map Image */}
              <div className="p-6 bg-gray-50">
                <div className="bg-gray-200 rounded-lg flex items-center justify-center h-64">
                  <div className="text-center">
                    <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-lg">
                      フロアマップ
                    </p>
                    <p className="text-gray-400 text-sm">
                      SAMPLE IMAGE
                    </p>
                  </div>
                </div>
              </div>

              {/* Shop List Table */}
              {shops.length > 0 ? (
                <div className="p-4 md:p-6">
                  {/* PC用テーブル */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                            店舗名
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                            カテゴリ
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                            電話番号
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                            営業時間
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {shops.map((shop) => (
                          <tr
                            key={shop.id}
                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                          >
                            <td className="py-3 px-4">
                              <Link
                                to={`/shops/${shop.id}`}
                                className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                              >
                                {shop.name}
                              </Link>
                            </td>
                            <td className="py-3 px-4">
                              <span className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                                {getCategoryName(shop.category)}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                              {shop.phone}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                              {shop.hours}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* スマホ用カード */}
                  <div className="md:hidden space-y-4">
                    {shops.map((shop) => (
                      <div
                        key={shop.id}
                        className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                      >
                        <Link
                          to={`/shops/${shop.id}`}
                          className="text-lg font-bold text-blue-600 hover:text-blue-700"
                        >
                          {shop.name}
                        </Link>

                        <div className="mt-4 space-y-3 text-sm">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              カテゴリ
                            </p>
                            <span className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                              {getCategoryName(shop.category)}
                            </span>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              電話番号
                            </p>
                            <p className="text-gray-700">
                              {shop.phone}
                            </p>
                          </div>

                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              営業時間
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                              {shop.hours}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  このフロアには店舗がありません
                </div>
              )}
            </section>
          );
        })}

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>ホームに戻る</span>
          </Link>
        </div>
      </div>
    </div>
  );
}