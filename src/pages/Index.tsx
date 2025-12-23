import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedWines from "@/components/FeaturedWines";
import AISommelier from "@/components/AISommelier";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeaturedWines />
      <AISommelier />
      <About />
      <Footer />
    </main>
  );
};

export default Index;
