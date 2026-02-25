/**
 * microCMS 画像フィールドの型
 */
export type MicroCMSImage = {
  url: string;
  height: number;
  width: number;
};

/**
 * 純粋関数: 画像URLを取り出す
 * @param {MicroCMSImage | string | undefined} image - 画像データ（オブジェクトまたはURL文字列）
 * @returns {string | undefined} 画像URL
 */
export const getImageUrl = (
  image?: MicroCMSImage | string,
): string | undefined => {
  if (!image) {
    return undefined;
  }
  return typeof image === "string" ? image : image.url;
};

/**
 * 純粋関数: 複数のクラス名を結合する
 * falsy値（undefined、null、false）は除外される
 * @param {...(string|undefined|null|false)[]} classes - クラス名の可変長引数
 * @returns {string} 結合されたクラス名文字列
 */
export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

/**
 * 純粋関数: 配列をランダムにシャッフル
 * 元の配列は変更せず、新しい配列を返す（純粋関数）
 * Fisher-Yatesアルゴリズムを使用
 * @template T - 配列要素の型
 * @param {T[]} array - シャッフルする配列
 * @returns {T[]} シャッフルされた新しい配列
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * 純粋関数: 配列を指定サイズのチャンクに分割
 * 元の配列は変更せず、新しい二次元配列を返す
 * @template T - 配列要素の型
 * @param {T[]} array - 分割する配列
 * @param {number} size - 各チャンクのサイズ
 * @returns {T[][]} チャンクに分割された二次元配列
 */
export const chunkArray = <T>(array: T[], size: number): T[][] => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size),
  );
};
