/**
 * キャラクターデータの型定義
 */
export type Character = {
  id: number
  name: string
  element: string
  description: string
}

/**
 * ニュースアイテムデータの型定義
 */
export type NewsItem = {
  id: number
  title: string
  date: string
  summary: string
  icon: string
}

/**
 * メディアアイテムデータの型定義
 */
export type MediaItem = {
  id: number
  title: string
  type: 'videos' | 'images'
  icon: string
}

/**
 * ソーシャルリンクデータの型定義
 */
export type SocialLink = {
  id: number
  name: string
  icon: string
}

/**
 * 純粋関数: キャラクター（生徒）データを返す
 * 学園に在籍する生徒たちの情報
 * @returns {Character[]} キャラクターの配列
 */
export const getCharacters = (): Character[] => [
  {
    id: 1,
    name: '楓原万葉',
    element: '風',
    description: '文芸部所属。詩を愛する自由な精神の持ち主',
  },
  {
    id: 2,
    name: '胡桃',
    element: '炎',
    description: '演劇部部長。いたずら好きで元気いっぱい',
  },
  {
    id: 3,
    name: '神里綾華',
    element: '氷',
    description: '生徒会長。優雅で礼儀正しい模範的生徒',
  },
  {
    id: 4,
    name: '雷電将軍',
    element: '雷',
    description: '剣道部主将。圧倒的な実力を持つ',
  },
  {
    id: 5,
    name: 'タルタリヤ',
    element: '水',
    description: '水泳部エース。勝負事が大好き',
  },
  {
    id: 6,
    name: '鍾離',
    element: '岩',
    description: '歴史教師。博識で落ち着いた雰囲気',
  },
  {
    id: 7,
    name: 'ナヒーダ',
    element: '草',
    description: '図書委員長。知識の探求者',
  },
  {
    id: 8,
    name: '放浪者',
    element: '風',
    description: '謎多き転校生。一匹狼タイプ',
  },
]

/**
 * 純粋関数: ニュースデータを返す
 * 学園からの最新のお知らせ情報
 * @returns {NewsItem[]} ニュースアイテムの配列
 */
export const getNews = (): NewsItem[] => [
  {
    id: 1,
    title: '文化祭開催のお知らせ',
    date: '2026-02-01',
    summary: '今年も盛大な文化祭を開催します。各部の出し物をお楽しみに！',
    icon: '🎪',
  },
  {
    id: 2,
    title: '新入生歓迎会',
    date: '2026-01-25',
    summary: '新しい仲間を迎える歓迎会を開催しました',
    icon: '🎉',
  },
  {
    id: 3,
    title: '元素力体験授業',
    date: '2026-01-20',
    summary: '七つの元素の力を体験できる特別授業が好評でした',
    icon: '⚡',
  },
]

/**
 * 純粋関数: メディアアイテムデータを返す
 * 動画やイラストなどのメディアコンテンツ情報
 * @returns {MediaItem[]} メディアアイテムの配列
 */
export const getMediaItems = (): MediaItem[] => [
  { id: 1, title: '学園紹介PV', type: 'videos', icon: '🎬' },
  { id: 2, title: '文化祭ダイジェスト', type: 'videos', icon: '🎥' },
  { id: 3, title: '部活動紹介', type: 'videos', icon: '📹' },
  { id: 4, title: 'キャラクターアート', type: 'images', icon: '🎨' },
  { id: 5, title: '学園の四季', type: 'images', icon: '🖼️' },
  { id: 6, title: 'イベントギャラリー', type: 'images', icon: '📸' },
]

/**
 * 純粋関数: ソーシャルリンクデータを返す
 * コミュニティプラットフォームへのリンク情報
 * @returns {SocialLink[]} ソーシャルリンクの配列
 */
export const getSocialLinks = (): SocialLink[] => [
  { id: 1, name: 'Twitter', icon: '🐦' },
  { id: 2, name: 'Discord', icon: '💬' },
  { id: 3, name: 'YouTube', icon: '📺' },
  { id: 4, name: 'Reddit', icon: '🤖' },
]