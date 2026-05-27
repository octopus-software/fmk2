import { useParams, Link } from "react-router";
import { Calendar, Clock, MapPin, Users, DollarSign, ArrowLeft } from "lucide-react";
import { eventsItems } from "../app/data/eventsData";
import { ImageWithFallback } from "../app/components/figma/ImageWithFallback";

export default function EventDetail() {
  const { id } = useParams();
  const event = eventsItems.find((item) => item.id === Number(id));

  if (!event) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4 text-gray-800">イベントが見つかりません</h1>
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
            {event.isNew && (
              <div className="absolute top-4 left-4 bg-red-600 text-white text-sm px-4 py-2 rounded z-10">
                NEW
              </div>
            )}
            <ImageWithFallback
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 md:p-12">
            {/* Category */}
            <div className="mb-4">
              <span className="inline-block bg-purple-100 text-purple-700 text-sm px-4 py-2 rounded-full">
                {event.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl mb-6 text-gray-900 leading-relaxed">
              {event.title}
            </h1>

            {/* Event Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 pb-8 border-b border-gray-200">
              {event.date && (
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-500 mb-1">開催日</div>
                    <div className="text-gray-900">{event.date}</div>
                  </div>
                </div>
              )}

              {event.time && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-500 mb-1">時間</div>
                    <div className="text-gray-900">{event.time}</div>
                  </div>
                </div>
              )}

              {event.location && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-500 mb-1">場所</div>
                    <div className="text-gray-900">{event.location}</div>
                  </div>
                </div>
              )}

              {event.capacity && (
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-500 mb-1">定員</div>
                    <div className="text-gray-900">{event.capacity}</div>
                  </div>
                </div>
              )}

              {event.fee && (
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-500 mb-1">参加費</div>
                    <div className="text-gray-900">{event.fee}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl mb-3 text-gray-900">イベント概要</h2>
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
            </div>

            {/* Full Content */}
            {event.fullContent && (
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {event.fullContent}
                </div>
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
        <div className="mt-12">
          <h2 className="text-2xl mb-6 text-gray-900">その他のイベント</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {eventsItems
              .filter((item) => item.id !== event.id)
              .slice(0, 3)
              .map((item) => (
                <Link
                  key={item.id}
                  to={`/events/${item.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    {item.isNew && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded z-10">
                        NEW
                      </div>
                    )}
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="inline-block bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded mb-2">
                      {item.category}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.date}</p>
                    <h3 className="text-base hover:text-purple-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
