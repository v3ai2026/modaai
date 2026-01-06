
import React, { useState } from 'react';
import { 
  ArrowUpRight, Zap, Bell, Search, 
  ChevronDown, Hexagon, Component, Globe, Cpu, Server, Shield, Network, Link2
} from 'lucide-react';
import { PrivateNode } from '../types';
import { APIGateway } from './APIGateway';

interface AdminDashboardProps {
  nodes: PrivateNode[];
}

const RECENT_ORDERS = [
  { id: '#8832', product: 'Obsidian Trench', customer: 'Alex D.', price: '$450.00', status: 'Processing', time: '2m ago' },
  { id: '#8831', product: 'Digital Silk Scarf', customer: 'Sarah L.', price: '$120.00', status: 'Fulfilled', time: '15m ago' },
  { id: '#8830', product: 'Void Black Boots', customer: 'Mike T.', price: '$299.00', status: 'Fulfilled', time: '1h ago' },
  { id: '#8829', product: 'Carbon Fiber Bag', customer: 'Jessica W.', price: '$850.00', status: 'Processing', time: '3h ago' },
];

const AI_LOGS = [
  { time: '10:42:01', event: 'Neural Synth active on Node-04' },
  { time: '10:41:55', event: 'Gateway encryption handshake complete' },
  { time: '10:40:22', event: 'Global routing table updated: 5 points' },
];

