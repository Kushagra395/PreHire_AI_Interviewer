import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI( import.meta.env.VITE_GEMINI_API_KEY);

// Get the generative model
const model = genAI.getGenerativeModel({ 
  model: 'gemini-1.5-pro-latest',
});

// Start a chat session
export const chatSession = model.startChat({
  generationConfig: {
    responseMimeType: 'application/json',
  },
});