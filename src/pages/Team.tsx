import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import teamRahim from "@/assets/team-rahim.png";
import teamFarid from "@/assets/team-farid.png";
import teamZohrab from "@/assets/team-zohrab.png";
import { Sparkles, TrendingUp, Briefcase, Cpu, MapPin } from "lucide-react";

const teamMembers = [
  {
    name: "Rahim Askarov",
    role: "Chief Executive Officer",
    image: teamRahim,
    flag: "🇺🇸",
    location: "United States",
    icon: Sparkles,
    tone: "ruby",
    code: "VR-01",
    focus: "Vision + Experience",
    description:
      "Visionary entrepreneur with a passion for merging cutting-edge AI technology with the timeless art of wine selection. Rahim leads Vinoria with an unwavering commitment to innovation and customer experience.",
    highlights: [
      "Strategic vision & leadership",
      "AI-driven customer journeys",
      "Brand positioning & growth",
      "Global market expansion",
    ],
  },
  {
    name: "Farid Huseynov",
    role: "Chief Operating Officer",
    image: teamFarid,
    flag: "🇬🇧",
    location: "United Kingdom",
    icon: TrendingUp,
    tone: "tech",
    code: "VR-02",
    focus: "Operations + Scale",
    description:
      "Operations mastermind with deep roots in successful business ventures. Farid brings unparalleled operational expertise to scale Vinoria's automated stores worldwide.",
    highlights: [
      "Bridge Group leadership",
      "200M+ AZN annual turnover",
      "Operational excellence",
      "Strategic partnerships",
    ],
  },
  {
    name: "Zohrab Aslanov",
    role: "Chief Financial Officer",
    image: teamZohrab,
    flag: "🇨🇭",
    location: "Switzerland",
    icon: Briefcase,
    tone: "gold",
    code: "VR-03",
    focus: "Finance + Growth",
    description:
      "Financial strategist with proven track record in building and scaling successful enterprises. Zohrab ensures Vinoria's financial health and sustainable growth.",
    highlights: [
      "CEO of AZZA in Baku",
      "50M+ AZN annual turnover",
      "Financial strategy & planning",
      "Investment management",
    ],
  },
];

const toneStyles = {
  ruby: {
    border: "border-primary/30",
    glow: "from-primary/25 via-primary/10 to-transparent",
    chip: "border-primary/40 bg-primary/10 text-primary",
    ring: "from-primary/70 to-gold/60",
    detail: "border-primary/25 bg-primary/10",
    icon: "text-primary",
  },
  tech: {
    border: "border-tech/30",
    glow: "from-tech/25 via-tech/10 to-transparent",
    chip: "border-tech/40 bg-tech/10 text-tech",
    ring: "from-tech/70 to-cyan-300/60",
    detail: "border-tech/25 bg-tech/10",
    icon: "text-tech",
  },
  gold: {
    border: "border-gold/30",
    glow: "from-gold/25 via-gold/10 to-transparent",
    chip: "border-gold/40 bg-gold/10 text-gold",
    ring: "from-gold/70 to-yellow-200/60",
    detail: "border-gold/25 bg-gold/10",
    icon: "text-gold",
  },
} as const;

const Team = () => {
  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <Navbar />

      {/* Ambient tech background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-15" />
        <div className="absolute inset-0 tech-dots opacity-10" />
        <div className="absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-tech/15 blur-3xl animate-float" />
        <div className="absolute top-1/3 -left-24 h-[360px] w-[360px] rounded-full bg-primary/12 blur-3xl animate-float [animation-delay:1.5s]" />
        <div className="absolute bottom-0 right-1/4 h-[320px] w-[320px] rounded-full bg-gold/10 blur-3xl animate-float [animation-delay:2.6s]" />
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative">
        <div className="container mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/40 text-tech text-xs font-medium mb-6 border border-tech/30 backdrop-blur-sm uppercase tracking-[0.3em]">
              <Cpu className="w-4 h-4" />
              Leadership Signal
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              The Minds Powering Vinoria
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              A leadership team built for precision retail, immersive AI, and global scale.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "Vision", detail: "Experience design + AI strategy" },
              { title: "Operations", detail: "Scaling automated retail" },
              { title: "Finance", detail: "Capital + sustainable growth" },
            ].map((pill) => (
              <div
                key={pill.title}
                className="rounded-2xl border border-border/60 bg-card/30 px-5 py-4 text-left backdrop-blur"
              >
                <div className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                  {pill.title}
                </div>
                <div className="text-foreground font-medium mt-2">{pill.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 px-6 relative">
        <div className="container mx-auto">
          <div className="space-y-16">
            {teamMembers.map((member, index) => {
              const Icon = member.icon;
              const tone = toneStyles[member.tone as keyof typeof toneStyles];

              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${tone.glow} opacity-60`} />
                  <div className={`relative rounded-3xl border ${tone.border} bg-card/40 backdrop-blur-xl shadow-card`}>
                    <div
                      className={`grid gap-10 p-6 md:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center ${
                        index % 2 === 1 ? "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]" : ""
                      }`}
                    >
                      {/* Image block */}
                      <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                        <motion.div
                          whileHover={{ y: -6 }}
                          transition={{ type: "spring", stiffness: 200, damping: 18 }}
                          className="relative"
                        >
                          <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${tone.ring} opacity-60 blur-lg`} />
                          <div className={`relative overflow-hidden rounded-3xl border ${tone.border} bg-background/40`}>
                            <div className="absolute inset-0 pointer-events-none">
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08)_0%,_transparent_65%)]" />
                              <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                            </div>
                            <div className="aspect-[3/4] overflow-hidden">
                              <motion.img
                                src={member.image}
                                alt={member.name}
                                className="h-full w-full object-cover object-center"
                                whileHover={{ scale: 1.04 }}
                                transition={{ duration: 0.6 }}
                              />
                            </div>

                            <div className="absolute top-4 left-4 flex items-center gap-2">
                              <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${tone.chip}`}>
                                {member.code}
                              </span>
                              <span className="rounded-full border border-border/50 bg-background/70 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                                {member.focus}
                              </span>
                            </div>

                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                              <div className="flex items-center gap-3 text-sm text-foreground">
                                <span className="text-2xl">{member.flag}</span>
                                <span className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                                  <MapPin className="w-3 h-3" />
                                  {member.location}
                                </span>
                              </div>
                              <div className={`flex h-10 w-10 items-center justify-center rounded-full border ${tone.chip}`}>
                                <Icon className={`w-5 h-5 ${tone.icon}`} />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Content block */}
                      <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] ${tone.chip}`}>
                            Executive
                          </span>
                          <span className="rounded-full border border-border/50 bg-background/70 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                            {member.role}
                          </span>
                        </div>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                          {member.name}
                        </h2>
                        <p className="font-body text-muted-foreground text-base md:text-lg mt-4 leading-relaxed">
                          {member.description}
                        </p>

                        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-border/80 to-transparent" />

                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                          {member.highlights.map((highlight) => (
                            <div
                              key={highlight}
                              className={`flex items-start gap-3 rounded-2xl border px-4 py-4 text-sm font-medium text-foreground/90 ${tone.detail}`}
                            >
                              <span className={`mt-1 h-2 w-2 rounded-full bg-current ${tone.icon}`} />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/60 to-transparent" />
        <div className="container mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 h-1 w-24 bg-gradient-to-r from-transparent via-tech to-transparent" />

            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Join Our Growing Team
            </h2>
            <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              We are always looking for builders who love tech, hospitality, and premium customer experiences.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">View Open Positions</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundSize: "200% 100%" }}
                animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Team;
