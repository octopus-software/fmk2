# フィールズ南柏モール2 公式サイト 仕様書

## 概要

千葉県柏市にある**フィールズ南柏モール2**（JR常磐線 南柏駅 東口より徒歩1分）の公式Webサイト。

- **所在地**: 〒277-0075 千葉県柏市南柏中央6-7
- **電話**: 04-7160-0900
- **駐車場営業時間**: 7:00〜24:30（24:30〜翌7:00は出庫不可）

---

## 技術スタック

| 項目 | 内容 |
|------|------|
| フロントエンド | React 18 + TypeScript |
| ルーティング | React Router 7 |
| ビルドツール | Vite 6 |
| スタイリング | Tailwind CSS v4 |
| UIコンポーネント | shadcn/ui（Radix UI ベース）|
| アイコン | Lucide React |
| HTTPクライアント | Axios |
| パッケージマネージャ | pnpm |
| バックエンド | WordPress REST API（`http://35.78.43.19`）|

---

## ページ構成

| パス | コンポーネント | 概要 |
|------|--------------|------|
| `/` | `Home` | トップページ |
| `/floor-guide` | `FloorGuide` | フロアガイド |
| `/about` | `About` | フィールズ南柏とは |
| `/access` | `Access` | アクセス情報 |
| `/contact` | `Contact` | お問い合わせ |
| `/sitemap` | `Sitemap` | サイトマップ |
| `/news` | `News` | お知らせ一覧 |
| `/news/:id` | `NewsDetail` | お知らせ詳細 |
| `/events` | `Events` | イベント一覧 |
| `/events/:id` | `EventDetail` | イベント詳細 |
| `/pickups/:id` | `PickupDetail` | ピックアップ詳細 |
| `/shops/:id` | `ShopDetail` | 店舗詳細 |

共通レイアウト（ヘッダー・フッター）は `Root.tsx` で管理し、React Router の `<Outlet>` で各ページを描画する。

---

## データ構造

### 動的データ（WordPress REST API）

以下のコンテンツタイプを WordPress REST API から取得する。

#### ピックアップ（`/wp/v2/pickups`）

| フィールド | 型 | 説明 |
|-----------|-----|------|
| `id` | number | ID |
| `title.rendered` | string | タイトル（HTML）|
| `acf.pickup_period` | string | 掲載期間テキスト |
| `acf.image` | string | 画像URL |
| `acf.publish_start_at` | string | 表示開始日時 |
| `acf.publish_end_at` | string | 表示終了日時 |

#### ニュース（`/wp/v2/news`）

| フィールド | 型 | 説明 |
|-----------|-----|------|
| `id` | number | ID |
| `title.rendered` | string | タイトル（HTML）|
| `acf.category` | string | カテゴリ |
| `acf.start_at` | string | 表示開始日時 |
| `acf.end_at` | string | 表示終了日時 |

#### イベント（`/wp/v2/events`）

| フィールド | 型 | 説明 |
|-----------|-----|------|
| `id` | number | ID |
| `title.rendered` | string | タイトル（HTML）|
| `date` | string | 投稿日時 |
| `acf.category` | string | カテゴリ |
| `acf.image` | string | 画像URL |
| `acf.publish_start_at` | string | 表示開始日時 |
| `acf.publish_end_at` | string | 表示終了日時 |

### 静的データ

#### 店舗（`src/data/shopsData.ts`）

`ShopItem` 型で管理。

| フィールド | 型 | 説明 |
|-----------|-----|------|
| `id` | number | ID |
| `name` | string | 店舗名 |
| `category` | string | カテゴリ（`fashion` / `food` / `grocery` / `service`）|
| `floor` | string | フロア（`1F`〜`5F`）|
| `description` | string | 短い説明 |
| `image` | string | 画像URL |
| `hours` | string? | 営業時間 |
| `phone` | string? | 電話番号 |
| `website` | string? | 公式サイトURL |
| `fullDescription` | string? | 詳細説明 |

---

## 機能仕様

### ホームページ（`/`）

