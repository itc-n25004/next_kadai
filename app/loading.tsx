import LoadingSpinner from '@/components/ui/LoadingSpinner'

/**
 * ローディングページコンポーネント
 * Next.jsの自動ローディング機能
 * ページ遷移中やデータ取得中に表示
 * @returns {JSX.Element} ローディングページ
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-900 via-purple-900 to-indigo-950 flex items-center justify-center">
      <LoadingSpinner
        size="large"
        message="原神学園を読み込んでいます..."
      />
    </div>
  )
}