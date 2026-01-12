import Navbar from "@/components/Navbar";
import HologramSection from "@/components/HologramSection";
import Roadmap from "@/components/Roadmap";
import FeaturedWines from "@/components/FeaturedWines";
import AISommelier from "@/components/AISommelier";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HologramSection />
      <Roadmap />
      <FeaturedWines />
      <AISommelier />
      <About />
      <Footer />
    </main>
  );
};

export default Index;
