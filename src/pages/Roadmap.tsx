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
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="relative"
              >
                {/* Horizontal Stage Row */}
                <div className={`flex flex-col md:flex-row items-stretch gap-8 md:gap-16 py-12 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}>
                  {/* Stage Number & Icon Column - Enhanced */}
                  <div className="flex-shrink-0 relative flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`w-32 h-32 md:w-40 md:h-40 rounded-3xl flex flex-col items-center justify-center transition-all duration-500 relative overflow-hidden ${
                        stage.status === "current"
                          ? "bg-gradient-to-br from-primary via-primary/90 to-gold shadow-2xl shadow-primary/40"
                          : "bg-gradient-to-br from-card to-muted/50 border-2 border-border hover:border-primary/30"
                      }`}
                    >
                      {/* Decorative glow for current */}
                      {stage.status === "current" && (
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                      )}
                      
                      <span className={`text-5xl md:text-6xl font-bold mb-2 relative z-10 ${
                        stage.status === "current" ? "text-primary-foreground" : "text-muted-foreground/60"
                      }`}>
                        {stage.id}
                      </span>
                      <stage.icon className={`w-8 h-8 md:w-10 md:h-10 relative z-10 ${
                        stage.status === "current" ? "text-primary-foreground" : "text-muted-foreground/60"
                      }`} />
                    </motion.div>
                    
                    {/* Status Badge - Enhanced */}
                    {stage.status === "current" && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-3 -right-3 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold to-primary rounded-full shadow-lg"
                      >
                        <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
                        <span className="text-xs font-bold text-primary-foreground uppercase tracking-wider">Active</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Content Column - Enhanced */}
                  <div className={`flex-1 flex flex-col justify-center text-center md:text-left ${
                    index % 2 === 1 ? "md:text-right" : ""
                  }`}>
                    <motion.h3 
                      className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
                        stage.status === "current" 
                          ? "text-foreground" 
                          : "text-foreground/80"
                      }`}
                    >
                      {stage.title}
                    </motion.h3>
                    <p className={`text-lg md:text-xl mb-8 max-w-2xl leading-relaxed ${
                      stage.status === "current" 
                        ? "text-muted-foreground" 
                        : "text-muted-foreground/70"
                    } ${index % 2 === 1 ? "md:ml-auto" : ""}`}>
                      {stage.description}
                    </p>

                    {/* Details as enhanced cards */}
                    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${
                      index % 2 === 1 ? "md:justify-end" : ""
                    }`}>
                      {stage.details.map((detail, detailIndex) => (
                        <motion.div
                          key={detailIndex}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + detailIndex * 0.15 }}
                          whileHover={{ y: -4, transition: { duration: 0.2 } }}
                          className={`group relative p-5 rounded-2xl text-sm font-medium transition-all duration-300 ${
                            stage.status === "current"
                              ? "bg-gradient-to-br from-primary/15 to-gold/10 border-2 border-primary/40 text-foreground shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20"
                              : "bg-muted/30 border-2 border-border/50 text-muted-foreground hover:border-primary/30 hover:bg-muted/50"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                              stage.status === "current" 
                                ? "bg-primary/20" 
                                : "bg-muted"
                            }`}>
                              {stage.status === "current" ? (
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                              ) : (
                                <Circle className="w-4 h-4 text-muted-foreground/50" />
                              )}
                            </div>
                            <span className="text-left leading-snug">{detail}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Connector Line - Enhanced */}
                {index < stages.length - 1 && (
                  <div className="flex justify-center py-4">
                    <div className="relative">
                      <div className="w-1 h-20 bg-gradient-to-b from-primary/60 via-gold/40 to-primary/20 rounded-full" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary/40 rounded-full animate-pulse" />
                    </div>
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
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 to-gold/10 border border-primary/30 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-foreground font-medium">
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
