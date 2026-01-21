import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Rocket, MapPin, Globe, Crown, CheckCircle2, Circle, Cpu } from "lucide-react";

const stages = [
  {
    id: "01",
    code: "S1",
    tone: "wine",
    status: "current",
    phase: "Active",
    title: "Foundation",
    icon: Rocket,
    description: "Secured $100K investment. Working on licensing and company creation in Switzerland.",
    details: ["$100K seed funding secured", "Swiss licensing in progress", "Company incorporation underway"],
  },
  {
    id: "02",
    code: "CH",
    tone: "amber",
    status: "upcoming",
    phase: "Queued",
    title: "Swiss Expansion",
    icon: MapPin,
    description: "Opening locations in Geneva and expanding throughout Switzerland.",
    details: ["Geneva flagship store", "Zurich and Basel locations", "Full Swiss market coverage"],
  },
  {
    id: "03",
    code: "US",
    tone: "copper",
    status: "upcoming",
    phase: "Pipeline",
    title: "US Market Entry",
    icon: Globe,
    description: "Migrating to the US with locations in California and Florida.",
    details: ["California launch", "Florida expansion", "US headquarters establishment"],
  },
  {
    id: "04",
    code: "GL",
    tone: "gold",
    status: "upcoming",
    phase: "Vision",
    title: "Global Brand",
    icon: Crown,
    description: "Becoming a global brand with presence in the world's most famous destinations.",
    details: ["Premium global locations", "International brand recognition", "Worldwide AI sommelier network"],
  },
];

const toneStyles = {
  wine: {
    border: "border-primary/40",
    glow: "from-primary/20 via-primary/5 to-transparent",
    chip: "border-primary/50 bg-primary/20 text-primary",
    node: "from-primary to-wine-deep",
    nodeBorder: "border-primary/50",
    icon: "text-primary",
    detail: "border-primary/30 bg-primary/10",
  },
  amber: {
    border: "border-amber/40",
    glow: "from-amber/20 via-amber/5 to-transparent",
    chip: "border-amber/50 bg-amber/20 text-amber",
    node: "from-amber to-copper",
    nodeBorder: "border-amber/50",
    icon: "text-amber",
    detail: "border-amber/30 bg-amber/10",
  },
  copper: {
    border: "border-copper/40",
    glow: "from-copper/20 via-copper/5 to-transparent",
    chip: "border-copper/50 bg-copper/20 text-copper",
    node: "from-copper to-gold-deep",
    nodeBorder: "border-copper/50",
    icon: "text-copper",
    detail: "border-copper/30 bg-copper/10",
  },
  gold: {
    border: "border-gold/40",
    glow: "from-gold/20 via-gold/5 to-transparent",
    chip: "border-gold/50 bg-gold/20 text-gold",
    node: "from-gold to-gold-deep",
    nodeBorder: "border-gold/50",
    icon: "text-gold",
    detail: "border-gold/30 bg-gold/10",
  },
} as const;

const RoadmapPage = () => {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <Navbar />

      {/* Cellar Vignette Overlay */}
      <div className="fixed inset-0 pointer-events-none cellar-vignette z-0" />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 tech-grid opacity-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.15)_0%,_transparent_60%)]" />
          <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-gold/40 bg-card/60 backdrop-blur-md">
              <Cpu className="w-4 h-4 text-gold" />
              <span className="text-xs uppercase tracking-[0.35em] text-gold">Signal Map</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mt-6 mb-6">
              Roadmap to the Future
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl">
              From a Swiss startup to a global phenomenon, this is the live trajectory for Vinoria's
              AI-powered wine experience.
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Seed secured", value: "$100K" },
              { label: "Launch targets", value: "2 cities" },
              { label: "Market reach", value: "4+" },
              { label: "Voice sessions", value: "24/7" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-card/50 px-4 py-3 text-center backdrop-blur"
              >
                <div className="text-xl font-semibold text-foreground">{stat.value}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 tech-dots opacity-20" />
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary/50 via-gold/30 to-transparent md:block" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="space-y-16">
            {stages.map((stage, index) => {
              const tone = toneStyles[stage.tone as keyof typeof toneStyles];
              const isLeft = index % 2 === 0;
              const statusChip =
                stage.status === "current"
                  ? "border-primary/50 bg-primary/20 text-primary"
                  : "border-border bg-card/60 text-muted-foreground";

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: index * 0.12 }}
                  className="relative"
                >
                  <div className="flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] md:gap-10 items-start">
                    <div
                      className={`order-2 md:order-none ${
                        isLeft ? "md:col-start-1" : "md:col-start-3"
                      }`}
                    >
                      <div
                        className={`relative overflow-hidden rounded-3xl border ${tone.border} bg-card/60 backdrop-blur-xl shadow-card`}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${tone.glow}`} />
                        <div className="relative p-8">
                          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em]">
                            <span className={`rounded-full border px-3 py-1 ${tone.chip}`}>
                              {stage.phase}
                            </span>
                            <span className={`rounded-full border px-3 py-1 ${statusChip}`}>
                              {stage.status === "current" ? "Live" : "Upcoming"}
                            </span>
                          </div>

                          <div className="mt-4 flex items-center gap-3">
                            <stage.icon className={`w-6 h-6 ${tone.icon}`} />
                            <h3 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                              {stage.title}
                            </h3>
                          </div>
                          <p className="text-muted-foreground text-base md:text-lg mt-3 leading-relaxed">
                            {stage.description}
                          </p>

                          <div className="mt-6 grid gap-3 sm:grid-cols-3">
                            {stage.details.map((detail) => (
                              <div
                                key={detail}
                                className={`flex items-start gap-3 rounded-2xl border px-4 py-4 text-sm font-medium text-foreground/90 ${tone.detail}`}
                              >
                                <div className="mt-0.5">
                                  {stage.status === "current" ? (
                                    <CheckCircle2 className="w-4 h-4 text-primary" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-muted-foreground/60" />
                                  )}
                                </div>
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="order-1 md:order-none md:col-start-2 flex justify-center">
                      <div className="relative flex flex-col items-center">
                        <div
                          className={`relative h-16 w-16 rounded-2xl border ${tone.nodeBorder} bg-gradient-to-br ${tone.node} flex items-center justify-center shadow-lg`}
                        >
                          <span className="text-xs font-semibold text-white tracking-[0.3em] ml-1">
                            {stage.code}
                          </span>
                          <div className="absolute inset-0 rounded-2xl opacity-50 blur-lg bg-gradient-to-br from-white/20 to-transparent" />
                        </div>
                        <div className="mt-3 text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
                          {stage.id}
                        </div>
                      </div>
                    </div>

                    <div className={`hidden md:block ${isLeft ? "md:col-start-3" : "md:col-start-1"}`} />
                  </div>
                </motion.div>
              );
            })}
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
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/15 to-gold/15 border border-primary/40 rounded-full">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
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
