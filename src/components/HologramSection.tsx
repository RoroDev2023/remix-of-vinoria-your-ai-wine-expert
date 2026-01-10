import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Send, Mic, Volume2 } from "lucide-react";
import { Button } from "./ui/button";
import WineBottle3D from "./WineBottle3D";

const sampleConversations = [
  { 
    user: "I'm looking for a wine for a romantic dinner",
    ai: "Perfect! I'd recommend a velvety Pinot Noir or an elegant Château Margaux 2018. Both pair beautifully with candlelit evenings." 
  },
  { 
    user: "What pairs well with steak?",
    ai: "For a bold steak, nothing beats a Cabernet Sauvignon from Napa Valley. The tannins complement the meat perfectly." 
  },
  { 
    user: "I prefer something sweeter",
    ai: "Try a late harvest Riesling or a Moscato d'Asti. Light, sweet, and absolutely delightful as an aperitif or dessert wine." 
  },
];

const HologramSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [conversation, setConversation] = useState<{type: 'user' | 'ai', text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentDemo, setCurrentDemo] = useState(0);

  // Auto-demo conversation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (conversation.length === 0) {
        runDemo(0);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const runDemo = async (index: number) => {
    const demo = sampleConversations[index];
    
    // Show user message
    setConversation([{ type: 'user', text: demo.user }]);
    
    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsTyping(true);
    
    // Show AI response
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsTyping(false);
    setIsSpeaking(true);
    setConversation([
      { type: 'user', text: demo.user },
      { type: 'ai', text: demo.ai }
    ]);
    
    // Stop speaking animation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsSpeaking(false);
    
    // Next demo
    await new Promise(resolve => setTimeout(resolve, 4000));
    const nextIndex = (index + 1) % sampleConversations.length;
    setCurrentDemo(nextIndex);
    runDemo(nextIndex);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = inputValue;
    setConversation(prev => [...prev, { type: 'user', text: userMessage }]);
    setInputValue("");
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setIsSpeaking(true);
      setConversation(prev => [...prev, { 
        type: 'ai', 
        text: "I'd be happy to help you find the perfect wine! Based on your preferences, I recommend exploring our curated selection." 
      }]);
      setTimeout(() => setIsSpeaking(false), 2000);
    }, 1500);
  };

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
            The first holographic wine expert that sees you, listens to you, and finds your perfect bottle.
          </motion.p>
        </motion.div>

        {/* Interactive Hologram Demo Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-5xl"
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
                <span className="font-body text-sm text-muted-foreground">Live Demo</span>
              </div>
              <motion.div 
                animate={{ opacity: isSpeaking ? [0.5, 1, 0.5] : 1 }}
                transition={{ duration: 0.5, repeat: isSpeaking ? Infinity : 0 }}
                className="flex items-center gap-2"
              >
                <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="font-body text-xs text-muted-foreground">
                  {isSpeaking ? 'Speaking...' : 'Ready'}
                </span>
              </motion.div>
            </div>

            {/* Main Demo Content */}
            <div className="grid lg:grid-cols-2 gap-0">
              
              {/* Left - Hologram Display */}
              <div className="relative h-[400px] lg:h-[500px] bg-gradient-to-b from-background/50 to-card/50 flex items-center justify-center overflow-hidden">
                {/* Hologram glow backdrop */}
                <motion.div
                  animate={{ 
                    boxShadow: isSpeaking ? [
                      "0 0 80px 40px hsl(var(--primary)/0.2)",
                      "0 0 120px 60px hsl(var(--primary)/0.35)",
                      "0 0 80px 40px hsl(var(--primary)/0.2)"
                    ] : [
                      "0 0 60px 30px hsl(var(--primary)/0.1)",
                      "0 0 80px 40px hsl(var(--primary)/0.15)",
                      "0 0 60px 30px hsl(var(--primary)/0.1)"
                    ]
                  }}
                  transition={{ duration: isSpeaking ? 0.8 : 3, repeat: Infinity }}
                  className="absolute w-48 h-48 rounded-full"
                />
                
                <WineBottle3D isSpeaking={isSpeaking} />
                
                {/* Status indicator */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-card/80 backdrop-blur-sm border border-primary/30 rounded-full"
                >
                  <div className="flex items-center gap-2">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-green-500" 
                    />
                    <span className="font-body text-xs text-foreground">AI Active</span>
                  </div>
                </motion.div>
              </div>

              {/* Right - Chat Interface */}
              <div className="flex flex-col h-[400px] lg:h-[500px] bg-card/20 border-l border-border/50">
                
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {conversation.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                        msg.type === 'user' 
                          ? 'bg-primary text-primary-foreground rounded-br-md' 
                          : 'bg-muted text-foreground rounded-bl-md'
                      }`}>
                        <p className="font-body text-sm leading-relaxed">{msg.text}</p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-md">
                        <div className="flex gap-1">
                          {[0, 1, 2].map(i => (
                            <motion.div
                              key={i}
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                              className="w-2 h-2 rounded-full bg-muted-foreground/50"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSubmit} className="p-4 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask about wine preferences..."
                        className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon"
                      className="shrink-0 text-muted-foreground hover:text-primary"
                    >
                      <Mic className="w-5 h-5" />
                    </Button>
                    <Button 
                      type="submit" 
                      size="icon"
                      className="shrink-0 bg-primary hover:bg-primary/90"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Quick Action Pills */}
            <div className="px-6 py-4 border-t border-border/50 flex flex-wrap gap-2">
              {["Wine for dinner party", "Budget under $50", "Something bold", "Gift recommendation"].map((prompt) => (
                <motion.button
                  key={prompt}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setInputValue(prompt)}
                  className="px-4 py-2 bg-muted/50 hover:bg-muted border border-border/50 rounded-full font-body text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {prompt}
                </motion.button>
              ))}
            </div>
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