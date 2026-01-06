export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface AIClientConfig {
  apiKey: string;
  model?: string;
  temperature?: number;
  systemInstruction?: string;
}

export interface SearchResult {
  text: string;
  sources: Array<{ title: string; uri: string }>;
}
