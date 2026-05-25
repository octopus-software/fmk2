export interface ShopItem {
  id: number;
  name: string;
  category: string;
  floor: string;
  description: string;
  logoColor: string;
  image: string;
  hours?: string;
  phone?: string;
  website?: string;
  fullDescription?: string;
}

export const shopsItems: ShopItem[] = [
  {
    id: 1,
    name: "ユニクロ",
    category: "fashion",
    floor: "2F",
    description: "カジュアルウェア",
    logoColor: "bg-red-600",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=200&fit=crop",
    hours: "10:00〜20:00",
    phone: "04-XXXX-1001",
    website: "https://www.uniqlo.com",
    fullDescription: `高品質なカジュアルウェアを手頃な価格で提供する人気ブランド。

LifeWearをコンセプトに、シンプルで着心地の良い服を豊富に取り揃えています。
メンズ、レディース、キッズまで幅広い年齢層に対応した商品展開。

【取り扱い商品】
・ヒートテック、エアリズムなどの機能性インナー
・カシミヤセーター
・ウルトラライトダウン
・デニムパンツ
・シャツ・ブラウス
・キッズウェア

【サービス】
・裾上げサービス（有料）
・モバイルオーダー対応
・ユニクロペイ利用可能`,
  },
  {
    id: 2,
    name: "GU",
    category: "fashion",
    floor: "2F",
    description: "トレンドファッション",
    logoColor: "bg-blue-600",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=200&fit=crop",
    hours: "10:00〜20:00",
    phone: "04-XXXX-1002",
    website: "https://www.gu-global.com",
    fullDescription: `最新トレンドを取り入れたファッションアイテムをお手頃価格で。

流行に敏感な方に向けた、季節ごとの新作を常時展開。
ベーシックアイテムからトレンドアイテムまで豊富な品揃え。

【取り扱い商品】
・トレンドアウター
・カジュアルパンツ
・ワンピース
・シャツ・ブラウス
・スニーカー
・バッグ・小物

【おすすめポイント】
・週次で新商品が入荷
・コラボレーション商品も充実
・オンラインストアとの連携`,
  },
  {
    id: 3,
    name: "ZARA",
    category: "fashion",
    floor: "2F",
    description: "インポートブランド",
    logoColor: "bg-black",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=800&fit=crop",
    hours: "10:00〜20:00",
    phone: "04-XXXX-1003",
    fullDescription: `スペイン発のファストファッションブランド。

ヨーロッパの最新トレンドをいち早く取り入れた、洗練されたデザインが特徴。
メンズ、レディース、キッズラインを展開。

【取り扱い商品】
・最新トレンドアウター
・ドレス・ワンピース
・パンツ・スカート
・シューズ
・バッグ
・アクセサリー

【特徴】
・年間を通じて新作を投入
・オフィスカジュアルにも対応
・サイズ展開が豊富`,
  },
  {
    id: 4,
    name: "無印良品",
    category: "fashion",
    floor: "2F",
    description: "衣料・生活雑貨",
    logoColor: "bg-amber-800",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=200&fit=crop",
    hours: "10:00〜20:00",
    phone: "04-XXXX-1004",
    fullDescription: `シンプルで機能的な商品を提供する生活雑貨ブランド。

「これがいい」ではなく「これでいい」という理念のもと、
無駄を省いたシンプルなデザインと高品質な商品を展開。

【取り扱い商品】
・オーガニックコットン衣料
・文房具
・収納用品
・家具
・食品
・コスメ・スキンケア

【サービス】
・刺繍工房サービス
・MUJI passport対応
・配送サービス`,
  },
  {
    id: 5,
    name: "ABC-MART",
    category: "fashion",
    floor: "2F",
    description: "シューズ専門店",
    logoColor: "bg-red-700",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=200&fit=crop",
    hours: "10:00〜20:00",
    phone: "04-XXXX-1005",
    fullDescription: `国内最大級のシューズ専門店。

スニーカーからビジネスシューズまで、幅広いジャンルの靴を取り揃え。
人気ブランドの限定モデルも多数取り扱い。

【取り扱いブランド】
・NIKE
・adidas
・New Balance
・CONVERSE
・VANS
・PUMA

【サービス】
・シューズケア用品販売
・サイズ測定サービス
・ポイントカード`,
  },
  {
    id: 6,
    name: "スターバックス",
    category: "food",
    floor: "3F",
    description: "カフェ",
    logoColor: "bg-green-700",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=200&fit=crop",
    hours: "8:00〜21:00",
    phone: "04-XXXX-2001",
    fullDescription: `世界的に有名なコーヒーチェーン。

高品質なコーヒーと居心地の良い空間を提供。
季節限定のドリンクも人気。

【メニュー】
・ドリップコーヒー
・エスプレッソドリンク
・フラペチーノ
・ティー
・フード（サンドイッチ、ペストリー）

【おすすめ】
・カスタマイズ自由
・Wi-Fi・電源完備
・モバイルオーダー対応`,
  },
  {
    id: 7,
    name: "サイゼリヤ",
    category: "food",
    floor: "3F",
    description: "イタリアンレストラン",
    logoColor: "bg-orange-600",
    image: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=400&h=200&fit=crop",
    hours: "11:00〜22:00",
    phone: "04-XXXX-2002",
    fullDescription: `リーズナブルなイタリアンレストラン。

本格的なイタリアン料理を手頃な価格で楽しめる人気店。
ファミリーからカップルまで幅広く利用されています。

【人気メニュー】
・ミラノ風ドリア（300円）
・マルゲリータピザ
・ペペロンチーノ
・ハンバーグステーキ
・ティラミス

【特徴】
・ワインが安い
・メニューが豊富
・ファミリー向け`,
  },
  {
    id: 8,
    name: "丸亀製麺",
    category: "food",
    floor: "3F",
    description: "うどん専門店",
    logoColor: "bg-red-800",
    image: "https://images.unsplash.com/photo-1618841557871-b9a8b5e3a958?w=400&h=200&fit=crop",
    hours: "11:00〜21:00",
    phone: "04-XXXX-2003",
    fullDescription: `本格的な讃岐うどん専門店。

店内で打ち立て、茹でたての美味しいうどんを提供。
セルフサービス形式で素早く提供。

【メニュー】
・かけうどん
・釜揚げうどん
・ぶっかけうどん
・カレーうどん
・天ぷら各種
・おにぎり

【こだわり】
・毎日店内で製麺
・だしは自慢の一品
・トッピング豊富`,
  },
  {
    id: 9,
    name: "ケンタッキー",
    category: "food",
    floor: "3F",
    description: "ファストフード",
    logoColor: "bg-red-600",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=200&fit=crop",
    hours: "10:00〜21:00",
    phone: "04-XXXX-2004",
    fullDescription: `オリジナルチキンで有名なファストフードチェーン。

カーネル・サンダース秘伝の11種類のハーブ&スパイスで味付けした
フライドチキンが自慢。

【人気メニュー】
・オリジナルチキン
・チキンフィレサンド
・ビスケット
・コールスロー
・ポテト

【セット】
・ランチセット
・ファミリーパック
・期間限定メニュー`,
  },
  {
    id: 10,
    name: "ミスタードーナツ",
    category: "food",
    floor: "3F",
    description: "ドーナツ・カフェ",
    logoColor: "bg-pink-600",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=200&fit=crop",
    hours: "10:00〜20:00",
    phone: "04-XXXX-2005",
    fullDescription: `種類豊富なドーナツとドリンクを提供。

常時30種類以上のドーナツを販売。
季節限定商品も人気。

【定番商品】
・ポン・デ・リング
・フレンチクルーラー
・オールドファッション
・エンゼルクリーム
・チョコファッション

【ドリンク】
・ブレンドコーヒー
・カフェオレ
・フルーツティー

【サービス】
・楽天ポイント対応
・イートイン可能`,
  },
  {
    id: 11,
    name: "イオン",
    category: "grocery",
    floor: "1F",
    description: "総合スーパー",
    logoColor: "bg-purple-600",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=200&fit=crop",
    hours: "9:00〜22:00",
    phone: "04-XXXX-3001",
    fullDescription: `生活に必要なものが何でも揃う総合スーパー。

食料品から日用品、衣料品まで幅広く取り扱い。
イオンカードでお得にお買い物。

【取り扱い商品】
・生鮮食品
・惣菜
・日配品
・冷凍食品
・日用品
・衣料品

【サービス】
・WAONポイント
・お客さま感謝デー（毎月20日・30日）
・配送サービス`,
  },
  {
    id: 12,
    name: "ウエルシア",
    category: "grocery",
    floor: "1F",
    description: "ドラッグストア",
    logoColor: "bg-blue-700",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=200&fit=crop",
    hours: "9:00〜22:00",
    phone: "04-XXXX-3002",
    fullDescription: `医薬品・化粧品・日用品を扱うドラッグストア。

処方箋受付も行っており、健康と美容をサポート。

【取り扱い商品】
・医薬品
・化粧品・スキンケア
・日用品
・健康食品
・飲料・食品
・ベビー用品

【サービス】
・処方箋受付
・Tポイント
・電子マネー対応
・薬剤師相談`,
  },
  {
    id: 13,
    name: "ダイソー",
    category: "grocery",
    floor: "1F",
    description: "100円ショップ",
    logoColor: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=200&fit=crop",
    hours: "10:00〜20:00",
    phone: "04-XXXX-3003",
    fullDescription: `100円を中心とした価格帯の生活雑貨店。

約70,000アイテム以上の豊富な品揃え。
日常生活に必要なものがお手頃価格で手に入ります。

【主な商品カテゴリ】
・キッチン用品
・収納用品
・文房具
・掃除用品
・美容・コスメ
・インテリア雑貨
・DIY用品
・季節商品

【価格帯】
・100円商品
・300円商品
・500円商品`,
  },
  {
    id: 14,
    name: "セリア",
    category: "grocery",
    floor: "1F",
    description: "100円雑貨",
    logoColor: "bg-pink-500",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop",
    hours: "10:00〜20:00",
    phone: "04-XXXX-3004",
    fullDescription: `おしゃれな100円ショップ。

デザイン性の高い商品が特徴で、特に女性に人気。
ハンドメイド材料も充実。

【人気商品】
・インテリア雑貨
・キッチン雑貨
・文房具
・ハンドメイド材料
・ラッピング用品
・収納グッズ

【特徴】
・デザイン重視の品揃え
・SNSで話題の商品多数
・季節商品が充実`,
  },
  {
    id: 15,
    name: "ヘアサロン",
    category: "service",
    floor: "2F",
    description: "美容室",
    logoColor: "bg-purple-500",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=200&fit=crop",
    hours: "10:00〜20:00（最終受付19:00）",
    phone: "04-XXXX-4001",
    fullDescription: `トレンドを取り入れたヘアスタイルを提案する美容室。

経験豊富なスタイリストが、お客様一人ひとりに合わせた
ヘアスタイルをご提案いたします。

【メニュー】
・カット
・カラー
・パーマ
・トリートメント
・ヘッドスパ
・縮毛矯正

【料金例】
・カット：4,400円〜
・カット＋カラー：8,800円〜
・カット＋パーマ：9,900円〜

【予約】
・電話予約
・ネット予約対応`,
  },
  {
    id: 16,
    name: "クリーニング",
    category: "service",
    floor: "1F",
    description: "クリーニング店",
    logoColor: "bg-cyan-600",
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=400&h=200&fit=crop",
    hours: "10:00〜19:00",
    phone: "04-XXXX-4002",
    fullDescription: `衣類のクリーニング・メンテナンスサービス。

丁寧な仕上がりと迅速な対応で、大切な衣類をケア。

【サービス内容】
・ドライクリーニング
・水洗いクリーニング
・染み抜き
・汗抜き加工
・撥水加工
・保管サービス

【料金例】
・ワイシャツ：220円
・スーツ上下：1,650円
・コート：1,980円
・ダウンジャケット：2,750円

【特急仕上げ】
追加料金で翌日仕上げ可能`,
  },
  {
    id: 17,
    name: "映画館",
    category: "service",
    floor: "5F",
    description: "シネマコンプレックス",
    logoColor: "bg-indigo-700",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=200&fit=crop",
    hours: "9:00〜23:00（上映スケジュールによる）",
    phone: "04-XXXX-5001",
    fullDescription: `最新作から名作まで楽しめるシネマコンプレックス。

6スクリーン完備で、様々なジャンルの映画を上映。
快適なシートと最新の音響設備で映画鑑賞をお楽しみいただけます。

【設備】
・スクリーン数：6
・総座席数：約1,200席
・3D上映対応
・バリアフリー対応

【料金】
・一般：1,900円
・大学生：1,500円
・高校生：1,000円
・小中学生：1,000円
・シニア（60歳以上）：1,200円

【割引デー】
・毎月1日：1,200円
・レディースデー（水曜）：1,200円
・メンズデー（木曜）：1,200円`,
  },
  {
    id: 18,
    name: "カラオケ",
    category: "service",
    floor: "5F",
    description: "カラオケルーム",
    logoColor: "bg-yellow-500",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=200&fit=crop",
    hours: "10:00〜24:00",
    phone: "04-XXXX-5002",
    fullDescription: `最新機種完備のカラオケボックス。

個室タイプで、友人や家族と気兼ねなく楽しめます。
ドリンクバー、フードメニューも充実。

【ルーム】
・全20室
・2名〜20名対応
・防音完備
・最新カラオケ機種

【料金（一般）】
平日：
・昼（10:00〜18:00）：1名300円/30分
・夜（18:00〜24:00）：1名400円/30分

休日：
・終日：1名400円/30分

【サービス】
・ドリンクバー（別途料金）
・フードメニュー
・Wi-Fi完備`,
  },
  {
    id: 19,
    name: "ゲームセンター",
    category: "service",
    floor: "5F",
    description: "アミューズメント",
    logoColor: "bg-orange-500",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=200&fit=crop",
    hours: "10:00〜22:00",
    phone: "04-XXXX-5003",
    fullDescription: `最新ゲーム機が揃うアミューズメント施設。

クレーンゲーム、音ゲー、レースゲームなど多彩なゲームを完備。
お子様から大人まで楽しめます。

【ゲームコーナー】
・クレーンゲーム（UFOキャッチャー）
・プリクラ
・音楽ゲーム
・対戦格闘ゲーム
・レースゲーム
・メダルゲーム

【料金】
・ゲームにより100円〜

【景品】
・人気キャラクターグッズ
・ぬいぐるみ
・フィギュア
・お菓子`,
  },
  {
    id: 20,
    name: "フィットネスジム",
    category: "service",
    floor: "4F",
    description: "スポーツジム",
    logoColor: "bg-green-600",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=200&fit=crop",
    hours: "平日9:00〜23:00／土日祝9:00〜21:00",
    phone: "04-XXXX-4003",
    fullDescription: `充実した設備のフィットネスジム。

マシントレーニング、スタジオプログラムなど、
目的に合わせたトレーニングが可能です。

【設備】
・マシンジム
・フリーウェイト
・スタジオ（ヨガ、エアロビクスなど）
・ランニングマシン
・シャワールーム
・ロッカールーム

【料金プラン】
・フルタイム会員：8,800円/月
・デイタイム会員：6,600円/月
・ホリデー会員：6,600円/月

【体験】
・無料体験実施中
・見学随時受付`,
  },
  {
    id: 21,
    name: "書店",
    category: "service",
    floor: "4F",
    description: "大型書店",
    logoColor: "bg-amber-700",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop",
    hours: "10:00〜21:00",
    phone: "04-XXXX-4004",
    fullDescription: `豊富な品揃えの大型書店。

書籍から雑誌、文房具まで幅広く取り扱い。
ゆっくり本を選べる広々とした店内。

【取り扱い】
・書籍（文芸、ビジネス、実用書など）
・雑誌
・漫画
・児童書
・洋書
・文房具
・雑貨

【サービス】
・ポイントカード
・取り寄せサービス
・ラッピングサービス
・カフェスペース併設`,
  },
  {
    id: 22,
    name: "家電量販店",
    category: "grocery",
    floor: "4F",
    description: "家電・PC",
    logoColor: "bg-yellow-600",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=200&fit=crop",
    hours: "10:00〜20:00",
    phone: "04-XXXX-4005",
    fullDescription: `最新家電・PC・スマートフォンを取り扱う専門店。

豊富な品揃えと専門スタッフによる丁寧な説明で、
最適な商品選びをサポートします。

【取り扱い商品】
・テレビ
・冷蔵庫・洗濯機
・エアコン
・パソコン
・スマートフォン
・カメラ
・オーディオ機器
・調理家電
・美容家電

【サービス】
・ポイント還元
・長期保証
・配送・設置サービス
・下取りサービス`,
  },
  {
    id: 23,
    name: "雑貨店",
    category: "fashion",
    floor: "4F",
    description: "インテリア雑貨",
    logoColor: "bg-teal-600",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=200&fit=crop",
    hours: "10:00〜20:00",
    phone: "04-XXXX-4006",
    fullDescription: `おしゃれなインテリア雑貨・生活雑貨のセレクトショップ。

暮らしを彩る素敵な雑貨を世界中からセレクト。
ギフトにもおすすめです。

【取り扱い商品】
・インテリア雑貨
・キッチン雑貨
・文房具
・アロマグッズ
・観葉植物
・フォトフレーム
・クッション・ブランケット

【ブランド】
・国内外の人気ブランド
・オリジナル商品

【サービス】
・ギフトラッピング
・配送サービス`,
  },
];
