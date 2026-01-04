
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `你现在是 moda AI Studio 的首席架构师。
你的任务是协助用户完成 6 步实施蓝图：
1. 项目初始化 (Next.js 15 + Tailwind)
2. 模型节点选择 (Gemini/Veo/Imagen)
3. 提示词到组件生成 (React 19, AR组件, 视频逻辑)
4. Vercel 自动化部署
5. 可视化交互优化
6. 性能审计与闭环优化

特别关注三个核心领域：
- AI 市场应用：智能代理、效率看板。
- AR 电子商务：集成 Virtual Try-on (AR 换衣) 逻辑，使用 WebGL/Three.js 或相关库。
- 图像视频合成：集成 Veo 3.1 视频渲染流。

当用户提供需求时，请输出专业的架构建议，并在必要时提供符合标准的 React 代码块。`;

export const getCompilerResponse = async (history: Message[], userInput: string): Promise<string> => {
  try {
    // 按照指南：在调用前初始化以获取最新的 API KEY 环境值
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // 使用最新模型 Gemini 3 Pro 以获得最强逻辑
    const model = 'gemini-3-pro-preview';
    
    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
    contents.push({ role: 'user', parts: [{ text: userInput }] });

    const response = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
        topP: 0.95,
      },
    });

    return response.text || "编译引擎响应为空，请重试。";
  } catch (error) {
    console.error("Gemini Brain Connection Error:", error);
    return "连接到谷歌大脑失败。请检查 API 配置或网络环境。";
  }
};
