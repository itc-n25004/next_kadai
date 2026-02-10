import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-purple-900/50 to-transparent z-10"></div>
        <div className="relative z-20 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse">
            原神学園へようこそ
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            テイワットの冒険があなたを待っています
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/character" className="btn-genshin">
              キャラクターを見る
            </Link>
            <Link href="/news" className="btn-genshin">
              最新ニュース
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="section-title text-center">コンテンツ</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Characters */}
          <Link href="/character" className="card-genshin group cursor-pointer">
            <div className="text-center">
              <div className="text-5xl mb-4">⚔️</div>
              <h3 className="text-2xl font-bold mb-2 text-blue-300 group-hover:text-purple-300 transition-colors">
                キャラクター
              </h3>
              <p className="text-gray-400">
                様々な元素を持つキャラクターたちを紹介
              </p>
            </div>
          </Link>

          {/* News */}
          <Link href="/news" className="card-genshin group cursor-pointer">
            <div className="text-center">
              <div className="text-5xl mb-4">📰</div>
              <h3 className="text-2xl font-bold mb-2 text-blue-300 group-hover:text-purple-300 transition-colors">
                ニュース
              </h3>
              <p className="text-gray-400">
                最新のイベントやアップデート情報
              </p>
            </div>
          </Link>

          {/* Media */}
          <Link href="/media" className="card-genshin group cursor-pointer">
            <div className="text-center">
              <div className="text-5xl mb-4">🎬</div>
              <h3 className="text-2xl font-bold mb-2 text-blue-300 group-hover:text-purple-300 transition-colors">
                メディア
              </h3>
              <p className="text-gray-400">
                ゲーム内の美しい画像や動画
              </p>
            </div>
          </Link>

          {/* Community */}
          <Link href="/community" className="card-genshin group cursor-pointer">
            <div className="text-center">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-2xl font-bold mb-2 text-blue-300 group-hover:text-purple-300 transition-colors">
                コミュニティ
              </h3>
              <p className="text-gray-400">
                プレイヤー同士で交流しよう
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title">原神学園について</h2>
            <p className="text-lg text-gray-300 mb-6">
              原神学園は、原神のファンが集まるコミュニティサイトです。
              キャラクター情報、最新ニュース、メディアギャラリー、
              そしてプレイヤー同士の交流の場を提供しています。
            </p>
            <p className="text-gray-400">
              ※これは原神のパロディファンサイトであり、公式サイトではありません。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
