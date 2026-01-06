import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Bot, Cpu, Wifi } from "lucide-react";
import { Button } from "./ui/button";
import heroImage from "@/assets/hero-wine.jpg";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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

      {/* Animated tech grid overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Interactive glow that follows mouse */}
      <motion.div
        className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Floating tech elements */}
      <motion.div
        className="absolute top-1/3 right-1/4 hidden lg:block"
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <div className="w-16 h-16 rounded-2xl bg-card/50 backdrop-blur-sm border border-border flex items-center justify-center">
          <Cpu className="w-8 h-8 text-primary/60" />
        </div>
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 left-1/4 hidden lg:block"
        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <div className="w-12 h-12 rounded-xl bg-card/50 backdrop-blur-sm border border-border flex items-center justify-center">
          <Wifi className="w-6 h-6 text-primary/60" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-3xl">
          {/* AI Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-8 shadow-card cursor-default"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Bot className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm font-body text-primary font-medium">AI Hologram Sommelier</span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
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
            <span className="text-gradient-wine italic relative">
              Wine Selection
              <motion.span 
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-gold to-primary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              />
            </span>
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
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button variant="gold" size="xl" className="group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Find a Store
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-gold via-primary to-gold opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundSize: "200% 100%" }}
                  animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline_wine" size="xl" className="group">
                <Sparkles className="w-5 h-5 group-hover:text-primary transition-colors" />
                Meet the AI Sommelier
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-8 md:gap-12 mt-16 pt-8 border-t border-border"
          >
            {[
              { value: "24/7", label: "Stores Open" },
              { value: "98%", label: "Match Accuracy" },
              { value: "30s", label: "Avg. Selection Time" },
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="cursor-default"
              >
                <motion.div 
                  className="font-display text-3xl md:text-4xl font-semibold text-primary"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, type: "spring" }}
                >
                  {stat.value}
                </motion.div>
                <div className="font-body text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
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
          className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2 backdrop-blur-sm"
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Corner accents */}
      <div className="absolute top-24 left-6 w-16 h-16 border-l-2 border-t-2 border-primary/20 rounded-tl-3xl" />
      <div className="absolute bottom-24 right-6 w-16 h-16 border-r-2 border-b-2 border-primary/20 rounded-br-3xl" />
    </section>
  );
};

export default Hero;