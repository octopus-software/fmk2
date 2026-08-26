import { Link } from "react-router";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Baby,
  Accessibility,
  Dog,
  Package,
} from "lucide-react";
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
        <div className="text-center mb-8">
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        {/* Page Subtitle */}
        <div className="text-center mb-10">
          <h2 className="text-3xl text-gray-900">
            館内サービスのご案内
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* お子様をお連れのお客様 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                <Baby className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">お子様をお連れのお客様</h3>
            </div>
            <div className="space-y-3 text-gray-600">
              <div>
                <p className="font-medium text-gray-800 mb-1">おむつの交換</p>
                <p className="text-sm">トイレに収納式おむつ交換台をご用意いたしております。</p>
              </div>
            </div>
          </div>

          {/* お体の不自由なお客様 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                <Accessibility className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">お体の不自由なお客様</h3>
            </div>
            <div className="space-y-3 text-gray-600">
              <div>
                <p className="font-medium text-gray-800 mb-1">専用駐車場</p>
                <p className="text-sm">駐車場各フロアエレベーター入口脇に専用駐車スペースがございます。</p>
              </div>
              <div>
                <p className="font-medium text-gray-800 mb-1">多目的トイレ</p>
                <p className="text-sm">お身体のご不自由な方、お年寄りの方、妊娠中や乳幼児連れのお客様のためのトイレです。</p>
              </div>
            </div>
          </div>

          {/* ペットをお連れのお客様 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center shrink-0">
                <Dog className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">ペットをお連れのお客様</h3>
            </div>
            <div className="space-y-3 text-gray-600">
              <p className="text-sm">館内へのペットの同伴はできません。</p>
              <p className="text-sm">補助犬につきましては、館内へのご入店が可能です。</p>
            </div>
          </div>

          {/* その他のサービス */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center shrink-0">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">その他のサービス</h3>
            </div>
            <div className="space-y-3 text-gray-600">
              <div>
                <p className="font-medium text-gray-800 mb-1">駐車場事前精算機</p>
                <p className="text-sm">モール２-４階　連絡通路前にございます。</p>
              </div>
            </div>
          </div>
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