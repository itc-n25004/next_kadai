/**
 * ローディングスピナーコンポーネントのプロパティ型定義
 */
type LoadingSpinnerProps = {
  size?: 'small' | 'medium' | 'large'
  message?: string
  className?: string
}

/**
 * 純粋関数: スピナーのサイズクラスを返す
 * @param {('small'|'medium'|'large')} size - スピナーのサイズ
 * @returns {string} サイズに応じたクラス名
 */
const getSpinnerSizeClass = (size: 'small' | 'medium' | 'large'): string => {
  const sizes = {
    small: 'w-6 h-6 border-2',
    medium: 'w-12 h-12 border-3',
    large: 'w-16 h-16 border-4',
  }
  return sizes[size]
}

/**
 * ローディングスピナーコンポーネント
 * データ読み込み中の表示を統一
 * @param {LoadingSpinnerProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} スピナー要素
 */
export default function LoadingSpinner({
  size = 'medium',
  message = '読み込み中...',
  className = '',
}: LoadingSpinnerProps) {
  const spinnerSizeClass = getSpinnerSizeClass(size)

  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <div
        className={`${spinnerSizeClass} border-gray-300 border-t-yellow-500 rounded-full animate-spin`}
        role="status"
        aria-label="読み込み中"
      />
      {message && (
        <p className="text-gray-400 mt-4 text-center">{message}</p>
      )}
    </div>
  )
}