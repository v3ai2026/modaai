
import React from 'react';
import { Motion } from '@/ui/animation';
import { 
  Database, CreditCard, TrendingUp, ArrowUpRight, 
  Clock, ShieldCheck, Activity, BarChart3, Layers, Zap, ShoppingCart
} from '@/ui/icons';

export const ComputeVault: React.FC = () => {
  return (
    <div className="h-full bg-black flex flex-col p-12 overflow-y-auto studio-scroll animate-in fade-in duration-1000">
      <header className="mb-16 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-google-success/10 border border-google-success/20 rounded-2xl flex items-center justify-center text-google-success shadow-[0_0_30px_rgba(129,201,149,0.1)]">
            <Database size={28} />
          </div>
          <div>
            <h1 className="text-4xl font-black italic text-white uppercase tracking-tighter leading-none mb-3">Compute Vault</h1>
            <p className="text-[10px] text-white/20 font-mono uppercase tracking-[0.4em] italic leading-none">Resource_Quota_Management</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button className="px-8 py-4 bg-google-success text-google-bg rounded-2xl font-black uppercase text-[10px] tracking-widest italic hover:scale-105 transition-all active:scale-95 shadow-2xl flex items-center gap-3">
            <ShoppingCart size={14} /> Buy Resources
          </button>
        </div>
      </header>

      {/* Main Asset Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16 shrink-0">
        <VaultCard title="Compute Balance" val="8,420" unit="Cores" sub="Syncing..." color="google-success" />
        <VaultCard title="GPU Runtime" val="124.5" unit="Hrs" sub="+12% Usage" color="google-accent" />
        <VaultCard title="Asset Storage" val="4.2" unit="TB" sub="85% Capacity" color="fuchsia-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 shrink-0">
        {/* Usage Analytics */}
        <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 flex flex-col relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-110 transition-transform"><TrendingUp size={120} /></div>
           <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-10 italic">Consumption_Heatmap</h3>
           
           <div className="flex-1 flex items-end gap-3 h-48">
              {[30, 50, 45, 90, 65, 80, 50, 70, 40, 60, 85, 95].map((h, i) => (
                <div key={i} className="flex-1 bg-white/5 hover:bg-google-accent/40 rounded-t-lg transition-all duration-500" style={{ height: `${h}%` }}></div>
              ))}
           </div>
           
           <div className="mt-10 flex justify-between items-center text-[9px] font-mono text-white/20 uppercase tracking-widest">
              <span>May 01</span>
              <span className="text-google-accent">LIVE_TELEMETRY</span>
              <span>May 12</span>
           </div>
        </div>

        {/* Purchase Nodes / Upgrades */}
        <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 flex flex-col shadow-inner">
           <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-10 italic">Instant_Provisioning</h3>
           <div className="space-y-4">
              {[
                { label: 'Neural Core Pkg', price: '$49', desc: '1000 Core Hours', icon: <Zap size={16}/> },
                { label: 'Visual Engine XL', price: '$129', desc: 'Unlimited 4K Synth', icon: <BarChart3 size={16}/> },
                { label: 'Node Cluster V2', price: '$299', desc: 'Dedicated Gateway', icon: <Layers size={16}/> }
              ].map((pkg, i) => (
                <div key={i} className="flex justify-between items-center p-6 bg-black/40 border border-white/5 rounded-2xl group hover:border-google-success/40 transition-all cursor-pointer">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-google-success group-hover:scale-110 transition-transform">{pkg.icon}</div>
                    <div>
                      <p className="text-[12px] font-black text-white uppercase italic">{pkg.label}</p>
                      <p className="text-[10px] text-white/20 italic">{pkg.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black italic text-white tracking-tighter">{pkg.price}</p>
                    <p className="text-[8px] font-black text-google-success uppercase tracking-widest">Activate Now</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

const VaultCard = ({ title, val, unit, sub, color }: any) => (
  <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 p-10 rounded-[3.5rem] relative overflow-hidden group hover:border-white/20 transition-all duration-500 shadow-2xl">
     <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
     <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-8 italic">{title}</p>
     <div className="flex items-baseline gap-4 mb-10">
        <span className={`text-6xl font-black italic text-${color} tracking-tighter`}>{val}</span>
        <span className="text-[12px] font-black text-white/40 uppercase tracking-widest">{unit}</span>
     </div>
     <div className="flex justify-between items-center pt-8 border-t border-white/5">
        <span className={`text-[10px] font-black uppercase italic tracking-widest text-${color}`}>{sub}</span>
        <ArrowUpRight size={16} className="text-white/10" />
     </div>
  </div>
);
