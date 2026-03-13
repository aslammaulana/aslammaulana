import Header from "../components/theme/Header";
import HeroSection from "../components/homepage/HeroSection";
import Div from "@/components/homepage/Div";
import AboutSection from "@/components/homepage/AboutSection";
import Divider from "@/components/homepage/Divider";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <Divider/>
      <AboutSection />
      <Div />
    </main>
  );
}
