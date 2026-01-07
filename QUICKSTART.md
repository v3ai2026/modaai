# 快速部署指南 - V3 AI Platform

> 5 分钟快速启动本地开发环境

## 🎯 极速部署（3 步）

### 第 1 步：安装 pnpm
```bash
npm install -g pnpm@9
```

### 第 2 步：安装依赖并构建
```bash
# 克隆项目（如果还没有）
git clone https://github.com/v3ai2026/modaai.git
cd modaai

# 安装依赖
pnpm install

# 构建共享包（必需！）
pnpm build:packages
```

### 第 3 步：配置并启动
```bash
# 配置 API 密钥（可选，但建议配置）
cp .env.example .env
# 编辑 .env，添加: VITE_GEMINI_API_KEY=你的密钥

# 启动应用
pnpm dev:portal     # 统一门户 → http://localhost:3004
# 或
pnpm dev:moda       # Moda Studio → http://localhost:3000
```

## ✅ 成功标志

启动成功后，你会看到：
```
VITE v6.4.1  ready in 177 ms

➜  Local:   http://localhost:3004/
➜  Network: http://10.x.x.x:3004/
```

**打开浏览器访问 http://localhost:3004** 🎉

---

## 📱 所有应用端口

| 应用 | 端口 | 启动命令 |
|------|------|----------|
| Portal (门户) | 3004 | `pnpm dev:portal` |
| Moda Studio | 3000 | `pnpm dev:moda` |
| Vision Commerce | 3001 | `pnpm dev:commerce` |
| Deploy Hub | 3002 | `pnpm dev:deploy` |
| Intelligence Hub | 3003 | `pnpm dev:intelligence` |

---

## 🔑 获取 Gemini API Key

1. 访问：https://makersuite.google.com/app/apikey
2. 点击 "Create API Key"
3. 复制密钥
4. 粘贴到 `.env` 文件：
   ```bash
   VITE_GEMINI_API_KEY=你的密钥
   GEMINI_API_KEY=你的密钥
   ```

---

## 🛠️ 常用命令速查

```bash
# 开发
pnpm dev:portal          # 启动门户
pnpm dev:moda           # 启动编译器
pnpm dev:all            # 启动多个应用

# 构建
pnpm build              # 构建所有
pnpm build:packages     # 只构建包
pnpm build:apps         # 只构建应用

# 清理
pnpm clean              # 清理所有
```

---

## ⚡ 故障排除

### 问题 1: pnpm 不存在
```bash
npm install -g pnpm@9
```

### 问题 2: 端口被占用
```bash
# 换一个端口，或关闭占用进程
lsof -i :3000  # 查看占用进程
```

### 问题 3: 构建失败
```bash
# 完全清理并重装
pnpm clean
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build:packages
```

### 问题 4: 包没找到
```bash
# 确保先构建了共享包
pnpm build:packages
```

---

## 📚 详细文档

需要更多信息？查看：
- 📖 完整部署指南：[DEPLOYMENT.md](./DEPLOYMENT.md)
- 📖 项目文档：[README.md](./README.md)
- 📖 Moda Studio：[apps/moda-studio/README.md](./apps/moda-studio/README.md)
- 📖 Portal：[apps/portal/README.md](./apps/portal/README.md)

---

## 🎯 下一步做什么？

1. ✅ 访问 **Portal** http://localhost:3004 → 统一入口
2. ✅ 访问 **Moda Studio** http://localhost:3000 → 开始创作
3. 📖 阅读各应用文档，了解功能
4. 🔨 开始开发你的应用
5. 🚀 部署到生产环境

---

**需要帮助？** 查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 获取完整指南！
