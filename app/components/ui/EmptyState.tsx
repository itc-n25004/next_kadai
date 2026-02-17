"use client";

import { type ReactNode } from "react";
import Button from "./Button";

/**
 * 空状態コンポーネントのプロパティ型定義
 */
type EmptyStateProps = {
  title?: string;
  message: string;
  icon?: ReactNode;
  className?: string;
  action?: ReactNode;
  showReloadButton?: boolean;
};

/**
 * 空状態コンポーネント
 * データが存在しない場合の表示を統一
 * @param {EmptyStateProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} 空状態表示要素
 */
export default function EmptyState({
  title = "データがありません",
  message,
  icon = "📭",
  className = "",
  action,
  showReloadButton = false,
}: EmptyStateProps) {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="text-6xl mb-4 opacity-50">{icon}</div>
      <h3 className="text-2xl font-bold text-gray-300 mb-2">{title}</h3>
      <p className="text-gray-400 mb-6">{message}</p>
      {action && <div>{action}</div>}
      {!action && showReloadButton && (
        <Button variant="primary" onClick={handleReload}>
          再読み込み
        </Button>
      )}
    </div>
  );
}
