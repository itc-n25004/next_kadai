import { Character, getImageUrl } from "@/lib/microcms";

/**
 * 純粋関数: 元素に応じたボーダーカラーのクラス名を生成
 * @param {string} elements - 元素名（炎、水、雷など）
 * @returns {string} ホバー時のボーダーカラークラス
 */
const getCharacterCardClass = (elements: string): string => {
  const elementColors: Record<string, string> = {
    炎: "hover:border-red-500",
    水: "hover:border-blue-500",
    雷: "hover:border-purple-500",
    風: "hover:border-teal-500",
    岩: "hover:border-yellow-600",
    氷: "hover:border-cyan-400",
    草: "hover:border-green-500",
  };
  return elementColors[elements] || "hover:border-white";
};

/**
 * 純粋関数: 元素に対応するアイコン絵文字を返す
 * @param {string} elements - 元素名
 * @returns {string} 元素のアイコン絵文字
 */
const getElementIcon = (elements: string): string => {
  const icons: Record<string, string> = {
    炎: "🔥",
    水: "💧",
    雷: "⚡",
    風: "🌪️",
    岩: "🪨",
    氷: "❄️",
    草: "🌿",
  };
  return icons[elements] || "✨";
};

type CharacterSectionProps = {
  characters: Character[];
};

/**
 * キャラクターセクションコンポーネント
 * キャラクターカードを表示
 * @returns {JSX.Element} キャラクターセクション
 */
export default function CharacterSection({
  characters,
}: CharacterSectionProps) {
  return (
    <section id="characters" className="py-20 px-4">
      <div className="container mx-auto">
        {/* セクションタイトル */}
        <h2 className="text-5xl font-bold text-white text-center mb-4">
          学園の生徒たち
        </h2>
        <p className="text-gray-300 text-center mb-12">
          様々な元素の力を持つ個性豊かな生徒たち
        </p>

        {/* キャラクターカードのグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {characters.map((character) => (
            <div
              key={character.id}
              className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 transition-all duration-300 ${getCharacterCardClass(character.elements)} cursor-pointer transform hover:scale-105`}
            >
              {/* キャラクター画像 */}
              {getImageUrl(character.character_sprite) && (
                <img
                  src={getImageUrl(character.character_sprite)}
                  alt={character.character}
                  className="aspect-[3/4] object-cover rounded-t-lg mb-4"
                />
              )}
              {/* キャラクター通常画像 */}
              {!getImageUrl(character.character_sprite) &&
                getImageUrl(character.image) && (
                  <img
                    src={getImageUrl(character.image)}
                    alt={character.character}
                    className="aspect-[3/4] object-cover rounded-t-lg mb-4"
                  />
                )}
              {/* 画像がない場合のフォールバック */}
              {!getImageUrl(character.character_sprite) &&
                !getImageUrl(character.image) && (
                  <div className="aspect-[3/4] bg-gradient-to-b from-gray-700 to-gray-900 rounded-t-lg mb-4 flex items-center justify-center text-6xl">
                    {getElementIcon(character.elements)}
                  </div>
                )}
              {/* キャラクター情報 */}
              <h3 className="text-2xl font-bold text-white mb-2">
                {character.character}
              </h3>
              <p className="text-yellow-400 mb-2">{character.elements} 元素</p>
              <p className="text-gray-400 text-sm">
                {typeof character.country === "string"
                  ? character.country
                  : character.country.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
