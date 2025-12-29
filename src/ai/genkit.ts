import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// Simple API key rotation
const apiKeys = (process.env.GEMINI_API_KEYS || '').split(',').filter(k => k.trim());
const apiKey = apiKeys.length > 0 ? apiKeys[Math.floor(Math.random() * apiKeys.length)] : undefined;

export const ai = genkit({
  plugins: [googleAI({ apiKey })],
  model: 'googleai/gemini-2.5-flash',
});
