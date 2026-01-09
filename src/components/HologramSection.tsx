import { motion } from "framer-motion";
import { useRef } from "react";
import KioskMockup from "./KioskMockup";

const HologramSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-background overflow-hidden flex flex-col"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 tech-grid opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08)_0%,transparent_70%)]" />
      
      {/* Subtle animated glow */}
      <motion.div
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Main Content - Centered */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-8">
        
        {/* Hero Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-5xl md:text-6xl lg:text-8xl font-semibold leading-tight tracking-tight">
            <span className="text-foreground">Meet Your</span>
            <br />
            <motion.span 
              className="text-gradient-wine italic inline-block"
              animate={{ 
                textShadow: [
                  "0 0 20px hsl(345 60% 40% / 0)",
                  "0 0 40px hsl(345 60% 40% / 0.3)",
                  "0 0 20px hsl(345 60% 40% / 0)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              AI Sommelier
            </motion.span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-body text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto"
          >
            Walk up. Ask anything. Get your perfect bottle — all powered by AI.
          </motion.p>
        </motion.div>

        {/* Interactive Kiosk Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-3xl"
        >
          <div className="relative bg-card/30 backdrop-blur-sm border border-border/50 rounded-3xl overflow-hidden shadow-2xl">
            
            {/* Demo Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-gold/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="font-body text-sm text-muted-foreground">Kiosk Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-green-500"
                />
                <span className="font-body text-xs text-muted-foreground">Live Demo</span>
              </div>
            </div>

            {/* Kiosk Animation */}
            <KioskMockup />
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12"
        >
          {[
            { value: "98%", label: "Match Accuracy" },
            { value: "24/7", label: "Always Available" },
            { value: "10K+", label: "Wines Cataloged" },
            { value: "<2s", label: "Response Time" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-semibold text-foreground">{stat.value}</div>
              <div className="font-body text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2 hover:border-primary/50 transition-colors cursor-pointer"
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HologramSection;