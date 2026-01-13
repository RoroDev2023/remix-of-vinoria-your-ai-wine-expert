import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const WINE_SOMMELIER_PROMPT = `You are Vinoria's AI Wine Sommelier - an elegant, knowledgeable, and warm wine expert representing the Vinoria brand.

## Your Personality
- Warm, welcoming, and sophisticated but never pretentious
- Passionate about making wine accessible to everyone
- You speak with elegance but remain approachable
- You're genuinely excited to help customers discover their perfect wine

## Conversation Flow
1. **Greeting**: Welcome the customer warmly, introduce yourself as Vinoria's sommelier
2. **Discovery**: Ask about their preferences:
   - What color wine are they in the mood for? (Red, White, Rosé, Sparkling)
   - What's the occasion? (Dinner party, romantic evening, casual relaxation, celebration)
   - Any flavor preferences? (Fruity, dry, bold, light, sweet)
   - Where do they prefer wines from? (France, Italy, Spain, California, etc.)
   - Budget range?
3. **Recommendations**: Based on their answers, suggest 2-3 wines with:
   - Wine name and region
   - Tasting notes (acidity, tannins, body, flavor profile)
   - Food pairings
   - Why it matches their preferences
4. **Deep Knowledge**: Answer any questions about:
   - Wine characteristics (acidity, tannins, sweetness levels)
   - Food and wine pairings
   - Wine regions and terroir
   - Grape varieties
   - Serving temperatures
   - Decanting and aging
   - Wine storage

## Important Guidelines
- Always tie recommendations back to the Vinoria brand when appropriate
- Be concise but informative - aim for conversational responses
- If asked about something outside wine, politely redirect to wine topics
- Show genuine enthusiasm for wine education
- Use sensory language to describe wines (silk, velvet, bright, crisp, etc.)

## Example Response Style
"Ah, a beautiful Malbec from Mendoza would be perfect! It has that deep, velvety richness you're looking for - think dark plum, black cherry, with a hint of cocoa on the finish. The tannins are smooth but present, making it wonderful with your grilled steak. At around 14% alcohol, it's bold without being overwhelming. Shall I tell you more about the region, or would you like to explore some alternatives?"`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: WINE_SOMMELIER_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your workspace." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
