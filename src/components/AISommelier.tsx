import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, Brain, Wine, Zap, Bot, ScanFace, Store, ArrowRight } from "lucide-react";
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
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="ai-sommelier" className="py-24 relative overflow-hidden bg-card">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      
      {/* Animated circuit lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,200 Q400,150 800,200 T1600,200"
          fill="none"
          stroke="url(#circuit-gradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
        />
      </svg>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-background border border-primary/20 rounded-full px-4 py-2 mb-6 shadow-sm backdrop-blur-sm"
              whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary) / 0.5)" }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Bot className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="font-body text-sm text-primary font-medium">Hologram Technology</span>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </motion.div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
              Meet Your <br />
              <span className="italic text-gradient-wine relative">
                AI Sommelier
                <motion.span 
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-gold to-transparent"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </h2>

            <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
              Step into our store and be greeted by a stunning holographic AI sommelier. 
              Through natural conversation, it understands your taste, occasion, and budget — 
              then guides you to your perfect bottle, automatically dispensed and ready to go.
            </p>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button variant="gold" size="xl" className="group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  <Wine className="w-5 h-5" />
                  Experience the Store
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Feature Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isHovered = hoveredFeature === index;
              
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  whileHover={{ y: -6 }}
                  className="bg-background border border-border hover:border-primary/40 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group cursor-default"
                >
                  {/* Glow effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  
                  {/* Icon */}
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 relative border border-primary/20"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-6 h-6 text-primary" />
                    {isHovered && (
                      <motion.div 
                        className="absolute inset-0 rounded-xl border-2 border-primary/50"
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.3, opacity: 0 }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors relative">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground relative">
                    {feature.description}
                  </p>

                  {/* Corner accent */}
                  <div className="absolute top-4 right-4 w-4 h-4 border-r border-t border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* How It Works Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-24"
        >
          <div className="bg-background rounded-3xl border border-border overflow-hidden shadow-card max-w-4xl mx-auto relative">
            {/* Subtle gradient border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-gold/10 opacity-50 pointer-events-none" />
            
            {/* Header */}
            <div className="bg-card px-6 py-4 border-b border-border flex items-center gap-3 relative">
              <motion.div 
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
              <div>
                <div className="font-display text-sm font-semibold text-foreground">How It Works</div>
                <div className="font-body text-xs text-muted-foreground">Your automated wine journey</div>
              </div>
              
              {/* Status indicator */}
              <div className="ml-auto flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-body text-xs text-muted-foreground">Live Demo</span>
              </div>
            </div>

            {/* Steps */}
            <div className="p-8 grid md:grid-cols-3 gap-8 relative">
              {/* Connection lines */}
              <div className="hidden md:block absolute top-1/2 left-[33%] w-[33%] h-0.5 bg-gradient-to-r from-primary/30 to-primary/30" />
              
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
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                  className="text-center relative cursor-default"
                >
                  <motion.div 
                    className={`font-display text-4xl font-bold mb-3 transition-colors duration-300 ${
                      activeStep === index ? 'text-primary' : 'text-primary/20'
                    }`}
                    animate={activeStep === index ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {item.step}
                  </motion.div>
                  <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h4>
                  <p className="font-body text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                  
                  {/* Step indicator dot */}
                  <motion.div 
                    className={`w-3 h-3 rounded-full mx-auto mt-4 transition-colors duration-300 ${
                      activeStep === index ? 'bg-primary shadow-[0_0_10px_hsl(var(--primary))]' : 'bg-border'
                    }`}
                  />
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