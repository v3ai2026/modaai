
import React from 'react';
import { SectionId } from '../types';
import { 
  LayoutDashboard, 
  Zap, 
  ShoppingCart, 
  Palette, 
  Settings, 
  Plus,
  Radio,
  Book,
  Monitor,
  Network,
  Database,
  Briefcase
} from '@/ui/icons';

interface SidebarProps {
  activeStep: string;
  onStepChange: (id: string) => void;
  isAuthenticated?: boolean;
}

const mainBlocks = [
  { id: SectionId.Dashboard, title: '首页广告', icon: <LayoutDashboard size={22} />, desc: 'Market Analytics' },
  { id: SectionId.MistBuilder, title: '迷失做站', icon: <Zap size={22} />, desc: 'Template & IDE' },
  { id: SectionId.Preview, title: '实时预览', icon: <Monitor size={22} />, desc: 'Live Sandbox' },
  { id: SectionId.AIMarket, title: 'AI 市场', icon: <ShoppingCart size={22} />, desc: 'Integrated & Custom' },
  { id: SectionId.BrandVault, title: '品牌金库', icon: <Briefcase size={22} />, desc: 'Brand_Win_Packages' },
  { id: SectionId.CreationLab, title: '内容创作', icon: <Palette size={22} />, desc: 'Multimodal Lab' },
  { id: SectionId.Newsroom, title: '新闻雷达', icon: <Radio size={22} />, desc: 'Auto Zeitgeist' },
  { id: SectionId.Cluster, title: '集群监控', icon: <Network size={22} />, desc: 'Node Topology' },
  { id: SectionId.Vault, title: '神经记忆', icon: <Database size={22} />, desc: 'Treatment_DB' },
  { id: SectionId.Docs, title: '技术文档', icon: <Book size={22} />, desc: 'Dev Protocol' }
];

const Sidebar: React.FC<SidebarProps> = ({ activeStep, onStepChange, isAuthenticated }) => {
  return (
    <aside className="w-64 border-r border-google-border flex flex-col bg-google-bg shrink-0 z-50">
      <div className="p-6 border-b border-google-border">
        <button className="w-full flex items-center justify-center gap-3 px-4 py-4 bg-google-success text-google-bg rounded-2xl font-black text-[11px] uppercase tracking-widest hover:scale-95 transition-all shadow-xl shadow-google-success/10 group">
          <Plus size={18} className="group-hover:rotate-90 transition-transform" />
          <span>新生产任务</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar py-8">
        <p className="px-8 text-[10px] font-black text-google-textMuted uppercase tracking-[0.4em] mb-8 opacity-40 italic">Business Pillars</p>
        <nav className="flex flex-col space-y-1">
          {mainBlocks.map((block) => (
            <button
              key={block.id}
              onClick={() => onStepChange(block.id)}
              className={`flex items-center gap-5 px-8 py-5 text-sm transition-all group relative ${
                activeStep === block.id 
                  ? 'text-google-success bg-google-success/5 border-r-2 border-google-success' 
                  : 'text-google-textMuted hover:text-google-text hover:bg-white/5'
              }`}
            >
              <div className={`transition-all duration-500 ${activeStep === block.id ? 'scale-110 drop-shadow-[0_0_8px_currentColor]' : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100'}`}>
                {block.icon}
              </div>
              <div className="flex flex-col items-start">
                <span className={`tracking-tighter font-black uppercase text-[12px] ${activeStep === block.id ? 'opacity-100' : 'opacity-70'}`}>
                  {block.title}
                </span>
                <span className="text-[8px] font-mono uppercase tracking-widest opacity-40">{block.desc}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6 border-t border-google-border space-y-3">
        <button 
          onClick={() => onStepChange(SectionId.Admin)}
          className={`w-full flex items-center gap-4 px-4 py-3 border rounded-xl text-[10px] font-black transition-all group ${
            activeStep === SectionId.Admin 
              ? 'bg-google-accent/10 border-google-accent text-google-accent' 
              : 'bg-google-surface border-google-border text-google-textMuted hover:border-google-success hover:text-white'
          }`}
        >
          <Settings size={14} className="group-hover:rotate-180 transition-transform duration-1000" />
          <span className="uppercase tracking-widest">战略后台</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
