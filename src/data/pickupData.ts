export interface PickupItem {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  period: string;
  fullContent: string;
}

export const pickupItems: PickupItem[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=800&fit=crop",
    title: "ゴールデンウィーク\nセール",
    subtitle: "4/25-5/6",
    description: "全館20%OFF",
    category: "セール",
    period: "2026/4/25 - 2026/5/6",
    fullContent: `館内の対象店舗で春物・初夏物アイテムを特別価格でご提供します。\n\nファッション、雑貨、グルメまで幅広く参加し、まとめ買いにもおすすめです。\n\n【主な内容】\n・対象商品最大20%OFF\n・期間限定ノベルティ配布\n・週末タイムセール実施`,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1730749387748-79e6d50a269c?w=800&h=800&fit=crop",
    title: "母の日\nギフトフェア",
    subtitle: "5/1-5/11",
    description: "特別ラッピング無料",
    category: "フェア",
    period: "2026/5/1 - 2026/5/11",
    fullContent: `母の日に向けたおすすめギフトを集めた特設フェアです。\n\n期間中は対象店舗で無料ラッピングをご利用いただけます。\n\n【主な内容】\n・ギフト提案コーナー\n・無料ラッピングサービス\n・数量限定ギフトセット販売`,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&h=800&fit=crop",
    title: "週末マルシェ",
    subtitle: "毎週土日開催",
    description: "地元の新鮮野菜",
    category: "イベント",
    period: "毎週土日 10:00-16:00",
    fullContent: `地元生産者による新鮮な野菜や加工品を販売する週末限定マルシェです。\n\n家族で楽しめる試食ブースやミニワークショップも開催します。\n\n【主な内容】\n・産地直送野菜販売\n・季節のおすすめ食材\n・体験型ワークショップ`,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=800&fit=crop",
    title: "春の\nファッションフェア",
    subtitle: "4/20-4/30",
    description: "新作最大30%OFF",
    category: "フェア",
    period: "2026/4/20 - 2026/4/30",
    fullContent: `春の新作を中心に、人気ブランドのおすすめアイテムを特別価格でご提供します。\n\n期間中はスタイリング相談会も実施し、コーディネート提案を行います。\n\n【主な内容】\n・新作アイテム特別価格\n・スタイリング相談会\n・対象店舗ポイントアップ`,
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=800&fit=crop",
    title: "グルメ\nフェスティバル",
    subtitle: "5/10-5/12",
    description: "期間限定メニュー",
    category: "グルメ",
    period: "2026/5/10 - 2026/5/12",
    fullContent: `館内レストラン・フード店舗による限定メニューを楽しめるグルメ企画です。\n\nこの期間だけの特別セットや食べ比べメニューをご用意しています。\n\n【主な内容】\n・限定メニュー販売\n・食べ比べセット\n・SNS投稿キャンペーン`,
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=800&fit=crop",
    title: "新店舗\nオープン",
    subtitle: "5/1 GRAND OPEN",
    description: "オープン記念セール",
    category: "オープン",
    period: "2026/5/1 -",
    fullContent: `新たにオープンする店舗の記念キャンペーンを開催します。\n\n先着特典や限定商品など、オープンならではの企画をお楽しみください。\n\n【主な内容】\n・オープン記念限定商品\n・先着プレゼント\n・来店特典クーポン配布`,
  },
];

