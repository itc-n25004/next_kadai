# 原神学園 🏫

原神の世界観をベースにした学園パロディサイトです。Next.js 14 の App Router と microCMS を使用して構築されています。

## ✨ 機能の説明

- 🎨 **モダンUI**: Tailwind CSS によるレスポンシブデザイン
- ⚡ **高速**: Next.js 14 App Router + Server Components
- 📱 **レスポンシブ**: モバイル・タブレット・デスクトップ完全対応
- 🎬 **スムーズアニメーション**: フェードイン、スクロールエフェクト
- 📊 **microCMS 連携**: ヘッドレス CMS でコンテンツ管理
- 🔍 **SEO 最適化**: メタデータとセマンティック HTML
- 🎭 **動的ルーティング**: キャラクター詳細ページなど
- 🚀 **TypeScript**: 型安全な開発環境

## 🛠 技術スタック

- **フレームワーク**: [Next.js 14](https://nextjs.org/)
- **言語**: [TypeScript](https://www.typescriptlang.org/)
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/)
- **CMS**: [microCMS](https://microcms.io/)
- **SDK**: [microcms-js-sdk](https://github.com/microcmsio/microcms-js-sdk)

## 📁 ディレクトリ構成の説明

```
kadai/
├── app/                              # Next.js App Router
│   ├── page.tsx                      # ホームページ
│   ├── layout.tsx                    # ルートレイアウト
│   ├── globals.css                   # グローバルスタイル
│   ├── academy/                      # 学園ページ
│   │   ├── page.tsx
│   │   └── styles.css
│   ├── characters/                   # キャラクター一覧
│   │   ├── page.tsx
│   │   ├── styles.css
│   │   └── [id]/                     # キャラクター詳細（動的ルート）
│   │       ├── page.tsx
│   │       └── styles.css
│   ├── news/                         # ニュースページ
│   │   ├── page.tsx
│   │   └── styles.css
│   ├── community/                    # コミュニティページ
│   │   ├── page.tsx
│   │   └── styles.css
│   └── components/                   # コンポーネント
│       ├── error/                    # エラー関連
│       │   ├── error.tsx
│       │   ├── loading.tsx
│       │   └── not-found.tsx
│       ├── layout/                   # レイアウト
│       │   ├── Header.tsx
│       │   └── Footer.tsx
│       ├── sections/                 # セクション
│       │   ├── HeroSection.tsx
│       │   ├── CharacterSection.tsx
│       │   ├── NewsSection.tsx
│       │   ├── CommunitySection.tsx
│       │   └── SchoolIntroduction.tsx
│       └── ui/                       # UI コンポーネント
│           ├── Button.tsx
│           ├── Card.tsx
│           ├── EmptyState.tsx
│           ├── ErrorMessage.tsx
│           ├── LoadingSpinner.tsx
│           └── ScrollReveal.tsx
├── lib/                              # ユーティリティ
│   ├── microcms.ts                   # microCMS API クライアント
│   ├── data.ts                       # データ取得処理
│   ├── utils.ts                      # ユーティリティ関数
│   └── constants.ts                  # 定数定義
├── public/                           # 画像ファイル
├── .env.local                        # 環境変数（未追跡）
├── tailwind.config.ts                # Tailwind CSS 設定
├── tsconfig.json                     # TypeScript 設定
└── package.json                      # 依存パッケージ
```

##### **Characters API**（リスト形式）

| フィールド ID    | 表示名           | 種類           | 必須 |
| ---------------- | ---------------- | -------------- | ---- |
| character        | キャラクター名   | テキスト       | ✓    |
| elements         | 元素             | テキスト       | ✓    |
| country          | 国               | テキスト       | ✓    |
| image            | メイン画像       | 画像           | -    |
| character_sprite | キャラクター画像 | 画像           | -    |
| discription      | 説明             | テキストエリア | -    |
| episode          | エピソード       | テキストエリア | -    |
| comment          | コメント         | テキストエリア | -    |
| grade            | 学年             | 数値           | -    |
| class            | クラス           | テキスト       | -    |
| club             | 部活             | テキスト       | -    |

##### **News API**（リスト形式）

| フィールド ID | 表示名   | 種類           | 必須 |
| ------------- | -------- | -------------- | ---- |
| title         | タイトル | テキスト       | ✓    |
| date          | 日付     | 日時           | ✓    |
| summary       | サマリー | テキストエリア | -    |
| discription   | 本文     | テキストエリア | -    |
| type          | タイプ   | テキスト       | -    |
| icon          | アイコン | テキスト       | -    |
| image         | 画像     | 画像           | -    |

##### **Countries API**（リスト形式）

| フィールド ID | 表示名   | 種類           | 必須 |
| ------------- | -------- | -------------- | ---- |
| title         | 国名     | テキスト       | ✓    |
| co_image      | 国旗画像 | 画像           | -    |
| ac_image      | 学園画像 | 画像           | -    |
| discription   | 説明     | テキストエリア | -    |

## 📄 ページ構成の説明

| パス               | 説明                                                           |
| ------------------ | -------------------------------------------------------------- |
| `/`                | ホームページ（ヒーロー、キャラクター、ニュース、コミュニティ） |
| `/academy`         | 学園紹介ページ                                                 |
| `/characters`      | キャラクター一覧ページ                                         |
| `/characters/[id]` | キャラクター詳細ページ（動的ルート）                           |
| `/news`            | ニュース一覧ページ                                             |
| `/community`       | コミュニティページ                                             |

## 🔧 microCMS にアクセスする処理の説明

### 役割と流れ

- `lib/microcms.ts` で `createClient` を使って microCMS クライアントを生成し、API 呼び出しの共通設定をまとめています。
- `lib/data.ts` が取得関数の窓口で、各ページの Server Component から呼び出して必要なデータを取得します。
- 画像 URL は `getImageUrl()` で変換し、サイズ指定などのパラメータを付与できます。

### 取得関数の例

```typescript
- getCharacters(): キャラクター一覧取得
- getCharacterById(id): キャラクター詳細取得
- getNews(): ニュース一覧取得
- getCountries(): 国一覧取得
```

## 🎨 コンポーネント構成

### レイアウトコンポーネント

- `Header.tsx`: スクロールで透明度が変化するヘッダー
- `Footer.tsx`: サイトフッター

### セクションコンポーネント

- `HeroSection.tsx`: メインビジュアル
- `CharacterSection.tsx`: キャラクターカード表示
- `NewsSection.tsx`: ニュース一覧
- `SchoolIntroduction.tsx`: 学園紹介
- `CommunitySection.tsx`: SNS リンク

### UI コンポーネント

- `Button.tsx`: 再利用可能なボタン
- `Card.tsx`: カードコンポーネント
- `EmptyState.tsx`: データなし状態の表示
- `ErrorMessage.tsx`: エラーメッセージ
- `LoadingSpinner.tsx`: ローディング表示
- `ScrollReveal.tsx`: スクロールアニメーション

## 💡 工夫した点

- セクション単位で UI を分割し、ページごとの再利用性を高めた
- microCMS 取得処理を `lib/data.ts` に集約してページ側の責務を軽くした
- `ScrollReveal` でスクロール時の演出を統一し、見た目の一体感を出した
- レスポンシブ前提の設計で、カードやセクションの配置が崩れにくいようにした

## 🧭 苦労した点

- microCMS の画像 URL 変換と表示サイズの調整
- 動的ルーティングでのデータ取得とエラーハンドリングの整理
- デザインと情報量のバランス（見た目と可読性の両立）

## 🌐 デプロイ

### Vercel でのデプロイ（推奨）

1. GitHub リポジトリにプッシュ
2. [Vercel](https://vercel.com/) にログイン
3. プロジェクトをインポート
4. 環境変数を設定：
   - `MICROCMS_SERVICE_DOMAIN`
   - `MICROCMS_API_KEY`
5. デプロイ

### その他のホスティング

- **Netlify**: `npm run build` で静的エクスポート
- **AWS Amplify**: Next.js SSR サポート
- **自前サーバー**: Node.js 環境が必要


## 📝 ライセンス

このプロジェクトは学習目的で作成された非公式のファンメイドコンテンツです。  
原神は miHoYo/HoYoverse の商標です。

## 🤝 コントリビューション

プルリクエストや Issue は歓�迎します！
