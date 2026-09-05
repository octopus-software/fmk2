import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Car,
  Train,
  MapPin,
  Bike,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import parkingImage from "../assets/images/parking.jpg";
import waribikiImage from "../assets/images/waribiki.jpg";

export default function Access() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>アクセス | フィールズ南柏</title>
        <meta name="description" content="フィールズ南柏へのアクセス情報です。JR常磐線南柏駅東口より徒歩1分。車・電車・駐輪場のご案内。" />
      </Helmet>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl mb-4 uppercase tracking-wider">
              ACCESS
            </h1>
            <p className="text-xl opacity-90">アクセス</p>
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
              <li className="text-gray-900">アクセス</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white divide-y divide-gray-200">

          {/* 所在地 */}
          <section>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-orange-600 shrink-0" />
                <h2 className="text-xl font-medium text-gray-900">所在地</h2>
              </div>
              <div className="text-sm text-gray-700 ml-8">
                <p className="font-medium text-gray-900 mb-1">フィールズ南柏モール2</p>
                <p>〒277-0075 千葉県柏市南柏中央６−７</p>
              </div>
            </div>
            <div className="h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3234.4!2d139.955444!3d35.844393!3m2!1i1024!2i768!4f17!3m3!1m2!1s0x60189cb788762be1%3A0x4b5ccb033ae48ead!2z44OV44Kj44O844Or44K65Y2X5p-P44Oi44O844OrMg!5e0!3m2!1sja!2sjp!4v1778497568002!5m2!1sja!2sjp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </section>

          {/* 電車でのアクセス */}
          <section id="train">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Train className="w-5 h-5 text-green-600 shrink-0" />
                <h2 className="text-xl font-medium text-gray-900">電車でのアクセス</h2>
              </div>
              <div className="ml-8 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                <p className="text-sm text-gray-700">ＪＲ常磐線各駅停車「南柏」下車　東口より徒歩1分</p>
              </div>
            </div>
          </section>

          {/* お車でのアクセス */}
          <section id="car">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Car className="w-5 h-5 text-blue-600 shrink-0" />
                <h2 className="text-xl font-medium text-gray-900">お車でのアクセス</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-base mb-2 text-gray-900 font-medium">国道6号線より</h3>
                    <p className="text-sm text-gray-700">
                      「旧日光街道入口」交差点を「柏市街」方面　400m先信号を右折
                    </p>
                  </div>
                  <div>
                    <h3 className="text-base mb-2 text-gray-900 font-medium">旧水戸街道より</h3>
                    <p className="text-sm text-gray-700">
                      「南柏駅東口」交差点を「南柏駅」方面　1つ目交差点を右折
                    </p>
                  </div>
                  <div className="mt-4">
                    <ImageWithFallback
                      src={parkingImage}
                      alt="駐車場"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-base mb-2 text-gray-900 font-medium">割引きサービスのご利用方法</h3>
                    <ImageWithFallback
                      src={waribikiImage}
                      alt="割引サービス"
                      className="w-full h-auto rounded-lg"
                    />
                    <p className="text-xs mt-4 text-gray-700">
                      ■ 事前精算機はモールⅡ 4階～6階のエレベーター前、4階連絡通路手前にございます<br/>
                      ■ お支払いは、現金（紙幣は千円札のみ）、各種キャッシュレス決済
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-base mb-3 text-gray-900 font-medium">駐車場のご利用案内</h3>
                  <div className="space-y-2">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-base mb-2 text-gray-800">駐車場営業時間</h4>
                      <p className="text-lg text-gray-700">7:00～24:30</p>
                      <p className="text-sm text-gray-600 mt-1">（24:30～翌7:00までは出庫できません）</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-base mb-3 text-gray-800">ご利用料金</h4>
                      <p className="text-lg text-gray-700 mb-3">60分　200円</p>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>※入庫後より料金が発生いたします。</p>
                        <p>※お買物されなくても平日・休日ともに営業時間内最大900円でご利用になれます。</p>
                        <p>※営業時間外（24:30～翌700）に駐車した場合は通常料金が加算されます。</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-base mb-3 text-gray-800">店舗ごとの駐車サービス</h4>
                      <p className="text-lg text-gray-700 mb-3">
                        <span className="text-sm">500円以上2,000円未満のお買い物</span><br/>1時間 無料（1時間分のサービス券）
                      </p>
                      <p className="text-lg text-gray-700 mb-3">
                        <span className="text-sm">2,000円以上のお買い物</span><br/>2時間 無料（2時間分のサービス券）
                      </p>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>※サービス券は各店舗のレジ係員より受け取ってください。</p>
                        <p>※1店舗500円以上のお買上げで合計３店舗まで最大3時間まで無料。（３時間を超えた場合は通常料金が加算されます。）</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm mb-2 text-gray-800">駐車制限</h4>
                      <p className="text-sm text-gray-700">高さ 2.3m未満 長さ 5.0m未満 幅 1.9m未満 重量 2.0t未満</p>
                      <p className="text-xs text-gray-600 mt-2">※自動二輪車は不可</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm mb-2 text-gray-800">駐車場運営会社</h4>
                      <p className="text-sm text-gray-700 mb-1">アマノマネジメントサービス株式会社</p>
                      <p className="text-sm text-gray-700">0120-951-365</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 駐輪場 */}
          <section id="bicycle">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Bike className="w-5 h-5 text-purple-600 shrink-0" />
                <h2 className="text-xl font-medium text-gray-900">駐輪場のご利用案内</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-base font-medium mb-3 text-gray-800">営業時間</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>・モール2地下駐輪場　7:00～24:30</p>
                    <p className="text-gray-600 ml-4">（24:30～翌7:00までは出庫できません）</p>
                    <p>・屋外駐輪場は24時間営業</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-base font-medium mb-3 text-gray-800">ご利用料金</h4>
                  <p className="text-sm text-gray-700">・最初の2時間まで無料、以降12時間毎100円</p>
                  <p className="text-sm text-gray-700">※自動二輪車は不可</p>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ホームに戻る</span>
          </Link>
        </div>
      </div>
    </div>
  );
}