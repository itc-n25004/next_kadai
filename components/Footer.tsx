/**
 * 純粋関数: フッターに表示するリンクのリストを返す
 * @returns {Array<{label: string, href: string}>} フッターリンクの配列
 */
const getFooterLinks = (): Array<{ label: string; href: string }> => [
  { label: "利用規約", href: "#terms" },
  { label: "プライバシーポリシー", href: "#privacy" },
  { label: "お問い合わせ", href: "#contact" },
  { label: "公式サイト", href: "#official" },
];

/**
 * 純粋関数: 現在の年を取得
 * @returns {number} 現在の年（例: 2026）
 */
const getCurrentYear = (): number => new Date().getFullYear();

/**
 * フッターコンポーネント
 * サイトの最下部に表示される情報エリア
 * サイト概要、リンク、注意事項、著作権表示を含む
 * @returns {JSX.Element} フッター
 */
export default function Footer() {
  const footerLinks = getFooterLinks();
  const currentYear = getCurrentYear();

  return (
    <footer className="bg-black/50 border-t border-white/10 py-12 px-4">
      <div className="container mx-auto">
        {/* フッターコンテンツグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* サイト情報 */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">原神学園</h3>
            <p className="text-gray-400">七つの元素が交差する学園での冒険</p>
          </div>

          {/* リンク集 */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">リンク</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 注意事項 */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">注意事項</h4>
            <p className="text-gray-400 text-sm">
              このサイトは原神の非公式パロディサイトです。
              <br />
              実際のゲームとは関係ありません。
            </p>
          </div>
        </div>

        {/* 著作権表示 */}
        <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
          <p>© {currentYear} 原神学園. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
