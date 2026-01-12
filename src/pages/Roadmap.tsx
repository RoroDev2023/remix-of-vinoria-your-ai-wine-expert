import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Rocket, MapPin, Globe, Crown, CheckCircle2, Circle } from "lucide-react";

const stages = [
  {
    id: 1,
    title: "Foundation",
    status: "current",
    icon: Rocket,
    description: "Secured $100K investment. Working on licensing and company creation in Switzerland.",
    details: ["$100K seed funding secured", "Swiss licensing in progress", "Company incorporation underway"],
  },
  {
    id: 2,
    title: "Swiss Expansion",
    status: "upcoming",
    icon: MapPin,
    description: "Opening locations in Geneva and expanding throughout Switzerland.",
    details: ["Geneva flagship store", "Zurich & Basel locations", "Full Swiss market coverage"],
  },
  {
    id: 3,
    title: "US Market Entry",
    status: "upcoming",
    icon: Globe,
    description: "Migrating to the US with locations in California and Florida.",
    details: ["California launch", "Florida expansion", "US headquarters establishment"],
  },
  {
    id: 4,
    title: "Global Brand",
    status: "upcoming",
    icon: Crown,
    description: "Becoming a global brand with presence in the world's most famous destinations.",
    details: ["Premium global locations", "International brand recognition", "Worldwide AI sommelier network"],
  },
];

const RoadmapPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-wine-600 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold rounded-full blur-3xl opacity-15" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-gold font-body text-sm tracking-widest uppercase mb-4 block font-semibold">
              Our Journey
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6">
              Roadmap to the Future
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-xl">
              From a Swiss startup to a global phenomenon — here's our vision for bringing AI-powered wine expertise to the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Roadmap Timeline - Horizontal Layout */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="space-y-0">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Horizontal Stage Row */}
                <div className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 py-12 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}>
                  {/* Stage Number & Icon Column */}
                  <div className="flex-shrink-0 relative">
                    <div
                      className={`w-28 h-28 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${
                        stage.status === "current"
                          ? "bg-gradient-to-br from-wine-600 via-wine-700 to-wine-800 shadow-xl shadow-wine-600/40 ring-2 ring-gold/50"
                          : "bg-gradient-to-br from-card to-muted border-2 border-wine-800/50 hover:border-gold/30"
                      }`}
                    >
                      <span className={`text-4xl font-bold mb-1 ${
                        stage.status === "current" ? "text-gold" : "text-wine-400"
                      }`}>
                        {stage.id}
                      </span>
                      <stage.icon className={`w-7 h-7 ${
                        stage.status === "current" ? "text-cream" : "text-wine-500"
                      }`} />
                    </div>
                    
                    {/* Status Badge */}
                    {stage.status === "current" && (
                      <div className="absolute -top-3 -right-3 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-gold to-gold-dark rounded-full shadow-lg shadow-gold/30">
                        <div className="w-2 h-2 bg-wine-900 rounded-full animate-pulse" />
                        <span className="text-xs font-bold text-wine-900 uppercase tracking-wide">Active</span>
                      </div>
                    )}
                  </div>

                  {/* Content Column */}
                  <div className={`flex-1 text-center md:text-left ${
                    index % 2 === 1 ? "md:text-right" : ""
                  }`}>
                    <h3 className={`font-display text-3xl md:text-4xl font-bold mb-3 ${
                      stage.status === "current" ? "text-gold" : "text-foreground"
                    }`}>
                      {stage.title}
                    </h3>
                    <p className="text-muted-foreground text-lg mb-6 max-w-xl">
                      {stage.description}
                    </p>

                    {/* Details as horizontal pills */}
                    <div className={`flex flex-wrap gap-3 ${
                      index % 2 === 1 ? "md:justify-end" : ""
                    } justify-center md:justify-start`}>
                      {stage.details.map((detail, detailIndex) => (
                        <motion.div
                          key={detailIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + detailIndex * 0.1 }}
                          className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                            stage.status === "current"
                              ? "bg-gradient-to-r from-wine-800/80 to-wine-900/80 border-2 border-gold/40 text-cream shadow-lg shadow-wine-900/30 hover:border-gold/60"
                              : "bg-wine-900/40 border border-wine-700/50 text-wine-200 hover:border-wine-600/70 hover:bg-wine-800/50"
                          }`}
                        >
                          {stage.status === "current" ? (
                            <CheckCircle2 className="w-4 h-4 text-gold" />
                          ) : (
                            <Circle className="w-4 h-4 text-wine-500" />
                          )}
                          {detail}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Connector Line */}
                {index < stages.length - 1 && (
                  <div className="flex justify-center">
                    <div className="w-1 h-20 bg-gradient-to-b from-wine-600 via-gold/50 to-wine-800/30 rounded-full" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment CTA */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-wine-800/60 to-wine-900/60 border-2 border-gold/40 rounded-full shadow-xl shadow-wine-900/30">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
              <span className="text-cream font-semibold text-lg">
                Currently seeking investment partners for Series A
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default RoadmapPage;
