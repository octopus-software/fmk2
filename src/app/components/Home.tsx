import {
  Store,
  ShoppingBag,
  UtensilsCrossed,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";
import { eventsItems } from "../data/eventsData";
import { shopsItems } from "../data/shopsData";
import mainImage from "../../imports/main2.png";

type NewsApiItem = {
  id: number;
  title?: { rendered?: string };
  acf?: {
    category?: string;
    start_at?: string;
    end_at?: string;
  };
  start_at?: string;
  end_at?: string;
};

const parseApiDate = (value?: string) => {
  if (!value) return null;
  const normalized =
    value.includes(" ") && !value.includes("T")
      ? value.replace(" ", "T")
      : value;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
};

const formatApiDate = (value?: string) => {
  const date = parseApiDate(value);
  return date ? date.toLocaleDateString("ja-JP") : "日付未設定";
};

const isNewsVisibleNow = (news: NewsApiItem, now: Date) => {
  const start = parseApiDate(news.acf?.start_at ?? news.start_at);
  const end = parseApiDate(news.acf?.end_at ?? news.end_at);

  if (start && now < start) return false;
  if (end && now > end) return false;
  return true;
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] =
    useState("all");
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [heroSlideIndex, setHeroSlideIndex] = useState(6);
  const [isMobile, setIsMobile] = useState(false);
  const [newsApiItems, setNewsApiItems] = useState<NewsApiItem[]>([]);
  const [newsApiError, setNewsApiError] = useState<string | null>(null);

  const heroSlides = [
    {
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=800&fit=crop",
      title: "ゴールデンウィーク\nセール",
      subtitle: "4/25-5/6",
      description: "全館20%OFF",
    },
    {
      image:
        "https://images.unsplash.com/photo-1730749387748-79e6d50a269c?w=800&h=800&fit=crop",
      title: "母の日\nギフトフェア",
      subtitle: "5/1-5/11",
      description: "特別ラッピング無料",
    },
    {
      image:
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&h=800&fit=crop",
      title: "週末マルシェ",
      subtitle: "毎週土日開催",
      description: "地元の新鮮野菜",
    },
    {
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=800&fit=crop",
      title: "春の\nファッションフェア",
      subtitle: "4/20-4/30",
      description: "新作最大30%OFF",
    },
    {
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=800&fit=crop",
      title: "グルメ\nフェスティバル",
      subtitle: "5/10-5/12",
      description: "期間限定メニュー",
    },
    {
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=800&fit=crop",
      title: "新店舗\nオープン",
      subtitle: "5/1 GRAND OPEN",
      description: "オープン記念セール",
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () =>
      window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlideIndex]);

  useEffect(() => {
    if (heroSlideIndex >= heroSlides.length * 2) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setHeroSlideIndex(heroSlides.length);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 500);
      return () => clearTimeout(timeout);
    } else if (heroSlideIndex < heroSlides.length) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setHeroSlideIndex(heroSlides.length + heroSlideIndex);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [heroSlideIndex, heroSlides.length]);

  useEffect(() => {
    axios
      .get("http://35.78.43.19/index.php?rest_route=/wp/v2/news")
      .then((response) => {
        const now = new Date();
        const apiItems = Array.isArray(response.data)
          ? (response.data as NewsApiItem[])
          : [];

        setNewsApiItems(
          apiItems
            .filter((news) => isNewsVisibleNow(news, now))
            .sort((a, b) => {
              const aStart = parseApiDate(
                a.acf?.start_at ?? a.start_at,
              )?.getTime() ?? Number.NEGATIVE_INFINITY;
              const bStart = parseApiDate(
                b.acf?.start_at ?? b.start_at,
              )?.getTime() ?? Number.NEGATIVE_INFINITY;
              return bStart - aStart;
            }),
        );
        setNewsApiError(null);
      })
      .catch(() => {
        setNewsApiError("ニュースAPIの取得に失敗しました");
      });
  }, []);

  const nextSlide = () => {
    setHeroSlideIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setHeroSlideIndex((prev) => prev - 1);
  };

  const categories = [
    { id: "all", name: "すべて", icon: Store },
    { id: "fashion", name: "ファッション", icon: ShoppingBag },
    { id: "food", name: "グルメ", icon: UtensilsCrossed },
    { id: "grocery", name: "食品・日用品", icon: ShoppingBag },
    { id: "service", name: "サービス", icon: Sparkles },
  ];

  const filteredShops =
    selectedCategory === "all"
      ? shopsItems
      : shopsItems.filter(
          (shop) => shop.category === selectedCategory,
        );

  return (
    <>
      {/* Welcome Section with Building Image */}
      <section className="bg-white relative overflow-hidden">
        <div className="relative h-screen">
          {/* Background Image */}
          <ImageWithFallback
            src={mainImage}
            alt="Shopping Mall Building"
            className="w-full h-full object-cover"
            style={{
              animation: "zoomInOut 20s ease-in-out infinite",
            }}
          />

          {/* Overlay Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-8 md:px-16 w-full">
              <div className="max-w-2xl">
                <h1
                  className="text-3xl md:text-5xl mb-6 text-gray-800"
                  style={{
                    textShadow:
                      "2px 2px 4px rgba(255, 255, 255, 0.8), -1px -1px 2px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <p>ようこそ、</p>
                  <p className="mt-8">フィールズ南柏へ</p>
                </h1>
                <div className="px-6 py-5 my-4 bg-white/85 rounded-lg ">
                  <p className="text-xl text-gray-700 leading-relaxed mb-6 mt-10">
                    地域密着型のショッピングモールとして、
                    皆様の日常に彩りを添える様々なショップとサービスをご用意しております。
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    ファッション、グルメ、日用品から
                    エンターテインメントまで、
                    <br />
                    充実したフロア構成でお待ちしております。
                  </p>
                </div>
                <div>
                  <Link
                    to="/about"
                    className="inline-block bg-blue-500/80 hover:bg-blue-600/90 text-white px-8 py-3 rounded-lg text-lg transition-all shadow-lg backdrop-blur-sm"
                  >
                    フィールズ南柏とは
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pickup Section Header */}
      <section className="bg-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl mb-2 uppercase tracking-wider">
              PICK UP !!
            </h2>
            <p className="text-sm text-gray-600">
              ピックアップ
            </p>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-white pb-8">
        <div className="relative">
          <div className="overflow-hidden relative">
            <div
              className={`flex ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
              style={{
                transform: isMobile
                  ? `translateX(-${heroSlideIndex * 100}%)`
                  : `translateX(-${(heroSlideIndex * 100) / 4}%)`,
              }}
            >
              {[
                ...heroSlides,
                ...heroSlides,
                ...heroSlides,
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-full md:w-1/4 relative overflow-hidden group cursor-pointer"
                >
                  <ImageWithFallback
                    src={s.image}
                    alt={s.title}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-8">
                    <p className="text-white text-sm md:text-base mb-2 opacity-90">
                      {s.subtitle}
                    </p>
                    <h3 className="text-white text-2xl md:text-3xl mb-2 whitespace-pre-line">
                      {s.title}
                    </h3>
                    <p className="text-white text-base md:text-lg opacity-90">
                      {s.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Edge Overlays - Desktop only */}
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-1/4 bg-black/40 pointer-events-none"></div>
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1/4 bg-black/40 pointer-events-none"></div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setHeroSlideIndex(heroSlides.length + index);
                }}
                className={`h-2 rounded-full transition-all ${
                  heroSlideIndex % heroSlides.length === index
                    ? "bg-blue-600 w-8"
                    : "bg-gray-300 w-2"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl mb-2 uppercase tracking-wider">
              NEWS
            </h2>
            <p className="text-sm text-gray-600">お知らせ</p>
          </div>

          {/* APIから取得したニュース */}
          {newsApiError && (
            <div className="text-red-500 text-center mb-4">{newsApiError}</div>
          )}
          {newsApiItems.length > 0 ? (
            <div className="space-y-4 mb-8">
              {newsApiItems.slice(0, 5).map((news) => (
                <Link
                  key={news.id}
                  to={`/news/${news.id}`}
                  className="flex items-center gap-4 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-blue-500 text-white text-xs px-4 py-1 rounded-full whitespace-nowrap">
                      {news.acf?.category ? news.acf.category : "カテゴリなし"}
                    </span>
                    <time className="text-xs text-gray-500 whitespace-nowrap">
                      {formatApiDate(news.acf?.start_at ?? news.start_at)}
                    </time>
                  </div>
                  <p className="text-sm md:text-base text-gray-800">
                    {news.title && news.title.rendered ? news.title.rendered : "タイトルなし"}
                  </p>
                </Link>
              ))}
            </div>
          ) : null}

          <div className="text-center mt-8">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-all hover:gap-3"
            >
              <span className="transition-transform">▶︎</span>
              <span>MORE</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-2 uppercase tracking-wider">
              EVENT
            </h2>
            <p className="text-sm text-gray-600">イベント</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {eventsItems.slice(0, 4).map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="relative">
                  {event.isNew && (
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded z-10">
                      NEW
                    </div>
                  )}
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full aspect-square object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="inline-block bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded mb-3">
                    {event.category}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {event.date}
                  </p>
                  <h3 className="text-base leading-relaxed">
                    {event.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-all hover:gap-3"
            >
              <span className="transition-transform">▶︎</span>
              <span>MORE</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Shop Category Search Section */}
      <section id="floor" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">店舗を探す</h2>
            <p className="text-xl text-gray-600">
              カテゴリから店舗を検索できます
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() =>
                    setSelectedCategory(category.id)
                  }
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          {/* Shop List */}
          <div className="mb-6 text-center text-sm text-gray-600">
            {filteredShops.length}件の店舗
          </div>

          {filteredShops.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              該当する店舗が見つかりませんでした
            </div>
          ) : (
            <div className="space-y-8">
              {/* 5F Floor */}
              {filteredShops.some(
                (shop) => shop.floor === "5F",
              ) && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-purple-100 px-4 py-2 rounded">
                      <span className="text-lg text-purple-600">
                        5F
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base">
                        エンターテインメント
                      </h3>
                      <p className="text-xs text-gray-500">
                        {
                          filteredShops.filter(
                            (shop) => shop.floor === "5F",
                          ).length
                        }
                        店舗
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {filteredShops
                      .filter((shop) => shop.floor === "5F")
                      .map((shop) => (
                        <Link
                          key={shop.id}
                          to={`/shops/${shop.id}`}
                          className="bg-white rounded-lg p-3 shadow hover:shadow-md transition-all border-l-2 border-purple-500 block"
                        >
                          <h4 className="text-sm font-medium mb-2">
                            {shop.name}
                          </h4>
                          <div className="w-full h-32 rounded overflow-hidden mb-2">
                            <ImageWithFallback
                              src={shop.image}
                              alt={shop.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-xs text-gray-500">
                            {shop.description}
                          </p>
                        </Link>
                      ))}
                  </div>
                </div>
              )}

              {/* 4F Floor */}
              {filteredShops.some(
                (shop) => shop.floor === "4F",
              ) && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-pink-100 px-4 py-2 rounded">
                      <span className="text-lg text-pink-600">
                        4F
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base">
                        書籍・家電・雑貨・フィットネス
                      </h3>
                      <p className="text-xs text-gray-500">
                        {
                          filteredShops.filter(
                            (shop) => shop.floor === "4F",
                          ).length
                        }
                        店舗
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {filteredShops
                      .filter((shop) => shop.floor === "4F")
                      .map((shop) => (
                        <Link
                          key={shop.id}
                          to={`/shops/${shop.id}`}
                          className="bg-white rounded-lg p-3 shadow hover:shadow-md transition-all border-l-2 border-pink-500 block"
                        >
                          <h4 className="text-sm font-medium mb-2">
                            {shop.name}
                          </h4>
                          <div className="w-full h-32 rounded overflow-hidden mb-2">
                            <ImageWithFallback
                              src={shop.image}
                              alt={shop.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-xs text-gray-500">
                            {shop.description}
                          </p>
                        </Link>
                      ))}
                  </div>
                </div>
              )}

              {/* 3F Floor */}
              {filteredShops.some(
                (shop) => shop.floor === "3F",
              ) && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-green-100 px-4 py-2 rounded">
                      <span className="text-lg text-green-600">
                        3F
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base">
                        レストラン・カフェ
                      </h3>
                      <p className="text-xs text-gray-500">
                        {
                          filteredShops.filter(
                            (shop) => shop.floor === "3F",
                          ).length
                        }
                        店舗
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {filteredShops
                      .filter((shop) => shop.floor === "3F")
                      .map((shop) => (
                        <Link
                          key={shop.id}
                          to={`/shops/${shop.id}`}
                          className="bg-white rounded-lg p-3 shadow hover:shadow-md transition-all border-l-2 border-green-500 block"
                        >
                          <h4 className="text-sm font-medium mb-2">
                            {shop.name}
                          </h4>
                          <div className="w-full h-32 rounded overflow-hidden mb-2">
                            <ImageWithFallback
                              src={shop.image}
                              alt={shop.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-xs text-gray-500">
                            {shop.description}
                          </p>
                        </Link>
                      ))}
                  </div>
                </div>
              )}

              {/* 2F Floor */}
              {filteredShops.some(
                (shop) => shop.floor === "2F",
              ) && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-orange-100 px-4 py-2 rounded">
                      <span className="text-lg text-orange-600">
                        2F
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base">
                        ファッション・雑貨・サービス
                      </h3>
                      <p className="text-xs text-gray-500">
                        {
                          filteredShops.filter(
                            (shop) => shop.floor === "2F",
                          ).length
                        }
                        店舗
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {filteredShops
                      .filter((shop) => shop.floor === "2F")
                      .map((shop) => (
                        <Link
                          key={shop.id}
                          to={`/shops/${shop.id}`}
                          className="bg-white rounded-lg p-3 shadow hover:shadow-md transition-all border-l-2 border-orange-500 block"
                        >
                          <h4 className="text-sm font-medium mb-2">
                            {shop.name}
                          </h4>
                          <div className="w-full h-32 rounded overflow-hidden mb-2">
                            <ImageWithFallback
                              src={shop.image}
                              alt={shop.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-xs text-gray-500">
                            {shop.description}
                          </p>
                        </Link>
                      ))}
                  </div>
                </div>
              )}

              {/* 1F Floor */}
              {filteredShops.some(
                (shop) => shop.floor === "1F",
              ) && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-blue-100 px-4 py-2 rounded">
                      <span className="text-lg text-blue-600">
                        1F
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base">
                        食品・日用品・サービス
                      </h3>
                      <p className="text-xs text-gray-500">
                        {
                          filteredShops.filter(
                            (shop) => shop.floor === "1F",
                          ).length
                        }
                        店舗
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {filteredShops
                      .filter((shop) => shop.floor === "1F")
                      .map((shop) => (
                        <Link
                          key={shop.id}
                          to={`/shops/${shop.id}`}
                          className="bg-white rounded-lg p-3 shadow hover:shadow-md transition-all border-l-2 border-blue-500 block"
                        >
                          <h4 className="text-sm font-medium mb-2">
                            {shop.name}
                          </h4>
                          <div className="w-full h-32 rounded overflow-hidden mb-2">
                            <ImageWithFallback
                              src={shop.image}
                              alt={shop.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-xs text-gray-500">
                            {shop.description}
                          </p>
                        </Link>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

