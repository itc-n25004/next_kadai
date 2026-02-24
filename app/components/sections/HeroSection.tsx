"use client";

import { useState, useEffect } from "react";
import Button from "../ui/Button";

/**
 * 純粋関数: ランダムなパーティクルの初期位置を生成
 * @param {number} count - 生成するパーティクルの数
 * @returns {Array} パーティクルの配列（id, x, y, delay）
 */
const generateParticles = (
  count: number,
): Array<{ id: number; x: number; y: number; delay: number }> => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
  }));
};

/**
 * ヒーローセクションコンポーネント
 * ページトップの大きなビジュアルセクション
 * パーティクルアニメーション、メインメッセージ、CTAボタンを含む
 * @returns {JSX.Element} ヒーローセクション
 */
export default function HeroSection() {
  // パーティクルはクライアントサイドでのみ生成（Hydration対策）
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);

  useEffect(() => {
    setParticles(generateParticles(30));
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url(/top_image.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 背景オーバーレイ */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* 背景パーティクル */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-white rounded-full opacity-60 animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 text-center px-4 animate-fade-in">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-slide-up">
          原神学園
        </h1>
        <p
          className="text-xl md:text-2xl text-gray-200 mb-8 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          七つの元素が交差する学園での冒険が始まる
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
          style={{ animationDelay: "0.4s" }}
        >
          <Button variant="primary" size="large">
            入学案内
          </Button>
          <Button variant="secondary" size="large">
            学園紹介動画
          </Button>
        </div>
      </div>

      {/* スクロールインジケーター */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
