import { motion } from "framer-motion";
import { Bot, Lightbulb, Clock, ShieldCheck, TrendingUp } from "lucide-react";
import { useState } from "react";

const values = [
  {
    icon: Bot,
    title: "AI-First",
    description: "Cutting-edge hologram technology for a truly personalized experience.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Pioneering the future of retail with fully automated wine stores.",
  },
  {
    icon: Clock,
    title: "Convenience",
    description: "Open 24/7 with instant service — no waiting, no queues.",
  },
  {
    icon: ShieldCheck,
    title: "Trust",
    description: "Expert-level recommendations powered by centuries of wine knowledge.",
  },
];

const About = () => {
  const [hoveredValue, setHoveredValue] = useState<string | null>(null);
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 tech-grid opacity-20" />
      <motion.div
        animate={{ opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent"
      />
      
      {/* Floating accent dots */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ 
            duration: 4 + i, 
            repeat: Infinity, 
            delay: i * 0.5 
          }}
          className="absolute w-2 h-2 rounded-full bg-primary/30"
          style={{ 
            right: `${10 + i * 8}%`, 
            top: `${20 + i * 15}%` 
          }}
        />
      ))}
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span 
              className="font-body text-sm tracking-widest text-primary uppercase inline-block"
              whileHover={{ letterSpacing: "0.2em" }}
            >
              Our Vision
            </motion.span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
              Redefining <br />
              <motion.span 
                className="italic text-gradient-wine inline-block"
                whileHover={{ scale: 1.02 }}
              >
                Wine Retail
              </motion.span>
            </h2>
            <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Vinoria was born from a bold vision: what if buying wine was as intelligent 
                as the sommeliers at the world's finest restaurants, but available to 
                everyone, anytime, anywhere?
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                We combined advanced AI with holographic display technology to create 
                a personal sommelier that lives in our automated stores. Walk in, 
                have a conversation, and walk out with the perfect bottle — all in minutes.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Our AI learns from millions of tasting notes, food pairings, and customer 
                preferences to deliver recommendations that rival the best human sommeliers. 
                This is the future of wine shopping.
              </motion.p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-border">
              {[
                { value: "50+", label: "Store Locations", trend: "+12" },
                { value: "1M+", label: "Wines Selected", trend: "+50K" },
                { value: "24/7", label: "Always Open", trend: null },
              ].map((stat) => (
                <motion.div 
                  key={stat.label}
                  onHoverStart={() => setHoveredStat(stat.label)}
                  onHoverEnd={() => setHoveredStat(null)}
                  whileHover={{ y: -4 }}
                  className="cursor-default relative"
                >
                  <motion.div 
                    className="font-display text-2xl font-semibold text-primary flex items-center gap-1"
                    animate={{ scale: hoveredStat === stat.label ? 1.05 : 1 }}
                  >
                    {stat.value}
                    {stat.trend && hoveredStat === stat.label && (
                      <motion.span
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-green-500 flex items-center"
                      >
                        <TrendingUp className="w-3 h-3" />
                        {stat.trend}
                      </motion.span>
                    )}
                  </motion.div>
                  <div className="font-body text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                  
                  {/* Underline indicator */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredStat === stat.label ? 1 : 0 }}
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full origin-left"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Values Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredValue(value.title)}
                onHoverEnd={() => setHoveredValue(null)}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 relative group cursor-default overflow-hidden"
              >
                {/* Background glow on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredValue === value.title ? 1 : 0 }}
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-gold/5"
                />
                
                {/* Content */}
                <div className="relative z-10">
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 relative"
                    animate={{ 
                      rotate: hoveredValue === value.title ? [0, -5, 5, 0] : 0,
                      scale: hoveredValue === value.title ? 1.1 : 1
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <value.icon className="w-6 h-6 text-primary" />
                    
                    {/* Pulse ring on hover */}
                    {hoveredValue === value.title && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0.8 }}
                        animate={{ scale: 1.8, opacity: 0 }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="absolute inset-0 border border-primary rounded-xl"
                      />
                    )}
                  </motion.div>
                  
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>

                {/* Corner accents */}
                <motion.div
                  initial={{ width: 0, height: 0 }}
                  animate={{ 
                    width: hoveredValue === value.title ? 24 : 0,
                    height: hoveredValue === value.title ? 24 : 0
                  }}
                  className="absolute top-0 right-0 border-t-2 border-r-2 border-primary rounded-tr-2xl"
                />
                <motion.div
                  initial={{ width: 0, height: 0 }}
                  animate={{ 
                    width: hoveredValue === value.title ? 24 : 0,
                    height: hoveredValue === value.title ? 24 : 0
                  }}
                  className="absolute bottom-0 left-0 border-b-2 border-l-2 border-primary/50 rounded-bl-2xl"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