#### ヒーローセクション
- フルスクリーン背景画像（ズームイン・アウトアニメーション）
- 「フィールズ南柏とは」ページへのCTAボタン

#### ピックアップカルーセル
- WordPress APIから取得した掲載期間内のピックアップを表示
- 表示枚数: モバイル1枚 / デスクトップ4枚（中央2枚をフォーカス）
- 5秒ごとに自動スライド（無限ループ）
- 左右ナビゲーションボタン・ドットインジケーター
- 各カードをクリックすると `/pickups/:id` へ遷移

#### ニュースセクション
- WordPress APIから取得した最新5件を一覧表示
- 表示期間（`start_at`〜`end_at`）でフィルタリング
- 開始日時の降順でソート
- 「MORE」リンクで `/news` へ遷移

#### イベントセクション
- WordPress APIから取得した最新4件をカードグリッドで表示（2列 / 4列）
- 表示期間でフィルタリング・降順ソート
- 新着には「NEW」バッジを表示（投稿から7日以内）
- 「MORE」リンクで `/events` へ遷移

#### 店舗検索セクション
- カテゴリフィルター（すべて / ファッション / グルメ / 食品・日用品 / サービス）
- フロア別（5F〜1F）に店舗カードを表示
- 各フロアのテーマカラーで色分け

| フロア | テーマカラー | 主要業態 |
|--------|-------------|---------|
| 5F | 紫 | エンターテインメント |
| 4F | ピンク | 書籍・家電・雑貨・フィットネス |
| 3F | 緑 | レストラン・カフェ |
| 2F | オレンジ | ファッション・雑貨・サービス |
| 1F | 青 | 食品・日用品・サービス |

### フロアガイド（`/floor-guide`）
各フロアのレイアウト・テナント一覧を表示。

### フィールズ南柏とは（`/about`）
- 3枚のメイン画像を8秒ごとにクロスフェード切り替え
- 館内サービス案内（ベビー設備 / AED / バリアフリー / ペット / コインロッカー / 駐車場精算機）

### アクセス（`/access`）
- Google Mapsの埋め込み地図
- 電車: JR常磐線各駅停車「南柏」東口より徒歩1分
- 自動車: 国道6号線・旧水戸街道からのルート案内
- 駐車場: 入庫後2時間無料、以降60分300円、1日最大1,000円
- 駐輪場: 最初2時間無料、以降12時間毎100円

---

## 共通レイアウト

### ヘッダー
- ロゴ（クリックでホームへ）
- PCナビゲーション: ホーム / フロアガイド / お知らせ / イベント / フィールズ南柏とは / アクセス
- モバイルハンバーガーメニュー（アコーディオン展開、アニメーション付き）

### フッター
- ロゴ・住所・営業時間
- Googleマップ埋め込み
- ナビゲーションリンク
- SNSリンク（Facebook / Instagram / Twitter）
- ページトップへ戻るボタン
- コピーライト表示

---

## 表示期間制御

APIから取得したコンテンツは、現在日時が `publish_start_at`（または `start_at`）〜`publish_end_at`（または `end_at`）の範囲内のものだけを表示する。期間未設定の場合は常時表示。

---

## レスポンシブ対応

ブレークポイントは Tailwind CSS のデフォルト（`md`: 768px）を基準とする。

- モバイル（〜767px）: 1〜2カラム、ハンバーガーメニュー
- デスクトップ（768px〜）: 複数カラム、水平ナビゲーション

---

## ディレクトリ構成

```
src/
├── assets/images/       # 静的画像ファイル
├── components/
│   ├── figma/           # Figma 連携コンポーネント（ImageWithFallback など）
│   └── ui/              # shadcn/ui コンポーネント群
├── data/                # 静的データ（shops, news, events, pickups）
├── features/            # ドメイン別ロジック
│   ├── events/          # イベント（API・型・定数・ユーティリティ）
│   ├── news/            # ニュース（API・型・定数・ユーティリティ）
│   └── pickups/         # ピックアップ（API・型・定数・ユーティリティ）
├── pages/               # ページコンポーネント
├── router/              # ルーティング定義
└── styles/              # グローバルCSS・テーマ
```
