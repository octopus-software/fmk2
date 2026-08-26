import { Link } from "react-router";
import {
  Phone,
  Store,
  Truck,
  HelpCircle,
} from "lucide-react";

export default function Contact() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl mb-4 uppercase tracking-wider">
              CONTACT
            </h1>
            <p className="text-xl opacity-90">お問い合わせ</p>
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
              <li className="text-gray-900">お問い合わせ</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-xs md:text-base text-gray-700 mb-10">
          「フィールズ南柏」へのご意見、ご要望、お問い合わせ等ございましたら、お気軽に下記にご連絡ください。
        </p>

        <div className="bg-white divide-y divide-gray-200">
          {/* 各店舗へのお問合せ */}
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <Store className="w-5 h-5 text-blue-600 shrink-0" />
              <h2 className="text-sm md:text-lg font-medium text-gray-900">各店舗へのお問合せ</h2>
            </div>
            <p className="text-sm text-gray-600 ml-8">各店舗へお願いいたします</p>
          </div>

          {/* モールへのお問合せ・落とし物 */}
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <HelpCircle className="w-5 h-5 text-green-600 shrink-0" />
              <h2 className="text-sm md:text-lg font-medium text-gray-900">モールへのお問合せ・落とし物</h2>
            </div>
            <div className="ml-8">
              <p className="text-sm font-medium text-gray-800 mb-2">モールⅡ管理室</p>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Phone className="w-4 h-4 text-green-600 shrink-0" />
                <span>TEL: 04-7160-0900</span>
                <span className="text-gray-500">（AM9:00～PM5:00）</span>
              </div>
            </div>
          </div>

          {/* 出店（店舗） */}
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <Store className="w-5 h-5 text-purple-600 shrink-0" />
              <h2 className="text-sm md:text-lg font-medium text-gray-900">出店（店舗）</h2>
            </div>
            <p className="text-sm text-gray-500 ml-8">※現在募集しておりません</p>
          </div>

          {/* 出店（催事キッチンカー） */}
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <Truck className="w-5 h-5 text-orange-600 shrink-0" />
              <h2 className="text-sm md:text-lg font-medium text-gray-900">出店（催事キッチンカー）</h2>
            </div>
            <p className="text-sm text-gray-500 ml-8">※現在募集しておりません</p>
          </div>
        </div>

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
