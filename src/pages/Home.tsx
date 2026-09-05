import {
  Store,
  ShoppingBag,
  UtensilsCrossed,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";
import { fetchShops } from "@/features/shops/api/fetchShops";
import { getFloorColor } from "@/features/shops/utils/shops";
import type { ShopItem } from "@/features/shops/types/shops";
import mainImage from "figma:asset/images/hero.png";
import { fetchPickups } from "@/features/pickups/api/fetchPickups";
import type { PickupApiItem } from "@/features/pickups/types/pickups";
import { getPickupImageUrl, isPickupVisibleNow } from "@/features/pickups/utils/pickups";
import { fetchEvents } from "@/features/events/api/fetchEvents";
import type { EventApiItem } from "@/features/events/types/events";
import {
  formatEventDate,
  getEventDisplayDateValue,
  getEventImageUrl,
  getEventSortTime,
  isEventNew,
} from "@/features/events/utils/events";
import { htmlToText } from "@/features/news/utils/text";
import { fetchSns } from "@/features/sns/api/fetchSns";
import type { SnsApiItem } from "@/features/sns/types/sns";
import { parseWpDate, parseWpDateOrTime, formatJpDate, isWithinRange } from "@/lib/date";

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

const isNewsVisibleNow = (news: NewsApiItem, now: Date) =>
  isWithinRange(
    parseWpDate(news.acf?.start_at ?? news.start_at),
    parseWpDate(news.acf?.end_at ?? news.end_at),
    now,
  );

const isEventVisibleNow = (event: EventApiItem, now: Date) =>
  isWithinRange(
    parseWpDateOrTime(event.acf?.publish_start_at, now),
    parseWpDateOrTime(event.acf?.publish_end_at, now),
    now,
  );

export default function Home() {
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [pickupApiItems, setPickupApiItems] = useState<PickupApiItem[]>([]);
  const [pickupApiError, setPickupApiError] = useState<string | null>(null);
  const [newsApiItems, setNewsApiItems] = useState<NewsApiItem[]>([]);
  const [newsApiError, setNewsApiError] = useState<string | null>(null);
  const [eventsApiItems, setEventsApiItems] = useState<EventApiItem[]>([]);
  const [eventsApiError, setEventsApiError] = useState<string | null>(null);
  const [snsSlideIndex, setSnsSlideIndex] = useState(0);
  const [snsApiItems, setSnsApiItems] = useState<SnsApiItem[]>([]);
  const [shopsItems, setShopsItems] = useState<ShopItem[]>([]);

  const heroSlides = pickupApiItems;

  const snsPosts = snsApiItems
    .filter((item) => item.acf?.post_id)
    .map((item) => `https://www.instagram.com/p/${item.acf!.post_id}/`);

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
    fetchPickups()
      .then((items) => {
        const now = new Date();
        const visible = items.filter((item) => isPickupVisibleNow(item, now));
        setPickupApiItems(visible);
        setPickupApiError(null);
        if (visible.length > 0) {
          setHeroSlideIndex(visible.length);
        }
      })
      .catch(() => {
        setPickupApiError("ピックアップAPIの取得に失敗しました");
      });
  }, []);

  useEffect(() => {
    const isCarousel = isMobile ? heroSlides.length >= 2 : heroSlides.length >= 5;
    if (!isCarousel) return;

    const timer = setInterval(() => {
      setHeroSlideIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroSlides.length, isMobile]);

  useEffect(() => {
    // SP は2枚以上、PC は5枚以上でカルーセルのループリセットが必要
    const isCarousel = isMobile ? heroSlides.length >= 2 : heroSlides.length >= 5;
    if (!isCarousel) return;

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
  }, [heroSlideIndex, heroSlides.length, isMobile]);

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
              const aStart = parseWpDate(
                a.acf?.start_at ?? a.start_at,
              )?.getTime() ?? Number.NEGATIVE_INFINITY;
              const bStart = parseWpDate(
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

  useEffect(() => {
    fetchEvents()
      .then((items) => {
        const now = new Date();
        setEventsApiItems(
          items
            .filter((event) => isEventVisibleNow(event, now))
            .sort((a, b) => getEventSortTime(b) - getEventSortTime(a)),
        );
        setEventsApiError(null);
      })
      .catch(() => {
        setEventsApiError("イベントAPIの取得に失敗しました");
      });
  }, []);

  useEffect(() => {
    const existing = document.querySelector('script[src*="instagram.com/embed.js"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  }, []);

  useEffect(() => {
    fetchSns()
      .then((items) => setSnsApiItems(items))
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchShops().then(setShopsItems).catch(() => {});
  }, []);

  useEffect(() => {
    if (snsPosts.length === 0) return;
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  }, [snsPosts.length]);

  useEffect(() => {
    if (!isMobile || snsPosts.length === 0) return;
    const timer = setInterval(() => {
      setSnsSlideIndex((prev) => (prev + 1) % snsPosts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isMobile, snsPosts.length]);

  const nextSlide = () => {
    if (heroSlides.length === 0) return;
    setHeroSlideIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (heroSlides.length === 0) return;
    setHeroSlideIndex((prev) => prev - 1);
  };

  const [selectedCategory, setSelectedCategory] = useState("all");

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
      : shopsItems.filter((shop) => shop.category === selectedCategory);

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
                  <p className="text-base md:text-xl text-gray-700 leading-relaxed mb-6 mt-10">
                    地域密着型のショッピングモールとして、
                    皆様の日常に彩りを添える様々なショップとサービスをご用意しております。
                  </p>
                  <p className="text-sm md:text-lg text-gray-700 leading-relaxed mb-8">
                    ファッション、グルメ、日用品から
                    エンターテインメントまで、 充実したフロア構成でお待ちしております。
                  </p>
                </div>
                <div>
                  <Link
                    to="/about"
                    className="inline-block bg-orange-500/80 hover:bg-orange-600/90 text-white px-8 py-3 rounded-lg text-lg transition-all shadow-lg backdrop-blur-sm"
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
            <h2 className="text-4xl mb-3 uppercase tracking-wider">
              PICK UP !!
            </h2>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="block w-10 h-px bg-orange-400"></span>
              <span className="text-orange-400 text-[10px]">◆</span>
              <span className="block w-10 h-px bg-orange-400"></span>
            </div>
            <p className="text-sm tracking-widest text-gray-500">
              ピックアップ
            </p>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-white pb-8">
        <div className="relative">
          {pickupApiError && (
            <div className="text-red-500 text-center mb-4">{pickupApiError}</div>
          )}

          {heroSlides.length === 0 && !pickupApiError ? (
            <div className="text-center text-gray-600 py-8">ピックアップはありません</div>
          ) : !isMobile && heroSlides.length <= 4 ? (
            // PC: 1〜4枚はグリッド表示
            <div className={`flex flex-wrap justify-center ${heroSlides.length <= 3 ? "gap-4" : ""}`}>
              {heroSlides.map((s) => (
                <Link
                  key={s.id}
                  to={`/pickups/${s.id}`}
                  className="w-1/4 relative overflow-hidden group cursor-pointer"
                >
                  <ImageWithFallback
                    src={getPickupImageUrl(s)}
                    alt={htmlToText(s.title?.rendered) || "ピックアップ画像"}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-8">
                    <p className="text-white text-sm md:text-base mb-2 opacity-90">
                      {s.acf?.pickup_period ?? ""}
                    </p>
                    <h3 className="text-white text-lg md:text-xl mb-2 whitespace-pre-line">
                      {htmlToText(s.title?.rendered) || "タイトルなし"}
                    </h3>
                    <p className="text-white text-base md:text-lg opacity-90">
                      {s.acf?.subtitle ?? ""}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : isMobile && heroSlides.length === 1 ? (
            // SP: 1枚のみはそのまま表示
            <Link
              to={`/pickups/${heroSlides[0].id}`}
              className="block relative overflow-hidden group cursor-pointer"
            >
              <ImageWithFallback
                src={getPickupImageUrl(heroSlides[0])}
                alt={htmlToText(heroSlides[0].title?.rendered) || "ピックアップ画像"}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                <p className="text-white text-sm mb-2 opacity-90">
                  {heroSlides[0].acf?.pickup_period ?? ""}
                </p>
                <h3 className="text-white text-lg mb-2 whitespace-pre-line">
                  {htmlToText(heroSlides[0].title?.rendered) || "タイトルなし"}
                </h3>
                <p className="text-white text-base opacity-90">
                  {heroSlides[0].acf?.subtitle ?? ""}
                </p>
              </div>
            </Link>
          ) : (
            // SP: 2枚以上 / PC: 5枚以上 → カルーセル
            <>
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
                    <Link
                      key={`${s.id}-${i}`}
                      to={`/pickups/${s.id}`}
                      className="flex-shrink-0 w-full md:w-1/4 relative overflow-hidden group cursor-pointer"
                    >
                      <ImageWithFallback
                        src={getPickupImageUrl(s)}
                        alt={htmlToText(s.title?.rendered) || "ピックアップ画像"}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-8">
                        <p className="text-white text-sm md:text-base mb-2 opacity-90">
                          {s.acf?.pickup_period ?? ""}
                        </p>
                        <h3 className="text-white text-lg md:text-xl mb-2 whitespace-pre-line">
                          {htmlToText(s.title?.rendered) || "タイトルなし"}
                        </h3>
                        <p className="text-white text-base md:text-lg opacity-90">
                          {s.acf?.subtitle ?? ""}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
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
            </>
          )}
        </div>
      </section>

      {/* News Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl mb-3 uppercase tracking-wider">
              NEWS
            </h2>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="block w-10 h-px bg-blue-500"></span>
              <span className="text-blue-500 text-[10px]">◆</span>
              <span className="block w-10 h-px bg-blue-500"></span>
            </div>
            <p className="text-sm tracking-widest text-gray-500">最新のお知らせや施設情報をご案内します</p>
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
                  className="block py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="bg-blue-500 text-white text-xs px-4 py-1 rounded-full whitespace-nowrap">
                        {news.acf?.category ? news.acf.category : "カテゴリなし"}
                      </span>
                      <time className="text-xs text-gray-500 whitespace-nowrap">
                        {formatJpDate(news.acf?.start_at ?? news.start_at)}
                      </time>
                    </div>
                    <p className="text-sm md:text-base text-gray-800">
                      {news.title && news.title.rendered ? news.title.rendered : "タイトルなし"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}

          <div className="text-center mt-10">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 px-8 py-2.5 border border-gray-400 rounded-full text-sm tracking-widest text-gray-700 hover:bg-white transition-colors uppercase"
            >
              More
            </Link>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-3 uppercase tracking-wider">
              EVENT
            </h2>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="block w-10 h-px bg-purple-500"></span>
              <span className="text-purple-500 text-[10px]">◆</span>
              <span className="block w-10 h-px bg-purple-500"></span>
            </div>
            <p className="text-sm tracking-widest text-gray-500">季節のイベントや楽しい催しをご紹介します</p>
          </div>

          {eventsApiError && (
            <div className="text-red-500 text-center mb-4">{eventsApiError}</div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {eventsApiItems.slice(0, 4).map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="relative">
                  {isEventNew(event.acf?.publish_start_at ?? event.date) && (
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-red-600 text-white text-[10px] md:text-xs px-2 py-0.5 md:px-3 md:py-1 rounded z-10">
                      NEW
                    </div>
                  )}
                  <ImageWithFallback
                    src={getEventImageUrl(event)}
                    alt={htmlToText(event.title?.rendered) || "イベント画像"}
                    className="w-full aspect-square object-cover"
                  />
                </div>
                <div className="p-3 md:p-4">
                  <div className="inline-block bg-gray-200 text-gray-700 text-[10px] md:text-xs px-2 py-0.5 md:px-3 md:py-1 rounded mb-2 md:mb-3">
                    {event.acf?.category ?? "カテゴリなし"}
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 mb-1 md:mb-2">
                    {formatEventDate(getEventDisplayDateValue(event))}
                  </p>
                  <h3 className="text-sm md:text-base leading-relaxed line-clamp-2">
                    {htmlToText(event.title?.rendered) || "タイトルなし"}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {!eventsApiError && eventsApiItems.length === 0 && (
            <div className="text-gray-600 text-center mt-4">イベントはありません</div>
          )}

          <div className="text-center mt-10">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-8 py-2.5 border border-gray-400 rounded-full text-sm tracking-widest text-gray-700 hover:bg-gray-50 transition-colors uppercase"
            >
              More
            </Link>
          </div>
        </div>
      </section>

      {/* Shop Category Search Section */}
      <section id="floor" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-3">店舗を探す</h2>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="block w-10 h-px bg-indigo-500"></span>
              <span className="text-indigo-500 text-[10px]">◆</span>
              <span className="block w-10 h-px bg-indigo-500"></span>
            </div>
            <p className="text-sm tracking-widest text-gray-500">
              カテゴリから店舗を検索できます
            </p>
          </div>


          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-1 md:gap-2 px-3 md:px-6 py-1.5 md:py-3 rounded-full text-xs md:text-base transition-all ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 md:w-5 md:h-5" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          {filteredShops.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              該当する店舗が見つかりませんでした
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredShops.map((shop) => (
                <Link
                  key={shop.id}
                  to={`/shops/${shop.id}`}
                  className="relative block rounded-lg overflow-hidden shadow hover:shadow-lg transition-all group aspect-[4/5]"
                >
                  <ImageWithFallback
                    src={shop.image}
                    alt={shop.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span className={`absolute top-2 right-2 text-sm px-2.5 py-1 rounded font-medium ${getFloorColor(shop.floor)}`}>
                    {shop.floor}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4 className="text-sm font-medium text-white leading-snug">{shop.name}</h4>
                    <p className="text-xs text-white/70 mt-0.5 line-clamp-1">{shop.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SNS Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl mb-3 uppercase tracking-wider">SNS</h2>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="block w-10 h-px bg-pink-400"></span>
              <span className="text-pink-400 text-[10px]">◆</span>
              <span className="block w-10 h-px bg-pink-400"></span>
            </div>
            <p className="text-sm tracking-widest text-gray-500">インスタグラム</p>
          </div>

          {/* PC: 常に3スロット固定 */}
          <div className="hidden md:flex" style={{ gap: "1.5rem" }}>
            {Array.from({ length: 3 }, (_, i) => {
              const url = snsPosts[i];
              return (
                <div key={i} style={{ flex: "1 1 0%", minWidth: 0 }}>
                  {url ? (
                    <blockquote
                      className="instagram-media"
                      data-instgrm-permalink={url}
                      data-instgrm-version="14"
                      style={{ maxWidth: "100%", width: "100%", margin: "0 auto" }}
                    />
                  ) : (
                    <div />
                  )}
                </div>
              );
            })}
          </div>

          {/* SP: 実投稿のみカルーセル */}
          <div className="md:hidden overflow-hidden">
            <div
              className="flex"
              style={{
                transform: `translateX(-${snsSlideIndex * 100}%)`,
                transition: "transform 0.5s ease-in-out",
              }}
            >
              {snsPosts.map((url, i) => (
                <div key={i} style={{ flexShrink: 0, width: "100%" }}>
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink={url}
                    data-instgrm-version="14"
                    style={{ maxWidth: "100%", width: "100%", margin: "0 auto" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {isMobile && (
            <div className="flex justify-center gap-2 mt-4">
              {snsPosts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSnsSlideIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    snsSlideIndex === i ? "bg-pink-500 w-8" : "bg-gray-300 w-2"
                  }`}
                  aria-label={`スライド ${i + 1}`}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-pink-400 text-pink-600 rounded-full hover:bg-pink-50 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Instagramをフォローする</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

