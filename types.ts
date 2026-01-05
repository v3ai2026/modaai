
export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface ServiceAccount {
  projectId: string;
  clientEmail: string;
  clientId: string;
  privateKeyId: string;
}

export type CompilerStatus = 'IDLE' | 'CONFIGURING' | 'COMPILING' | 'DEPLOYING' | 'READY' | 'SYNCING';

export enum SectionId {
  Home = '01',
  CloudSync = '02',
  Compiler = '03',
  ExtensionGen = '04',
  Automation = '05',
  VisualPortal = '06',
  Feedback = '07',
  Sectors = '08',
  Workflow = '09',
  Craftsmanship = '10',
  Editor = '11',
  Admin = '12'
}

export interface Asset {
  id: string;
  name: string;
  type: string;
  mode: 'FOR_SALE' | 'RENTAL' | 'OPEN_SOURCE';
  price: string;
  status: 'ACTIVE' | 'ARCHIVED' | 'PENDING';
  revenue: string;
  revenueValue: number;
  endpointId?: string; // Vertex AI Endpoint ID
  deployedUrl?: string; // Vercel/Firebase Hosting URL
  licenseKey?: string; // For FOR_SALE mode
}

export interface CloudConnection {
  github: boolean;
  drive: boolean;
  database: boolean;
  colab: boolean;
  adminSdk: boolean;
}
