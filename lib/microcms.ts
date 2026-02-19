import { createClient } from "microcms-js-sdk";

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
 * 国型定義（microCMSスキーマに対応）
 */
export type Country = MicroCMSBase & {
  title: string;
  co_image?: {
    url: string;
    height: number;
    width: number;
  };
  ac_image?: {
    url: string;
    height: number;
    width: number;
  };
  discription?: string;
};

/**
 * キャラクター型定義（microCMSスキーマに対応）
 */
export type Character = MicroCMSBase & {
  character: string;
  elements: string;
  country: string; // 国はIDのみの文字列か、国オブジェクトのどちらか
  image: {
    url: string;
    height: number;
    width: number;
  };
  character_sprite?: {
    url: string;
    height: number;
    width: number;
  };
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
  image?: {
    url: string;
    height: number;
    width: number;
  };
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

// 環境変数チェック
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

/**
 * microCMSクライアントのインスタンス
 */
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
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
        co_image: sample.co_image?.url,
        ac_image: sample.ac_image?.url,
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
    if (data.contents[0]) {
      const sample = data.contents[0];
      console.log("📦 キャラクターデータサンプル:", {
        character: sample.character,
        elements: sample.elements,
        country: sample.country,
        image: sample.image?.url,
        character_sprite: sample.character_sprite?.url,
      });
    }
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
