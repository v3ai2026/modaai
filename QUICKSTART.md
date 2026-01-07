# MODA AI Platform - Quick Start Guide

Welcome to the **MODA AI Platform** v3.1 - A next-generation AI-powered monorepo development platform.

## 🛠️ Prerequisites

- **Node.js**: v20.0.0 or higher
- **pnpm**: v9.0.0 or higher (recommended package manager)
- **Google AI API Key**: Required for AI features

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/v3ai2026/modaai.git
cd modaai
```

### 2. Install Dependencies

We use **pnpm** for fast, efficient dependency management:

```bash
# Install pnpm globally if you haven't already
npm install -g pnpm@9

# Install all dependencies
pnpm install
```

### 3. Configure Environment Variables

Copy the example environment file and add your API keys:

```bash
cp .env.example .env
```

Edit `.env` and add your keys:

```env
# Google AI Studio API Key (required)
GEMINI_API_KEY=your_gemini_api_key_here

# OpenAI API Key (optional)
OPENAI_API_KEY=your_openai_api_key_here
```

## 🏃 Running the Applications

### Development Mode

Start individual applications:

```bash
# Start MODA Studio (AI Compiler)
pnpm dev:moda

# Start Portal (Landing Page)
pnpm dev:portal
```

### Building for Production

```bash
# Build shared packages first
pnpm build:packages

# Build all applications
pnpm build:apps

# Or build everything at once
pnpm build
```

## 📁 Project Structure

```
v3ai-platform/
├── apps/
│   ├── moda-studio/          # AI-powered development studio
│   ├── portal/               # Landing page and navigation
│   ├── vision-commerce/      # E-commerce platform (coming soon)
│   ├── deploy-hub/           # Deployment management (coming soon)
│   └── intelligence-hub/     # AI analytics (coming soon)
├── packages/
│   ├── ui-react/             # Shared React UI components
│   └── core/                 # Shared utilities and helpers
├── .env.example              # Environment variables template
├── pnpm-workspace.yaml       # Workspace configuration
├── turbo.json                # Build pipeline configuration
├── package.json              # Root package configuration
└── vercel.json               # Deployment configuration
```

## 🌐 Accessing Applications

- **MODA Studio**: http://localhost:5173
- **Portal**: http://localhost:3001

## 🔧 Common Commands

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev:moda
pnpm dev:portal

# Build packages
pnpm build:packages

# Build apps
pnpm build:apps

# Build everything
pnpm build

# Clean all node_modules and dist folders
pnpm clean
```

## 🆘 Troubleshooting

### Port Already in Use

If you get a "port already in use" error, you can:
- Kill the process using that port
- Change the port in the app's `vite.config.ts`

### Build Errors

Make sure to build packages before apps:

```bash
pnpm build:packages
pnpm build:apps
```

### Dependency Issues

If you encounter dependency issues:

```bash
pnpm clean
pnpm install
```

## 📚 Learn More

- See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions
- See [README.md](./README.md) for detailed project information
- Visit the [GitHub repository](https://github.com/v3ai2026/modaai) for issues and contributions

---

*Powered by Google Gemini & MODA Labs*
