
import React from 'react';
import { SectionId } from '../types';

interface SidebarProps {
  activeStep: string;
  onStepChange: (id: string) => void;
  isAuthenticated?: boolean;
}

const steps = [
  { id: SectionId.Home, title: '环境初始化', icon: '📁', protected: false },
  { id: SectionId.CloudSync, title: '云端与全栈集成', icon: '☁️', protected: true },
  { id: SectionId.Compiler, title: '全栈智能编译', icon: '✨', protected: false },
  { id: SectionId.ExtensionGen, title: 'Chrome 扩展生成', icon: '🧩', protected: false },
  { id: SectionId.Automation, title: 'Vercel 自动部署', icon: '🚀', protected: false },
  { id: SectionId.VisualPortal, title: '多模态预览', icon: '🎨', protected: false },
  { id: SectionId.Admin, title: '战略与资产中心', icon: '🎯', protected: true },
  { id: SectionId.Feedback, title: '性能审计', icon: '📊', protected: false }
];

const Sidebar: React.FC<SidebarProps> = ({ activeStep, onStepChange, isAuthenticated }) => {
  return (
    <aside className="w-64 border-r border-google-border flex flex-col bg-google-bg shrink-0">
      <div className="p-4 border-b border-google-border">
        <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-google-accent text-google-bg rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-95 transition-all shadow-lg shadow-google-accent/10">
          <span className="text-lg font-black">+</span>
          <span>新生产任务</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto studio-scroll py-6">
        <p className="px-6 text-[10px] font-black text-google-textMuted uppercase tracking-[0.3em] mb-6 opacity-50">全栈实施流水线</p>
        <nav className="flex flex-col">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => onStepChange(step.id)}
              className={`flex items-center gap-4 px-6 py-4 text-sm font-medium transition-all group relative ${
                activeStep === step.id ? 'text-google-accent bg-google-accent/5' : 'text-google-textMuted hover:text-google-text hover:bg-white/5'
              }`}
            >
              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-google-accent transition-all duration-300 ${activeStep === step.id ? 'opacity-100' : 'opacity-0'}`}></div>
              <span className={`text-xl transition-transform duration-300 group-hover:scale-125 ${activeStep === step.id ? 'scale-110' : ''}`}>{step.icon}</span>
              <span className="tracking-tight flex-1 text-left">{step.title}</span>
              {step.protected && !isAuthenticated && (
                <span className="text-[10px] opacity-40">🔒</span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-google-border space-y-1">
        <div className="flex items-center gap-3 px-4 py-3 hover:bg-google-surface rounded-lg text-xs text-google-textMuted cursor-pointer transition-colors group">
          <span className="group-hover:rotate-45 transition-transform duration-500">⚙️</span>
          <span>全局设置</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
