import { GoogleGenAI, Modality, LiveServerMessage } from "@google/genai";
import { Message, MemoryNode } from "../types";

const SYSTEM_INSTRUCTION = `你现在是 moda AI Studio 的核心大脑。
你的任务是担任高级前端架构师，将用户的自然语言意图编译为高质量、类型安全的 React 组件代码。

回复风格：冷峻、高效、充满技术深度。`;

export const getCompilerResponseStream = async (
  history: Message[], 
  userInput: string,
  memories: MemoryNode[],
  onChunk: (text: string) => void
): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return "Critical: API_KEY_MISSING.";

  try {
    const ai = new GoogleGenAI({ apiKey });
    const memoryString = memories.map(m => `[${m.category}] ${m.title}: ${m.content}`).join('\n');
    const enrichedInstruction = `${SYSTEM_INSTRUCTION}\n\n[CONTEXT_MEMORY]\n${memoryString || 'MCP 初始状态：无历史上下文。'}`;

    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
    contents.push({ role: 'user', parts: [{ text: userInput }] });

    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3-pro-preview',
      contents: contents,
      config: {
        systemInstruction: enrichedInstruction,
        temperature: 0.75,
        thinkingConfig: { thinkingBudget: 8192 } 
      },
    });

    let fullText = "";
    for await (const chunk of responseStream) {
      if (chunk.text) {
        fullText += chunk.text;
        onChunk(fullText);
      }
    }
    return fullText;
  } catch (error: any) {
    console.error("Gemini Compiler Error:", error);
    return `[COMPILER_ERROR] ${error.message}`;
  }
};

// --- Live Audio Utilities ---

export function encodeAudio(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function decodeAudio(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export function createPcmBlob(data: Float32Array): any {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encodeAudio(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

// --- Live API Session Management ---

export const connectLiveConsultant = async (callbacks: {
  onAudioData: (base64: string) => void;
  onInterrupted: () => void;
  onTranscription?: (text: string, isUser: boolean) => void;
}) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY_REQUIRED");

  const ai = new GoogleGenAI({ apiKey });
  
  return ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-09-2025',
    callbacks: {
      onopen: () => console.log("Live Session Established"),
      onmessage: async (message: LiveServerMessage) => {
        const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
        if (audio) callbacks.onAudioData(audio);
        if (message.serverContent?.interrupted) callbacks.onInterrupted();
        
        if (message.serverContent?.inputTranscription && callbacks.onTranscription) {
          callbacks.onTranscription(message.serverContent.inputTranscription.text, true);
        }
      },
      onerror: (e) => console.error("Live Error:", e),
      onclose: () => console.log("Live Session Closed"),
    },
    config: {
      responseModalities: [Modality.AUDIO],
      inputAudioTranscription: {},
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
      },
      systemInstruction: "你是一个顶尖的数字时尚顾问和 AR 裁剪专家。你正在与设计师进行实时语音交谈。提供专业、前卫且具体的时尚建议。",
    },
  });
};

/**
 * Start a dictation session specifically for converting speech to text.
 */
export const startTranscriptionSession = async (onTranscription: (text: string) => void) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY_REQUIRED");

  const ai = new GoogleGenAI({ apiKey });
  
  return ai.live.connect({
    model: 'gemini-2.5-flash-native-audio-preview-09-2025',
    callbacks: {
      onopen: () => console.log("Transcription Engine Online"),
      onmessage: async (message: LiveServerMessage) => {
        // We only care about user input transcription here
        if (message.serverContent?.inputTranscription) {
          onTranscription(message.serverContent.inputTranscription.text);
        }
      },
      onerror: (e) => console.error("Transcription Error:", e),
      onclose: () => console.log("Transcription Engine Offline"),
    },
    config: {
      responseModalities: [Modality.AUDIO], // Required modality
      inputAudioTranscription: {},
      systemInstruction: "You are a silent transcription assistant. Only listen and provide text transcripts. Do not speak back unless explicitly asked. Your primary goal is to help a developer dictate instructions for an AI compiler.",
    },
  });
};
