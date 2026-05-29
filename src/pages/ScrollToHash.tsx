import { useEffect } from "react";
import { useLocation } from "react-router";

export default function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        setTimeout(() => {
          const headerOffset = 120; // 固定ヘッダーの高さ（h-16 + h-14 ≈ 120px）
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "auto",
          });
        }, 100);
      }
    } else {
      // ハッシュがない場合はページトップへスクロール
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [location]);

  return null;
}