const StatCard = ({ title, value, change, trend }: { title: string, value: string, change: string, trend: 'up' | 'down' }) => (
  <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 p-8 rounded-[2rem] flex flex-col justify-between h-40 hover:border-google-accent/30 transition-all duration-500 group relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
      <Component size={48} />
    </div>
    <div className="flex justify-between items-start relative z-10">
      <span className="text-white/30 text-[9px] font-black uppercase tracking-[0.4em] italic">{title}</span>
      <span className={`text-[9px] font-black px-3 py-1 rounded-full flex items-center gap-1 italic ${trend === 'up' ? 'bg-google-success/10 text-google-success border border-google-success/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
        {change} <ArrowUpRight size={12} className={trend === 'down' ? 'rotate-90' : ''} />
      </span>
    </div>
    <div className="text-5xl font-black italic tracking-tighter text-white group-hover:scale-105 transition-transform origin-left relative z-10">{value}</div>
  </div>
);

const AdminDashboard: React.FC<AdminDashboardProps> = ({ nodes }) => {
  const [tab, setTab] = useState<'OVERVIEW' | 'GATEWAY' | 'EXTERNAL_API'>('GATEWAY');
  const onlineCount = nodes.filter(n => n.status === 'ONLINE').length;

  return (
    <div className="p-12 h-full overflow-y-auto no-scrollbar bg-[#050505] animate-in fade-in duration-1000 relative">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-google-accent/[0.02] blur-[150px] rounded-full pointer-events-none" />
      
      {/* Header View */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16 relative z-10">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none">Mission Control</h1>
          <div className="flex gap-8 mt-6">
            <button onClick={() => setTab('OVERVIEW')} className={`text-[11px] font-black uppercase tracking-[0.4em] italic transition-all relative py-2 ${tab === 'OVERVIEW' ? 'text-google-accent' : 'text-white/20'}`}>
              Fleet_Overview
              {tab === 'OVERVIEW' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-google-accent shadow-[0_0_10px_#8ab4f8]" />}
            </button>
            <button onClick={() => setTab('GATEWAY')} className={`text-[11px] font-black uppercase tracking-[0.4em] italic transition-all relative py-2 ${tab === 'GATEWAY' ? 'text-google-accent' : 'text-white/20'}`}>
              Neural_Gateway
              {tab === 'GATEWAY' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-google-accent shadow-[0_0_10px_#8ab4f8]" />}
            </button>
            <button onClick={() => setTab('EXTERNAL_API')} className={`text-[11px] font-black uppercase tracking-[0.4em] italic transition-all relative py-2 ${tab === 'EXTERNAL_API' ? 'text-google-accent' : 'text-white/20'}`}>
              External_Streams
              {tab === 'EXTERNAL_API' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-google-accent shadow-[0_0_10px_#8ab4f8]" />}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 px-5 py-2.5 bg-google-accent/10 border border-google-accent/20 rounded-full">
            <Network size={16} className="text-google-accent" />
            <span className="text-[10px] font-black text-google-accent uppercase tracking-widest italic">Node Status: Optimized</span>
          </div>
        </div>
      </header>

      {tab === 'OVERVIEW' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 relative z-10">
            <StatCard title="Global Revenue" value="$128.4K" change="+12.5%" trend="up" />
            <StatCard title="RT Visitors" value="2,845" change="+34.2%" trend="up" />
            <StatCard title="Conversion Yield" value="3.2%" change="-0.4%" trend="down" />
            <StatCard title="Node Integrity" value={`${onlineCount}/${nodes.length}`} change="Stable" trend="up" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 relative z-10">
            <div className="lg:col-span-2 bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none"><Hexagon size={180} /></div>
              <div className="flex justify-between items-center mb-10 relative z-10">
                <h3 className="text-[11px] font-black italic text-white/40 uppercase tracking-[0.5em]">Revenue Analytics</h3>
              </div>
              <div className="h-72 flex items-end gap-3 relative z-10">
                {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 95].map((h, i) => (
                  <div key={i} className="flex-1 bg-white/[0.05] hover:bg-google-accent/40 transition-all duration-500 rounded-t-lg relative group/bar shadow-inner" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>

            <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[3rem] p-10 flex flex-col shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-10 text-google-accent">
                <Zap size={20} fill="currentColor" /><h3 className="text-[11px] font-black italic text-white uppercase tracking-[0.5em]">Neural Logs</h3>
              </div>
              <div className="flex-1 bg-black/60 rounded-[2rem] border border-white/5 p-6 font-mono text-[10px] text-white/30 overflow-hidden relative shadow-inner">
                <div className="mt-4 space-y-4">
                  {AI_LOGS.map((log, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-white/10">[{log.time}]</span>
                      <span className={i === 0 ? 'text-google-success/80 animate-pulse' : 'text-white/40'}>{log.event}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {tab === 'GATEWAY' && (
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 h-full max-h-[1200px]">
           <div className="lg:col-span-8 bg-black/40 backdrop-blur-3xl border border-white/5 rounded-[4rem] p-12 min-h-[600px] flex items-center justify-center relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_2px,transparent_2px)] bg-[size:40px_40px] opacity-20"></div>
              
              <div className="relative w-full h-full flex items-center justify-center">
                 <div className="absolute w-[90%] h-[90%] border border-google-accent/5 rounded-full animate-spin-slow opacity-20"></div>
                 <div className="absolute w-[60%] h-[60%] border border-google-success/5 rounded-full animate-reverse-spin opacity-20"></div>
                 
                 <div className="relative z-10 flex flex-col items-center">
                    <div className="w-40 h-40 bg-google-accent/10 border-2 border-google-accent/40 rounded-[3rem] flex items-center justify-center text-google-accent shadow-[0_0_100px_rgba(138,180,248,0.2)] mb-16 animate-pulse group">
                       <Shield size={64} className="group-hover:scale-110 transition-transform" />
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-16">
                       {nodes.map(node => (
                          <div key={node.id} className="flex flex-col items-center gap-6 group">
                             <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center border transition-all duration-1000 shadow-2xl ${node.status === 'ONLINE' ? 'bg-google-success/10 border-google-success/40 text-google-success' : 'bg-red-500/10 border-red-500/40 text-red-500'}`}>
                                {node.type === 'LOGIC' && <Cpu size={28} />}
                                {node.type === 'RENDER' && <Zap size={28} />}
                                {node.type === 'DATA' && <Server size={28} />}
                                {node.type === 'GATEWAY' && <Network size={28} />}
                                {node.type === 'VIDEO' && <Globe size={28} />}
                             </div>
                             <div className="text-center">
                               <p className="text-[10px] font-black uppercase tracking-widest text-white/60 italic group-hover:text-white transition-colors">{node.name}</p>
                               <p className="text-[8px] font-mono text-white/20 mt-1">{node.status} /// {Math.round(node.load)}%</p>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-4 flex flex-col gap-10">
              <div className="p-10 bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[3rem] shadow-2xl">
                 <h4 className="text-[10px] font-black text-google-accent uppercase tracking-[0.5em] mb-8 italic">Gateway_Protocols</h4>
                 <div className="space-y-6">
                    {[
                      { label: 'Neural Link', status: 'STABLE', val: '802.11ax' },
                      { label: 'Encryption', status: 'ACTIVE', val: 'AES-256' },
                      { label: 'Relay Nodes', status: 'BALANCED', val: '5/5' }
                    ].map((p, i) => (
                      <div key={i} className="flex justify-between items-center p-6 bg-black/40 border border-white/5 rounded-2xl group hover:border-google-accent transition-all">
                        <div>
                          <p className="text-[11px] font-black text-white/80 uppercase italic">{p.label}</p>
                          <p className="text-[8px] font-mono text-white/20 mt-1 uppercase">{p.val}</p>
                        </div>
                        <span className="text-[10px] font-black text-google-success tracking-widest italic">{p.status}</span>
                      </div>
                    ))}
                 </div>
              </div>
              
              <div className="flex-1 bg-google-accent/5 border border-google-accent/20 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center group">
                 <Network size={64} className="text-google-accent/20 mb-10 group-hover:scale-110 transition-transform" />
                 <p className="text-[11px] font-black text-white/30 uppercase tracking-[0.4em] italic leading-relaxed">
                   Private Edge Gateway active. <br/>Cluster is physically isolated.
                 </p>
              </div>
           </div>
        </div>
      )}

      {tab === 'EXTERNAL_API' && (
        <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
           <APIGateway />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
