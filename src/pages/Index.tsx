import Navbar from "@/components/Navbar";
import HologramSection from "@/components/HologramSection";
import HomePulseBand from "@/components/HomePulseBand";

import FeaturedWines from "@/components/FeaturedWines";
import AISommelier from "@/components/AISommelier";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute top-1/3 -left-24 h-[360px] w-[360px] rounded-full bg-tech/12 blur-3xl animate-float [animation-delay:1.5s]" />
        <div className="absolute bottom-0 right-1/4 h-[320px] w-[320px] rounded-full bg-gold/10 blur-3xl animate-float [animation-delay:2.6s]" />
        <div className="absolute inset-0 tech-grid opacity-10" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <HologramSection />
        <HomePulseBand />
        <FeaturedWines />
        <AISommelier />
        <About />
        <Footer />
      </div>
    </main>
  );
};

export default Index;
