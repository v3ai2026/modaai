# MODA AI Studio - Copilot Instructions

## Project Overview
MODA OS (v3.1) is a **next-generation AI-powered frontend compiler and development studio** built on Google Gemini/OpenAI APIs. It's a React 19 + Tailwind CSS + Framer Motion application enabling users to generate production-ready code through conversational AI interfaces with a futuristic "singularity grid" workspace metaphor.

**Tech Stack:** React 19 • TypeScript • Tailwind CSS • Framer Motion • Vite • Google GenAI SDK

## Architecture Patterns

### 1. Workspace-as-Metaphor Navigation (`components/Workspace.tsx`)
- The entire app uses a **spatial navigation model** with 11+ sections positioned on a 2D grid coordinate system (`SECTION_MAP`)
- Sections: Dashboard (0,0), Admin (-1400,0), Docs (-2800,0), SmartCompiler (1400,0), AIMarket (0,1400), BrandVault (1400,-1400), etc.
- Uses **Framer Motion Springs** for smooth animated transitions between sections
- Draggable canvas with zoom controls—users can manually drag/explore the workspace
- Example: `onStepChange()` updates `activeStep` → SpringX/SpringY animate the view

### 2. AI Service Abstraction (`services/geminiService.ts`)
- **Unified provider interface**: `getAIResponseStream()` dispatches to either `getGeminiResponseStream()` or `getOpenAIResponseStream()`
- Current default: **Google Gemini 3 Flash** with streaming responses
- System prompt enforces: "ES6 modules, Tailwind CSS, responsive design" + memory context injection
- Streaming architecture: chunks are accumulated and passed to UI via `onChunk` callback
- Memory context (user's prior prompts) is prepended to each LLM message
- **No authentication required locally**—defaults to `LOCAL_ARCHITECT` user ID if missing

### 3. Local Persistence Engine (`services/persistenceService.ts`)
- **localStorage-only** (no Firebase/backend in current build)
- Three storage keys: `MODA_MCP_MEMORIES`, `MODA_AUTH_USER`, `MODA_VAULT_KEYS`
- `memoryService`: saves up to 100 memory nodes (auto-truncated), enables context-aware AI responses
- `authService`: mock local auth (no real validation); returns hardcoded `Moda Root` on sign-in
- Use `memoryService.fetchAll(10)` to retrieve recent context before sending LLM requests

### 4. Component Composition Pattern
Each major section (SmartCompiler, MediaStudio, AIMarket, etc.) is:
- Self-contained in `/components/{SectionName}.tsx`
- Receives props: `messages`, `isProcessing`, `onSendMessage`, `nodes` (cluster metadata)
- Handles own internal state (input fields, view tabs, dropdowns)
- Must respect the 11+ `SectionId` enum values for view switching

### 5. Design System: Luxury Dark Theme
- **Color Palette** (defined in `index.html` Tailwind config):
  - Background: `#020202` (`google.bg`), Accent: `#8ab4f8` (`google.accent`)
  - Borders: `white/5`, `white/10` for subtle layering
  - Gold highlights: `#D4AF37` (`luxury.gold`) for interactive focus states
- **Typography**: Space Grotesk (UI), Space Mono (code/logs)
- **Motion**: Framer Motion springs with `damping: 45, stiffness: 240` standard config
- **Custom Grid**: `singularity-grid` background (radial gradient dots at 40px spacing)
- Cursor customization (gold dot + ring) via `#cursor-dot` and `#cursor-circle` elements

## Critical Developer Workflows

### Local Development
```bash
npm install                # Install deps (React 19, Framer Motion, @google/genai)
npm run dev               # Vite dev server on http://localhost:5173 (or port from config)
npm run build             # Vite build → dist/ folder
npm run preview           # Preview production build locally
```

### Environment Setup
- Create `.env` file with `GEMINI_API_KEY=your_key_here`
- Alternative: `.env.local` for local overrides
- Vite defines `process.env.GEMINI_API_KEY` and `API_KEY` globally
- **No authentication gate in current build**—system defaults to local mode with mock user

### Build & Type Safety
- `tsconfig.json` enforces strict TypeScript
- Vite resolve alias: `@` maps to project root
- Server default: port 3000 in config, but Vite overrides to 5173

## Project-Specific Patterns

### Message & Memory Flow
1. User sends prompt → `SmartCompiler` → `App.handleSendMessage()`
2. Fetch recent memories: `memoryService.fetchAll(10)`
3. Call `getAIResponseStream(provider, [...messages, newMsg], content, memories, onChunk)`
4. Stream chunks accumulate in state
5. Auto-save to memory if prompt length > 20 chars

### Component Rendering Rules
- Sections rendered inside `NodeWrapper` components (positioned absolutely, styled with borders/shadows)
- Each section is wrapped in a `motion.div` with `springX/springY` positioning
- Interactive elements get special handling (buttons bypass drag handlers)
- Use `overflow-hidden` and `rounded-[4rem]` (large border-radius) for the "futuristic pod" aesthetic

### LLM Response Handling
- Gemini responses arrive as **Server-Sent Events** (SSE stream format)
- Parse JSON chunks, extract `candidates[0].content.parts[0].text`
- OpenAI uses `data: ` prefix format; parse and accumulate `delta.content`
- Both providers update UI via `onChunk(fullText)` callback for real-time feedback

### State Management
- **No Redux/Context API heavy usage**—App.tsx holds top-level state
- Props drilling: `App` → `Workspace` → individual sections
- Local component state for UI toggles (tabs, dropdowns, input focus)
- `localStorage` for persistence (user ID, memories, settings)

## Integration Points & Dependencies

### External APIs
- **Google Generative AI SDK** (`@google/genai`): Streaming chat/code generation
- **OpenAI API** (fallback): GPT-4o endpoint via direct fetch (no SDK)
- Both require API keys (environment variables)

### Key Files to Reference
- `App.tsx` (#L50-90): State initialization, message handling, provider dispatch
- `components/SmartCompiler.tsx`: UI for prompts, provider switching, chat view
- `services/geminiService.ts` (#L90-180): Streaming implementation details
- `components/Workspace.tsx` (#L40-70): Section mapping, canvas interaction
- `index.html` (#L15-50): Tailwind config, custom CSS animations, grid styling
- `types.ts`: All TypeScript interfaces (`Message`, `SectionId`, `PrivateNode`, etc.)

## Common Gotchas & Conventions

1. **Section Navigation**: Use `SectionId` enum, never string literals for section IDs
2. **Streaming Pattern**: Always pass `onChunk` callback; don't try to return full response
3. **Memory Context**: Call `memoryService.fetchAll()` *before* sending prompts; memories are appended to system prompt
4. **Tailwind Colors**: Prefer `google-accent` (#8ab4f8) for interactive elements; use `white/5` for subtle borders
5. **Framer Motion Springs**: All animated transitions use the same spring config for consistency
6. **LocalStorage**: All persistence is browser-local; no cloud sync in current build
7. **Component Props**: Sections expect `messages: Message[]`, `isProcessing: boolean`, `onSendMessage` callback
8. **No Auth Gate**: Current version auto-authenticates locally with `LOCAL_ARCHITECT` ID

## Recommended Reading Order for New Features
1. **For UI/Layout changes**: `components/Workspace.tsx` → `index.html` (Tailwind config)
2. **For new sections**: Create `/components/{SectionName}.tsx` → add `SectionId` to enum → register coordinates in `SECTION_MAP`
3. **For LLM logic**: `services/geminiService.ts` → `App.tsx` (message handling) → `components/SmartCompiler.tsx` (UI)
4. **For data persistence**: `services/persistenceService.ts` → adjust localStorage keys as needed

---

*MODA OS v3.1 • Last Updated: 2026-01-07*
