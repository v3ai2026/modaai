
import React from 'react';
import { CompilerStatus } from '../types';

interface RightPanelProps {
  status: CompilerStatus;
}

const RightPanel: React.FC<RightPanelProps> = ({ status }) => {
  return (
    <aside className="w-80 border-l border-google-border bg-google-bg p-6 space-y-8 shrink-0 studio-scroll overflow-y-auto">
      <div>
        <h3 className="text-[11px] font-bold text-google-textMuted uppercase tracking-[0.2em] mb-6">全栈生命周期</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-google-surface border border-google-border rounded-xl group hover:border-google-accent transition-colors">
             <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold">Vertex Endpoint</span>
                <span className="w-2 h-2 rounded-full bg-google-success animate-pulse"></span>
             </div>
             <div className="flex items-end justify-between">
                <p className="text-[10px] text-google-textMuted font-mono">gen-lang-client-0654563230</p>
                <p className="text-xs font-bold text-google-accent">Active</p>
             </div>
          </div>

          <div className="p-4 bg-google-surface border border-google-border rounded-xl group hover:border-amber-500 transition-colors">
             <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-amber-500">Monetization Sync</span>
                <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span>
             </div>
             <div className="flex items-end justify-between">
                <p className="text-[10px] text-google-textMuted font-mono">Firebase Docs | Quotas</p>
                <p className="text-xs font-bold text-amber-500">Live</p>
             </div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-google-border">
        <h3 className="text-[11px] font-bold text-google-textMuted uppercase tracking-[0.2em] mb-6">实时部署矩阵 (Matrix)</h3>
        <div className="space-y-4">
           {[
             { label: 'Cloud Hosting', val: 'moda-studio-pro.web.app', active: true },
             { label: 'Edge Runtime', val: 'Vercel Lambda (Tokyo)', active: true },
             { label: 'Colab Relay', val: 'FASTAPI_PROXY_01', active: false }
           ].map((item, idx) => (
             <div key={idx} className="flex flex-col gap-1 p-3 bg-google-bg/50 border border-google-border rounded-lg">
                <div className="flex justify-between items-center">
                   <span className="text-[9px] font-bold text-google-textMuted uppercase">{item.label}</span>
                   <div className={`w-1.5 h-1.5 rounded-full ${item.active ? 'bg-google-success' : 'bg-red-500'}`}></div>
                </div>
                <span className="text-[10px] font-mono truncate">{item.val}</span>
             </div>
           ))}
        </div>
      </div>

      <div className="mt-auto pt-10 border-t border-google-border">
        <div className="p-5 bg-google-accent/5 border border-google-accent/20 rounded-2xl relative overflow-hidden">
           <div className="absolute -right-4 -bottom-4 text-4xl opacity-10 grayscale">🏢</div>
           <p className="text-[10px] font-bold text-google-accent uppercase mb-4 tracking-widest">商业化健康度</p>
           <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-mono font-bold">100</span>
              <span className="text-lg font-mono text-google-accent">%</span>
           </div>
           <p className="text-[10px] text-google-textMuted leading-relaxed">全栈认证已锁定。Firebase Admin SDK 与 Vertex AI 节点已在项目 gen-lang-client-0654563230 中完全对齐并具备商业分发能力。</p>
        </div>
      </div>
    </aside>
  );
};

export default RightPanel;
