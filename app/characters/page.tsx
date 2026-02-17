import { Character, getCharacters } from "@/lib/microcms";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollReveal from "../components/ui/ScrollReveal";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import "./styles.css";

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
 * キャラクターページ
 */
export default async function CharactersPage() {
  const characters = await getCharacters();

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

          {characters.length > 0 ? (
            <div className="characters-grid">
              {characters.map((character, index) => (
                <ScrollReveal key={character.id} delay={index * 0.1}>
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
                    <h3 className="character-name">{character.character}</h3>
                    <p className="character-element">
                      {character.elements} 元素
                    </p>
                    <p className="character-description">{character.country}</p>
                  </Card>
                </ScrollReveal>
              ))}
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
