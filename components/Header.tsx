'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900/95 via-purple-900/95 to-blue-900/95 backdrop-blur-sm border-b border-blue-400/30">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/home" className="text-2xl font-bold text-white hover:text-blue-300 transition-colors">
            原神学園
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8">
            <li>
              <Link 
                href="/home" 
                className="text-white hover:text-blue-300 transition-colors font-medium"
              >
                ホーム
              </Link>
            </li>
            <li>
              <Link 
                href="/character" 
                className="text-white hover:text-blue-300 transition-colors font-medium"
              >
                キャラクター
              </Link>
            </li>
            <li>
              <Link 
                href="/news" 
                className="text-white hover:text-blue-300 transition-colors font-medium"
              >
                ニュース
              </Link>
            </li>
            <li>
              <Link 
                href="/media" 
                className="text-white hover:text-blue-300 transition-colors font-medium"
              >
                メディア
              </Link>
            </li>
            <li>
              <Link 
                href="/community" 
                className="text-white hover:text-blue-300 transition-colors font-medium"
              >
                コミュニティ
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <ul className="md:hidden mt-4 space-y-2 pb-4">
            <li>
              <Link 
                href="/home" 
                className="block text-white hover:text-blue-300 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                ホーム
              </Link>
            </li>
            <li>
              <Link 
                href="/character" 
                className="block text-white hover:text-blue-300 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                キャラクター
              </Link>
            </li>
            <li>
              <Link 
                href="/news" 
                className="block text-white hover:text-blue-300 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                ニュース
              </Link>
            </li>
            <li>
              <Link 
                href="/media" 
                className="block text-white hover:text-blue-300 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                メディア
              </Link>
            </li>
            <li>
              <Link 
                href="/community" 
                className="block text-white hover:text-blue-300 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                コミュニティ
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
