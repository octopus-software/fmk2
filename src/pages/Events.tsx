import { Link } from "react-router";
import { eventsItems } from "../app/data/eventsData";
import { ImageWithFallback } from "../app/components/figma/ImageWithFallback";

export default function Events() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl mb-4 uppercase tracking-wider">EVENT</h1>
            <p className="text-xl opacity-90">イベント一覧</p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav>
            <ol className="flex items-center gap-2 text-sm text-gray-600">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors">
                  ホーム
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900">イベント</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Events Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {eventsItems.map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition-all transform hover:-translate-y-1"
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
                  <p className="text-sm text-gray-600 mb-2">{event.date}</p>
                  <h3 className="text-base leading-relaxed mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {event.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
