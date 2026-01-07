<div align="center">

# V3 AI Platform - Unified Monorepo

**统一所有项目的超级 Monorepo 平台**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![Turbo](https://img.shields.io/badge/Turborepo-2.0-EF4444)](https://turbo.build/)
[![pnpm](https://img.shields.io/badge/pnpm-9.0-F69220)](https://pnpm.io/)

</div>

---

## 🎯 项目概述

V3 AI Platform 是一个统一的 Monorepo 架构，整合了多个 AI 驱动的应用和共享包，提供从智能编译到 AI 内容生成的完整解决方案。

## 📦 项目结构

```
v3ai-platform/
├── apps/                           # 所有应用
│   ├── moda-studio/               # 智能编译器（React + Vite）
│   ├── portal/                    # 统一入口门户
│   ├── vision-commerce/           # 电商平台（待实现）
│   ├── deploy-hub/                # 部署平台（待实现）
│   └── intelligence-hub/          # AI 智能中心（待实现）
│
├── packages/                       # 共享包
│   ├── ui-react/                  # React UI 组件库 (80+ 图标)
│   ├── core/                      # 核心工具（AI 客户端、存储、HTTP）
│   ├── ui-vue/                    # Vue UI 组件库（待实现）
│   ├── auth/                      # 统一认证（待实现）
│   ├── database/                  # 数据库服务（待实现）
│   └── config/                    # 共享配置（待实现）
│
├── docs/                          # 统一文档（待实现）
├── scripts/                       # 构建脚本（待实现）
└── .github/workflows/             # CI/CD 工作流（待实现）
```

## 🚀 快速开始

> **快速部署？** 查看 [QUICKSTART.md](./QUICKSTART.md) 获取 5 分钟快速启动指南！  
> **完整部署？** 查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 获取详细部署文档！

### 前置要求

- Node.js >= 18.0.0
- pnpm >= 9.0.0

### 三步启动

```bash
# 1. 安装 pnpm（如果还没有）
npm install -g pnpm@9

# 2. 安装依赖并构建共享包
pnpm install
pnpm build:packages

# 3. 启动应用
pnpm dev:portal        # 统一门户 (端口 3004)
# 或
pnpm dev:moda          # Moda Studio (端口 3000)
```

### 开发模式

#### 启动所有应用

```bash
pnpm dev
```

#### 启动单个应用

```bash
pnpm dev:moda          # Moda Studio (端口 3000)
pnpm dev:portal        # Portal (端口 3004)
pnpm dev:commerce      # Vision Commerce (端口 3001)
pnpm dev:deploy        # Deploy Hub (端口 3002)
pnpm dev:intelligence  # Intelligence Hub (端口 3003)
```

#### 启动多个应用

```bash
pnpm dev:all          # 并行启动 moda, commerce, portal
```

### 构建

```bash
# 构建所有项目
pnpm build

# 构建所有应用
pnpm build:apps

# 构建所有包
pnpm build:packages
```

### 测试与代码质量

```bash
# 运行测试
pnpm test

# 代码检查
pnpm lint

# 代码格式化
pnpm format
```

## 📚 核心应用

### 1. Moda Studio（智能编译器）
- **端口**: 3000
- **技术栈**: React 19 + Vite + TypeScript
- **功能**: AI 驱动的代码生成与智能编译
- **特性**: 
  - 33+ 专业组件
  - Gemini AI 集成
  - 实时代码生成
  - 语音助手

### 2. Portal（统一入口）
- **端口**: 3004
- **技术栈**: React 19 + Vite + TypeScript
- **功能**: 统一应用入口和导航
- **特性**: 
  - 应用启动器
  - 统一导航
  - 美观的应用网格展示

### 3. Vision Commerce（电商平台）*待实现*
- **端口**: 3001
- **计划功能**: 3D 产品展示、AR 试穿、智能推荐

### 4. Deploy Hub（部署平台）*待实现*
- **端口**: 3002
- **计划功能**: 一键部署、自动化 CI/CD

### 5. Intelligence Hub（AI 智能中心）*待实现*
- **端口**: 3003
- **计划功能**: 多模态内容生成、AI 代理市场

## 📦 共享包

### @v3ai/ui-react

React UI 组件库，包含 80+ 图标组件和动画系统。

```typescript
import { Sparkles, Database, Code } from '@v3ai/ui-react/icons';
import { Motion, FadeIn, SlideIn } from '@v3ai/ui-react/animation';
import { useLocalStorage, useMediaQuery } from '@v3ai/ui-react/hooks';
import { cn, clamp } from '@v3ai/ui-react/utils';
```

**包含的图标**:
- 基础图标: Sparkles, Database, Code, Settings, Users, FileText, Image, Video, etc.
- 导航图标: Menu, X, ChevronRight, ChevronLeft, ChevronUp, ChevronDown, etc.
- 操作图标: Plus, Minus, Check, Edit, Save, Copy, Trash, etc.
- 媒体图标: Play, Pause, Stop, Mic, MicOff, Volume2, VolumeX, etc.
- 系统图标: Cpu, Server, Terminal, Layers, Grid, Package, etc.

### @v3ai/core

框架无关的核心工具库。

```typescript
import { GeminiClient } from '@v3ai/core/ai';
import { localStorage, sessionStorage } from '@v3ai/core/storage';
import { HttpClient } from '@v3ai/core/http';
import { cn, debounce, throttle } from '@v3ai/core/utils';
```

**功能模块**:
- **AI 客户端**: GeminiClient（支持流式响应、对话、搜索增强）
- **存储**: localStorage、sessionStorage 包装器
- **HTTP**: 带超时的 fetch 客户端
- **工具**: 常用实用函数

## ⚙️ 配置

### 环境变量

复制 `.env.example` 到 `.env` 并填写您的 API 密钥：

```bash
cp .env.example .env
```

**必需的环境变量**:

```bash
# Gemini AI
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# 应用端口
PORT_MODA=3000
PORT_COMMERCE=3001
PORT_DEPLOY=3002
PORT_INTELLIGENCE=3003
PORT_PORTAL=3004
```

### Workspace 配置

本项目使用 pnpm workspace 和 Turborepo:

- **pnpm-workspace.yaml**: 定义 workspace 包
- **turbo.json**: 定义构建管道和缓存策略

## 🔧 开发

### 添加新的共享包

1. 在 `packages/` 下创建新目录
2. 添加 `package.json` 和必要的文件
3. 在应用中使用 `workspace:*` 引用

### 添加新的应用

1. 在 `apps/` 下创建新目录
2. 配置构建工具（Vite/Next.js/Nuxt）
3. 在根 `package.json` 中添加脚本

### 包引用示例

```typescript
// 在任何应用中使用共享包
import { Sparkles } from '@v3ai/ui-react/icons';
import { GeminiClient } from '@v3ai/core/ai';

const client = new GeminiClient({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});
```

## 📖 文档

完整的文档将在 `docs/` 目录下提供（使用 VitePress）。

```bash
# 启动文档开发服务器
pnpm docs:dev

# 构建文档
pnpm docs:build
```

## 🤝 贡献

欢迎贡献！请先阅读 [贡献指南](CONTRIBUTING.md)。

## 📄 许可证

[MIT License](LICENSE)

## 🔗 相关链接

- [Turborepo](https://turbo.build/)
- [pnpm](https://pnpm.io/)
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Google Gemini](https://ai.google.dev/)

---

<div align="center">

**Made with ❤️ by V3 AI Team**

</div>
