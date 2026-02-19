import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/sections/HeroSection";
import CharacterSection from "./components/sections/CharacterSection";
import NewsSection from "./components/sections/NewsSection";
import SchoolIntroduction from "./components/sections/SchoolIntroduction";
import CommunitySection from "./components/sections/CommunitySection";
import {
  getCharacters,
  getNews,
  getSocialLinks,
  getCountries,
} from "@/lib/microcms";

export default async function Home() {
  const characters = await getCharacters();
  const news = await getNews();
  const socialLinks = await getSocialLinks();
  const countries = await getCountries();

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-900 via-purple-900 to-indigo-950">
      <Header />
      <HeroSection />
      <CharacterSection characters={characters} />
      <NewsSection news={news} />
      <SchoolIntroduction countries={countries} />
      <CommunitySection socialLinks={socialLinks} />
      <Footer />
    </main>
  );
}
