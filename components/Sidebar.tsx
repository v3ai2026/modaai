
import React from 'react';

interface SidebarProps {
  activeStep: string;
  onStepChange: (id: string) => void;
}

const steps = [
  { id: '01', title: '环境与项目初始化', icon: '📁' },
  { id: '02', title: 'LLM API 节点选择', icon: '🧠' },
  { id: '03', title: '提示到组件生成', icon: '✨' },
  { id: '04', title: 'Vercel Automation', icon: '🚀' },
  { id: '05', title: '可视化编辑器', icon: '🎨' },
  { id: '06', title: '优化与反馈循环', icon: '♻️' }
];

const Sidebar: React.FC<SidebarProps> = ({ activeStep, onStepChange }) => {
  return (
    <aside className="w-64 border-r border-google-border flex flex-col bg-google-bg shrink-0">
      <div className="p-4 border-b border-google-border">
        <button className="w-full flex items-center gap-3 px-4 py-3 bg-google-accent/10 border border-google-accent/20 rounded-lg text-google-accent hover:bg-google-accent/20 transition-all">
          <span className="text-xl">+</span>
          <span className="text-sm font-bold">新建编译任务</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto studio-scroll py-4">
        <p className="px-6 text-[10px] font-bold text-google-textMuted uppercase tracking-[0.2em] mb-4">实施工作流</p>
        <nav className="flex flex-col">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => onStepChange(step.id)}
              className={`flex items-center gap-4 px-6 py-3.5 text-sm font-medium transition-all hover:bg-google-surface/50 ${
                activeStep === step.id ? 'active-step' : 'text-google-textMuted'
              }`}
            >
              <span className="text-lg">{step.icon}</span>
              <span>{step.title}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-google-border space-y-2">
        <div className="flex items-center gap-3 px-4 py-2 hover:bg-google-surface rounded-md text-xs text-google-textMuted cursor-pointer">
          <span>⚙️</span>
          <span>系统设置</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 hover:bg-google-surface rounded-md text-xs text-google-textMuted cursor-pointer">
          <span>📖</span>
          <span>API 文档</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
