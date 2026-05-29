import { Link } from "react-router";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Baby,
  Heart,
  Accessibility,
  Dog,
  Package,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import aboutMainImage from "figma:asset/images/about_main1.png";
import aboutMainImage2 from "../assets/images/about_main2.png";
import aboutMainImage3 from "../assets/images/about_main3.png";

export default function About() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    aboutMainImage,
    aboutMainImage2,
    aboutMainImage3,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(
        (prev) => (prev + 1) % images.length,
      );
    }, 8000);

    return () => clearInterval(timer);
  }, [images.length]);
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl mb-4 uppercase tracking-wider">
              ABOUT
            </h1>
            <p className="text-xl opacity-90">
              フィールズ南柏とは
            </p>
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
              <li className="text-gray-900">
                フィールズ南柏とは
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* フィールズ南柏とは？ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-gray-900">
            地域の日常をもっと便利に、もっと快適に。
          </h2>
          <div className="rounded-lg overflow-hidden shadow-lg my-8 h-96 relative">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="フィールズ南柏モール"
                className="w-full h-full object-cover transition-opacity duration-1000 absolute inset-0"
                style={{
                  opacity: currentImageIndex === index ? 1 : 0,
                }}
              />
            ))}
          </div>
          <p className="mb-8">
            「フィールズ南柏」は、食品・飲食・サービス・専門店が集まる地域密着型ショッピング施設です。
            <br />
            毎日のお買い物から、ご家族でのお食事、暮らしを支えるサービスまで、幅広いシーンでご利用いただけます。
            <br />
            このたびのmallⅡのリニューアルにより、より快適で安心してお過ごしいただける空間へ生まれ変わりました。
            <br />
            これからも地域の皆さまに愛される施設を目指してまいります。皆さまのご来館を心よりお待ちしております。
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Subtitle */}
        <div className="text-center mb-12">
          <h2 className="text-3xl text-gray-900">
            館内サービスのご案内
          </h2>
        </div>

        {/* Section 1: お子様をお連れのお客様 */}
        <section className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <Baby className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl text-gray-900">
                  お子様をお連れのお客様
                </h2>
              </div>
              <div>
                <h3 className="text-xl mb-3 text-gray-900">
                  おむつの交換
                </h3>
                <p className="text-lg text-gray-700">
                  トイレに収納式おむつ交換台をご用意いたしております。
                </p>
              </div>
            </div>
            <div className="h-full">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=400&fit=crop"
                alt="お子様向け設備"
                className="w-full h-full object-cover min-h-[300px]"
              />
            </div>
          </div>
        </section>

        {/* Section 2: AED */}
        <section className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="h-full order-2 md:order-1">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&h=400&fit=crop"
                alt="AED設置場所"
                className="w-full h-full object-cover min-h-[300px]"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-8 h-8 text-red-600" />
                <h2 className="text-2xl text-gray-900">
                  AED（自動体外式除細動器）のご案内
                </h2>
              </div>
              <div>
                <p className="text-lg text-gray-700 mb-3">
                  館内下記の場所に設置しております。
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-lg text-gray-800">
                    モール１-１階 マツモトキヨシ内
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: お体の不自由なお客様 */}
        <section className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <Accessibility className="w-8 h-8 text-green-600" />
                <h2 className="text-2xl text-gray-900">
                  お体の不自由なお客様
                </h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl mb-3 text-gray-900">
                    専用駐車場
                  </h3>
                  <p className="text-lg text-gray-700">
                    駐車場各フロアエレベーター入口脇に専用駐車スペースがございます。
                  </p>
                </div>
                <div>
                  <h3 className="text-xl mb-3 text-gray-900">
                    多目的トイレ
                  </h3>
                  <p className="text-lg text-gray-700 mb-3">
                    お身体のご不自由な方、お年寄りの方、妊娠中や乳幼児連れのお客様のためのトイレです。
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-lg text-gray-800">
                      モール１-３階、モール２-１階にございます。
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&h=400&fit=crop"
                alt="バリアフリー設備"
                className="w-full h-full object-cover min-h-[300px]"
              />
            </div>
          </div>
        </section>

        {/* Section 4: ペットをお連れのお客様 */}
        <section className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="h-full order-2 md:order-1">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=400&fit=crop"
                alt="ペット同伴について"
                className="w-full h-full object-cover min-h-[300px]"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <Dog className="w-8 h-8 text-orange-600" />
                <h2 className="text-2xl text-gray-900">
                  ペットをお連れのお客様
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-lg text-gray-700">
                  館内へのペットの同伴はできません。
                </p>
                <p className="text-lg text-gray-700">
                  補助犬につきましては、館内へのご入店が可能です。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: その他のサービス */}
        <section className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-8 h-8 text-purple-600" />
                <h2 className="text-2xl text-gray-900">
                  その他のサービス
                </h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl mb-3 text-gray-900">
                    コインロッカー
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-lg text-gray-800">
                      モール１-１階エントランスにございます。
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl mb-3 text-gray-900">
                    駐車場事前精算機
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-lg text-gray-800">
                      モール２-４階　連絡通路前にございます。
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop"
                alt="その他のサービス"
                className="w-full h-full object-cover min-h-[300px]"
              />
            </div>
          </div>
        </section>

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