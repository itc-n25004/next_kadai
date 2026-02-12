import { type ReactNode } from 'react'

/**
 * カードコンポーネントのプロパティ型定義
 */
type CardProps = {
  children: ReactNode
  className?: string
}

/**
 * 再利用可能なカードコンポーネント
 * 半透明の背景とぼかし効果を持つコンテナ
 * コンテンツを視覚的にグループ化する
 * @param {CardProps} props - カードのプロパティ
 * @returns {JSX.Element} カード要素
 */
export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  )
}