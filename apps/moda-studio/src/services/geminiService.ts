
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
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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

/**
 * World-Class High-Density Intelligence Crawler (Googel_Crawler Edition).
 * Leverages Google Search Grounding for verified global intelligence.
 */
export const fetchIntelligence = async (topic: 'FASHION' | 'FINANCE' | 'DEEP_SEARCH'): Promise<{ text: string, sources: { title: string, uri: string }[] }> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY_MISSING");

  let prompt = "";
  switch(topic) {
    case 'FASHION':
      prompt = `作为全球顶级时尚情报官 (MediaCrawler-Googel Agent)，执行 24H 深度多维爬网。
                重点抓取：2025 春夏趋势、AR 虚拟穿戴、以及全球前 10 大品牌的数字化营销动态。
                要求：提取核心视觉标签、市场转化率预测。
                格式要求：
                [INTEL_01]
                TITLE: 标题
                SUMMARY: 深度摘要
                IMPACT: 影响力 (0-100)
                SENTIMENT: 趋势 (积极/颠覆/风险/中性)`;
      break;
    case 'FINANCE':
      prompt = `作为华尔街高级量化爬虫策略师 (SpiderFlow-Googel Agent)，扫描全球 AI 算力与科技股核心脉动。
                重点抓取：NVIDIA 供应链、大型模型公司融资、算力租赁价格波动。
                要求：穿透资本博弈，揭示技术代差对股价的底层逻辑。
                格式要求：
                [INTEL_01]
                TITLE: 标题
                SUMMARY: 核心博弈逻辑
                IMPACT: 市场冲击 (0-100)
                SENTIMENT: 情绪 (牛市/风险/防御/观望)`;
      break;
    case 'DEEP_SEARCH':
      prompt = `作为全网深度情报抓取系统 (Googel_Crawler Agent)，执行全球实时大事件索引。
                抓取当前 4 条关于通用人工智能 (AGI)、自动驾驶、或星际探索的最新技术突破。
                要求：提供技术原理的极简拆解，以及对人类社会生产力的长期影响。
                格式要求：
                [INTEL_01]
                TITLE: 标题
                SUMMARY: 技术突破核心
                IMPACT: 文明影响指数 (0-100)
                SENTIMENT: 方向 (跨越/预警/平稳)`;
      break;
  }

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      temperature: 0.1
    }
  });

  const text = response.text || "无法建立全球情报链路。";
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.filter(chunk => chunk.web)
    .map(chunk => ({
      title: chunk.web?.title || "情报源",
      uri: chunk.web?.uri || ""
    })) || [];

  return { text, sources };
};

// --- Audio Utilities ---
export function encodeAudio(bytes: Uint8Array) { let b = ''; for (let i = 0; i < bytes.length; i++) b += String.fromCharCode(bytes[i]); return btoa(b); }
export function decodeAudio(base64: string) { const b = atob(base64), l = b.length, res = new Uint8Array(l); for (let i = 0; i < l; i++) res[i] = b.charCodeAt(i); return res; }
export async function decodeAudioData(data: Uint8Array, ctx: AudioContext, rate: number, ch: number): Promise<AudioBuffer> { const d16 = new Int16Array(data.buffer), f = d16.length / ch, b = ctx.createBuffer(ch, f, rate); for (let c = 0; c < ch; c++) { const cd = b.getChannelData(c); for (let i = 0; i < f; i++) cd[i] = d16[i * ch + c] / 32768.0; } return b; }
export function createPcmBlob(data: Float32Array) { const l = data.length, i16 = new Int16Array(l); for (let i = 0; i < l; i++) i16[i] = data[i] * 32768; return { data: encodeAudio(new Uint8Array(i16.buffer)), mimeType: 'audio/pcm;rate=16000' }; }
export const connectLiveConsultant = async (c: any) => { const ak = process.env.API_KEY; if (!ak) throw new Error("KEY_REQ"); const ai = new GoogleGenAI({ apiKey: ak }); return ai.live.connect({ model: 'gemini-2.5-flash-native-audio-preview-09-2025', callbacks: { onmessage: async (m: any) => { const a = m.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data; if (a) c.onAudioData(a); if (m.serverContent?.outputTranscription) c.onOutputTranscription(m.serverContent.outputTranscription.text); if (m.serverContent?.inputTranscription) c.onInputTranscription(m.serverContent.inputTranscription.text); if (m.serverContent?.interrupted) c.onInterrupted(); if (m.serverContent?.turnComplete) c.onTurnComplete(); } }, config: { responseModalities: [Modality.AUDIO], outputAudioTranscription: {}, inputAudioTranscription: {}, speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } }, systemInstruction: "你是一个顶尖的数字时尚顾问。" } }); };
