import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, Suspense } from "react";
import { Brain, Sparkles, Wine, MessageCircle, Scan, Cpu, ArrowRight, Bot } from "lucide-react";
import { Button } from "./ui/button";
import Hologram3D from "./Hologram3D";

const HologramSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  const features = [
    { icon: Scan, label: "Facial Recognition" },
    { icon: Brain, label: "Taste Analysis" },
    { icon: Wine, label: "Perfect Pairing" },
    { icon: MessageCircle, label: "Natural Conversation" },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-background overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 tech-grid opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.1)_0%,transparent_60%)]" />
      
      {/* Animated background glows */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/20 rounded-full blur-3xl"
      />

      {/* Content */}
      <motion.div 
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 container mx-auto px-6 min-h-screen flex items-center pt-20"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* AI Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-card/60 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-6"
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
                <Cpu className="w-3 h-3 text-muted-foreground" />
              </motion.div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-semibold mb-6 leading-tight">
                <span className="text-foreground">The Future of</span>
                <br />
                <motion.span 
                  className="text-gradient-wine italic inline-block"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Wine Selection
                </motion.span>
              </h1>
              
              <p className="font-body text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                Walk into our fully automated store, meet your personal AI hologram sommelier, 
                and discover your perfect wine. No queues, no guesswork — just intelligent, 
                personalized wine curation.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
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
                  <Sparkles className="w-4 h-4 mr-1 group-hover:text-primary transition-colors" />
                  Meet the AI Sommelier
                </Button>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center gap-3 p-3 bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl cursor-default group hover:border-primary/50 transition-colors"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-body text-sm text-foreground">{feature.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side - 3D Hologram */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="order-1 lg:order-2 relative h-[400px] md:h-[500px] lg:h-[600px]"
          >
            {/* Glow effect behind hologram */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ 
                  boxShadow: [
                    "0 0 60px 30px hsl(var(--primary)/0.2)",
                    "0 0 100px 50px hsl(var(--primary)/0.3)",
                    "0 0 60px 30px hsl(var(--primary)/0.2)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-64 h-64 rounded-full"
              />
            </div>

            {/* 3D Canvas */}
            <Suspense fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            }>
              <Hologram3D />
            </Suspense>

            {/* Floating Data Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute top-1/4 -right-4 md:right-0 space-y-3 z-20"
            >
              {["Analyzing...", "98% Match", "Bordeaux"].map((text, i) => (
                <motion.div
                  key={text}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  className="px-3 py-1.5 bg-card/80 backdrop-blur-sm border border-primary/30 rounded-lg text-xs font-mono text-primary shadow-lg"
                >
                  {text}
                </motion.div>
              ))}
            </motion.div>

            {/* Wine Recommendation Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-1/4 -left-4 md:left-0 p-4 bg-card/90 backdrop-blur-md border border-gold/30 rounded-xl shadow-elegant max-w-[180px] z-20"
            >
              <div className="flex items-center gap-2 mb-2">
                <Wine className="w-4 h-4 text-gold" />
                <span className="text-xs font-body text-gold">Recommended</span>
              </div>
              <p className="text-sm font-display text-foreground">Château Margaux 2018</p>
              <p className="text-xs text-muted-foreground mt-1">Perfect for your palate</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
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

export default HologramSection;
