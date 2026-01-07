# 🧠 MODA AI Platform - Monorepo

欢迎使用 **MODA AI Platform v3.1** - 基于 Google Gemini 构建的下一代 AI 驱动开发平台。

## 🌟 项目概览

MODA AI Platform 是一个全栈 AI 开发平台，采用现代化的 monorepo 架构，集成了多个互联应用和共享包。

### 🏗️ 架构

```
v3ai-platform/
├── apps/                    # 应用程序
│   ├── moda-studio/        # AI 智能编译器 ⭐
│   ├── portal/             # 平台门户
│   ├── vision-commerce/    # 视觉商务 (计划中)
│   ├── deploy-hub/         # 部署中心 (计划中)
│   └── intelligence-hub/   # 智能中心 (计划中)
└── packages/               # 共享包
    ├── ui-react/          # React UI 组件库
    └── core/              # 核心工具库
```

### 🚀 核心应用

#### MODA Studio (AI 智能编译器)
- **技术栈**: React 19 • TypeScript • Tailwind CSS • Framer Motion • Vite
- **功能**: AI 驱动的代码生成、实时编译、智能补全
- **AI 引擎**: Google Gemini 3 Flash / OpenAI GPT-4o
- **特色**: 空间导航式工作区、流式 AI 响应、本地持久化

#### Portal (平台门户)
- 统一的应用入口和导航
- 简洁的现代化界面
- 快速访问各个子应用

## 📋 技术栈

- **前端框架**: React 19
- **类型系统**: TypeScript 5.8
- **样式方案**: Tailwind CSS
- **动画库**: Framer Motion
- **构建工具**: Vite 6.2
- **包管理器**: pnpm 9
- **构建系统**: Turbo
- **AI SDK**: Google GenAI SDK, OpenAI API

## 🚀 快速开始

### 安装

```bash
# 安装 pnpm (如果还没有)
npm install -g pnpm@9

# 安装依赖
pnpm install
```

### 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 并添加你的 API 密钥
```

### 运行开发服务器

```bash
# 启动 MODA Studio
pnpm dev:moda

# 启动 Portal
pnpm dev:portal
```

### 构建生产版本

```bash
# 构建共享包
pnpm build:packages

# 构建所有应用
pnpm build:apps

# 或一次性构建所有
pnpm build
```

## 📖 文档

- **[快速开始指南](./QUICKSTART.md)** - 详细的安装和运行说明
- **[部署指南](./DEPLOYMENT.md)** - Vercel 和其他平台的部署说明
- **[Copilot 指南](./.github/copilot-instructions.md)** - 开发者指南和架构模式

## 🛠️ 环境要求

- **Node.js**: v20.0.0 或更高版本
- **pnpm**: v9.0.0 或更高版本
- **Google AI API Key**: 用于 AI 功能

## 📁 项目结构说明

### Apps (应用程序)

- **moda-studio**: 核心 AI 编译器，包含完整的 AI 驱动开发环境
- **portal**: 简洁的应用门户和导航中心
- **其他应用**: 占位符，未来功能扩展

### Packages (共享包)

- **ui-react**: 共享的 React UI 组件库
- **core**: 共享的工具函数和类型定义

## 🎨 设计系统

- **配色方案**: 深色模式，黑金主题
- **背景色**: `#020202` (google.bg)
- **强调色**: `#8ab4f8` (google.accent)
- **字体**: Space Grotesk (UI), Space Mono (代码)
- **动画**: Framer Motion springs (damping: 45, stiffness: 240)

## 🔐 隐私与安全

- **本地存储**: 所有数据存储在浏览器 LocalStorage
- **API 密钥**: 通过环境变量管理，不暴露在前端
- **无后端**: 当前版本完全基于浏览器，无需服务器

## ☁️ 部署到 Vercel

1. 连接 GitHub 仓库到 Vercel
2. 在 Vercel 项目设置中配置环境变量:
   - `GEMINI_API_KEY` (必需)
   - `OPENAI_API_KEY` (可选)
   - `NODE_VERSION=20`
3. 部署会自动使用 `vercel.json` 中的配置

详细部署说明请参考 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

*Powered by Google Gemini & MODA Labs*
