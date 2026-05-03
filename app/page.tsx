import Header from "../components/theme/Header";
import HeroSection from "../components/homepage/HeroSection";
import Footer from "@/components/theme/Footer";
import AboutSection from "@/components/homepage/AboutSection";
import Divider from "@/components/homepage/Divider";
import PortfolioSection from "@/components/homepage/PortfolioSection";
import ExperienceSection from "@/components/homepage/experience";
import SkillsSection from "@/components/homepage/SkillsSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <Divider />
      <AboutSection />
      <PortfolioSection />
      <SkillsSection />
      <ExperienceSection />
      <Footer />
    </main>
  );
}
