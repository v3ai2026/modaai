import { GoogleGenAI } from '@google/genai';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface GeminiConfig {
  apiKey: string;
  model?: string;
  temperature?: number;
  systemInstruction?: string;
}

export class GeminiClient {
  private ai: GoogleGenAI;
  private config: GeminiConfig;

  constructor(config: GeminiConfig) {
    this.config = {
      model: 'gemini-3-pro-preview',
      temperature: 0.75,
      ...config,
    };
    this.ai = new GoogleGenAI({ apiKey: config.apiKey });
  }

  async generateContent(prompt: string, options?: { systemInstruction?: string }): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: this.config.model!,
        contents: prompt,
        config: {
          systemInstruction: options?.systemInstruction || this.config.systemInstruction,
          temperature: this.config.temperature,
        },
      });
      return response.text || '';
    } catch (error: any) {
      throw new Error(`Gemini API Error: ${error.message}`);
    }
  }

  async generateContentStream(
    prompt: string,
    onChunk: (text: string) => void,
    options?: { systemInstruction?: string }
  ): Promise<string> {
    try {
      const responseStream = await this.ai.models.generateContentStream({
        model: this.config.model!,
        contents: prompt,
        config: {
          systemInstruction: options?.systemInstruction || this.config.systemInstruction,
          temperature: this.config.temperature,
        },
      });

      let fullText = '';
      for await (const chunk of responseStream) {
        if (chunk.text) {
          fullText += chunk.text;
          onChunk(fullText);
        }
      }
      return fullText;
    } catch (error: any) {
      throw new Error(`Gemini Stream Error: ${error.message}`);
    }
  }

  async chat(history: Message[], userInput: string, options?: { systemInstruction?: string }): Promise<string> {
    try {
      const contents = history.map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));
      contents.push({ role: 'user', parts: [{ text: userInput }] });

      const response = await this.ai.models.generateContent({
        model: this.config.model!,
        contents: contents,
        config: {
          systemInstruction: options?.systemInstruction || this.config.systemInstruction,
          temperature: this.config.temperature,
        },
      });

      return response.text || '';
    } catch (error: any) {
      throw new Error(`Gemini Chat Error: ${error.message}`);
    }
  }

  async chatStream(
    history: Message[],
    userInput: string,
    onChunk: (text: string) => void,
    options?: { systemInstruction?: string }
  ): Promise<string> {
    try {
      const contents = history.map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));
      contents.push({ role: 'user', parts: [{ text: userInput }] });

      const responseStream = await this.ai.models.generateContentStream({
        model: this.config.model!,
        contents: contents,
        config: {
          systemInstruction: options?.systemInstruction || this.config.systemInstruction,
          temperature: this.config.temperature,
        },
      });

      let fullText = '';
      for await (const chunk of responseStream) {
        if (chunk.text) {
          fullText += chunk.text;
          onChunk(fullText);
        }
      }
      return fullText;
    } catch (error: any) {
      throw new Error(`Gemini Chat Stream Error: ${error.message}`);
    }
  }

  async searchGroundedContent(
    prompt: string,
    options?: { temperature?: number }
  ): Promise<{ text: string; sources: { title: string; uri: string }[] }> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          temperature: options?.temperature || 0.1,
        },
      });

      const text = response.text || '';
      const sources =
        response.candidates?.[0]?.groundingMetadata?.groundingChunks
          ?.filter((chunk) => chunk.web)
          .map((chunk) => ({
            title: chunk.web?.title || 'Source',
            uri: chunk.web?.uri || '',
          })) || [];

      return { text, sources };
    } catch (error: any) {
      throw new Error(`Gemini Search Error: ${error.message}`);
    }
  }
}
