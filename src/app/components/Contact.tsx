import { Link } from "react-router";
import {
  Mail,
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

      <h2 className="text-center mt-10 text-xl">
        「フィールズ南柏」へのご意見、ご要望、お問い合わせ等ございましたら、お気軽に下記にご連絡ください。
      </h2>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 各店舗へのお問合せ */}
        <section className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Store className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl text-gray-900">
                各店舗へのお問合せ
              </h2>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-lg text-gray-700">
                各店舗へお願いいたします
              </p>
            </div>
          </div>
        </section>

        {/* モールへのお問合せ・落とし物 */}
        <section className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl text-gray-900">
                モールへのお問合せ・落とし物
              </h2>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <p className="text-lg text-gray-900 font-medium mb-3">
                    モールⅡ管理室
                  </p>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-xl text-gray-700">
                        TEL: 04-7160-0900
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        （AM9:00～PM5:00）
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 出店（店舗） */}
        <section className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Store className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl text-gray-900">
                出店（店舗）
              </h2>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-lg text-gray-600">
                ※現在募集しておりません
              </p>
            </div>
          </div>
        </section>

        {/* 出店（催事キッチンカー） */}
        <section className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Truck className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl text-gray-900">
                出店（催事キッチンカー）
              </h2>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-lg text-gray-600">
                ※現在募集しておりません
              </p>
            </div>
          </div>
        </section>

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