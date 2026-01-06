
import React from 'react';
import { Motion } from '@/ui/animation';
import { 
  Cpu, Zap, Server, Network, Globe, 
  Shield, Activity, Share2, CornerRightDown
} from '@/ui/icons';
import { PrivateNode } from '../types';

export const ClusterTopology: React.FC<{ nodes: PrivateNode[] }> = ({ nodes }) => {
  return (
    <div className="h-full bg-[#050505] p-12 overflow-hidden flex flex-col animate-in fade-in duration-1000">
      <header className="mb-20 flex justify-between items-end">
        <div>
          <span className="text-google-accent text-[10px] font-black uppercase tracking-[0.5em] mb-4 block italic">Infrastructure_Level_0</span>
          <h1 className="text-5xl font-black italic text-white uppercase tracking-tighter leading-none">Node Topology</h1>
        </div>
        <div className="flex gap-4 text-white/20 font-mono text-[9px] uppercase tracking-widest italic">
          <span>Active_Nodes: {nodes.filter(n => n.status === 'ONLINE').length}/5</span>
          <span>///</span>
          <span>Latency: STABLE</span>
        </div>
      </header>

      <main className="flex-1 relative flex items-center justify-center">
        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-google-accent/[0.02] blur-[200px] rounded-full" />
        
        {/* SVG Connection Lines (The Web) */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
           <defs>
             <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#8ab4f8" stopOpacity="0" />
               <stop offset="50%" stopColor="#8ab4f8" stopOpacity="1" />
               <stop offset="100%" stopColor="#8ab4f8" stopOpacity="0" />
             </linearGradient>
           </defs>
           {/* Central Hub to Nodes */}
           <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="url(#line-grad)" strokeWidth="1" />
           <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="url(#line-grad)" strokeWidth="1" />
           <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="url(#line-grad)" strokeWidth="1" />
           <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="url(#line-grad)" strokeWidth="1" />
           <line x1="50%" y1="50%" x2="50%" y2="10%" stroke="url(#line-grad)" strokeWidth="1" />
        </svg>

        {/* Central Gateway Node */}
        <div className="relative z-10 w-48 h-48 flex items-center justify-center">
          <Motion 
            animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
            className="w-full h-full bg-google-accent/5 border border-google-accent/30 rounded-[3rem] backdrop-blur-3xl flex flex-col items-center justify-center shadow-[0_0_100px_rgba(138,180,248,0.15)] group"
          >
            <Shield size={48} className="text-google-accent mb-4 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-black text-white/60 uppercase tracking-widest italic">MCP_GATEWAY</span>
          </Motion>
          {/* Signal Ripples */}
          <div className="absolute inset-0 rounded-[3rem] border border-google-accent/40 animate-ping opacity-20"></div>
        </div>

        {/* Outer Perimeter Nodes */}
        <PeripheralNode x="-35%" y="-35%" icon={<Cpu size={24}/>} name="Logic-01" load={12} />
        <PeripheralNode x="35%" y="-35%" icon={<Zap size={24}/>} name="Render-02" load={45} />
        <PeripheralNode x="-35%" y="35%" icon={<Server size={24}/>} name="Data-03" load={5} />
        <PeripheralNode x="35%" y="35%" icon={<Globe size={24}/>} name="Veo-Engine" load={88} warning />
        <PeripheralNode x="0%" y="-45%" icon={<Network size={24}/>} name="CDN-Edge" load={22} />
      </main>

      {/* Cluster Stats Footer */}
      <footer className="grid grid-cols-3 gap-12 pt-12 border-t border-white/5">
         <StatItem label="Throughput" val="1.2 GB/s" trend="+4%" />
         <StatItem label="Power Index" val="99.4%" trend="Stable" />
         <StatItem label="Error Rate" val="0.002%" trend="-0.1%" />
      </footer>
    </div>
  );
};

const PeripheralNode = ({ x, y, icon, name, load, warning }: any) => (
  <Motion 
    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    className="absolute flex flex-col items-center gap-4 group"
    style={{ left: `calc(50% + ${x})`, top: `calc(50% + ${y})`, transform: 'translate(-50%, -50%)' }}
  >
    <div className={`w-20 h-20 rounded-3xl border flex items-center justify-center transition-all duration-500 shadow-2xl relative
      ${warning ? 'bg-red-500/10 border-red-500/40 text-red-500' : 'bg-white/[0.02] border-white/10 text-white/40 group-hover:border-google-accent group-hover:text-google-accent'}
    `}>
       {icon}
       {/* Load Progress Circle */}
       <div className="absolute -inset-2">
         <svg className="w-full h-full -rotate-90">
           <circle cx="50%" cy="50%" r="48%" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="100 100" strokeDashoffset={100 - load} className="opacity-20" />
         </svg>
       </div>
    </div>
    <div className="text-center">
       <p className="text-[10px] font-black uppercase tracking-widest text-white/40 italic mb-1 group-hover:text-white transition-colors">{name}</p>
       <p className={`text-[8px] font-mono ${warning ? 'text-red-400' : 'text-white/20'}`}>{load}% LOAD</p>
    </div>
  </Motion>
);

const StatItem = ({ label, val, trend }: any) => (
  <div className="flex flex-col gap-2">
     <span className="text-[9px] font-black text-white/20 uppercase tracking-widest italic">{label}</span>
     <div className="flex items-baseline gap-4">
        <span className="text-2xl font-black italic text-white tracking-tighter">{val}</span>
        <span className="text-[9px] font-bold text-google-success italic">{trend}</span>
     </div>
  </div>
);

const NodeDecoration = ({ x, y, text }: { x: number, y: number, text: string }) => (
  <div className="absolute opacity-10 select-none pointer-events-none" style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}>
    <span className="text-[120px] font-black italic text-white tracking-tighter uppercase">{text}</span>
  </div>
);
