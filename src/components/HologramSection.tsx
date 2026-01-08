import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Brain, Sparkles, Wine, MessageCircle, Scan, Cpu } from "lucide-react";

const HologramSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform values based on scroll
  const hologramOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const hologramScale = useTransform(scrollYProgress, [0.1, 0.35], [0.5, 1]);
  const hologramY = useTransform(scrollYProgress, [0.1, 0.35], [100, 0]);
  const glowIntensity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const scanLineY = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);
  const dataStreamsOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const textReveal = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  const features = [
    { icon: Scan, label: "Facial Recognition", delay: 0 },
    { icon: Brain, label: "Taste Analysis", delay: 0.1 },
    { icon: Wine, label: "Perfect Pairing", delay: 0.2 },
    { icon: MessageCircle, label: "Natural Conversation", delay: 0.3 },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[200vh] bg-background overflow-hidden"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 tech-grid opacity-20" />
        
        {/* Radial Gradient Background */}
        <motion.div 
          style={{ opacity: glowIntensity }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15)_0%,transparent_70%)]"
        />

        {/* Animated Circuit Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.path
            d="M0,200 Q400,100 800,200 T1600,200"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            fill="none"
            style={{ opacity: dataStreamsOpacity }}
            strokeDasharray="10 5"
          />
          <motion.path
            d="M0,400 Q400,500 800,400 T1600,400"
            stroke="hsl(var(--gold))"
            strokeWidth="1"
            fill="none"
            style={{ opacity: dataStreamsOpacity }}
            strokeDasharray="10 5"
          />
        </svg>

        {/* Data Particles */}
        <motion.div 
          style={{ opacity: dataStreamsOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${10 + (i * 4.5)}%`,
                top: `${20 + (i % 5) * 15}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + (i % 3),
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </motion.div>

        {/* Main Content Container */}
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* Left Content */}
          <motion.div 
            style={{ opacity: textReveal }}
            className="flex-1 max-w-xl z-10"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-card/60 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-6">
                <Cpu className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm font-body text-primary">Holographic Technology</span>
              </div>
              
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mb-6">
                <span className="text-foreground">Meet Your</span>
                <br />
                <span className="text-gradient-wine italic">AI Sommelier</span>
              </h2>
              
              <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
                Our holographic AI sommelier uses advanced neural networks to understand your 
                preferences, analyze your taste profile, and guide you to your perfect wine match 
                in real-time.
              </p>

              {/* Feature Grid */}
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: feature.delay }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center gap-3 p-3 bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl cursor-default group hover:border-primary/50 transition-colors"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-body text-sm text-foreground">{feature.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Hologram */}
          <motion.div 
            style={{ 
              opacity: hologramOpacity,
              scale: hologramScale,
              y: hologramY
            }}
            className="flex-1 relative flex items-center justify-center"
          >
            {/* Hologram Base Platform */}
            <div className="absolute bottom-0 w-80 h-4">
              <motion.div 
                style={{ opacity: glowIntensity }}
                className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent rounded-full blur-xl"
              />
              <div className="absolute inset-x-4 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
            </div>

            {/* Hologram Container */}
            <div className="relative w-72 h-96 md:w-80 md:h-[450px]">
              {/* Outer Glow Ring */}
              <motion.div
                style={{ opacity: glowIntensity }}
                className="absolute -inset-8 rounded-full bg-gradient-to-t from-primary/20 via-primary/5 to-transparent blur-2xl"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Hologram Frame */}
              <div className="relative w-full h-full">
                {/* Vertical Scan Lines */}
                <motion.div
                  style={{ top: scanLineY }}
                  className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent z-20"
                />
                
                {/* Main Hologram Figure */}
                <motion.div
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                  style={{ opacity: hologramOpacity }}
                >
                  {/* Hologram Effect Layers */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-cyan-500/20 to-primary/10 rounded-2xl" />
                  
                  {/* Human Silhouette */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="relative w-48 h-72 md:w-56 md:h-80"
                      animate={{ 
                        filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {/* Body silhouette using gradients */}
                      <div className="absolute inset-0 flex flex-col items-center">
                        {/* Head */}
                        <motion.div 
                          className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-b from-cyan-400/60 to-primary/40 border border-cyan-400/50"
                          animate={{ 
                            boxShadow: [
                              "0 0 20px hsl(var(--primary)/0.3)",
                              "0 0 40px hsl(var(--primary)/0.5)",
                              "0 0 20px hsl(var(--primary)/0.3)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {/* Face features */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex gap-4 mb-2">
                              <motion.div 
                                className="w-2 h-2 rounded-full bg-cyan-300"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                              <motion.div 
                                className="w-2 h-2 rounded-full bg-cyan-300"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                              />
                            </div>
                          </div>
                        </motion.div>
                        
                        {/* Neck */}
                        <div className="w-6 h-4 bg-gradient-to-b from-cyan-400/40 to-primary/30" />
                        
                        {/* Body */}
                        <motion.div 
                          className="w-32 md:w-40 h-40 md:h-48 bg-gradient-to-b from-primary/40 via-cyan-500/30 to-transparent rounded-t-3xl border-t border-x border-cyan-400/30"
                          animate={{
                            boxShadow: [
                              "inset 0 0 30px hsl(var(--primary)/0.2)",
                              "inset 0 0 50px hsl(var(--primary)/0.4)",
                              "inset 0 0 30px hsl(var(--primary)/0.2)"
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {/* Chest detail lines */}
                          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-16 space-y-2">
                            <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                            <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
                            <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Hologram interference lines */}
                      <div className="absolute inset-0 overflow-hidden rounded-2xl">
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute left-0 right-0 h-px bg-cyan-400/20"
                            style={{ top: `${12 + i * 12}%` }}
                            animate={{ 
                              opacity: [0.1, 0.4, 0.1],
                              scaleX: [0.8, 1, 0.8]
                            }}
                            transition={{ 
                              duration: 1.5 + i * 0.2, 
                              repeat: Infinity,
                              delay: i * 0.1 
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Glitch Effect */}
                  <motion.div
                    className="absolute inset-0 bg-cyan-400/5"
                    animate={{ 
                      opacity: [0, 0.1, 0, 0.05, 0],
                      x: [0, -2, 2, 0]
                    }}
                    transition={{ 
                      duration: 0.3, 
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  />
                </motion.div>

                {/* Floating Data Points */}
                <motion.div
                  style={{ opacity: dataStreamsOpacity }}
                  className="absolute -right-8 top-1/4 space-y-4"
                >
                  {["Analyzing...", "98% Match", "Bordeaux"].map((text, i) => (
                    <motion.div
                      key={text}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.2 }}
                      className="px-3 py-1.5 bg-card/80 backdrop-blur-sm border border-primary/30 rounded-lg text-xs font-mono text-primary"
                    >
                      {text}
                    </motion.div>
                  ))}
                </motion.div>

                {/* Wine Recommendation Floating Card */}
                <motion.div
                  style={{ opacity: dataStreamsOpacity }}
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -left-12 bottom-1/4 p-4 bg-card/90 backdrop-blur-md border border-gold/30 rounded-xl shadow-elegant max-w-[180px]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Wine className="w-4 h-4 text-gold" />
                    <span className="text-xs font-body text-gold">Recommended</span>
                  </div>
                  <p className="text-sm font-display text-foreground">Château Margaux 2018</p>
                  <p className="text-xs text-muted-foreground mt-1">Perfect for your palate</p>
                </motion.div>
              </div>

              {/* Sparkle Effects */}
              <motion.div
                style={{ opacity: glowIntensity }}
                className="absolute -top-4 left-1/2 -translate-x-1/2"
              >
                <Sparkles className="w-6 h-6 text-gold animate-pulse" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default HologramSection;
