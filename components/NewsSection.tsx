"use client";

const dummyNews = [
  {
    id: 1,
    date: "2026年2月1日",
    title: "文化祭開催のお知らせ",
    description: "今年も盛大な文化祭を開催します。各部の出し物をお楽しみに！",
    icon: "🎪",
  },
  {
    id: 2,
    date: "2026年1月25日",
    title: "新入生歓迎会",
    description: "新しい仲間を迎える歓迎会を開催しました",
    icon: "🎉",
  },
  {
    id: 3,
    date: "2026年1月20日",
    title: "元素力体験授業",
    description: "七つの元素の力を体験できる特別授業が好評でした",
    icon: "⚡",
  },
];

/**
 * ニュースセクションコンポーネント
 * 学園のニュース記事を表示
 * @returns {JSX.Element} ニュースセクション
 */
export default function NewsSection() {
  return (
    <section id="news" className="py-20 px-4 bg-black/30">
      <div className="container mx-auto">
        <h2 className="text-5xl font-bold text-white text-center mb-12">
          お知らせ
        </h2>

        {/* ニュースカードのグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dummyNews.map((news) => (
            <div
              key={news.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg mb-4 flex items-center justify-center text-4xl">
                {news.icon}
              </div>
              <p className="text-yellow-400 text-sm mb-2">{news.date}</p>
              <h3 className="text-xl font-bold text-white mb-2">
                {news.title}
              </h3>
              <p className="text-gray-400 text-sm">{news.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
