import {
  Character,
  Country,
  getCharacters,
  getCountries,
} from "@/lib/microcms";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollReveal from "../components/ui/ScrollReveal";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import "./styles.css";

/**
 * キャラクターと国情報を統合した型
 */
type CharacterWithCountry = Character & {
  countryInfo?: Country;
};

/**
 * 純粋関数: 元素に応じたボーダーカラークラスを生成
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
 * 純粋関数: 元素アイコンを返す
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

/**
 * 純粋関数: キャラクターを国ごとにグループ化
 * 国情報が存在するキャラクターのみをグループ化
 */
const groupCharactersByCountry = (
  characters: CharacterWithCountry[],
): Map<string, CharacterWithCountry[]> => {
  const grouped = new Map<string, CharacterWithCountry[]>();

  characters.forEach((character) => {
    const countryId = character.country as string;
    if (!countryId || !character.countryInfo) {
      return;
    }

    if (!grouped.has(countryId)) {
      grouped.set(countryId, []);
    }
    grouped.get(countryId)!.push(character);
  });

  return grouped;
};

/**
 * キャラクターページ
 */
export default async function CharactersPage() {
  const [characters, countries] = await Promise.all([
    getCharacters(),
    getCountries(),
  ]);

  // 国の表示順序を定義
  const countryOrder = [
    "モンド",
    "璃月",
    "稲妻",
    "スメール",
    "フォンテーヌ",
    "ナタ",
    "ナドクライ",
  ];

  // 国情報をマップ化（titleをキーにする）
  const countryMap = new Map(countries.map((c) => [c.title, c]));

  // キャラクターに国情報を統合
  const charactersWithCountry: CharacterWithCountry[] = characters.map(
    (character) => ({
      ...character,
      countryInfo: countryMap.get(character.country as string),
    }),
  );

  const groupedCharacters = groupCharactersByCountry(charactersWithCountry);

  // デバッグ情報
  console.log("📊 取得したキャラクター数:", characters.length);
  console.log("📊 取得した国数:", countries.length);
  console.log(
    "📊 国のタイトル一覧:",
    countries.map((c) => c.title),
  );
  console.log(
    "📊 キャラクターの国情報:",
    characters.map((c) => ({ name: c.character, country: c.country })),
  );
  console.log("📊 グループ化された国:", Array.from(groupedCharacters.keys()));
  console.log(
    "📊 各国のキャラクター数:",
    Array.from(groupedCharacters.entries()).map(([k, v]) => ({
      country: k,
      count: v.length,
    })),
  );

  // 国の順序に従ってソート
  const sortedCountries = countryOrder
    .map((countryName) => {
      const chars = groupedCharacters.get(countryName);
      return chars
        ? ([countryName, chars] as [string, CharacterWithCountry[]])
        : null;
    })
    .filter(
      (entry): entry is [string, CharacterWithCountry[]] => entry !== null,
    );

  console.log("📊 ソート後の国数:", sortedCountries.length);

  return (
    <div className="characters-page">
      <Header />

      <main className="characters-main">
        <div className="container mx-auto px-4 py-24">
          <ScrollReveal>
            <h1 className="characters-title">学園の生徒たち</h1>
            <p className="characters-subtitle">
              様々な元素の力を持つ個性豊かな生徒たち
            </p>
          </ScrollReveal>

          {sortedCountries.length > 0 ? (
            <div className="countries-container">
              {sortedCountries.map(
                ([countryName, countryCharacters], countryIndex) => {
                  const countryInfo = countryCharacters[0]?.countryInfo;
                  if (!countryInfo) {
                    return null;
                  }
                  return (
                    <ScrollReveal key={countryName} delay={countryIndex * 0.1}>
                      <section className="country-section mb-16">
                        <div className="country-header flex items-center gap-6 mb-8">
                          {countryInfo.image && (
                            <div className="country-emblem">
                              <img
                                src={countryInfo.image.url}
                                alt={countryInfo.title}
                                className="w-24 h-24 object-cover rounded-lg shadow-lg"
                              />
                            </div>
                          )}
                          <h2 className="country-title text-3xl font-bold text-white">
                            {countryInfo.title}
                          </h2>
                        </div>

                        <div className="characters-grid">
                          {countryCharacters.map((character, index) => (
                            <ScrollReveal
                              key={character.id}
                              delay={index * 0.05}
                            >
                              <Card
                                className={`character-card ${getCharacterCardClass(character.elements)}`}
                              >
                                <div className="character-image">
                                  {character.image ? (
                                    <img
                                      src={character.image.url}
                                      alt={character.character}
                                    />
                                  ) : (
                                    getElementIcon(character.elements)
                                  )}
                                </div>
                                <h3 className="character-name">
                                  {character.character}
                                </h3>
                                <p className="character-element">
                                  {character.elements} 元素
                                </p>
                              </Card>
                            </ScrollReveal>
                          ))}
                        </div>
                      </section>
                    </ScrollReveal>
                  );
                },
              )}
            </div>
          ) : (
            <EmptyState
              title="生徒情報がありません"
              message="現在、登録されている生徒情報はありません。"
              icon="👥"
              showReloadButton={true}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export const revalidate = 3600;
