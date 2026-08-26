import { Outlet, Link } from "react-router";
import { useState } from "react";
import {
  Instagram,
  Menu,
  X,
} from "lucide-react";
import ScrollToHash from "./ScrollToHash";
import logoImage from "../assets/images/fmk2_logo.jpg";
import logoImageWhite from "../assets/images/fmk2_logo_w.png";

export default function Root() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollToHash />
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* First Row - Logo */}
          <div className="flex justify-center items-center h-16 border-b border-gray-100">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoImage} alt="フィールズ南柏" className="h-12" />
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden absolute right-0 p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors mr-4"
              aria-label="メニューを開閉"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>

          {/* Second Row - Navigation */}
          <nav className="hidden md:flex justify-center items-center h-14 space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              ホーム
            </Link>
            <Link
              to="/floor-guide"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              フロアガイド
            </Link>
            <Link
              to="/news"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              お知らせ
            </Link>
            <Link
              to="/events"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              イベント
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              フィールズ南柏とは
            </Link>
            <Link
              to="/access"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              アクセス
            </Link>
          </nav>
          <nav
            className={`md:hidden overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? "max-h-96 opacity-100 translate-y-0 py-4"
                : "max-h-0 opacity-0 -translate-y-2 py-0"
            }`}
          >
            <div className="flex flex-col">
              <Link
                to="/"
                onClick={closeMenu}
                className="px-2 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
              >
                ホーム
              </Link>
              <Link
                to="/floor-guide"
                onClick={closeMenu}
                className="px-2 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
              >
                フロアガイド
              </Link>
              <Link
                to="/news"
                onClick={closeMenu}
                className="px-2 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
              >
                お知らせ
              </Link>
              <Link
                to="/events"
                onClick={closeMenu}
                className="px-2 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
              >
                イベント
              </Link>
              <Link
                to="/about"
                onClick={closeMenu}
                className="px-2 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
              >
                フィールズ南柏とは
              </Link>
              <Link
                to="/access"
                onClick={closeMenu}
                className="px-2 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
              >
                アクセス
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <Outlet />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[3fr_3fr_2fr_2fr] gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={logoImageWhite} alt="フィールズ南柏モール2" className="h-10" />
                <span className="font-bold text-lg">
                  フィールズ南柏モール2
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                〒277-0075 千葉県柏市南柏中央6-7
                <br />
                TEL.04-7160-0900
                <br />
                ※営業時間は各テナントにより異なります。 <br/>詳しくは各店舗情報をご確認ください。
                <br />
                駐車場営業時間 7：00～24:30
                <br />
                （24:30～翌7：00までは出庫できません）
              </p>
              <p className="mt-4">
                南柏駅から徒歩1分。ショッピング＆グルメが楽しめる総合モールです。
              </p>
            </div>

            <div>
              <div className="h-48 rounded-lg overflow-hidden">
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
            </div>

            <div>
              <h4 className="mb-4">インフォメーション</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    to="/"
                    className="hover:text-white transition-colors"
                  >
                    ホーム
                  </Link>
                </li>
                <li>
                  <Link
                    to="/floor-guide"
                    className="hover:text-white transition-colors"
                  >
                    フロアガイド
                  </Link>
                </li>
                <li>
                  <Link
                    to="/news"
                    className="hover:text-white transition-colors"
                  >
                    お知らせ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/events"
                    className="hover:text-white transition-colors"
                  >
                    イベント
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    フィールズ南柏とは
                  </Link>
                </li>
                <li>
                  <Link
                    to="/access"
                    className="hover:text-white transition-colors"
                  >
                    アクセス
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors"
                  >
                    お問い合わせ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sitemap"
                    className="hover:text-white transition-colors"
                  >
                    サイトマップ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4">SNS</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/fieldsminamikashiwa.mall2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://lin.ee/twpOKI3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.141h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
            >
              ▲ ページの先頭へ戻る
            </button>
          </div>

          <div className="border-t border-gray-700 pt-8 mt-6 text-center">
            <p className="text-sm text-gray-400">
              © 2026 フィールズ南柏. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}