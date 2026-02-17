import { NewsItem } from "@/lib/microcms";

type NewsSectionProps = {
  news: NewsItem[];
};

/**
 * ニュースセクションコンポーネント
 * 学園のニュース記事を表示
 * @returns {JSX.Element} ニュースセクション
 */
export default function NewsSection({ news }: NewsSectionProps) {
  return (
    <section id="news" className="py-20 px-4 bg-black/30">
      <div className="container mx-auto">
        <h2 className="text-5xl font-bold text-white text-center mb-12">
          お知らせ
        </h2>

        {/* ニュースカードのグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              {item.image?.url ? (
                <img
                  src={item.image.url}
                  alt={item.title}
                  className="aspect-video w-full object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg mb-4 flex items-center justify-center text-4xl">
                  {item.icon ?? "📰"}
                </div>
              )}
              <p className="text-yellow-400 text-sm mb-2">{item.date}</p>
              <h3 className="text-xl font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {item.summary ?? item.discription ?? ""}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
