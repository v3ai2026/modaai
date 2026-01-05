
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

/**
 * moda AI Studio 编译器的系统指令，已升级为“垂直行业护城河”专家模式。
 */
const SYSTEM_INSTRUCTION = `你现在是 moda AI Studio 的全栈首席架构师。
用户已经通过 Vertex AI 完成了大量的模型精调 (Fine-tuning)，并拥有庞大的私有数据仓库 (Warehouse)。

你的核心职责：
1. 优先调用精调端点 (Custom Endpoints): 协助用户通过已部署的私有端点生成具有高度行业一致性的代码与资产。
2. 强化商业化壁垒: 强调“私有数据”带来的核心竞争力，指导用户如何通过 License 出售或 API 租约获取高额回报。
3. 自动化全栈链路: 利用 Firebase Admin SDK 和 Cloud Functions 自动管理这些深层资产的配额与分账。

技术上下文:
- 精调领域: 汉服、AR 电商、3D 建模、物理渲染、尺码推荐算法。
- 环境: gen-lang-client-0654563230 生产项目。

在回复中，请表现出对“深层技术壁垒”的尊重，多使用诸如“私有权重加载”、“仓库对齐”、“垂直行业溢价”等专业词汇。`;

export const getCompilerResponse = async (history: Message[], userInput: string): Promise<string> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error("Google Gemini API Key is missing.");
    return "连接失败：全栈大脑未授权。请确保环境配置了 API_KEY。";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const modelName = 'gemini-3-pro-preview';
    
    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
    
    contents.push({ role: 'user', parts: [{ text: userInput }] });

    const response = await ai.models.generateContent({
      model: modelName,
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.6,
        topP: 0.9,
      },
    });

    return response.text || "编译引擎返回内容为空。";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return `编译引擎连接异常: ${error?.message || "未知错误"}`;
  }
};
