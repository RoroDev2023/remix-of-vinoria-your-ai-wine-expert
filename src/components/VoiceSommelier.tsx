import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, VolumeX, Wine, Send, Loader2, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import { useSommelierChat } from "@/hooks/useSommelierChat";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useSpeechToText } from "@/hooks/useSpeechToText";
import Hologram3D from "./Hologram3D";

const VoiceSommelier = () => {
  const { toast } = useToast();
  const [inputText, setInputText] = useState("");
  const [isVoiceMode, setIsVoiceMode] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  const { isRecording, startRecording, stopRecording, error: recorderError } = useVoiceRecorder();
  const { messages, isLoading, sendMessage, clearMessages } = useSommelierChat();
  const { isSpeaking, speak, stop: stopSpeaking, error: ttsError } = useTextToSpeech();
  const { isTranscribing, transcribe, error: sttError } = useSpeechToText();

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

  const handleStartConversation = useCallback(async () => {
    setHasStarted(true);
    clearMessages();
    
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
    <section className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/3 via-transparent to-transparent" />
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
            <span className="text-sm text-primary font-medium">AI Wine Sommelier</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Your Personal
            <span className="text-primary block">Wine Expert</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Speak or type to discover your perfect wine. Our AI sommelier will guide you through
            flavors, pairings, and recommendations tailored just for you.
          </p>
        </motion.div>

        {!hasStarted ? (
          /* Start Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto text-center"
          >
            <div className="bg-card/50 backdrop-blur-lg border border-border rounded-3xl p-8 md:p-12">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Wine className="w-12 h-12 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                Ready to Find Your Wine?
              </h2>
              <p className="text-muted-foreground mb-8">
                Click below to start a conversation with Vinoria's AI sommelier. 
                Share your preferences and discover wines you'll love.
              </p>
              <Button
                onClick={handleStartConversation}
                variant="gold"
                size="lg"
                className="text-lg px-8"
              >
                <Mic className="w-5 h-5 mr-2" />
                Start Conversation
              </Button>
            </div>
          </motion.div>
        ) : (
          /* Conversation Interface */
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Hologram Display */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative h-[400px] lg:h-[500px] flex items-center justify-center"
            >
              <Hologram3D isSpeaking={isSpeaking} />
              
              {/* Voice indicator */}
              <AnimatePresence>
                {(isRecording || isTranscribing || isSpeaking) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border"
                  >
                    <div className="flex items-center gap-2">
                      {isRecording && (
                        <>
                          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          <span className="text-sm text-muted-foreground">Listening...</span>
                        </>
                      )}
                      {isTranscribing && (
                        <>
                          <Loader2 className="w-4 h-4 text-primary animate-spin" />
                          <span className="text-sm text-muted-foreground">Processing...</span>
                        </>
                      )}
                      {isSpeaking && (
                        <>
                          <Volume2 className="w-4 h-4 text-primary animate-pulse" />
                          <span className="text-sm text-muted-foreground">Speaking...</span>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Chat Interface */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card/50 backdrop-blur-lg border border-border rounded-3xl p-6 flex flex-col h-[500px]"
            >
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
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
              <div className="border-t border-border pt-4">
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

                <div className="flex gap-2">
                  {/* Voice Button */}
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

                  {/* Text Input */}
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
            </motion.div>
          </div>
        )}

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
