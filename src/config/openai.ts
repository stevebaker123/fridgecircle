export const OPENAI_CONFIG = {
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  model: 'gpt-4-turbo-preview',
  maxTokens: 500,
  temperature: 0.7
};