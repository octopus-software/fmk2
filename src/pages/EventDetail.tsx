import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router";
import { Calendar, Clock, MapPin, Users, DollarSign, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { fetchEventById, fetchEvents } from "@/features/events/api/fetchEvents";
import {
  formatEventDate,
  formatEventTime,
  formatEventTimeRange,
  getEventDisplayDateValue,
  getEventImageUrl,
  isEventNew,
} from "@/features/events/utils/events";
import type { EventApiItem } from "@/features/events/types/events";
import { htmlToText, truncateText } from "@/features/news/utils/text";

const parsePublishStartAt = (value?: string) => {
  if (!value) return null;
  const normalized = value.includes(" ") && !value.includes("T")
    ? value.replace(" ", "T")
    : value;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
};

const isStarted = (item: EventApiItem, now: Date) => {
  const startAt = parsePublishStartAt(item.acf?.publish_start_at);
  if (!startAt) return true;
  return startAt.getTime() <= now.getTime();
};

export default function EventDetail() {
  const { id } = useParams();
  const eventId = useMemo(() => Number(id), [id]);

  const [eventItem, setEventItem] = useState<EventApiItem | null>(null);
  const [relatedItems, setRelatedItems] = useState<EventApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!Number.isFinite(eventId) || eventId <= 0) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const [detail, list] = await Promise.all([
          fetchEventById(eventId),
          fetchEvents(),
        ]);

        if (!cancelled) {
          const now = new Date();

          // publish_start_at前のイベントは詳細ページで404扱い
          if (!isStarted(detail, now)) {
            setNotFound(true);
            setEventItem(null);
            setRelatedItems([]);
            setError(null);
            return;
          }

          setNotFound(false);
          setEventItem(detail);
          setRelatedItems(
            list
              .filter((item) => item.id !== eventId)
              .filter((item) => isStarted(item, now))
              .slice(0, 3),
          );
          setError(null);
        }
      } catch (e: unknown) {
        if (!cancelled) {
          const status = (e as { response?: { status?: number } })?.response?.status;
          if (status === 404) {
            setNotFound(true);
            setError(null);
          } else {
            setNotFound(false);
            setError("イベントの取得に失敗しました");
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [eventId]);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4 text-gray-800">404: イベントが見つかりません</h1>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>イベント一覧に戻る</span>
          </Link>
        </div>
      </div>
    );
  }

  if (error || !eventItem) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4 text-gray-800">{error ?? "イベントが見つかりません"}</h1>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>イベント一覧に戻る</span>
          </Link>
        </div>
      </div>
    );
  }

  const timeRange = formatEventTimeRange(
    eventItem.acf?.event_start_at ?? eventItem.acf?.event_start_time,
    eventItem.acf?.event_end_at ?? eventItem.acf?.event_end_time,
  );
  const fallbackTime = formatEventTime(eventItem.acf?.event_time);
  const displayTime = timeRange || fallbackTime;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-purple-600 transition-colors">
                ホーム
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/events" className="hover:text-purple-600 transition-colors">
                イベント
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">詳細</li>
          </ol>
        </nav>

        {/* Event Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="relative h-64 md:h-96">
            {isEventNew(eventItem.acf?.publish_start_at ?? eventItem.date) && (
              <div className="absolute top-4 left-4 bg-red-600 text-white text-sm px-4 py-2 rounded z-10">
                NEW
              </div>
            )}
            <ImageWithFallback
              src={getEventImageUrl(eventItem)}
              alt={htmlToText(eventItem.title?.rendered) || "イベント画像"}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 md:p-12">
            {/* Category */}
            <div className="mb-4">
              <span className="inline-block bg-purple-100 text-purple-700 text-sm px-4 py-2 rounded-full">
                {eventItem.acf?.category ?? "カテゴリなし"}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl mb-6 text-gray-900 leading-relaxed">
              {htmlToText(eventItem.title?.rendered) || "タイトルなし"}
            </h1>

            {/* Event Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm text-gray-500 mb-1">開催日</div>
                  <div className="text-gray-900">
                    {formatEventDate(getEventDisplayDateValue(eventItem))}
                  </div>
                </div>
              </div>

              {displayTime && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-500 mb-1">時間</div>
                    <div className="text-gray-900">{displayTime}</div>
                  </div>
                </div>
              )}

              {eventItem.acf?.place && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-500 mb-1">場所</div>
                    <div className="text-gray-900">{eventItem.acf.place}</div>
                  </div>
                </div>
              )}

              {eventItem.acf?.capacity && (
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-500 mb-1">定員</div>
                    <div className="text-gray-900">{eventItem.acf.capacity}</div>
                  </div>
                </div>
              )}

              {eventItem.acf?.price && (
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-500 mb-1">参加費</div>
                    <div className="text-gray-900">{eventItem.acf.price}</div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Full Content */}
            {eventItem.content?.rendered && (
              <div className="prose prose-lg max-w-none wp-content">
                <div dangerouslySetInnerHTML={{ __html: eventItem.content.rendered }} />
              </div>
            )}

            {/* Back Button */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>イベント一覧に戻る</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Events */}
        {relatedItems.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl mb-6 text-gray-900">その他のイベント</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedItems.map((item) => (
                <Link
                  key={item.id}
                  to={`/events/${item.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    {isEventNew(item.acf?.publish_start_at ?? item.date) && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded z-10">
                        NEW
                      </div>
                    )}
                    <ImageWithFallback
                      src={getEventImageUrl(item)}
                      alt={htmlToText(item.title?.rendered) || "イベント画像"}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="inline-block bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded mb-2">
                      {item.acf?.category ?? "カテゴリなし"}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {formatEventDate(getEventDisplayDateValue(item))}
                    </p>
                    <h3 className="text-base hover:text-purple-600 transition-colors line-clamp-2">
                      {htmlToText(item.title?.rendered) || "タイトルなし"}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
