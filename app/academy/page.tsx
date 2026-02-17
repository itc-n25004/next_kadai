import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollReveal from "../components/ui/ScrollReveal";
import "./styles.css";

const highlights = [
  {
    title: "七元素の専門科目",
    description: "元素別の研究と実技を横断的に学ぶ実践型カリキュラム。",
  },
  {
    title: "少人数ラボ",
    description: "指導教員と近い距離で取り組む研究演習。",
  },
  {
    title: "学園共同プロジェクト",
    description: "学年を超えた共同制作で実戦力を磨く。",
  },
];

const facilities = [
  { name: "元素実験棟", detail: "安全設計の実験室と検証設備" },
  { name: "図書回廊", detail: "古文書から最新論文まで揃う" },
  { name: "演武ホール", detail: "剣術・弓術・武術の稽古場" },
  { name: "創作アトリエ", detail: "芸術とクラフトの制作空間" },
];

const dayFlow = [
  { time: "08:30", label: "登校 / 朝の集い" },
  { time: "10:00", label: "専門講義 / 実技" },
  { time: "12:30", label: "学園ランチ" },
  { time: "14:00", label: "ラボ / 研究演習" },
  { time: "16:30", label: "部活動 / プロジェクト" },
  { time: "18:00", label: "下校 / 自主学習" },
];

/**
 * 学園紹介ページ
 */
export default function AcademyPage() {
  return (
    <div className="academy-page">
      <Header />

      <main className="academy-main">
        <section className="academy-hero">
          <div className="academy-hero-inner">
            <ScrollReveal>
              <p className="academy-eyebrow">Academy Overview</p>
              <h1 className="academy-title">学園紹介</h1>
              <p className="academy-subtitle">
                七つの元素が交差する学び舎。知性と実践の両輪で、
                次代を切り拓く力を育てます。
              </p>
              <div className="academy-cta">
                <Link href="/characters" className="academy-button primary">
                  生徒たちを見る
                </Link>
                <Link href="/community" className="academy-button ghost">
                  学園コミュニティへ
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="academy-section">
          <div className="academy-container">
            <ScrollReveal>
              <h2 className="academy-section-title">学園の理念</h2>
              <p className="academy-section-lead">
                研究・実技・創造の三領域を連携し、学びを現場で活かす。
                個の探求心と共同体の知恵を重ね、未来の担い手を育成します。
              </p>
            </ScrollReveal>

            <div className="academy-grid">
              {highlights.map((item) => (
                <div key={item.title} className="academy-card">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="academy-section alt">
          <div className="academy-container">
            <ScrollReveal>
              <h2 className="academy-section-title">施設紹介</h2>
              <p className="academy-section-lead">
                学びを支える設備と、創造を広げる空間。
              </p>
            </ScrollReveal>
            <div className="academy-facilities">
              {facilities.map((facility) => (
                <div key={facility.name} className="academy-facility">
                  <div className="academy-facility-title">{facility.name}</div>
                  <p>{facility.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="academy-section">
          <div className="academy-container">
            <ScrollReveal>
              <h2 className="academy-section-title">1日の流れ</h2>
              <p className="academy-section-lead">
                講義と実技、研究と部活動がバランスよく配置された一日。
              </p>
            </ScrollReveal>
            <div className="academy-timeline">
              {dayFlow.map((slot) => (
                <div key={slot.time} className="academy-timeline-item">
                  <span className="academy-time">{slot.time}</span>
                  <span className="academy-activity">{slot.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
