import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Wine, MessageCircle, Sparkles } from "lucide-react";

interface InteractionStep {
  phase: "approach" | "ask" | "respond" | "highlight";
  customerPosition: number; // 0-100, distance from kiosk
  message?: string;
  response?: string;
  highlightedBottle?: number;
}

const interactionSequence: InteractionStep[] = [
  { phase: "approach", customerPosition: 80 },
  { phase: "approach", customerPosition: 40 },
  { phase: "approach", customerPosition: 15 },
  { phase: "ask", customerPosition: 15, message: "I'm looking for a bold red for dinner tonight" },
  { phase: "respond", customerPosition: 15, response: "I recommend the 2019 Château Margaux – rich, full-bodied with notes of blackcurrant..." },
  { phase: "highlight", customerPosition: 15, highlightedBottle: 2 },
  { phase: "highlight", customerPosition: 15, highlightedBottle: 2 },
];

const STEP_DURATION = 2500; // ms per step

const KioskMockup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = (prev + 1) % interactionSequence.length;
        return next;
      });
    }, STEP_DURATION);

    return () => clearInterval(interval);
  }, []);

  const step = interactionSequence[currentStep];

  return (
    <div className="relative w-full h-full min-h-[500px] lg:min-h-[600px] overflow-hidden rounded-2xl bg-gradient-to-b from-muted/30 to-muted/60">
      {/* Background - Store environment */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/50 to-background/30" />
      
      {/* Ambient lighting effect */}
      <motion.div
        animate={{
          opacity: step.phase === "highlight" ? [0.3, 0.5, 0.3] : 0.2,
        }}
        transition={{ duration: 1, repeat: Infinity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-primary/20 blur-[60px] rounded-full"
      />

      {/* Wine Shelf - Background */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[85%] max-w-md">
        <div className="relative bg-card/80 backdrop-blur-sm border border-border/60 rounded-lg p-4 shadow-lg">
          {/* Shelf label */}
          <div className="absolute -top-3 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-body rounded-full">
            Curated Selection
          </div>
          
          {/* Wine bottles on shelf */}
          <div className="flex justify-center gap-3 pt-2">
            {[1, 2, 3, 4, 5].map((bottle) => (
              <motion.div
                key={bottle}
                animate={{
                  scale: step.highlightedBottle === bottle ? 1.15 : 1,
                  y: step.highlightedBottle === bottle ? -8 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative"
              >
                {/* Highlight glow */}
                <AnimatePresence>
                  {step.highlightedBottle === bottle && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute -inset-2 bg-primary/30 rounded-lg blur-md"
                    />
                  )}
                </AnimatePresence>
                
                {/* Bottle */}
                <div 
                  className={`relative w-8 h-20 md:w-10 md:h-24 rounded-t-full bg-gradient-to-b ${
                    bottle === 2 ? "from-wine-deep to-primary" : 
                    bottle === 4 ? "from-gold to-gold-light" :
                    "from-primary to-wine-deep"
                  } shadow-md transition-all duration-300`}
                  style={{
                    clipPath: "polygon(20% 0, 80% 0, 90% 15%, 90% 100%, 10% 100%, 10% 15%)"
                  }}
                >
                  {/* Label */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[70%] h-8 bg-cream/90 rounded-sm" />
                </div>
                
                {/* Selection indicator */}
                <AnimatePresence>
                  {step.highlightedBottle === bottle && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute -bottom-6 left-1/2 -translate-x-1/2"
                    >
                      <Sparkles className="w-4 h-4 text-gold" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Kiosk/Tablet */}
      <div className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 w-[55%] max-w-[200px]">
        {/* Tablet frame */}
        <div className="relative bg-foreground rounded-xl p-2 shadow-2xl">
          {/* Screen */}
          <div className="relative bg-background rounded-lg overflow-hidden aspect-[3/4]">
            {/* Screen content */}
            <div className="absolute inset-0 flex flex-col">
              {/* Header */}
              <div className="bg-primary/10 px-3 py-2 flex items-center gap-2">
                <Wine className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-display font-semibold text-foreground">VINORIA</span>
              </div>
              
              {/* Hologram area */}
              <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-muted/30 to-muted/50 relative overflow-hidden">
                {/* AI visualization */}
                <motion.div
                  animate={{
                    scale: step.phase === "respond" ? [1, 1.1, 1] : 1,
                    opacity: step.customerPosition <= 40 ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.8, repeat: step.phase === "respond" ? Infinity : 0 }}
                  className="relative w-16 h-16 md:w-20 md:h-20"
                >
                  {/* Concentric circles */}
                  {[1, 2, 3].map((ring) => (
                    <motion.div
                      key={ring}
                      animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
                      transition={{ duration: 8 + ring * 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-2 border-primary/30 rounded-full"
                      style={{ 
                        inset: `${ring * 6}px`,
                        borderStyle: ring === 2 ? "dashed" : "solid"
                      }}
                    />
                  ))}
                  {/* Core */}
                  <motion.div
                    animate={{
                      boxShadow: step.phase === "respond" 
                        ? ["0 0 20px hsl(var(--primary)/0.5)", "0 0 40px hsl(var(--primary)/0.8)", "0 0 20px hsl(var(--primary)/0.5)"]
                        : "0 0 20px hsl(var(--primary)/0.3)"
                    }}
                    transition={{ duration: 0.5, repeat: step.phase === "respond" ? Infinity : 0 }}
                    className="absolute inset-4 md:inset-5 bg-gradient-to-br from-primary to-wine-deep rounded-full"
                  />
                </motion.div>
              </div>

              {/* Message display */}
              <div className="h-16 md:h-20 bg-card/80 border-t border-border/50 p-2 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {step.message && (
                    <motion.div
                      key="user-msg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-start gap-1.5"
                    >
                      <MessageCircle className="w-3 h-3 text-muted-foreground shrink-0 mt-0.5" />
                      <p className="text-[8px] md:text-[9px] font-body text-foreground leading-tight line-clamp-3">
                        {step.message}
                      </p>
                    </motion.div>
                  )}
                  {step.response && (
                    <motion.div
                      key="ai-msg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-start gap-1.5"
                    >
                      <Wine className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                      <p className="text-[8px] md:text-[9px] font-body text-foreground leading-tight line-clamp-3">
                        {step.response}
                      </p>
                    </motion.div>
                  )}
                  {step.highlightedBottle && (
                    <motion.div
                      key="highlight-msg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <p className="text-[8px] md:text-[9px] font-body text-primary font-medium">
                        ✓ Selection highlighted on shelf
                      </p>
                    </motion.div>
                  )}
                  {!step.message && !step.response && !step.highlightedBottle && (
                    <motion.p
                      key="welcome"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[8px] md:text-[9px] font-body text-muted-foreground text-center"
                    >
                      Step closer to begin...
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stand */}
        <div className="mx-auto w-8 h-4 bg-foreground rounded-b-lg" />
        <div className="mx-auto w-16 h-2 bg-foreground/80 rounded-full" />
      </div>

      {/* Customer silhouette */}
      <motion.div
        animate={{
          x: "-50%",
          bottom: `${Math.max(8, 8 + (step.customerPosition / 100) * 15)}%`,
          scale: 1 - (step.customerPosition / 100) * 0.3,
          opacity: 0.9,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="absolute left-1/2 -translate-x-1/2"
      >
        {/* Person shape */}
        <div className="relative">
          {/* Head */}
          <motion.div 
            animate={{ y: step.phase === "ask" ? [0, -2, 0] : 0 }}
            transition={{ duration: 0.5 }}
            className="w-8 h-8 md:w-10 md:h-10 bg-foreground/20 rounded-full mx-auto"
          />
          {/* Body */}
          <div className="w-12 h-16 md:w-14 md:h-20 bg-foreground/15 rounded-t-xl mt-1 mx-auto relative">
            {/* Arm raised when asking */}
            <AnimatePresence>
              {(step.phase === "ask" || step.phase === "respond") && (
                <motion.div
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: -30, opacity: 1 }}
                  exit={{ rotate: 0, opacity: 0 }}
                  className="absolute -right-3 top-2 w-2 h-8 bg-foreground/15 rounded-full origin-bottom"
                />
              )}
            </AnimatePresence>
          </div>
          
          {/* Speech bubble when asking */}
          <AnimatePresence>
            {step.phase === "ask" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
              >
                <div className="bg-card border border-border rounded-lg px-2 py-1 shadow-md">
                  <p className="text-[8px] font-body text-foreground">💬</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Progress indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {["approach", "ask", "respond", "highlight"].map((phase, i) => (
          <motion.div
            key={phase}
            animate={{
              scale: (step.phase === phase || 
                (phase === "approach" && step.customerPosition > 15)) ? 1.2 : 1,
              backgroundColor: (step.phase === phase || 
                (phase === "approach" && step.customerPosition > 15)) 
                ? "hsl(var(--primary))" 
                : "hsl(var(--muted-foreground) / 0.3)"
            }}
            className="w-2 h-2 rounded-full"
          />
        ))}
      </div>

      {/* Phase label */}
      <motion.div
        key={step.phase}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 right-4 px-3 py-1.5 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full"
      >
        <span className="text-xs font-body text-muted-foreground capitalize">
          {step.phase === "approach" ? "Customer Approaching" : 
           step.phase === "ask" ? "Asking Question" :
           step.phase === "respond" ? "AI Responding" :
           "Bottle Highlighted"}
        </span>
      </motion.div>
    </div>
  );
};

export default KioskMockup;
