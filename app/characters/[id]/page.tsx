import Link from "next/link";
import { type Character, getCharacters, getImageUrl } from "@/lib/microcms";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Button from "../../components/ui/Button";
import { notFound } from "next/navigation";
import "./styles.css";

interface CharacterDetailPageProps {
  params: {
    id: string;
  };
}

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

const shouldHideValue = (value: string): boolean => {
  const hiddenValues = new Set(["炎", "モンド", "2年B組", "飛行部 部長"]);
  return hiddenValues.has(value);
};

const getCountryTitle = (country: Character["country"]): string | null => {
  if (!country) {
    return null;
  }
  return typeof country === "string" ? country : country.title;
};

/**
 * 純粋関数: キャラクターIDを正規化
 */
const getCharacterId = (character: Character): string => {
  const rawId = (character as { id?: unknown }).id;
  if (typeof rawId === "string") {
    return rawId;
  }
  if (
    rawId &&
    typeof rawId === "object" &&
    "id" in rawId &&
    typeof (rawId as { id?: unknown }).id === "string"
  ) {
    return (rawId as { id: string }).id;
  }
  return String(rawId ?? "");
};

/**
 * 静的パスを生成（ビルド時に全キャラクターページを生成）
 */
export async function generateStaticParams() {
  const characters = await getCharacters();

  return characters.map((character) => ({
    id: character.id,
  }));
}

export default async function CharacterDetailPage({
  params,
}: CharacterDetailPageProps) {
  console.log("🔍 キャラクター詳細ページ アクセス");
  console.log("📍 params:", params);
  console.log("📍 params.id:", params.id);

  const characters = await getCharacters();
  console.log("📊 取得したキャラクター数:", characters.length);

  const normalizedParamId = decodeURIComponent(params.id);
  console.log("📍 normalizedParamId:", normalizedParamId);

  const character = characters.find((c) => {
    const characterId = getCharacterId(c);
    console.log(
      `  比較: "${characterId}" === "${normalizedParamId}" ? ${characterId === normalizedParamId}`,
    );
    return characterId === normalizedParamId;
  });

  console.log(
    "✅ 検索結果:",
    character ? `${character.character}を検出` : "キャラクター未検出",
  );

  if (character) {
    console.log("📦 キャラクター詳細データ:", {
      character: character.character,
      image: character.image,
      character_sprite: character.character_sprite,
      country: character.country,
      class: character.class,
      club: character.club,
    });
  }

  if (!character) {
    console.log("❌ キャラクターが見つかりません");
    notFound();
  }

  return (
    <div className="character-detail-page">
      <Header />
      <main className="character-detail-main">
        <div className="detail-container">
          <Link href="/characters" className="detail-back">
            <Button
              variant="secondary"
              size="medium"
              className="detail-back-button"
            >
              ← キャラクター一覧に戻る
            </Button>
          </Link>

          <section className="detail-hero">
            <div className="detail-title">
              <span className="detail-emoji">
                {getElementIcon(character.elements)}
              </span>
              <div>
                <p className="detail-eyebrow">Element Profile</p>
                <h1 className="detail-name">{character.character}</h1>
              </div>
            </div>
            <div className="detail-tags">
              {!shouldHideValue(character.elements) && (
                <span className="detail-tag">{character.elements} 元素</span>
              )}
              {getCountryTitle(character.country) &&
                !shouldHideValue(getCountryTitle(character.country) ?? "") && (
                  <span className="detail-tag outline">
                    {getCountryTitle(character.country)}
                  </span>
                )}
              {character.class && !shouldHideValue(character.class) && (
                <span className="detail-tag">{character.class}</span>
              )}
              {character.club && !shouldHideValue(character.club) && (
                <span className="detail-tag outline">{character.club}</span>
              )}
            </div>
          </section>

          <div className="detail-grid">
            <aside className="detail-image-card">
              <div className="detail-image-frame">
                {(() => {
                  const imageUrl = getImageUrl(character.image);
                  const spriteUrl = getImageUrl(character.character_sprite);
                  console.log("🖼️ 画像URL処理:", {
                    image: character.image,
                    imageUrl,
                    character_sprite: character.character_sprite,
                    spriteUrl,
                  });
                  if (imageUrl) {
                    return (
                      <img
                        src={imageUrl}
                        alt={character.character}
                        width={600}
                        height={800}
                        className="detail-image"
                      />
                    );
                  } else if (spriteUrl) {
                    return (
                      <img
                        src={spriteUrl}
                        alt={character.character}
                        width={600}
                        height={800}
                        className="detail-image"
                      />
                    );
                  } else {
                    return (
                      <div className="detail-image-fallback">
                        <span className="detail-emoji-xl">
                          {getElementIcon(character.elements)}
                        </span>
                      </div>
                    );
                  }
                })()}
              </div>
              <div className="detail-image-caption">
                <span>Academy File</span>
                <span className="detail-image-caption-strong">
                  {character.elements} Arc
                </span>
              </div>
            </aside>

            <div className="detail-content">
              <section className="detail-panel">
                <h2 className="detail-panel-title">基本情報</h2>
                <dl className="detail-info">
                  {getCountryTitle(character.country) &&
                    !shouldHideValue(
                      getCountryTitle(character.country) ?? "",
                    ) && (
                      <div className="detail-info-row">
                        <dt>所属学園</dt>
                        <dd>{getCountryTitle(character.country)}</dd>
                      </div>
                    )}
                  {character.class && !shouldHideValue(character.class) && (
                    <div className="detail-info-row">
                      <dt>クラス</dt>
                      <dd>{character.class}</dd>
                    </div>
                  )}
                  {character.club && !shouldHideValue(character.club) && (
                    <div className="detail-info-row">
                      <dt>部活</dt>
                      <dd>{character.club}</dd>
                    </div>
                  )}
                </dl>
              </section>

              {character.discription && (
                <section className="detail-panel">
                  <h2 className="detail-panel-title">プロフィール</h2>
                  <p className="detail-body">{character.discription}</p>
                </section>
              )}

              {character.episode && (
                <section className="detail-panel emphasize">
                  <h2 className="detail-panel-title">エピソード</h2>
                  <p className="detail-body italic">{character.episode}</p>
                </section>
              )}

              {character.comment && (
                <section className="detail-panel comment">
                  <h2 className="detail-panel-title">コメント</h2>
                  <p className="detail-body">{character.comment}</p>
                </section>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
