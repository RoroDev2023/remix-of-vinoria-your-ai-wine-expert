import { motion } from "framer-motion";
import { Sparkles, Brain, Wine, Zap, Bot, ScanFace, Store, Activity } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

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
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  return (
    <section id="ai-sommelier" className="py-24 relative overflow-hidden bg-card">
      {/* Background Elements */}
      <div className="absolute inset-0 tech-dots opacity-50" />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" 
      />

      {/* Animated connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <motion.line
          x1="0%"
          y1="30%"
          x2="100%"
          y2="70%"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeDasharray="8 4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.5 }}
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
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-2 bg-background border border-border rounded-full px-4 py-2 mb-6 shadow-sm group cursor-default"
            >
              <div className="relative">
                <Bot className="w-4 h-4 text-primary" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-1 border border-dashed border-primary/30 rounded-full"
                />
              </div>
              <span className="font-body text-sm text-primary font-medium">Hologram Technology</span>
              <Activity className="w-3 h-3 text-primary animate-pulse" />
            </motion.div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
              Meet Your <br />
              <motion.span 
                className="italic text-gradient-wine inline-block"
                whileHover={{ scale: 1.02 }}
              >
                AI Sommelier
              </motion.span>
            </h2>

            <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
              Step into our store and be greeted by a stunning holographic AI sommelier. 
              Through natural conversation, it understands your taste, occasion, and budget — 
              then guides you to your perfect bottle, automatically dispensed and ready to go.
            </p>

            <Button variant="gold" size="xl" className="group relative overflow-hidden">
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
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
                onHoverStart={() => setHoveredFeature(feature.title)}
                onHoverEnd={() => setHoveredFeature(null)}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-background border border-border hover:border-primary/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg relative group cursor-default"
              >
                {/* Hover glow effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredFeature === feature.title ? 1 : 0 }}
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl"
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 relative"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-6 h-6 text-primary" />
                    {hoveredFeature === feature.title && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="absolute inset-0 bg-primary/20 rounded-xl"
                      />
                    )}
                  </motion.div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>

                {/* Corner accent */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: hoveredFeature === feature.title ? 20 : 0 }}
                  className="absolute top-0 right-0 h-0.5 bg-primary rounded-full"
                />
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
          <div className="bg-background rounded-3xl border border-border overflow-hidden shadow-card max-w-4xl mx-auto relative">
            {/* Tech grid overlay */}
            <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />
            
            {/* Header */}
            <div className="bg-card px-6 py-4 border-b border-border flex items-center gap-3 relative">
              <motion.div 
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
                animate={{ rotate: [0, 360] }}
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
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-500"
                />
                <span className="font-body text-xs text-muted-foreground">Live</span>
              </div>
            </div>

            {/* Steps */}
            <div className="p-8 grid md:grid-cols-3 gap-8 relative">
              {/* Connection line */}
              <div className="hidden md:block absolute top-1/2 left-[20%] right-[20%] h-px bg-gradient-to-r from-border via-primary/30 to-border" />
              
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
                  onHoverStart={() => setActiveStep(index)}
                  onHoverEnd={() => setActiveStep(null)}
                  className="text-center relative z-10 cursor-default"
                >
                  <motion.div 
                    className={`font-display text-4xl font-bold mb-3 transition-colors duration-300 ${
                      activeStep === index ? 'text-primary' : 'text-primary/20'
                    }`}
                    animate={{ scale: activeStep === index ? 1.1 : 1 }}
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
                    className="hidden md:block absolute -bottom-4 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-border bg-background"
                    animate={{ 
                      borderColor: activeStep === index ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                      scale: activeStep === index ? 1.2 : 1
                    }}
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
