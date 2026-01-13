import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VoiceSommelier from "@/components/VoiceSommelier";

const Simulator = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <VoiceSommelier />
      <Footer />
    </main>
  );
};

export default Simulator;
