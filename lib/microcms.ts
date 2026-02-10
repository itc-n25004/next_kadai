import { createClient } from 'microcms-js-sdk';

// microCMSクライアントの作成
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || '',
  apiKey: process.env.MICROCMS_API_KEY || '',
});

// 型定義
export type Character = {
  id: string;
  name: string;
  title: string;
  element: string;
  weapon: string;
  rarity: number;
  description: string;
  image: {
    url: string;
  };
  publishedAt: string;
  updatedAt: string;
};

export type News = {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  thumbnail: {
    url: string;
  };
  publishedAt: string;
  updatedAt: string;
};

export type Media = {
  id: string;
  title: string;
  type: 'image' | 'video';
  thumbnail: {
    url: string;
  };
  mediaUrl?: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
};

export type Community = {
  id: string;
  title: string;
  category: string;
  content: string;
  author: string;
  thumbnail?: {
    url: string;
  };
  publishedAt: string;
  updatedAt: string;
};

// データ取得関数
export const getCharacters = async () => {
  try {
    const data = await client.get({
      endpoint: 'characters',
    });
    return data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    return { contents: [] };
  }
};

export const getCharacter = async (id: string) => {
  try {
    const data = await client.get({
      endpoint: 'characters',
      contentId: id,
    });
    return data;
  } catch (error) {
    console.error('Error fetching character:', error);
    return null;
  }
};

export const getNews = async () => {
  try {
    const data = await client.get({
      endpoint: 'news',
    });
    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    return { contents: [] };
  }
};

export const getNewsItem = async (id: string) => {
  try {
    const data = await client.get({
      endpoint: 'news',
      contentId: id,
    });
    return data;
  } catch (error) {
    console.error('Error fetching news item:', error);
    return null;
  }
};

export const getMedia = async () => {
  try {
    const data = await client.get({
      endpoint: 'media',
    });
    return data;
  } catch (error) {
    console.error('Error fetching media:', error);
    return { contents: [] };
  }
};

export const getCommunityPosts = async () => {
  try {
    const data = await client.get({
      endpoint: 'community',
    });
    return data;
  } catch (error) {
    console.error('Error fetching community posts:', error);
    return { contents: [] };
  }
};
