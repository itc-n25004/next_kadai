import { type ReactNode } from "react";

/**
 * エラーメッセージコンポーネントのプロパティ型定義
 */
type ErrorMessageProps = {
  title?: string;
  message: string;
  icon?: ReactNode;
  className?: string;
};

/**
 * エラーメッセージコンポーネント
 * 統一されたスタイルでエラーメッセージを表示
 * @param {ErrorMessageProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} エラーメッセージ要素
 */
export default function ErrorMessage({
  title = "エラーが発生しました",
  message,
  icon = "⚠️",
  className = "",
}: ErrorMessageProps) {
  return (
    <div
      className={`bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center ${className}`}
      role="alert"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold text-red-400 mb-2">{title}</h3>
      <p className="text-gray-300">{message}</p>
    </div>
  );
}
