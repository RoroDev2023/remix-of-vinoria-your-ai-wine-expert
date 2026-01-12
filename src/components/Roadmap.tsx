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

const Roadmap = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-card/50 to-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-body text-sm tracking-widest uppercase mb-4 block">
            Our Journey
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Roadmap to the Future
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From a Swiss startup to a global phenomenon — here's our vision for bringing AI-powered wine expertise to the world.
          </p>
        </motion.div>

        {/* Roadmap Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-gold to-primary/30 -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Stage Card */}
                <div
                  className={`relative p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                    stage.status === "current"
                      ? "bg-gradient-to-br from-primary/20 to-gold/10 border-primary/50 shadow-lg shadow-primary/20"
                      : "bg-card/50 border-border/50 hover:border-primary/30"
                  }`}
                >
                  {/* Status Indicator */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        stage.status === "current"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <stage.icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      {stage.status === "current" ? (
                        <>
                          <span className="text-xs font-medium text-primary uppercase tracking-wider">
                            In Progress
                          </span>
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        </>
                      ) : (
                        <Circle className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Stage Number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-background border-2 border-primary rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{stage.id}</span>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {stage.description}
                  </p>

                  {/* Details List */}
                  <ul className="space-y-2">
                    {stage.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle2
                          className={`w-4 h-4 flex-shrink-0 ${
                            stage.status === "current" ? "text-primary" : "text-muted-foreground/50"
                          }`}
                        />
                        <span
                          className={
                            stage.status === "current" ? "text-foreground" : "text-muted-foreground"
                          }
                        >
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mobile connector */}
                {index < stages.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-primary/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Investment CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
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
  );
};

export default Roadmap;
