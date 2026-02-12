"use client";

import { useState } from "react";

const mediaData = {
  videos: [
    { icon: "🎬", title: "学園紹介PV" },
    { icon: "🎥", title: "文化祭ダイジェスト" },
    { icon: "📹", title: "部活動紹介" },
  ],
  images: [
    { icon: "🎨", title: "キャラクターアート" },
    { icon: "🖼️", title: "学園の四季" },
    { icon: "📸", title: "イベントギャラリー" },
  ],
};

/**
 * メディアセクションコンポーネント
 * 動画とイラストのコンテンツを切り替え表示
 * @returns {JSX.Element} メディアセクション
 */
export default function MediaSection() {
  const [activeTab, setActiveTab] = useState<"videos" | "images">("videos");

  const content = mediaData[activeTab];

  return (
    <section id="media" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-5xl font-bold text-white text-center mb-12">
          メディア
        </h2>

        {/* タブボタン */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-6 py-3 rounded-lg transition-all duration-300 font-bold ${
              activeTab === "videos"
                ? "bg-yellow-500 text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            動画
          </button>
          <button
            onClick={() => setActiveTab("images")}
            className={`px-6 py-3 rounded-lg transition-all duration-300 font-bold ${
              activeTab === "images"
                ? "bg-yellow-500 text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            イラスト
          </button>
        </div>

        {/* メディアコンテンツグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item, index) => (
            <div key={index}>
              <div className="aspect-video bg-gradient-to-br from-indigo-600 to-purple-700 rounded-lg flex items-center justify-center text-5xl hover:scale-105 transition-transform duration-300 cursor-pointer">
                {item.icon}
              </div>
              <p className="text-white text-center mt-2">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
