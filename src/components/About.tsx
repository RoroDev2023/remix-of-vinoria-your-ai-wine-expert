import { motion } from "framer-motion";
import { useState } from "react";
import { Bot, Lightbulb, Clock, ShieldCheck, ArrowUpRight } from "lucide-react";

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
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      {/* Floating orbs */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-gold/10 rounded-full blur-2xl"
        animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      
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
              className="inline-flex items-center gap-2 font-body text-sm tracking-widest text-primary uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20"
              whileHover={{ scale: 1.05 }}
            >
              Our Vision
            </motion.span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-6 mb-6">
              Redefining <br />
              <span className="italic text-gradient-wine relative">
                Wine Retail
                <motion.span 
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-transparent"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </span>
            </h2>
            <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
              <p>
                Vinoria was born from a bold vision: what if buying wine was as intelligent 
                as the sommeliers at the world's finest restaurants, but available to 
                everyone, anytime, anywhere?
              </p>
              <p>
                We combined advanced AI with holographic display technology to create 
                a personal sommelier that lives in our automated stores. Walk in, 
                have a conversation, and walk out with the perfect bottle — all in minutes.
              </p>
              <p>
                Our AI learns from millions of tasting notes, food pairings, and customer 
                preferences to deliver recommendations that rival the best human sommeliers. 
                This is the future of wine shopping.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-border">
              {[
                { value: "50+", label: "Store Locations" },
                { value: "1M+", label: "Wines Selected" },
                { value: "24/7", label: "Always Open" },
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  whileHover={{ y: -4 }}
                  className="cursor-default"
                >
                  <motion.div 
                    className="font-display text-2xl font-semibold text-primary"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="font-body text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </div>
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
            {values.map((value, index) => {
              const Icon = value.icon;
              const isHovered = hoveredValue === index;
              
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredValue(index)}
                  onMouseLeave={() => setHoveredValue(null)}
                  whileHover={{ y: -6 }}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 relative overflow-hidden group cursor-default"
                >
                  {/* Background glow */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  
                  {/* Icon with animated ring */}
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 relative border border-primary/20"
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon className="w-6 h-6 text-primary" />
                    {isHovered && (
                      <motion.div 
                        className="absolute inset-0 rounded-xl border-2 border-primary/50"
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 1.4, opacity: 0 }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  
                  <div className="flex items-start justify-between relative">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                      className="text-primary"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                  <p className="font-body text-sm text-muted-foreground relative">
                    {value.description}
                  </p>

                  {/* Corner decoration */}
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-br" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;