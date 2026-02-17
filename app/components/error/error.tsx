"use client";

import { useEffect } from "react";
import ErrorMessage from "../ui/ErrorMessage";
import Button from "../ui/Button";

/**
 * エラーページコンポーネント
 * Next.jsのエラーバウンダリーとして機能
 * アプリケーション全体の予期しないエラーをキャッチ
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Error & { digest?: string }} props.error - エラーオブジェクト
 * @param {() => void} props.reset - エラーリセット関数
 * @returns {JSX.Element} エラーページ
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // エラーをコンソールに記録
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-900 via-purple-900 to-indigo-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <ErrorMessage
          title="予期しないエラーが発生しました"
          message={
            error.message ||
            "ページの読み込み中に問題が発生しました。もう一度お試しください。"
          }
          icon="🚨"
          className="mb-6"
        />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" onClick={() => reset()}>
            再試行
          </Button>
          <Button
            variant="secondary"
            onClick={() => (window.location.href = "/")}
          >
            ホームに戻る
          </Button>
        </div>
      </div>
    </div>
  );
}
