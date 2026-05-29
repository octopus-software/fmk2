import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Calendar } from "lucide-react";
import { ImageWithFallback } from "../app/components/figma/ImageWithFallback";
import { fetchPickupById, fetchPickups } from "@/features/pickups/api/fetchPickups";
import type { PickupApiItem } from "@/features/pickups/types/pickups";
import { getPickupImageUrl, isPickupVisibleNow } from "@/features/pickups/utils/pickups";
import { htmlToText } from "@/features/news/utils/text";

export default function PickupDetail() {
  const { id } = useParams();
  const pickupId = useMemo(() => Number(id), [id]);

  const [pickup, setPickup] = useState<PickupApiItem | null>(null);
  const [relatedItems, setRelatedItems] = useState<PickupApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!Number.isFinite(pickupId) || pickupId <= 0) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const [detail, list] = await Promise.all([
          fetchPickupById(pickupId),
          fetchPickups(),
        ]);

        if (!cancelled) {
          const now = new Date();

          if (!isPickupVisibleNow(detail, now)) {
            setNotFound(true);
            setPickup(null);
            setRelatedItems([]);
            setError(null);
            return;
          }

          setNotFound(false);
          setPickup(detail);
          setRelatedItems(
            list
              .filter((item) => item.id !== pickupId)
              .filter((item) => isPickupVisibleNow(item, now))
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
            setError("ピックアップの取得に失敗しました");
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
  }, [pickupId]);

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
          <h1 className="text-2xl mb-4 text-gray-800">404: ピックアップが見つかりません</h1>
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

  if (error || !pickup) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4 text-gray-800">{error ?? "ピックアップが見つかりません"}</h1>
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

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-blue-600 transition-colors">
                ホーム
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">ピックアップ詳細</li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="relative h-64 md:h-96">
            <ImageWithFallback
              src={getPickupImageUrl(pickup)}
              alt={htmlToText(pickup.title?.rendered) || "ピックアップ画像"}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl mb-6 text-gray-900 leading-relaxed">
              {htmlToText(pickup.title?.rendered) || "タイトルなし"}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-sm text-gray-500 mb-1">開催期間</div>
                  <div className="text-gray-900">{pickup.acf?.pickup_period ?? "期間未設定"}</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl mb-3 text-gray-900">概要</h2>
              <div
                className="wp-content text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: pickup.content?.rendered ?? "本文なし" }}
              />
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
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

        {relatedItems.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl mb-6 text-gray-900">その他のピックアップ</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedItems.map((item) => (
                <Link
                  key={item.id}
                  to={`/pickups/${item.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
                >
                  <ImageWithFallback
                    src={getPickupImageUrl(item)}
                    alt={htmlToText(item.title?.rendered) || "ピックアップ画像"}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-base hover:text-blue-600 transition-colors line-clamp-2">
                      {htmlToText(item.title?.rendered) || "タイトルなし"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">{item.acf?.subtitle ?? ""}</p>
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
