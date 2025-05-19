 

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env?.VITE_GEMINI_API_KEY ) ;
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export const chatSession = model.startChat({
  generationConfig: {
    responseMimeType: 'application/json',
  },
});
// console. log(response. text());