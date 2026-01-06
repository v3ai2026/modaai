import { AIMessage, GenerateConfig, GeminiResponse, StreamChunk } from './types';

/**
 * Pure Fetch API implementation of Gemini client
 * Zero external dependencies
 */
export class GeminiClient {
  private apiKey: string;
  private baseURL = 'https://generativelanguage.googleapis.com/v1beta';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Generate content with streaming
   */
  async *generateStream(
    model: string,
    messages: AIMessage[],
    config?: GenerateConfig
  ): AsyncGenerator<StreamChunk> {
    const url = `${this.baseURL}/models/${model}:streamGenerateContent?key=${this.apiKey}&alt=sse`;
    
    const contents = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const requestBody: any = {
      contents,
      generationConfig: {
        temperature: config?.temperature ?? 0.75,
        maxOutputTokens: config?.maxTokens,
        topP: config?.topP,
        topK: config?.topK,
        stopSequences: config?.stopSequences,
      },
    };

    if (config?.systemInstruction) {
      requestBody.systemInstruction = {
        parts: [{ text: config.systemInstruction }]
      };
    }

    if (config?.thinkingConfig) {
      requestBody.generationConfig.thinkingConfig = config.thinkingConfig;
    }

    if (config?.tools) {
      requestBody.tools = config.tools;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data.trim() === '[DONE]') {
            yield { text: '', done: true };
            return;
          }
          
          try {
            const json = JSON.parse(data);
            const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
            if (text) {
              yield { text, done: false };
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    }

    yield { text: '', done: true };
  }

  /**
   * Generate content without streaming
   */
  async generate(
    model: string,
    messages: AIMessage[],
    config?: GenerateConfig
  ): Promise<string> {
    const url = `${this.baseURL}/models/${model}:generateContent?key=${this.apiKey}`;
    
    const contents = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const requestBody: any = {
      contents,
      generationConfig: {
        temperature: config?.temperature ?? 0.75,
        maxOutputTokens: config?.maxTokens,
        topP: config?.topP,
        topK: config?.topK,
        stopSequences: config?.stopSequences,
      },
    };

    if (config?.systemInstruction) {
      requestBody.systemInstruction = {
        parts: [{ text: config.systemInstruction }]
      };
    }

    if (config?.thinkingConfig) {
      requestBody.generationConfig.thinkingConfig = config.thinkingConfig;
    }

    if (config?.tools) {
      requestBody.tools = config.tools;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const json: GeminiResponse = await response.json();
    return json.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }

  /**
   * Embed text into vector representation
   */
  async embedText(text: string, model = 'text-embedding-004'): Promise<number[]> {
    const url = `${this.baseURL}/models/${model}:embedContent?key=${this.apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: {
          parts: [{ text }]
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const json = await response.json();
    return json.embedding?.values || [];
  }
}
