# 原神学園 (Genshin Academy)

原神のパロディファンサイトです。

## 概要

このプロジェクトは、原神の公式サイト（https://genshin.hoyoverse.com/ja/home）を参考にした、ファンコミュニティサイトです。

## ページ構成

- **ホーム (`/home`)**: トップページ、各セクションへの入り口
- **キャラクター (`/character`)**: キャラクター一覧と詳細
- **ニュース (`/news`)**: 最新ニュースとアップデート情報
- **メディア (`/media`)**: 画像・動画ギャラリー
- **コミュニティ (`/community`)**: プレイヤー投稿とコミュニティ情報

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **CMS**: microCMS
- **フォント**: Noto Sans JP

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. microCMSの設定

1. [microCMS](https://microcms.io/)でアカウントを作成
2. 新しいサービスを作成
3. 以下のAPIを作成：

#### characters API
- エンドポイント: `characters`
- 種類: リスト形式

フィールド:
- `name` (テキストフィールド): キャラクター名
- `title` (テキストフィールド): 称号
- `element` (テキストフィールド): 元素（例: 風、岩、雷など）
- `weapon` (テキストフィールド): 武器種類
- `rarity` (数値): レアリティ (1-5)
- `description` (テキストエリア): 説明
- `image` (画像): キャラクター画像

#### news API
- エンドポイント: `news`
- 種類: リスト形式

フィールド:
- `title` (テキストフィールド): ニュースタイトル
- `category` (テキストフィールド): カテゴリー
- `description` (テキストエリア): 概要
- `content` (リッチエディタ): 本文
- `thumbnail` (画像): サムネイル画像

#### media API
- エンドポイント: `media`
- 種類: リスト形式

フィールド:
- `title` (テキストフィールド): タイトル
- `type` (セレクト): タイプ
  - 選択肢: `image`, `video`
- `thumbnail` (画像): サムネイル画像
- `mediaUrl` (テキストフィールド): メディアURL (オプション)
- `description` (テキストエリア): 説明

#### community API
- エンドポイント: `community`
- 種類: リスト形式

フィールド:
- `title` (テキストフィールド): タイトル
- `category` (テキストフィールド): カテゴリー
- `content` (リッチエディタ): 投稿内容
- `author` (テキストフィールド): 投稿者名
- `thumbnail` (画像): サムネイル画像 (オプション)

### 3. 環境変数の設定

`.env.example`を`.env.local`にコピーし、microCMSの情報を設定：

```bash
cp .env.example .env.local
```

`.env.local`を編集：

```
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## ビルド

```bash
npm run build
```

## プロダクション起動

```bash
npm start
```

## コンポーネント構成

### 共通コンポーネント (`/components`)

- `Header.tsx`: ナビゲーションヘッダー
- `Footer.tsx`: フッター
- `Loading.tsx`: ローディング表示

### レイアウト

- `app/layout.tsx`: 全ページ共通のレイアウト（ヘッダー・フッター含む）
- `app/globals.css`: グローバルスタイル

### データ取得

- `lib/microcms.ts`: microCMSクライアントとデータ取得関数

## 注意事項

- これは原神の非公式ファンサイトです
- 原神は株式会社HoYoverseの商標です
- 商用利用を目的としたものではありません

## ライセンス

このプロジェクトは教育目的で作成されています。
