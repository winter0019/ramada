
import { GoogleGenAI, Type } from "@google/genai";

export const getRamadanTip = async (): Promise<{tip: string, dua: string}> => {
  try {
    // Initializing Gemini client as per the latest @google/genai guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Provide a helpful, concise tip for a successful fast during Ramadan, and a short Dua (supplication) in Arabic with English translation. Return as JSON.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tip: { type: Type.STRING, description: "A health or spiritual tip for fasting" },
            dua: { type: Type.STRING, description: "Arabic dua with English translation" }
          },
          required: ["tip", "dua"]
        }
      }
    });
    
    // response.text is a property, not a method
    if (response.text) {
        return JSON.parse(response.text);
    }
    return { tip: "Stay hydrated and read Quran daily.", dua: "Rabbana atina fid-dunya hasanatan... (Our Lord, give us in this world [that which is] good...)" };

  } catch (error) {
    console.error("Error fetching Ramadan tip:", error);
    return { tip: "Focus on your intentions today.", dua: "Allahumma inni laka sumtu... (O Allah, I fasted for You...)" };
  }
};
