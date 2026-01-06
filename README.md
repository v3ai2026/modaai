<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# moda AI Studio - 智能编译器

基于 Google Gemini 的下一代 AI 驱动的全栈应用开发平台。

## 🚀 快速开始

### 前置要求
- Node.js 18+ 
- npm 或 yarn
- Gemini API Key（从 https://aistudio.google.com/apikey 获取）

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/v3ai2026/modaai.git
   cd modaai
   ```

2. **安装依赖**
   ```bash
   npm install --legacy-peer-deps
   ```
   
   > **注意**: 由于使用 React 19 而 framer-motion 需要 React 18，需要使用 `--legacy-peer-deps` 标志。

3. **配置环境变量**
   ```bash
   cp .env.local.example .env.local
   ```
   
   编辑 `.env.local` 文件，添加你的 Gemini API Key：
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

5. **访问应用**
   打开浏览器访问: http://localhost:5173

## 📦 项目结构

```
modaai/
├── components/          # React 组件
│   ├── AccessTerminal.tsx
│   ├── AIStylist.tsx
│   ├── Workspace.tsx
│   ├── TemplateWarehouse.tsx
│   ├── MediaStudio.tsx
│   ├── LiveSandbox.tsx
│   ├── ClusterTopology.tsx
│   ├── MemoryVault.tsx
│   └── ...
├── services/           # 服务层
│   ├── geminiService.ts
│   ├── persistenceService.ts
│   └── firebaseService.ts
├── utils/              # 工具函数
│   ├── animations.ts
│   ├── Motion.tsx
│   └── AnimatePresence.tsx
├── types.ts            # TypeScript 类型定义
├── App.tsx             # 主应用组件
├── index.tsx           # 应用入口
└── vite.config.ts      # Vite 配置
```

## 🛠️ 技术栈

- **前端框架**: React 19
- **构建工具**: Vite 6
- **语言**: TypeScript 5.8
- **AI 集成**: Google Gemini API
- **动画**: Framer Motion
- **图标**: Lucide React
- **样式**: TailwindCSS (via inline classes)

## 📚 核心功能

1. **智能编译器** - 自然语言转 React 组件
2. **模板仓库** - 预设组件库
3. **媒体工作室** - Veo 3.1 视频生成
4. **实时沙盒** - 代码实时预览
5. **集群监控** - 节点拓扑可视化
6. **神经记忆** - MCP 上下文管理
7. **语音顾问** - 实时 AI 语音咨询
8. **品牌库** - 品牌资产管理
9. **AI 市场** - 资产货币化平台

## 🚢 部署

### Vercel 部署
```bash
npm run build
vercel deploy
```

### Firebase 部署
```bash
npm run build
firebase deploy
```

## 🔧 开发命令

```bash
# 开发模式
npm run dev

# 生产构建
npm run build

# 预览构建结果
npm run preview
```

## 📄 许可证

私有项目

## 🔗 相关链接

- View in AI Studio: https://ai.studio/apps/drive/11GnsmZCW4DDoYt1WqNdqYwL_2XdOk-YC
- GitHub Repository: https://github.com/v3ai2026/modaai

