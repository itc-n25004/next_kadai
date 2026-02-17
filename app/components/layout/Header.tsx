"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/**
 * 純粋関数: スクロール状態に基づいたヘッダークラス名を生成
 */
const getHeaderClass = (isScrolled: boolean): string => {
  const baseClass =
    "fixed top-0 left-0 w-full z-50 transition-all duration-300";
  const scrollClass = isScrolled
    ? "bg-black/80 backdrop-blur-md shadow-lg"
    : "bg-transparent";
  return `${baseClass} ${scrollClass}`;
};

/**
 * 純粋関数: ナビゲーションアイテムを返す
 */
const getNavItems = () => [
  { label: "ホーム", href: "/" },
  { label: "キャラクター", href: "/characters" },
  { label: "ニュース", href: "/news" },
  { label: "学園紹介", href: "/academy" },
  { label: "コミュニティ", href: "/community" },
];

/**
 * ヘッダーコンポーネント
 */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = getNavItems();
  const headerClass = getHeaderClass(isScrolled);

  return (
    <header className={headerClass}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:text-yellow-400 transition-colors"
        >
          原神学園
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white hover:text-yellow-400 transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="メニュー"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-black/90 backdrop-blur-md">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-3 text-white hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
