import { useParams, Link } from "react-router";
import { MapPin, Clock, Phone, Globe, ArrowLeft, Tag } from "lucide-react";
import { shopsItems } from "../data/shopsData";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function ShopDetail() {
  const { id } = useParams();
  const shop = shopsItems.find((item) => item.id === Number(id));

  if (!shop) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4 text-gray-800">店舗が見つかりません</h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ホームに戻る</span>
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryName = (category: string) => {
    const categories: Record<string, string> = {
      fashion: "ファッション",
      food: "グルメ",
      grocery: "食品・日用品",
      service: "サービス",
    };
    return categories[category] || category;
  };

  const getFloorColor = (floor: string) => {
    const colors: Record<string, string> = {
      "1F": "bg-blue-100 text-blue-600",
      "2F": "bg-orange-100 text-orange-600",
      "3F": "bg-green-100 text-green-600",
      "4F": "bg-pink-100 text-pink-600",
      "5F": "bg-purple-100 text-purple-600",
    };
    return colors[floor] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="bg-gray-50 min-h-screen text-sm md:text-base">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              <Link to="/#floor" className="hover:text-blue-600 transition-colors">
                店舗一覧
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{shop.name}</li>
          </ol>
        </nav>

        {/* Shop Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="relative h-64 md:h-80">
            <ImageWithFallback
              src={shop.image}
              alt={shop.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className={`${getFloorColor(shop.floor)} px-4 py-2 rounded-lg text-base md:text-lg font-bold`}>
                {shop.floor}
              </span>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {/* Category */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 text-xs md:text-sm px-4 py-2 rounded-full">
                <Tag className="w-4 h-4" />
                {getCategoryName(shop.category)}
              </span>
            </div>

            {/* Shop Name */}
            <h1 className="text-xl md:text-5xl mb-4 text-gray-900">
              {shop.name}
            </h1>

            <p className="text-sm md:text-xl text-gray-600 mb-8">{shop.description}</p>

            {/* Shop Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-xs md:text-sm text-gray-500 mb-1">フロア</div>
                  <div className="text-gray-900">{shop.floor}</div>
                </div>
              </div>

              {shop.hours && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-xs md:text-sm text-gray-500 mb-1">営業時間</div>
                    <div className="text-gray-900">{shop.hours}</div>
                  </div>
                </div>
              )}

              {shop.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-xs md:text-sm text-gray-500 mb-1">電話番号</div>
                    <div className="text-gray-900">{shop.phone}</div>
                  </div>
                </div>
              )}

              {shop.website && (
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-xs md:text-sm text-gray-500 mb-1">ウェブサイト</div>
                    <a
                      href={shop.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      公式サイトへ
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Full Description */}
            {shop.fullDescription && (
              <div className="prose prose-lg max-w-none">
                <h2 className="text-xl md:text-2xl mb-4 text-gray-900">店舗詳細</h2>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {shop.fullDescription}
                </div>
              </div>
            )}

            {/* Back Button */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link
                to="/#floor"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>店舗一覧に戻る</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Shops */}
        <div className="mt-12">
          <h2 className="text-xl md:text-2xl mb-6 text-gray-900">同じフロアの店舗</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {shopsItems
              .filter((item) => item.floor === shop.floor && item.id !== shop.id)
              .slice(0, 4)
              .map((item) => (
                <Link
                  key={item.id}
                  to={`/shops/${item.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
                >
                  <div className="h-32">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-xs md:text-sm font-medium mb-1 hover:text-blue-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[11px] md:text-xs text-gray-500">{item.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
