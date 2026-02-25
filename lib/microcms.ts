import { createClient } from "microcms-js-sdk";
import { getImageUrl as getImageUrlUtil, type MicroCMSImage } from "./utils";

/**
 * microCMS API レスポンスの基本型
 */
type MicroCMSBase = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

/**
 * 純粋関数: 画像URLを取り出す（再エクスポート）
 */
export const getImageUrl = getImageUrlUtil;
export type { MicroCMSImage };

/**
 * 国型定義（microCMSスキーマに対応）
 */
export type Country = MicroCMSBase & {
  title: string;
  co_image?: MicroCMSImage | string; // 国旗画像URL
  ac_image?: MicroCMSImage | string; // 学園画像URL
  discription?: string;
};

/**
 * キャラクター型定義（microCMSスキーマに対応）
 */
export type Character = MicroCMSBase & {
  character: string;
  elements: string;
  country: string | Country; // 国はID文字列か、国オブジェクト
  image?: MicroCMSImage | string; // 画像URL
  character_sprite?: MicroCMSImage | string; // キャラクター画像URL
  discription?: string; // キャラクターの説明
  episode?: string; // エピソード
  comment?: string; // コメント
  class?: string; // クラス
  club?: string; // 所属部活
  grade?: number; // 学年
};

/**
 * ニュース型定義（microCMSスキーマに対応）
 */
export type NewsItem = MicroCMSBase & {
  title: string;
  date: string;
  summary?: string;
  discription?: string;
  type?: string;
  icon?: string;
  image?: MicroCMSImage;
};

/**
 * メディア型定義（microCMSスキーマに対応）
 */
export type MediaItem = MicroCMSBase & {
  title: string;
  type: "videos" | "images";
  icon: string;
};

/**
 * ソーシャルリンク型定義（microCMSスキーマに対応）
 */
export type SocialLink = MicroCMSBase & {
  name: string;
  icon: string;
  url: string;
};

/**
 * microCMS リストレスポンス型
 */
type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

// 環境変数チェック（サーバーサイドのみ）
if (typeof window === "undefined") {
  if (!process.env.MICROCMS_SERVICE_DOMAIN) {
    throw new Error("MICROCMS_SERVICE_DOMAIN is required");
  }

  if (!process.env.MICROCMS_API_KEY) {
    throw new Error("MICROCMS_API_KEY is required");
  }
}

/**
 * microCMSクライアントのインスタンス
 */
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || "",
  apiKey: process.env.MICROCMS_API_KEY || "",
});

/**
 * 国一覧を取得
 * @returns {Promise<Country[]>} 国配列
 */
export const getCountries = async (): Promise<Country[]> => {
  try {
    const data = await client.get<MicroCMSListResponse<Country>>({
      endpoint: "country",
    });
    console.log("✅ 国データ取得成功:", data.contents.length, "件");
    if (data.contents[0]) {
      const sample = data.contents[0];
      console.log("📦 国データサンプル:", {
        title: sample.title,
        co_image: sample.co_image,
        ac_image: sample.ac_image,
        discription: sample.discription,
      });
    }
    return data.contents;
  } catch (error) {
    console.log("❌ 国データを取得できませんでした:", error);
    return [];
  }
};

/**
 * キャラクター一覧を取得
 * @returns {Promise<Character[]>} キャラクター配列
 */
export const getCharacters = async (): Promise<Character[]> => {
  try {
    const data = await client.get<MicroCMSListResponse<Character>>({
      endpoint: "gakuen",
      queries: {
        limit: 100,
      },
    });
    console.log("✅ キャラクターデータ取得成功:", data.contents.length, "件");

    // 全データを出力（デバッグ用）
    console.log(
      "📋 全キャラクターデータ:",
      JSON.stringify(data.contents, null, 2),
    );

    if (data.contents[0]) {
      const sample = data.contents[0];
      console.log("📦 キャラクターデータサンプル:", {
        character: sample.character,
        elements: sample.elements,
        country: sample.country,
        image: sample.image,
        character_sprite: sample.character_sprite,
        discription: sample.discription,
        episode: sample.episode,
        comment: sample.comment,
        class: sample.class,
        club: sample.club,
      });
      console.log("🔍 サンプル全体:", sample);
    }
    // 全キャラクターの詳細フィールドの有無をチェック
    console.log("📊 詳細フィールド統計:");
    console.log(
      "  - discription あり:",
      data.contents.filter((c) => c.discription).length,
      "件",
    );
    console.log(
      "  - episode あり:",
      data.contents.filter((c) => c.episode).length,
      "件",
    );
    console.log(
      "  - comment あり:",
      data.contents.filter((c) => c.comment).length,
      "件",
    );
    console.log(
      "  - class あり:",
      data.contents.filter((c) => c.class).length,
      "件",
    );
    console.log(
      "  - club あり:",
      data.contents.filter((c) => c.club).length,
      "件",
    );
    return data.contents;
  } catch (error) {
    console.log("❌ キャラクターデータを取得できませんでした:", error);
    return [];
  }
};

/**
 * ニュース一覧を取得（公開日降順）
 * @returns {Promise<NewsItem[]>} ニュース配列
 */
export const getNews = async (): Promise<NewsItem[]> => {
  try {
    const data = await client.get<MicroCMSListResponse<NewsItem>>({
      endpoint: "news",
      queries: {
        orders: "-publishedAt",
      },
    });
    console.log("✅ ニュースデータ取得成功:", data.contents.length, "件");
    return data.contents;
  } catch (error) {
    console.log("❌ ニュースデータを取得できませんでした:", error);
    return [];
  }
};

/**
 * メディア一覧を取得
 * @returns {Promise<MediaItem[]>} メディア配列
 */
export const getMediaItems = async (): Promise<MediaItem[]> => {
  try {
    const data = await client.get<MicroCMSListResponse<MediaItem>>({
      endpoint: "media",
    });
    console.log("✅ メディアデータ取得成功:", data.contents.length, "件");
    return data.contents;
  } catch (error) {
    console.log("❌ メディアデータを取得できませんでした:", error);
    return [];
  }
};

/**
 * ソーシャルリンク一覧を取得
 * @returns {Promise<SocialLink[]>} ソーシャルリンク配列
 */
export const getSocialLinks = async (): Promise<SocialLink[]> => {
  try {
    const data = await client.get<MicroCMSListResponse<SocialLink>>({
      endpoint: "social-links",
    });
    console.log(
      "✅ ソーシャルリンクデータ取得成功:",
      data.contents.length,
      "件",
    );
    return data.contents;
  } catch (error) {
    console.log("❌ ソーシャルリンクデータを取得できませんでした:", error);
    return [];
  }
};
