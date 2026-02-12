import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CharacterSection from "@/components/CharacterSection";
import NewsSection from "@/components/NewsSection";
import MediaSection from "@/components/MediaSection";
import CommunitySection from "@/components/CommunitySection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-900 via-purple-900 to-indigo-950">
      <Header />
      <HeroSection />
      <CharacterSection />
      <NewsSection />
      <MediaSection />
      <CommunitySection />
      <Footer />
    </main>
  );
}
