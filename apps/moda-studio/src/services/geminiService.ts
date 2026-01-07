
import { GoogleGenAI, Modality, Type, GenerateContentResponse, LiveServerMessage } from "@google/genai";
import { Message, MemoryNode, LLMProvider } from "../types";
import { vaultService } from "./persistenceService";

const SYSTEM_INSTRUCTION = `你现在是 moda AI Studio 的核心大脑 (Moda OS)。
你的任务是担任高级前端架构师，协助用户进行全栈开发、UI 设计和内容创作。
回复风格：专业、冷峻、充满技术深度。
所有输出的代码必须符合：ES6 模块、Tailwind CSS、响应式设计。`;

/**
 * 统一 AI 响应分发中心
 */
export const getAIResponseStream = async (
  provider: LLMProvider,
  history: Message[], 
  userInput: string,
  memories: MemoryNode[],
  onChunk: (text: string) => void
): Promise<string> => {
  if (provider === 'GEMINI') {
    return getGeminiResponseStream(history, userInput, memories, onChunk);
  } else {
    return getOpenAIResponseStream(history, userInput, memories, onChunk);
  }
};

/**
 * OpenAI 流式响应实现
 */
const getOpenAIResponseStream = async (
  history: Message[], 
  userInput: string,
  memories: MemoryNode[],
  onChunk: (text: string) => void
): Promise<string> => {
  // 优先从本地 Vault 读取，如果没有则回退到环境变量
  const apiKey = vaultService.getKey('OPENAI') || process.env.OPENAI_API_KEY || process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY_MISSING");

  const memoryContext = memories.length > 0 
    ? `\n[Context Memory]\n${memories.map(m => `[${m.category}] ${m.title}: ${m.content}`).join('\n')}`
    : '';

  const messages = [
    { role: 'system', content: SYSTEM_INSTRUCTION + memoryContext },
    ...history.map(msg => ({ role: msg.role === 'assistant' ? 'assistant' : 'user', content: msg.content })),
    { role: 'user', content: userInput }
  ];

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
      stream: true,
      temperature: 0.7
    })
  });

  if (!response.ok) throw new Error(`OpenAI API Error: ${response.statusText}`);

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();
  let fullText = "";

  while (true) {
    const { done, value } = await reader!.read();
    if (done) break;
    
    const chunk = decoder.decode(value);
    const lines = chunk.split('\n').filter(line => line.trim().startsWith('data: '));
    
    for (const line of lines) {
      const jsonStr = line.replace(/^data: /, '');
      if (jsonStr === '[DONE]') continue;
      try {
        const json = JSON.parse(jsonStr);
        const content = json.choices[0]?.delta?.content || "";
        fullText += content;
        onChunk(fullText);
      } catch (e) {
        console.warn("Error parsing OpenAI chunk", e);
      }
    }
  }

  return fullText;
};

/**
 * Gemini 3 Flash 流式响应实现
 */
const getGeminiResponseStream = async (
  history: Message[], 
  userInput: string,
  memories: MemoryNode[],
  onChunk: (text: string) => void
): Promise<string> => {
  // 优先尝试手动覆写的 Gemini Key
  const apiKey = vaultService.getKey('GEMINI_OVERRIDE') || process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY_MISSING");

  const ai = new GoogleGenAI({ apiKey });
  const memoryContext = memories.length > 0 
    ? `\n[Context Memory]\n${memories.map(m => `[${m.category}] ${m.title}: ${m.content}`).join('\n')}`
    : '';

  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));
  contents.push({ role: 'user', parts: [{ text: userInput }] });

  const responseStream = await ai.models.generateContentStream({
    model: 'gemini-3-flash-preview',
    contents: contents,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION + memoryContext,
      temperature: 0.7,
      topK: 64,
      topP: 0.95,
    },
  });

  let fullText = "";
  for await (const chunk of responseStream) {
    const text = chunk.text;
    if (text) {
      fullText += text;
      onChunk(fullText);
    }
  }
  return fullText;
};

export const fetchIntelligence = async (topic: string): Promise<{ text: string, sources: any[] }> => {
  const apiKey = vaultService.getKey('GEMINI_OVERRIDE') || process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY_MISSING");
  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `请对以下主题进行实时深度情报分析：${topic}`,
    config: { tools: [{ googleSearch: {} }] },
  });
  return { text: response.text || "", sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || [] };
};

export const generateImage = async (prompt: string): Promise<string> => {
  const apiKey = vaultService.getKey('GEMINI_OVERRIDE') || process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY_MISSING");
  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: prompt }] },
    config: { imageConfig: { aspectRatio: "1:1" } }
  });
  const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
  if (part?.inlineData) return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
  throw new Error("IMAGE_SYNTH_FAILED");
};

export const generateVideo = async (prompt: string, onProgress: (msg: string) => void): Promise<string> => {
  const apiKey = vaultService.getKey('GEMINI_OVERRIDE') || process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY_MISSING");
  const ai = new GoogleGenAI({ apiKey });
  onProgress("任务已提交至渲染集群...");
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
  });
  while (!operation.done) {
    onProgress(`渲染中... (当前阶段: ${operation.metadata?.state || 'PROCESS'})`);
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }
  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) throw new Error("VIDEO_FAILED");
  const videoResponse = await fetch(`${downloadLink}&key=${apiKey}`);
  const blob = await videoResponse.blob();
  return URL.createObjectURL(blob);
};

export const connectLiveConsultant = async (options: {
  onAudioData: (base64: string) => void;
  onOutputTranscription?: (text: string) => void;
  onInputTranscription?: (text: string) => void;
  onTurnComplete?: () => void;
  onInterrupted?: () => void;
}): Promise<any> => {
  const apiKey = vaultService.getKey('GEMINI_OVERRIDE') || process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY_MISSING");
  const ai = new GoogleGenAI({ apiKey });
  return ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-12-2025',
    callbacks: {
      onmessage: async (message: LiveServerMessage) => {
        const audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
        if (audio) options.onAudioData(audio);
        if (message.serverContent?.outputTranscription) options.onOutputTranscription?.(message.serverContent.outputTranscription.text);
        if (message.serverContent?.inputTranscription) options.onInputTranscription?.(message.serverContent.inputTranscription.text);
        if (message.serverContent?.interrupted) options.onInterrupted?.();
        if (message.serverContent?.turnComplete) options.onTurnComplete?.();
      },
      onopen: () => console.debug('Live session opened'),
      onerror: (e) => console.error('Live session error:', e),
      onclose: () => console.debug('Live session closed'),
    },
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } },
      systemInstruction: '你现在是 Moda OS 的语音 AI 助手。',
      inputAudioTranscription: {},
      outputAudioTranscription: {},
    },
  });
};

export const decodeAudio = (b64: string) => { const b = atob(b64), l = b.length, res = new Uint8Array(l); for (let i = 0; i < l; i++) res[i] = b.charCodeAt(i); return res; };
export const decodeAudioData = async (d: Uint8Array, ctx: AudioContext, r: number, ch: number) => { const i16 = new Int16Array(d.buffer), f = i16.length / ch, b = ctx.createBuffer(ch, f, r); for (let c = 0; c < ch; c++) { const cd = b.getChannelData(c); for (let i = 0; i < f; i++) cd[i] = i16[i * ch + c] / 32768.0; } return b; };
export const createPcmBlob = (d: Float32Array) => { const l = d.length, i16 = new Int16Array(l); for (let i = 0; i < l; i++) i16[i] = d[i] * 32768; const b = new Uint8Array(i16.buffer); let s = ''; for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]); return { data: btoa(s), mimeType: 'audio/pcm;rate=16000' }; };
