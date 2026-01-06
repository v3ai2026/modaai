export interface AIMessage {
  role: 'user' | 'assistant' | 'system' | 'model';
  content: string;
}

export interface GenerateOptions {
  temperature?: number;
  maxTokens?: number;
  stopSequences?: string[];
  topP?: number;
  topK?: number;
}

export interface StreamChunk {
  text: string;
  done: boolean;
}

export interface ThinkingConfig {
  thinkingBudget?: number;
}

export interface GenerateConfig extends GenerateOptions {
  systemInstruction?: string;
  thinkingConfig?: ThinkingConfig;
  tools?: any[];
  responseModalities?: string[];
  outputAudioTranscription?: any;
  inputAudioTranscription?: any;
  speechConfig?: any;
}

export interface GeminiResponse {
  text?: string;
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
    groundingMetadata?: {
      groundingChunks?: Array<{
        web?: {
          title?: string;
          uri?: string;
        };
      }>;
    };
  }>;
}

export interface SearchSource {
  title: string;
  uri: string;
}

export interface IntelligenceResult {
  text: string;
  sources: SearchSource[];
}
