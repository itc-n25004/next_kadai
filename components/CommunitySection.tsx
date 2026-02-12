"use client";

const communityLinks = [
  { icon: "🐦", label: "Twitter" },
  { icon: "💬", label: "Discord" },
  { icon: "📺", label: "YouTube" },
  { icon: "🤖", label: "Reddit" },
];

/**
 * コミュニティセクションコンポーネント
 * 各種コミュニティへのリンクを表示
 * @returns {JSX.Element} コミュニティセクション
 */
export default function CommunitySection() {
  return (
    <section id="community" className="py-20 px-4 bg-black/30">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold text-white mb-6">コミュニティ</h2>
        <p className="text-gray-300 mb-12">
          原神学園のコミュニティに参加しよう
        </p>

        {/* コミュニティリンク */}
        <div className="flex flex-wrap justify-center gap-6">
          {communityLinks.map((link) => (
            <button
              key={link.label}
              className="bg-white/10 text-white px-8 py-4 text-lg rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-white/20 backdrop-blur-sm flex items-center gap-3"
            >
              <span className="text-2xl">{link.icon}</span>
              <span>{link.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
