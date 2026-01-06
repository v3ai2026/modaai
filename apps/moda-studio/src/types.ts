
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

export interface Asset {
  id: string;
  name: string;
  type: string;
  status: 'ACTIVE' | 'PENDING' | 'ARCHIVED';
  revenue: number;
  monetizationModel: 'Subscription' | 'One-time' | 'Ads' | 'Free';
  icon: string;
}

export interface BrandPackage {
  id: string;
  name: string;
  logo: string;
  status: 'INSTALLED' | 'SYNCING' | 'PENDING' | 'UPDATE_AVAILABLE';
  version: string;
  lastSync: string;
  dataWeight: string;
  category: 'LUXURY' | 'STREETWEAR' | 'FAST_FASHION';
}

export type VendorType = 'AI_MODEL' | 'FACTORY' | 'LOGISTICS';

export interface Vendor {
  id: string;
  name: string;
  type: VendorType;
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

export interface SpiderTask {
  id: string;
  target: string;
  protocol: 'MEDIA' | 'FINANCE' | 'SYSTEM';
  status: 'IDLE' | 'SCANNING' | 'EXTRACTING' | 'COMPLETE' | 'FAILED';
  findings: number;
}
