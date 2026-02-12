# 原神学園

## プロジェクト概要

このプロジェクトは、原神の非公式パロディサイトです。Next.js + Tailwind CSS で構築され、microCMS によるコンテンツ管理に対応しています。

### 特徴

- 🎨 **モダンデザイン**: Tailwind CSS によるレスポンシブな UI
- ✨ **アニメーション**: フェードイン、スライドアップなどの滑らかなアニメーション
- 📱 **レスポンシブ対応**: モバイル、タブレット、デスクトップに対応
- 🔄 **ヘッダースクロール効果**: スクロール時にヘッダーが透明から不透明に変化
- 📚 **microCMS 統合**: コンテンツを microCMS で管理可能

## ページ構成

### ホームページ (`/`)

- **ヒーローセクション**: パーティクルアニメーション付きのメインビジュアル
- **キャラクターセクション**: 学園の生徒キャラクターをカード表示
- **ニュースセクション**: 学園関連のお知らせを3件表示
- **メディアセクション**: 動画とイラストのコンテンツを切り替え表示
- **コミュニティセクション**: SNS へのリンク集
- **フッター**: サイト情報とリンク

### その他のページ

- **キャラクターページ** (`/characters`): 全キャラクター一覧表示
- **ニュースページ** (`/news`): 全ニュース記事一覧
- **メディアページ** (`/media`): メディアコンテンツ詳細
- **コミュニティページ** (`/community`): コミュニティ情報

## ディレクトリ構成

```
kadai/
├── app/                              # Next.js App Router
│   ├── page.tsx                      # ホームページ
│   ├── layout.tsx                    # ルートレイアウト
│   ├── globals.css                   # グローバルスタイル
│   ├── error.tsx                     # エラーページ
│   ├── loading.tsx                   # ローディング表示
│   ├── not-found.tsx                 # 404ページ
│   ├── characters/                   # キャラクターページ
│   ├── news/                         # ニュースページ
│   ├── media/                        # メディアページ
│   └── community/                    # コミュニティページ
├── components/                       # React コンポーネント
│   ├── Header.tsx                    # ヘッダー
│   ├── Footer.tsx                    # フッター
│   ├── HeroSection.tsx               # ヒーローセクション
│   ├── CharacterSection.tsx          # キャラクターセクション
│   ├── NewsSection.tsx               # ニュースセクション
│   ├── MediaSection.tsx              # メディアセクション
│   ├── CommunitySection.tsx          # コミュニティセクション
│   └── ui/                           # UI コンポーネント
│       ├── Button.tsx                # ボタン
│       ├── Card.tsx                  # カード
│       ├── EmptyState.tsx            # 空状態表示
│       ├── ErrorMessage.tsx          # エラーメッセージ
│       ├── LoadingSpinner.tsx        # ローディングスピナー
│       └── ScrollReveal.tsx          # スクロール時表示
├── lib/                              # ユーティリティ
│   ├── microcms.ts                   # microCMS API クライアント
│   ├── data.ts                       # データ取得処理
│   └── utils.ts                      # ユーティリティ関数
├── public/                           # 静的ファイル
├── tailwind.config.ts                # Tailwind CSS 設定
├── tsconfig.json                     # TypeScript 設定
└── package.json                      # 依存パッケージ
```

## microCMS の連携

### 設定

microCMS のコンテンツを取得するために、以下の環境変数を `.env.local` に設定してください：

```
NEXT_PUBLIC_MICROCMS_API_KEY=your_api_key
NEXT_PUBLIC_MICROCMS_SERVICE_ID=your_service_id
```

### API クライアント (`lib/microcms.ts`)

microCMS の REST API を呼び出すためのクライアントです。以下のエンドポイントに対応しています：

- **キャラクター**: `/api/v1/characters`
- **ニュース**: `/api/v1/news`
- **メディア**: `/api/v1/media`

### データ取得 (`lib/data.ts`)

各ページでは `lib/data.ts` の関数を使用して microCMS からデータを取得します：

```typescript
import { getCharacters, getNews, getMedia } from "@/lib/data";

// キャラクターデータ取得
const characters = await getCharacters();

// ニュースデータ取得
const news = await getNews();

// メディアデータ取得
const media = await getMedia();
```

## 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) でアプリケーションが起動します。

## 本番環境へのデプロイ

[Vercel](https://vercel.com/) での自動デプロイを推奨します：

1. GitHub リポジトリを Vercel に連携
2. 環境変数を設定
3. デプロイボタンをクリック
