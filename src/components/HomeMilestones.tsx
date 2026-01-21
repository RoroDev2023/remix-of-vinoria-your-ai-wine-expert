import { motion } from "framer-motion";
import { Rocket, MapPin, Globe, Crown, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

const milestones = [
  {
    id: "01",
    code: "S1",
    tone: "ruby",
    status: "current",
    phase: "Active",
    title: "Foundation",
    icon: Rocket,
    summary: "Seed funding secured. Swiss licensing and company formation underway.",
    details: ["$100K seed secured", "Swiss licensing in progress", "Company incorporation underway"],
  },
  {
    id: "02",
    code: "CH",
    tone: "tech",
    status: "upcoming",
    phase: "Queued",
    title: "Swiss Expansion",
    icon: MapPin,
    summary: "Geneva launch plus Zurich and Basel rollout for national coverage.",
    details: ["Geneva flagship store", "Zurich and Basel locations", "Full Swiss market coverage"],
  },
  {
    id: "03",
    code: "US",
    tone: "emerald",
    status: "upcoming",
    phase: "Pipeline",
    title: "US Market Entry",
    icon: Globe,
    summary: "California and Florida pilots with an American HQ buildout.",
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
    summary: "Premium destinations with a worldwide AI sommelier network.",
    details: ["Premium global locations", "International brand recognition", "Worldwide AI sommelier network"],
  },
];

const toneStyles = {
  ruby: {
    border: "border-primary/30",
    glow: "from-primary/25 via-primary/10 to-transparent",
    chip: "border-primary/40 bg-primary/10 text-primary",
    node: "from-primary/90 to-gold/70",
    nodeBorder: "border-primary/40",
    icon: "text-primary",
    detail: "border-primary/25 bg-primary/10",
    rail: "from-primary/80 via-primary/30 to-transparent",
  },
  tech: {
    border: "border-tech/30",
    glow: "from-tech/25 via-tech/10 to-transparent",
    chip: "border-tech/40 bg-tech/10 text-tech",
    node: "from-tech/90 to-cyan-300/70",
    nodeBorder: "border-tech/40",
    icon: "text-tech",
    detail: "border-tech/25 bg-tech/10",
    rail: "from-tech/80 via-tech/30 to-transparent",
  },
  emerald: {
    border: "border-emerald-400/30",
    glow: "from-emerald-400/25 via-emerald-400/10 to-transparent",
    chip: "border-emerald-400/40 bg-emerald-400/10 text-emerald-500",
    node: "from-emerald-400/90 to-emerald-300/70",
    nodeBorder: "border-emerald-400/40",
    icon: "text-emerald-400",
    detail: "border-emerald-400/25 bg-emerald-400/10",
    rail: "from-emerald-400/80 via-emerald-400/30 to-transparent",
  },
  gold: {
    border: "border-gold/30",
    glow: "from-gold/25 via-gold/10 to-transparent",
    chip: "border-gold/40 bg-gold/10 text-gold",
    node: "from-gold/90 to-yellow-200/70",
    nodeBorder: "border-gold/40",
    icon: "text-gold",
    detail: "border-gold/25 bg-gold/10",
    rail: "from-gold/80 via-gold/30 to-transparent",
  },
} as const;

const HomeMilestones = () => {
  return (
    <section id="milestones" className="relative overflow-hidden py-24 bg-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 tech-grid opacity-15" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--tech-accent)/0.18)_0%,_transparent_60%)]" />
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-tech/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-primary/12 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/40 text-tech text-xs font-medium mb-5 border border-tech/30 backdrop-blur-sm uppercase tracking-[0.3em]">
            Signal Milestones
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground">
            Launch Path
          </h2>
          <p className="font-body text-muted-foreground mt-4 max-w-2xl mx-auto">
            Clear, distinct phases that map how Vinoria scales from Switzerland to a global brand.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {milestones.map((stage, index) => {
            const tone = toneStyles[stage.tone as keyof typeof toneStyles];

            const isLive = stage.status === "current";

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-3xl border ${tone.border} bg-card/40 backdrop-blur-xl shadow-card ${
                  index % 2 === 1 ? "lg:translate-y-8" : ""
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tone.glow}`} />
                <div className="absolute inset-0 tech-dots opacity-25" />
                <div className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${tone.rail}`} />
                <div className="absolute -top-6 right-6 text-[88px] font-display text-foreground/5">
                  {stage.id}
                </div>

                <div className="relative p-7 md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.3em]">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full border px-3 py-1 ${tone.chip}`}>{stage.phase}</span>
                      <span className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-muted-foreground">
                        {isLive ? "Live" : "Upcoming"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className={`h-2 w-2 rounded-full ${isLive ? "bg-primary" : "bg-muted-foreground/50"}`} />
                      <span>{stage.code}</span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-start gap-4">
                    <div
                      className={`h-14 w-14 rounded-2xl border ${tone.nodeBorder} bg-gradient-to-br ${tone.node} flex items-center justify-center shadow-lg`}
                    >
                      <stage.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                        {stage.title}
                      </h3>
                      <p className="text-muted-foreground mt-2">{stage.summary}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {stage.details.map((detail) => (
                      <div
                        key={detail}
                        className={`flex items-start gap-3 rounded-2xl border px-4 py-4 text-sm font-medium text-foreground/90 ${tone.detail}`}
                      >
                        {isLive ? (
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                        ) : (
                          <Circle className="w-4 h-4 text-muted-foreground/60 mt-0.5" />
                        )}
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    <span>Milestone {stage.id}</span>
                    <span>{stage.status === "current" ? "In progress" : "Queued"}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="outline_wine" size="lg" asChild>
            <a href="/roadmap">See the full roadmap</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeMilestones;
