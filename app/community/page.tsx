import { getCommunityPosts, Community } from '@/lib/microcms';
import DOMPurify from 'isomorphic-dompurify';

export const revalidate = 60; // ISR: 60秒ごとに再生成

export default async function CommunityPage() {
  const data = await getCommunityPosts();
  const posts: Community[] = data.contents || [];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="section-title text-center mb-12">
          コミュニティ
        </h1>

        <div className="max-w-5xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="card-genshin">
                <h2 className="text-2xl font-bold text-blue-300 mb-4">
                  コミュニティ投稿準備中
                </h2>
                <p className="text-gray-300 mb-6">
                  現在、コミュニティ投稿を準備しています。
                  <br />
                  microCMSでコミュニティデータを登録してください。
                </p>
                <div className="bg-blue-900/30 p-4 rounded-lg text-left">
                  <p className="text-sm text-gray-400 mb-2">必要なフィールド：</p>
                  <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
                    <li>title (テキスト): タイトル</li>
                    <li>category (テキスト): カテゴリー</li>
                    <li>content (リッチエディタ): 投稿内容</li>
                    <li>author (テキスト): 投稿者名</li>
                    <li>thumbnail (画像): サムネイル画像 (オプション)</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <article key={post.id} className="card-genshin group">
                  <div className="flex flex-col md:flex-row gap-6">
                    {post.thumbnail?.url && (
                      <div className="md:w-48 flex-shrink-0">
                        <div className="aspect-video md:aspect-square bg-gradient-to-br from-blue-800 to-purple-800 rounded-lg overflow-hidden">
                          <img
                            src={post.thumbnail.url}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    )}
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          {post.category && (
                            <span className="inline-block px-3 py-1 bg-purple-800/50 rounded-full text-sm text-purple-300 mb-2">
                              {post.category}
                            </span>
                          )}
                          <h2 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                            {post.title}
                          </h2>
                        </div>
                      </div>
                      
                      <div 
                        className="text-gray-400 text-sm line-clamp-3"
                        dangerouslySetInnerHTML={{ 
                          __html: DOMPurify.sanitize(post.content, {
                            ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a'],
                            ALLOWED_ATTR: ['href', 'target', 'rel']
                          })
                        }}
                      />
                      
                      <div className="flex items-center justify-between pt-4 border-t border-blue-800/30">
                        <div className="flex items-center gap-3 text-sm">
                          <span className="flex items-center gap-2 text-gray-400">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            {post.author}
                          </span>
                          <time className="text-gray-500" dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                          </time>
                        </div>
                        <span className="text-blue-400 group-hover:text-purple-400 transition-colors text-sm">
                          詳しく見る →
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Community Info */}
          <div className="mt-12 card-genshin bg-gradient-to-r from-blue-900/30 to-purple-900/30">
            <h3 className="text-xl font-bold text-blue-300 mb-4">
              コミュニティについて
            </h3>
            <p className="text-gray-300 mb-4">
              原神学園コミュニティでは、プレイヤー同士の交流や情報共有を行っています。
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• 攻略情報の共有</li>
              <li>• ファンアートの投稿</li>
              <li>• イベント情報</li>
              <li>• プレイヤー交流</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
