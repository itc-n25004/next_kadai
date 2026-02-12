'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * スクロール表示コンポーネントのプロパティ型定義
 */
type ScrollRevealProps = {
  children: ReactNode
  delay?: number
}

/**
 * スクロール連動表示コンポーネント
 * 要素が画面内に入ったときにフェードイン＆スライドアップアニメーション
 * Intersection Observer APIを使用してパフォーマンス最適化
 * @param {ScrollRevealProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} アニメーション付きコンテナ
 */
export default function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {
  // 要素の表示状態を管理
  const [isVisible, setIsVisible] = useState(false)
  // DOM要素への参照
  const ref = useRef<HTMLDivElement>(null)

  /**
   * Intersection Observerを設定して要素の表示を監視
   * 要素が10%以上画面に入ったら表示アニメーションを開始
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 遅延時間後に表示
          setTimeout(() => setIsVisible(true), delay * 1000)
          // 一度表示したら監視を終了（パフォーマンス向上）
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    // クリーンアップ
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`transition-all duration-800 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  )
}