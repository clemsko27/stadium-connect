import { GoogleGenAI } from "@google/genai";
import { MOCK_STADIUM, MENU_ITEMS } from "../mockData";

let ai: GoogleGenAI | null = null;
if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export const generateChatResponse = async (userMessage: string): Promise<string> => {
  if (!ai) return "AI Service not initialized. Please check API Key.";

  const systemPrompt = `Tu es l'assistant intelligent du ${MOCK_STADIUM.name}.

RÈGLES DE RÉPONSE :
1. Si l'utilisateur veut COMMANDER quelque chose, réponds UNIQUEMENT avec un JSON :
   {"intent":"order","item":"nom exact du produit","qty":1}

2. Si l'utilisateur veut NAVIGUER quelque chose, réponds UNIQUEMENT avec un JSON :
   {"intent":"navigate","target":"toilet"|"food"|"gate"|"parking"}

3. Sinon, réponds en texte naturel (maximum 25 mots), de façon enthousiaste et utile.

CONTEXTE TEMPS RÉEL :
- Stade : ${MOCK_STADIUM.name}
- Météo : ${MOCK_STADIUM.weather.temp}°C, ${MOCK_STADIUM.weather.condition}, UV ${MOCK_STADIUM.weather.uv}
- Menu disponible : ${MENU_ITEMS.map(i => `${i.name} (${i.price}€)`).join(', ')}
- POIs : ${MOCK_STADIUM.pois.map(p => `${p.name} - attente ${Math.round(p.waitTime/60)}min`).join(', ')}

EXEMPLES :
User: "je veux un burger"
Assistant: {"intent":"order","item":"Signature Burger","qty":1}

User: "où sont les toilettes ?"
Assistant: {"intent":"navigate","target":"toilet"}

User: "c'est quoi le score ?"
Assistant: Consulte l'onglet Stats pour le score en direct ! 📊

IMPORTANT : Si commande, trouve le nom EXACT du menu. Si navigation, utilise uniquement : toilet, food, gate, parking.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: userMessage }] }],
      config: {
        systemInstruction: systemPrompt,
      },
    });
    
    return response.text || "I'm having trouble connecting to the stadium network.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Offline mode. Please try again later.";
  }
};