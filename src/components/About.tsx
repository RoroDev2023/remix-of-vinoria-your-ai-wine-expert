import { motion } from "framer-motion";
import { Bot, Lightbulb, Clock, ShieldCheck } from "lucide-react";

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
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-body text-sm tracking-widest text-primary uppercase">
              Our Vision
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
              Redefining <br />
              <span className="italic text-gradient-wine">Wine Retail</span>
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
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-semibold text-primary">
                    {stat.value}
                  </div>
                  <div className="font-body text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
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
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;