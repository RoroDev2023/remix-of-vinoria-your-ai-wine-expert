import { useState, useCallback } from "react";

const STT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-stt`;

interface UseSpeechToTextReturn {
  isTranscribing: boolean;
  transcribe: (audioBase64: string) => Promise<string>;
  error: string | null;
}

export const useSpeechToText = (): UseSpeechToTextReturn => {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transcribe = useCallback(async (audioBase64: string): Promise<string> => {
    try {
      setError(null);
      setIsTranscribing(true);

      if (!STT_URL || !import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) {
        throw new Error("Speech-to-text is not configured");
      }

      const response = await fetch(STT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({ audio: audioBase64 }),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type") || "";
        let details = `STT request failed (${response.status})`;
        if (contentType.includes("application/json")) {
          const errorData = await response.json();
          details = errorData.error || details;
        } else {
          const text = await response.text();
          if (text) details = `${details}: ${text}`;
        }
        throw new Error(details);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      return data.text || "";
    } catch (err) {
      console.error("STT error:", err);
      setError(err instanceof Error ? err.message : "Failed to transcribe");
      return "";
    } finally {
      setIsTranscribing(false);
    }
  }, []);

  return {
    isTranscribing,
    transcribe,
    error,
  };
};
