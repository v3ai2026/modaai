
import React from 'react';
import { CompilerStatus } from '../types';

interface RightPanelProps {
  status: CompilerStatus;
}

const RightPanel: React.FC<RightPanelProps> = ({ status }) => {
  return (
    <aside className="w-72 border-l border-google-border bg-google-bg p-6 space-y-8 shrink-0 studio-scroll overflow-y-auto">
      <div>
        <h3 className="text-[11px] font-bold text-google-textMuted uppercase tracking-[0.2em] mb-6">编译器设置</h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-medium text-google-text">模型选择</label>
            <select className="w-full bg-google-surface border border-google-border rounded-md px-3 py-2 text-sm focus:border-google-accent outline-none">
              <option>Gemini 3 Pro (复杂逻辑)</option>
              <option>Gemini 2.5 Flash (极速响应)</option>
              <option>Veo 3.1 (视频生成)</option>
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-google-text">推理强度 (Temperature)</label>
              <span className="text-[10px] font-mono text-google-accent">0.7</span>
            </div>
            <input type="range" className="w-full accent-google-accent" min="0" max="100" />
          </div>

          <div className="pt-6 border-t border-google-border">
            <h4 className="text-[11px] font-bold text-google-textMuted uppercase tracking-[0.2em] mb-4">行业蓝图对齐</h4>
            <div className="space-y-3">
               {['人工智能市场', 'AR 电子商务', '图像/视频合成'].map(item => (
                 <label key={item} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-google-accent" />
                    <span className="text-xs group-hover:text-google-accent transition-colors">{item}</span>
                 </label>
               ))}
            </div>
          </div>
          
          <div className="pt-6 border-t border-google-border">
            <h4 className="text-[11px] font-bold text-google-textMuted uppercase tracking-[0.2em] mb-4">一键部署开关</h4>
            <div className="flex items-center justify-between p-3 bg-google-surface rounded-lg border border-google-border">
               <span className="text-xs">Vercel 自动化</span>
               <div className="w-8 h-4 bg-google-accent rounded-full relative">
                  <div className={`absolute ${status === 'DEPLOYING' || status === 'READY' ? 'right-1' : 'left-1'} top-1 w-2 h-2 bg-google-bg rounded-full transition-all`}></div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-10">
        <div className="p-4 bg-google-accent/5 rounded-xl border border-google-accent/20">
           <p className="text-[10px] text-google-accent font-bold uppercase mb-2">Token 消耗量</p>
           <div className="flex items-end gap-1">
              <span className="text-2xl font-mono font-bold">1,204</span>
              <span className="text-[10px] text-google-textMuted mb-1">/ 1M</span>
           </div>
        </div>
      </div>
    </aside>
  );
};

export default RightPanel;
