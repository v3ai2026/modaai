

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  username?: string;
}

export type LLMProvider = 'GEMINI' | 'OPENAI' | 'DEEPSEEK' | 'ANTHROPIC';

export type CompilerStatus = 'IDLE' | 'CONFIGURING' | 'COMPILING' | 'DEPLOYING' | 'READY' | 'SYNCING';

export enum SectionId {
  Dashboard = 'DASHBOARD',
  MistBuilder = 'MIST_BUILDER',
  AIMarket = 'AI_MARKET',
  CreationLab = 'CREATION_LAB',
  Newsroom = 'NEWSROOM',
  Docs = 'DOCS',
  Admin = 'ADMIN',
  Preview = 'PREVIEW',
  Cluster = 'CLUSTER',
  Vault = 'VAULT',
  BrandVault = 'BRAND_VAULT',
  Sectors = 'SECTORS',
  Workflow = 'WORKFLOW',
  Craftsmanship = 'CRAFTSMANSHIP',
  Editor = 'EDITOR'
}

export interface PrivateNode {
  id: string;
  name: string;
  ip: string;
  status: 'ONLINE' | 'OFFLINE' | 'BUSY' | 'ERROR';
  load: number;
  type: 'LOGIC' | 'RENDER' | 'DATA' | 'VIDEO' | 'GATEWAY';
}

export interface Vendor {
  id: string;
  name: string;
  type: 'AI_MODEL' | 'FACTORY' | 'LOGISTICS';
  provider: string;
  status: 'active' | 'inactive' | 'error';
  latency: number;
  apiKey: string;
  endpoint: string;
  costPerUnit: string;
}

export interface MemoryNode {
  id: string;
  title: string;
  content: string;
  category: 'PREFERENCE' | 'ARCHITECTURE' | 'LOGIC';
  timestamp: string;
}

// Fixed: Added BrandPackage interface which was missing and causing errors in BrandVault.tsx
export interface BrandPackage {
  id: string;
  name: string;
  logo: string;
  status: 'INSTALLED' | 'UPDATE_AVAILABLE' | 'PENDING';
  version: string;
  lastSync: string;
  dataWeight: string;
  category: 'LUXURY' | 'STREETWEAR' | 'FAST_FASHION';
}
