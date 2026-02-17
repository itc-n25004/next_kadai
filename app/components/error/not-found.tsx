import Link from "next/link";
import ErrorMessage from "../ui/ErrorMessage";
import Button from "../ui/Button";

/**
 * 404ページコンポーネント
 * 存在しないページにアクセスした際に表示
 * @returns {JSX.Element} 404ページ
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-900 via-purple-900 to-indigo-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-8xl font-bold text-yellow-500 mb-4">404</div>
        <ErrorMessage
          title="ページが見つかりません"
          message="お探しのページは存在しないか、移動された可能性があります。"
          icon="🔍"
          className="mb-6"
        />
        <Link href="/">
          <Button variant="primary" size="large">
            ホームに戻る
          </Button>
        </Link>
      </div>
    </div>
  );
}
