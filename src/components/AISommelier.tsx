import { motion } from "framer-motion";
import { Sparkles, Brain, Wine, MessageCircle, Zap, Target } from "lucide-react";
import { Button } from "./ui/button";

const features = [
  {
    icon: Brain,
    title: "Learns Your Palate",
    description: "Our AI analyzes your preferences to understand your unique taste profile.",
  },
  {
    icon: Target,
    title: "Perfect Matches",
    description: "Get personalized recommendations with 98% accuracy to your taste.",
  },
  {
    icon: MessageCircle,
    title: "Chat Anytime",
    description: "Ask questions about wine pairings, regions, or vintages 24/7.",
  },
  {
    icon: Zap,
    title: "Instant Discovery",
    description: "Discover new favorites from our collection of 2,500+ premium wines.",
  },
];

const AISommelier = () => {
  return (
    <section id="ai-sommelier" className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="font-body text-sm text-gold">Powered by Advanced AI</span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6">
              Meet Your <br />
              <span className="italic text-gradient-gold">AI Sommelier</span>
            </h2>

            <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
              Experience wine selection like never before. Our AI sommelier combines centuries of 
              wine knowledge with cutting-edge machine learning to find your perfect pour.
            </p>

            <Button variant="gold" size="xl" className="group">
              <Wine className="w-5 h-5" />
              Start Tasting Journey
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
                className="bg-card/50 backdrop-blur-sm border border-border hover:border-gold/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Chat Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-card max-w-3xl mx-auto">
            {/* Chat Header */}
            <div className="bg-muted/50 px-6 py-4 border-b border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              <div>
                <div className="font-display text-sm font-semibold text-foreground">Vinoria AI</div>
                <div className="font-body text-xs text-muted-foreground">Your Personal Sommelier</div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-body text-xs text-muted-foreground">Online</span>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="p-6 space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex-shrink-0 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-gold" />
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3 max-w-md">
                  <p className="font-body text-sm text-foreground">
                    Welcome to Vinoria! I'm here to help you discover wines perfectly matched to your taste. 
                    What occasion are you shopping for today?
                  </p>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <div className="bg-primary rounded-2xl rounded-tr-none px-4 py-3 max-w-md">
                  <p className="font-body text-sm text-primary-foreground">
                    I'm looking for a wine to pair with a special dinner - grilled salmon with herbs.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex-shrink-0 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-gold" />
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3 max-w-md">
                  <p className="font-body text-sm text-foreground">
                    Excellent choice! For grilled salmon with herbs, I'd recommend a crisp Sancerre or a 
                    Burgundy Chardonnay. Would you prefer something zesty and mineral-driven, or more 
                    rounded with subtle oak notes?
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="px-6 pb-6">
              <div className="flex items-center gap-3 bg-muted rounded-full px-4 py-3">
                <input
                  type="text"
                  placeholder="Ask about wine pairings, regions, or recommendations..."
                  className="flex-1 bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <Button variant="gold" size="sm" className="rounded-full">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AISommelier;
