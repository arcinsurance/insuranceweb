import { GoogleGenAI, Chat } from "@google/genai";

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. AI Assistant will not function.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "disabled" });

const systemInstruction = `You are a friendly and professional AI assistant for "Insurance Multiservices". 
Your purpose is to answer user questions about the services offered: Health Insurance, Life Insurance, Medicare, Dental Insurance, Vision Insurance, Property and Casualty Insurance, and Travel Services.
Keep your answers concise, clear, and helpful. 
Do not provide specific quotes, legal advice, or financial advice.
When appropriate, gently encourage the user to contact the agency directly for personalized information by calling or filling out a contact form.
Do not make up information about services not listed.
Maintain a positive and supportive tone.`;

let chat: Chat | null = null;

function getChatSession(): Chat {
  if (!chat) {
    chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
      },
    });
  }
  return chat;
}

export async function* getAIResponseStream(message: string) {
  if (!process.env.API_KEY) {
    // This is a generator function, so we yield a mock response.
    yield { text: "The AI assistant is currently unavailable. Please check the API key configuration." };
    return;
  }
  try {
    const chatSession = getChatSession();
    const result = await chatSession.sendMessageStream({ message });
    yield* result;
  } catch (error) {
    console.error("Error getting AI response:", error);
    yield { text: "Sorry, I encountered an error. Please try again later." };
  }
}