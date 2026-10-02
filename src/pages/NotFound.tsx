import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>ページが見つかりません | フィールズ南柏モール2</title>
      </Helmet>

      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl mb-4 uppercase tracking-wider">404</h1>
            <p className="text-xl opacity-90">ページが見つかりません</p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <p className="text-gray-600 mb-10">
          お探しのページは存在しないか、移動・削除された可能性があります。
        </p>
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
