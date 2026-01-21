import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, VolumeX, Wine, Send, Loader2, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { useSommelierChat } from "@/hooks/useSommelierChat";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useSpeechToText } from "@/hooks/useSpeechToText";
import Hologram3D, { type WineType } from "./Hologram3D";

const VoiceSommelier = () => {
  const { toast } = useToast();
  const [inputText, setInputText] = useState("");
  const [isVoiceMode, setIsVoiceMode] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [wineType, setWineType] = useState<WineType>("red");
  const [isListeningHint, setIsListeningHint] = useState(false);
  const listeningTimeoutRef = useRef<number | null>(null);

  const { isRecording, startRecording, stopRecording, error: recorderError } = useVoiceRecorder();
  const { messages, isLoading, sendMessage, clearMessages } = useSommelierChat();
  const { isSpeaking, speak, stop: stopSpeaking, error: ttsError } = useTextToSpeech();
  const { isTranscribing, transcribe, error: sttError } = useSpeechToText();

  const isListeningState = isRecording || isTranscribing || isListeningHint;

  const statusLabel = isListeningState
    ? "Listening"
    : isLoading
    ? "Thinking"
    : isSpeaking
    ? "Speaking"
    : "Ready";

  const statusTone = isListeningState
    ? "text-tech"
    : isLoading
    ? "text-gold"
    : isSpeaking
    ? "text-primary"
    : "text-muted-foreground";

  const statusDot = isListeningState
    ? "bg-tech"
    : isLoading
    ? "bg-gold"
    : isSpeaking
    ? "bg-primary"
    : "bg-muted-foreground/60";

  // Show errors via toast
  useEffect(() => {
    const error = recorderError || ttsError || sttError;
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error,
      });
    }
  }, [recorderError, ttsError, sttError, toast]);

  useEffect(() => {
    return () => {
      if (listeningTimeoutRef.current) {
        window.clearTimeout(listeningTimeoutRef.current);
      }
    };
  }, []);

  const handleStartConversation = useCallback(async () => {
    setHasStarted(true);
    clearMessages();

    setIsListeningHint(true);
    if (listeningTimeoutRef.current) {
      window.clearTimeout(listeningTimeoutRef.current);
    }
    listeningTimeoutRef.current = window.setTimeout(() => {
      setIsListeningHint(false);
    }, 1600);
    
    // Send initial greeting request
    try {
      const response = await sendMessage("Hello, I'm looking for wine recommendations.");
      if (isVoiceMode && response) {
        await speak(response);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to start conversation. Please try again.",
      });
    }
  }, [sendMessage, speak, isVoiceMode, clearMessages, toast]);

  const handleVoiceInput = useCallback(async () => {
    if (isRecording) {
      const audioBase64 = await stopRecording();
      if (audioBase64) {
        const text = await transcribe(audioBase64);
        if (text) {
          try {
            const response = await sendMessage(text);
            if (isVoiceMode && response) {
              await speak(response);
            }
          } catch (error) {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Failed to get response. Please try again.",
            });
          }
        }
      }
    } else {
      await startRecording();
    }
  }, [isRecording, stopRecording, startRecording, transcribe, sendMessage, speak, isVoiceMode, toast]);

  const handleTextSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const text = inputText;
    setInputText("");

    try {
      const response = await sendMessage(text);
      if (isVoiceMode && response) {
        await speak(response);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get response. Please try again.",
      });
    }
  }, [inputText, isLoading, sendMessage, speak, isVoiceMode, toast]);

  const toggleVoiceMode = useCallback(() => {
    if (isSpeaking) {
      stopSpeaking();
    }
    setIsVoiceMode((prev) => !prev);
  }, [isSpeaking, stopSpeaking]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-24 pb-16">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 tech-grid opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.12)_0%,_transparent_60%)]" />
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Hologram Simulator</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Meet the
            <span className="text-primary block">Hologram Sommelier</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Speak or type to guide the hologram. The simulator listens, responds, and adapts
            in real-time to showcase how Vinoria flows in-store.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-stretch">
          {/* Hologram Display */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 backdrop-blur-xl shadow-card min-h-[360px] md:min-h-[440px] lg:min-h-[560px] lg:max-h-[75vh]"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsl(var(--tech-accent)/0.18)_0%,_transparent_55%)]" />
              <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-tech/20 blur-3xl" />
              <div className="absolute right-10 bottom-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            </div>

            <div className="relative flex h-full items-center justify-center px-6 py-10">
              <div className="absolute left-6 top-6 flex flex-wrap gap-2">
                {[
                  { id: "red", label: "Red" },
                  { id: "white", label: "White" },
                  { id: "rose", label: "Rose" },
                  { id: "champagne", label: "Champagne" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setWineType(option.id as WineType)}
                    className={`rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] transition ${
                      wineType === option.id
                        ? "border-primary/50 bg-primary/10 text-primary"
                        : "border-border/60 bg-background/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full max-w-[520px] aspect-[4/5] md:aspect-[5/6] lg:aspect-[3/4]">
                <Hologram3D
                  isSpeaking={isSpeaking}
                  isListening={isListeningState}
                  isThinking={isLoading && !isListeningHint}
                  wineType={wineType}
                />
              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <div className={`flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 backdrop-blur-md ${statusTone}`}>
                  <span className={`h-2 w-2 rounded-full ${statusDot}`} />
                  <span className="text-xs font-medium">{statusLabel}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card/50 backdrop-blur-lg border border-border/60 rounded-3xl flex flex-col shadow-card min-h-[360px] md:min-h-[440px] lg:min-h-[560px] lg:max-h-[75vh]"
          >
            {!hasStarted ? (
              <div className="flex h-full flex-col items-center justify-center px-8 py-10 text-center">
                <div className="w-24 h-24 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Wine className="w-12 h-12 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
                  Start the Hologram
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Launch a live simulation, speak or type your preferences, and watch the hologram adapt in real time.
                </p>
                <Button
                  onClick={handleStartConversation}
                  variant="gold"
                  size="lg"
                  className="text-base px-8"
                >
                  <Mic className="w-5 h-5 mr-2" />
                  Start Conversation
                </Button>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div className="flex-1 min-h-0 overflow-y-auto space-y-4 px-6 py-6 pr-2">
                  <AnimatePresence mode="popLayout">
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted/50 text-foreground"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-muted/50 rounded-2xl px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-primary" />
                          <span className="text-sm text-muted-foreground">Thinking...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Input Area */}
                <div className="border-t border-border/60 px-6 py-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleVoiceMode}
                      className={isVoiceMode ? "text-primary" : "text-muted-foreground"}
                    >
                      {isVoiceMode ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      Voice responses {isVoiceMode ? "on" : "off"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button
                      onClick={handleVoiceInput}
                      disabled={isLoading || isTranscribing || isSpeaking}
                      variant={isRecording ? "destructive" : "outline"}
                      size="icon"
                      className="shrink-0"
                    >
                      {isRecording ? (
                        <MicOff className="w-5 h-5" />
                      ) : (
                        <Mic className="w-5 h-5" />
                      )}
                    </Button>

                    <form onSubmit={handleTextSubmit} className="flex-1 flex gap-2">
                      <Input
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type your message..."
                        disabled={isLoading || isRecording}
                        className="flex-1"
                      />
                      <Button
                        type="submit"
                        disabled={!inputText.trim() || isLoading}
                        variant="gold"
                        size="icon"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>

        {/* Quick Prompts */}
        {hasStarted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-muted-foreground mb-3">Try asking:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                "What wine pairs with steak?",
                "Recommend a light white wine",
                "Tell me about Pinot Noir",
                "What's a good wine for beginners?",
              ].map((prompt) => (
                <Button
                  key={prompt}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setInputText(prompt);
                  }}
                  className="text-xs"
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default VoiceSommelier;
