import { motion } from "framer-motion";
import { Sparkles, Brain, Wine, MessageCircle, Zap, Bot, ScanFace, Store } from "lucide-react";
import { Button } from "./ui/button";

const features = [
  {
    icon: ScanFace,
    title: "Hologram Interaction",
    description: "Speak naturally with our lifelike AI hologram sommelier in-store.",
  },
  {
    icon: Brain,
    title: "Learns Your Palate",
    description: "Our AI remembers your preferences for personalized future visits.",
  },
  {
    icon: Zap,
    title: "Instant Selection",
    description: "Get the perfect wine recommendation in under 30 seconds.",
  },
  {
    icon: Store,
    title: "Fully Automated",
    description: "No staff needed — walk in, choose, and go. Open 24/7.",
  },
];

const AISommelier = () => {
  return (
    <section id="ai-sommelier" className="py-24 relative overflow-hidden bg-card">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-background border border-border rounded-full px-4 py-2 mb-6 shadow-sm">
              <Bot className="w-4 h-4 text-primary" />
              <span className="font-body text-sm text-primary font-medium">Hologram Technology</span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
              Meet Your <br />
              <span className="italic text-gradient-wine">AI Sommelier</span>
            </h2>

            <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
              Step into our store and be greeted by a stunning holographic AI sommelier. 
              Through natural conversation, it understands your taste, occasion, and budget — 
              then guides you to your perfect bottle, automatically dispensed and ready to go.
            </p>

            <Button variant="gold" size="xl" className="group">
              <Wine className="w-5 h-5" />
              Experience the Store
            </Button>
          </motion.div>

          {/* Right Content - Feature Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background border border-border hover:border-primary/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* How It Works Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <div className="bg-background rounded-3xl border border-border overflow-hidden shadow-card max-w-4xl mx-auto">
            {/* Header */}
            <div className="bg-card px-6 py-4 border-b border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-display text-sm font-semibold text-foreground">How It Works</div>
                <div className="font-body text-xs text-muted-foreground">Your automated wine journey</div>
              </div>
            </div>

            {/* Steps */}
            <div className="p-8 grid md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Enter the Store", desc: "Walk into any Vinoria location — no appointment needed." },
                { step: "02", title: "Talk to the AI", desc: "Our hologram sommelier asks about your preferences and occasion." },
                { step: "03", title: "Collect Your Wine", desc: "Your perfect wine is automatically selected and dispensed." },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="text-center"
                >
                  <div className="font-display text-4xl font-bold text-primary/20 mb-3">
                    {item.step}
                  </div>
                  <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h4>
                  <p className="font-body text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AISommelier;