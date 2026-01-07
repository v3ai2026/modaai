# V3 AI Platform - 本地部署指南

## 📋 系统要求

### 必需软件
- **Node.js**: >= 18.0.0 (推荐 20.x LTS)
- **pnpm**: >= 9.0.0
- **Git**: 最新版本

### 推荐配置
- **操作系统**: macOS, Linux, Windows (WSL2)
- **内存**: >= 4GB
- **磁盘空间**: >= 2GB

---

## 🚀 快速部署步骤

### 1. 克隆仓库

```bash
# HTTPS 方式
git clone https://github.com/v3ai2026/modaai.git
cd modaai

# 或 SSH 方式
git clone git@github.com:v3ai2026/modaai.git
cd modaai
```

### 2. 安装 pnpm (如果尚未安装)

```bash
# 使用 npm 安装
npm install -g pnpm@9

# 或使用 curl (Linux/macOS)
curl -fsSL https://get.pnpm.io/install.sh | sh -

# 验证安装
pnpm --version
```

### 3. 安装依赖

```bash
# 安装所有依赖
pnpm install
```

### 4. 配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件，添加你的 API 密钥
# 至少需要配置 VITE_GEMINI_API_KEY
```

**必需的环境变量**:
```bash
# Gemini AI API Key (必需)
VITE_GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

**可选的环境变量**:
```bash
# OpenAI (可选)
VITE_OPENAI_API_KEY=your_openai_api_key_here

# Supabase (可选)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Firebase (可选)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=

# 功能开关
VITE_ENABLE_AUTH=true
VITE_ENABLE_ANALYTICS=false
```

### 5. 构建共享包

```bash
# 首先构建共享包（必需）
pnpm build:packages
```

### 6. 启动应用

#### 方式 A: 启动所有应用
```bash
pnpm dev:all
```

#### 方式 B: 启动单个应用
```bash
# 启动 Portal (统一入口)
pnpm dev:portal

# 启动 Moda Studio (智能编译器)
pnpm dev:moda

# 在新终端窗口启动其他应用
pnpm dev:commerce      # 电商平台
pnpm dev:deploy        # 部署平台
pnpm dev:intelligence  # AI 智能中心
```

---

## 🌐 访问应用

启动成功后，可以通过以下地址访问：

| 应用 | 地址 | 说明 |
|------|------|------|
| **Portal** | http://localhost:3004 | 统一入口门户 |
| **Moda Studio** | http://localhost:3000 | 智能编译器 |
| **Vision Commerce** | http://localhost:3001 | 电商平台 (占位符) |
| **Deploy Hub** | http://localhost:3002 | 部署平台 (占位符) |
| **Intelligence Hub** | http://localhost:3003 | AI 智能中心 (占位符) |

**推荐**: 先访问 **Portal** (http://localhost:3004) 作为统一入口。

---

## 🛠️ 常用命令

### 开发命令

```bash
# 启动开发服务器
pnpm dev              # 启动所有应用
pnpm dev:moda         # 只启动 Moda Studio
pnpm dev:portal       # 只启动 Portal
pnpm dev:all          # 并行启动主要应用

# 构建项目
pnpm build            # 构建所有项目
pnpm build:packages   # 只构建共享包
pnpm build:apps       # 只构建应用

# 代码质量
pnpm lint             # 代码检查
pnpm format           # 代码格式化
pnpm test             # 运行测试

# 清理
pnpm clean            # 清理所有构建产物和依赖
```

### 单独操作某个应用

```bash
# 使用 filter 参数
pnpm --filter=moda-studio dev
pnpm --filter=portal build
pnpm --filter=@v3ai/core build
```

---

## 🔧 生产环境构建

### 构建所有应用

```bash
# 1. 构建共享包
pnpm build:packages

# 2. 构建所有应用
pnpm build:apps

# 或一次性构建
pnpm build
```

### 预览生产构建

```bash
# 预览 Moda Studio
cd apps/moda-studio
pnpm preview

# 预览 Portal
cd apps/portal
pnpm preview
```

---

## 📦 部署到生产环境

### Vercel 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
pnpm deploy:vercel
```

**Vercel 配置文件** (`vercel.json` 已存在):
```json
{
  "buildCommand": "pnpm build:packages && pnpm build:apps",
  "outputDirectory": "apps/portal/dist",
  "framework": "vite"
}
```

### Netlify 部署

```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 部署
pnpm deploy:netlify
```

### Docker 部署 (推荐用于生产环境)

创建 `Dockerfile`:

```dockerfile
FROM node:20-alpine AS base

# 安装 pnpm
RUN npm install -g pnpm@9

# 设置工作目录
WORKDIR /app

# 复制依赖文件
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages ./packages
COPY apps ./apps

# 安装依赖
RUN pnpm install --frozen-lockfile

# 构建
RUN pnpm build:packages && pnpm build:apps

# 生产阶段
FROM nginx:alpine
COPY --from=base /app/apps/portal/dist /usr/share/nginx/html
COPY --from=base /app/apps/moda-studio/dist /usr/share/nginx/html/moda

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

构建和运行:
```bash
docker build -t v3ai-platform .
docker run -p 8080:80 v3ai-platform
```

---

## 🐛 常见问题

### 1. pnpm 命令不存在

```bash
# 安装 pnpm
npm install -g pnpm@9
```

### 2. 端口被占用

```bash
# 查找占用端口的进程
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# 或修改端口 (在对应的 app 的 vite.config.ts 中)
```

### 3. 构建失败

```bash
# 清理缓存和依赖
pnpm clean
rm -rf node_modules pnpm-lock.yaml

# 重新安装
pnpm install

# 重新构建
pnpm build:packages
```

### 4. API 密钥未配置

确保 `.env` 文件中配置了有效的 `VITE_GEMINI_API_KEY`:

```bash
# 获取 Gemini API Key
# 访问: https://makersuite.google.com/app/apikey
```

### 5. 依赖版本冲突

```bash
# 使用 --no-frozen-lockfile 重新安装
pnpm install --no-frozen-lockfile
```

---

## 📊 性能优化

### 开发环境优化

```bash
# 只启动需要的应用
pnpm dev:portal    # 只启动门户
pnpm dev:moda      # 只启动编译器

# 使用 Turbo 缓存
# Turbo 会自动缓存构建结果，加快后续构建
```

### 生产环境优化

```bash
# 启用生产模式构建
NODE_ENV=production pnpm build

# 分析包大小
cd apps/moda-studio
pnpm build -- --analyze
```

---

## 📚 下一步

1. ✅ 配置 API 密钥
2. ✅ 启动应用并测试
3. 📖 阅读各应用的 README:
   - `apps/moda-studio/README.md`
   - `apps/portal/README.md`
4. 🔨 开始开发或自定义
5. 🚀 部署到生产环境

---

## 🆘 获取帮助

- **文档**: 查看根目录 `README.md` 和各应用的 `README.md`
- **Issues**: https://github.com/v3ai2026/modaai/issues
- **讨论**: https://github.com/v3ai2026/modaai/discussions

---

## ✅ 部署检查清单

- [ ] Node.js >= 18.0.0 已安装
- [ ] pnpm >= 9.0.0 已安装
- [ ] 克隆仓库成功
- [ ] `pnpm install` 运行成功
- [ ] `.env` 文件已配置
- [ ] `pnpm build:packages` 运行成功
- [ ] 应用启动成功
- [ ] 可以访问 http://localhost:3004 (Portal)
- [ ] 可以访问 http://localhost:3000 (Moda Studio)

**恭喜！您已成功部署 V3 AI Platform！** 🎉
