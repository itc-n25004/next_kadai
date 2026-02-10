import { getNews, News } from '@/lib/microcms';

export const revalidate = 60; // ISR: 60秒ごとに再生成

export default async function NewsPage() {
  const data = await getNews();
  const newsItems: News[] = data.contents || [];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="section-title text-center mb-12">
          ニュース
        </h1>

        {newsItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="card-genshin max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-blue-300 mb-4">
                ニュース情報準備中
              </h2>
              <p className="text-gray-300 mb-6">
                現在、ニュース情報を準備しています。
                <br />
                microCMSでニュースデータを登録してください。
              </p>
              <div className="bg-blue-900/30 p-4 rounded-lg text-left">
                <p className="text-sm text-gray-400 mb-2">必要なフィールド：</p>
                <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
                  <li>title (テキスト): ニュースタイトル</li>
                  <li>category (テキスト): カテゴリー</li>
                  <li>description (テキストエリア): 概要</li>
                  <li>content (リッチエディタ): 本文</li>
                  <li>thumbnail (画像): サムネイル画像</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((news) => (
              <article key={news.id} className="card-genshin group">
                <div className="aspect-video bg-gradient-to-br from-blue-800 to-purple-800 rounded-lg mb-4 overflow-hidden">
                  {news.thumbnail?.url ? (
                    <img
                      src={news.thumbnail.url}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      📰
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {news.category && (
                    <span className="inline-block px-3 py-1 bg-blue-800/50 rounded-full text-sm text-blue-300">
                      {news.category}
                    </span>
                  )}
                  
                  <h2 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {news.title}
                  </h2>
                  
                  {news.description && (
                    <p className="text-gray-400 text-sm line-clamp-3">
                      {news.description}
                    </p>
                  )}
                  
                  <div className="flex justify-between items-center text-xs text-gray-500 pt-2">
                    <time dateTime={news.publishedAt}>
                      {new Date(news.publishedAt).toLocaleDateString('ja-JP')}
                    </time>
                    <span className="text-blue-400 group-hover:text-purple-400 transition-colors">
                      続きを読む →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
