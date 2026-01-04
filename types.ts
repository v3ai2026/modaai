
export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export type CompilerStatus = 'IDLE' | 'CONFIGURING' | 'COMPILING' | 'DEPLOYING' | 'READY';

export enum SectionId {
  Home = '01',
  Model = '02',
  Compiler = '03',
  Automation = '04',
  Editor = '05',
  Feedback = '06',
  Sectors = '07',
  Workflow = '08',
  Craftsmanship = '09'
}

export interface CompilationResult {
  code?: string;
  videoUrl?: string;
  arModelStatus?: string;
  deploymentUrl?: string;
}
