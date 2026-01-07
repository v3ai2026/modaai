
import React from 'react';
import { CompilerStatus, PrivateNode } from '../types';

interface RightPanelProps { 
  status: CompilerStatus; 
  nodes: PrivateNode[];
  onNodeControl: (id: string, action: 'RESTART' | 'TOGGLE') => void;
}

const RightPanel: React.FC<RightPanelProps> = ({ status, nodes, onNodeControl }) => {
  const avgLoad = Math.round(nodes.reduce((acc, node) => acc + node.load, 0) / nodes.length);
  const onlineCount = nodes.filter(n => n.status === 'ONLINE').length;

  return (
    <aside className="w-80 border-l border-google-border bg-google-bg p-6 space-y-8 shrink-0 studio-scroll overflow-y-auto hidden xl:block">
      <div>
        <h3 className="text-[11px] font-black text-google-textMuted uppercase tracking-[0.3em] mb-8 border-b border-google-border pb-2 italic">Cluster Integrity</h3>
        
        <div className="space-y-4">
          <div className="p-5 bg-google-surface border border-google-border rounded-2xl group hover:border-google-success transition-all duration-500">
             <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black uppercase text-white tracking-widest">Compute Fleet</span>
                <div className={`w-2 h-2 rounded-full ${onlineCount === nodes.length ? 'bg-google-success' : 'bg-red-500'} shadow-[0_0_8px_currentColor]`}></div>
             </div>
             <div className="flex items-end justify-between">
                <div className="flex items-baseline gap-1">
                  <p className="text-3xl font-black italic">{onlineCount}</p>
                  <p className="text-[10px] text-google-textMuted">/ {nodes.length}</p>
                </div>
                <p className="text-[10px] font-black text-google-success uppercase tracking-widest">Healthy</p>
             </div>

             {/* Node Management List */}
             <div className="mt-8 space-y-3 pt-4 border-t border-google-border/20">
                {nodes.map(node => (
                  <div key={node.id} className="p-3 bg-google-bg/50 border border-google-border rounded-xl group/node">
                    <div className="flex justify-between items-center">
                       <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${node.status === 'ONLINE' ? 'bg-google-success' : node.status === 'BUSY' ? 'bg-google-accent animate-pulse' : 'bg-red-500'}`}></div>
                          <span className="text-[9px] font-bold text-google-text uppercase tracking-tighter truncate max-w-[100px]">{node.name}</span>
                       </div>
                       <span className="text-[8px] font-mono text-google-textMuted">{Math.round(node.load)}%</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3 opacity-0 group-hover/node:opacity-100 transition-opacity">
                       <button 
                        onClick={() => onNodeControl(node.id, 'RESTART')}
                        className="bg-google-surfaceLight border border-google-border py-1 rounded text-[8px] font-black uppercase text-zinc-400 hover:text-google-accent hover:border-google-accent transition-all"
                       >
                         Restart
                       </button>
                       <button 
                        onClick={() => onNodeControl(node.id, 'TOGGLE')}
                        className={`bg-google-surfaceLight border border-google-border py-1 rounded text-[8px] font-black uppercase transition-all ${node.status === 'ONLINE' ? 'text-red-400 hover:bg-red-500/10 hover:border-red-500' : 'text-google-success hover:bg-google-success/10 hover:border-google-success'}`}
                       >
                         {node.status === 'ONLINE' ? 'Shut Down' : 'Power On'}
                       </button>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="p-5 bg-google-surface border border-google-border rounded-2xl group hover:border-google-accent transition-all duration-500">
             <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black uppercase text-white tracking-widest">Memory Sync</span>
                <span className="w-2 h-2 rounded-full bg-google-accent shadow-[0_0_8px_#8ab4f8] animate-pulse"></span>
             </div>
             <div className="flex items-end justify-between">
                <p className="text-[10px] text-google-textMuted font-mono">Local_RAID_10</p>
                <p className="text-[10px] font-black text-google-accent uppercase tracking-widest">Mounted</p>
             </div>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-google-border">
        <h3 className="text-[11px] font-black text-google-textMuted uppercase tracking-[0.3em] mb-6 italic">Secure Endpoints</h3>
        <div className="space-y-3">
           {[
             { label: 'Admin UI', val: 'https://admin.moda.local', active: true },
             { label: 'Asset Storage', val: '10.0.0.103:9000', active: true },
             { label: 'API Gateway', val: '10.0.0.105:80', active: true },
             { label: 'Dev Runner', val: '127.0.0.1:3000', active: false }
           ].map((item, idx) => (
             <div key={idx} className="flex flex-col gap-1.5 p-4 bg-google-bg/50 border border-google-border rounded-xl hover:bg-google-surface transition-colors cursor-pointer group">
                <div className="flex justify-between items-center">
                   <span className="text-[9px] font-black text-google-textMuted uppercase tracking-widest group-hover:text-google-accent transition-colors">{item.label}</span>
                   <div className={`w-1.5 h-1.5 rounded-full ${item.active ? 'bg-google-success' : 'bg-red-500'} transition-all`}></div>
                </div>
                <span className="text-[10px] font-mono truncate text-google-text group-hover:underline">{item.val}</span>
             </div>
           ))}
        </div>
      </div>

      <div className="mt-auto pt-10 border-t border-google-border">
        <div className="p-6 bg-google-success/5 border border-google-border rounded-3xl relative overflow-hidden group">
           <div className="absolute -right-4 -bottom-4 text-5xl opacity-5 grayscale group-hover:scale-110 transition-transform duration-500">🛡️</div>
           <p className="text-[10px] font-black text-google-success uppercase mb-6 tracking-[0.3em]">Privacy Strength</p>
           <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-black italic text-google-success">100</span>
              <span className="text-xl font-black text-google-success">%</span>
           </div>
           <p className="text-[11px] text-google-textMuted leading-relaxed font-light">
              当前 5 个计算节点已形成物理隔离闭环。所有 <span className="text-white font-bold">逻辑推演、图形渲染、视频合成</span> 均在您内网 10.0.0.x 段内分发执行。
           </p>
        </div>
      </div>
    </aside>
  );
};

export default RightPanel;
