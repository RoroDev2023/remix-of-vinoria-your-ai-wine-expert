import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Bot, Cpu, Zap } from "lucide-react";
import { Button } from "./ui/button";
import heroImage from "@/assets/hero-wine.jpg";
import { useState } from "react";

const Hero = () => {
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Light Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Automated wine store with hologram sommelier"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      {/* Tech Grid Background */}
      <div className="absolute inset-0 tech-grid opacity-30" />

      {/* Animated Tech Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl"
        />
        
        {/* Tech accent particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.8, 0],
              scale: [0.5, 1, 0.5],
              y: [0, -100],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              delay: i * 0.5,
              ease: "easeOut"
            }}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{ 
              left: `${20 + i * 12}%`, 
              top: `${60 + (i % 3) * 10}%` 
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-3xl">
          {/* AI Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-8 shadow-card cursor-default group"
          >
            <div className="relative">
              <Bot className="w-4 h-4 text-primary" />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-primary/30"
              />
            </div>
            <span className="text-sm font-body text-primary font-medium">AI Hologram Sommelier</span>
            <Cpu className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-tight mb-6"
          >
            <span className="text-foreground">The Future of</span>
            <br />
            <motion.span 
              className="text-gradient-wine italic inline-block"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Wine Selection
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed"
          >
            Walk into our fully automated store, meet your personal AI hologram sommelier, 
            and discover your perfect wine. No queues, no guesswork — just intelligent, 
            personalized wine curation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="gold" size="xl" className="group relative overflow-hidden">
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              Find a Store
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline_wine" size="xl" className="group">
              <Zap className="w-4 h-4 mr-1 group-hover:text-primary transition-colors" />
              Meet the AI Sommelier
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-8 md:gap-12 mt-16 pt-8 border-t border-border"
          >
            {[
              { value: "24/7", label: "Stores Open", icon: "🏪" },
              { value: "98%", label: "Match Accuracy", icon: "🎯" },
              { value: "30s", label: "Avg. Selection Time", icon: "⚡" },
            ].map((stat) => (
              <motion.div 
                key={stat.label}
                onHoverStart={() => setHoveredStat(stat.label)}
                onHoverEnd={() => setHoveredStat(null)}
                whileHover={{ y: -4 }}
                className="cursor-default relative"
              >
                <motion.div 
                  className="font-display text-3xl md:text-4xl font-semibold text-primary flex items-center gap-2"
                  animate={{ 
                    scale: hoveredStat === stat.label ? 1.05 : 1 
                  }}
                >
                  {stat.value}
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: hoveredStat === stat.label ? 1 : 0,
                      scale: hoveredStat === stat.label ? 1 : 0
                    }}
                    className="text-lg"
                  >
                    {stat.icon}
                  </motion.span>
                </motion.div>
                <div className="font-body text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
                {hoveredStat === stat.label && (
                  <motion.div
                    layoutId="stat-underline"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex items-start justify-center p-2 hover:border-primary transition-colors cursor-pointer"
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

export default Hero;
