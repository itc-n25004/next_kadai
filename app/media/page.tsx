import { getMedia, Media } from '@/lib/microcms';

export const revalidate = 60; // ISR: 60秒ごとに再生成

export default async function MediaPage() {
  const data = await getMedia();
  const mediaItems: Media[] = data.contents || [];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="section-title text-center mb-12">
          メディア
        </h1>

        {mediaItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="card-genshin max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-blue-300 mb-4">
                メディア情報準備中
              </h2>
              <p className="text-gray-300 mb-6">
                現在、メディア情報を準備しています。
                <br />
                microCMSでメディアデータを登録してください。
              </p>
              <div className="bg-blue-900/30 p-4 rounded-lg text-left">
                <p className="text-sm text-gray-400 mb-2">必要なフィールド：</p>
                <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
                  <li>title (テキスト): タイトル</li>
                  <li>type (セレクト): タイプ (image / video)</li>
                  <li>thumbnail (画像): サムネイル画像</li>
                  <li>mediaUrl (テキスト): メディアURL (オプション)</li>
                  <li>description (テキストエリア): 説明</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Images Section */}
            {mediaItems.some(item => item.type === 'image') && (
              <section>
                <h2 className="text-2xl font-bold text-blue-300 mb-6">画像ギャラリー</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mediaItems
                    .filter(item => item.type === 'image')
                    .map((media) => (
                      <div key={media.id} className="card-genshin group">
                        <div className="aspect-video bg-gradient-to-br from-blue-800 to-purple-800 rounded-lg mb-4 overflow-hidden">
                          {media.thumbnail?.url ? (
                            <img
                              src={media.thumbnail.url}
                              alt={media.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-6xl">
                              🖼️
                            </div>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{media.title}</h3>
                        {media.description && (
                          <p className="text-sm text-gray-400 line-clamp-2">
                            {media.description}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </section>
            )}

            {/* Videos Section */}
            {mediaItems.some(item => item.type === 'video') && (
              <section>
                <h2 className="text-2xl font-bold text-blue-300 mb-6">動画ギャラリー</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mediaItems
                    .filter(item => item.type === 'video')
                    .map((media) => (
                      <div key={media.id} className="card-genshin group">
                        <div className="aspect-video bg-gradient-to-br from-blue-800 to-purple-800 rounded-lg mb-4 overflow-hidden relative">
                          {media.thumbnail?.url ? (
                            <>
                              <img
                                src={media.thumbnail.url}
                                alt={media.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                  </svg>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-6xl">
                              🎬
                            </div>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{media.title}</h3>
                        {media.description && (
                          <p className="text-sm text-gray-400 line-clamp-2">
                            {media.description}
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
