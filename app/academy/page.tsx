import Link from "next/link";
import { COUNTRY_ORDER } from "@/lib/constants";
import { getCountries, type Country } from "@/lib/microcms";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollReveal from "../components/ui/ScrollReveal";
import "./styles.css";

/**
 * 学園紹介ページ - フルスクリーンデザイン
 */
export default async function AcademyPage() {
  const countries = await getCountries();

  // COUNTRY_ORDERに従って国を並べ替える（ソートしない）
  const countryMap = new Map(countries.map((c) => [c.title.trim(), c]));

  // デバッグ情報
  console.log("🔍 COUNTRY_ORDER:", COUNTRY_ORDER);
  console.log(
    "🔍 microCMS countries.title:",
    countries.map((c) => c.title),
  );
  console.log("🔍 countryMap keys:", Array.from(countryMap.keys()));

  const sortedCountries = COUNTRY_ORDER.map((countryName) => {
    const match = countryMap.get(countryName.trim());
    console.log(
      `🔍 COUNTRY_ORDER 「${countryName}」-> countryMap で 「${countryName.trim()}」を検索 -> ${match ? "✅ 見つかった" : "❌ 見つかりません"}`,
    );
    return match;
  }).filter((country): country is Country => country !== undefined);

  return (
    <div className="academy-page">
      <Header />

      <main className="academy-main">
        {/* ヒーローセクション */}
        <section className="fullscreen-hero">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <ScrollReveal>
              <p className="hero-subtitle">Education Beyond Elements</p>
              <h1 className="hero-title">学園紹介</h1>
              <p className="hero-description">
                五つの専門学府が織りなす、究極の学びの世界へようこそ。
                <br />
                それぞれの道を極め、未来を切り拓く力を手に入れよう。
              </p>
              <div className="hero-scroll-hint">
                <span>▼ Scroll to explore</span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 各学校のフルスクリーンセクション */}
        {sortedCountries.length > 0 ? (
          sortedCountries.map((country, index) => (
            <section
              key={country.id}
              className={`school-section${country.ac_image ? " has-image" : ""}`}
              style={
                country.ac_image
                  ? { backgroundImage: `url(${country.ac_image.url})` }
                  : undefined
              }
            >
              <div className="school-overlay"></div>
              <div className="school-content">
                <ScrollReveal>
                  <div className="school-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <p className="school-subtitle">Academy Country</p>
                  <h2 className="school-title">{country.title}</h2>
                  {country.co_image && (
                    <div className="school-emblem">
                      <img
                        src={country.co_image.url}
                        alt={country.title}
                        className="school-emblem-image"
                      />
                    </div>
                  )}
                  <p className="school-description">
                    {country.discription || "学園の詳細は準備中です。"}
                  </p>

                  <Link href="/characters" className="school-cta">
                    在籍生徒を見る →
                  </Link>
                </ScrollReveal>
              </div>

              {/* 装飾的な背景パターン */}
              <div className="school-pattern"></div>
            </section>
          ))
        ) : (
          <section className="school-section">
            <div className="school-overlay"></div>
            <div className="school-content">
              <ScrollReveal>
                <h2 className="school-title">学園情報を取得できませんでした</h2>
                <p className="school-description">
                  しばらくしてから再度お試しください。
                </p>
              </ScrollReveal>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
