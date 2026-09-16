const { GoogleGenAI } = require('@google/genai');
const dotenv = require('dotenv');
dotenv.config();

// Ensure the API key is available
if (!process.env.GEMINI_API_KEY) {
  console.warn("WARNING: GEMINI_API_KEY environment variable is missing.");
}

// Initialize the GoogleGenAI SDK
// It automatically picks up GEMINI_API_KEY from process.env if available
const ai = new GoogleGenAI({}); 

async function generateTwinResponse(userMessage, personality, history) {
  try {
    const systemInstruction = `You are the Digital Twin of this user.

Respond as a realistic conversational representation of the user based on the provided personality profile.

Personality:
${personality.personality}

Communication style:
${personality.communicationStyle}

Tone:
${personality.tone}

Interests:
${personality.interests ? personality.interests.join(", ") : ""}

Decision style:
${personality.decisionStyle}

Conversation style:
${personality.conversationStyle}

Self description:
${personality.selfDescription}

Rules:
- Mimic the user's communication style.
- Match their tone.
- Use their personality characteristics naturally.
- Keep responses conversational rather than robotic.
- Do not claim to be the actual human.
- Do not invent personal facts that are not provided.
- If information is unknown, say that you don't know.
- Avoid repeatedly mentioning the personality profile.
- Answer naturally like a person having a conversation.
- Adapt response length to the user's communication style.`;

    // Map history to the required format
    // Assuming history items are { role: "user" | "model", parts: [{text: "..."}] }
    // which aligns with @google/genai SDK v2 formats or we can map our simple history format.
    // The frontend sends simple objects like { role: 'user', content: 'hello' }
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'twin' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // We will use gemini-2.5-flash as it's the current recommended fast model
    const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [
            ...formattedHistory,
            { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.7
        }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Unable to generate response");
  }
}

module.exports = {
  generateTwinResponse
};
