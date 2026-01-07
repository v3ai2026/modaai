
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, Hexagon, Activity, Layers, Database, 
  Cpu, Globe, ShieldCheck, Zap, Waves 
} from 'lucide-react';
import { PrivateNode } from '../../types';
import { LuxuryCard, StatusBadge } from './shared/Library';

interface DashboardOverviewProps {
  nodes: PrivateNode[];
}

const MetricCard = ({ title, value, change, trend, icon: Icon }: any) => (
  <LuxuryCard className="h-56 flex flex-col justify-between group">
    <div className="flex justify-between items-start">
      <div className="p-3 bg-luxury-gold/5 rounded-xl border border-luxury-gold/10 text-luxury-gold">
        <Icon size={20} />
      </div>
      <StatusBadge status={change} type={trend === 'up' ? 'success' : 'error'} />
    </div>
    <div>
      <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-2 italic">{title}</p>
      <div className="text-5xl font-black italic tracking-tighter text-white group-hover:text-luxury-gold transition-colors duration-500 font-sans">
        {value}
      </div>
    </div>
  </LuxuryCard>
);

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ nodes }) => {
  const [loadHistory, setLoadHistory] = useState<number[]>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadHistory(prev => [...prev.slice(-19), Math.floor(Math.random() * 60) + 20]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <MetricCard title="Operational_Cap" value="$128.4K" change="+12.5%" trend="up" icon={Database} />
        <MetricCard title="Global_Endpoints" value="2,845" change="+34.2%" trend="up" icon={Globe} />
        <MetricCard title="Neural_Latency" value="24ms" change="STABLE" trend="up" icon={Zap} />
        <MetricCard title="Node_Integrity" value="100%" change="SECURE" trend="up" icon={ShieldCheck} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <LuxuryCard title="Neural Load Distribution" icon={Activity} className="lg:col-span-2">
          <div className="flex items-end justify-between h-64 gap-2 mb-8">
            {loadHistory.map((val, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${val}%` }}
                className={`flex-1 rounded-t-lg transition-all duration-700 ${val > 70 ? 'bg-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'bg-luxury-gold/20'}`}
              />
            ))}
          </div>
          <div className="flex justify-between items-center px-6 py-4 bg-black/40 border border-white/5 rounded-2xl">
             <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-google-success animate-pulse shadow-[0_0_8px_#81c995]" />
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest italic">Node_04: High_Performance_Mode</span>
             </div>
             <span className="text-[9px] font-mono text-luxury-gold/40">Load_Avg: {Math.round(loadHistory.reduce((a, b) => a + b, 0) / (loadHistory.length || 1))}%</span>
          </div>
        </LuxuryCard>

        <LuxuryCard title="System_Integrity_Logs" icon={Layers} className="flex flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar font-mono text-[10px] text-white/20 italic">
            <p className="flex items-center gap-3"><span className="text-luxury-gold">{'>>>'}</span> [10:45:01] Neural Handshake: Verified</p>
            <p className="flex items-center gap-3"><span className="text-luxury-gold">{'>>>'}</span> [10:44:55] Encryption Rotation: AES-GCM</p>
            <p className="flex items-center gap-3"><span className="text-luxury-gold">{'>>>'}</span> [10:44:22] Cache Purge: 142MB Released</p>
            <p className="flex items-center gap-3"><span className="text-luxury-gold">{'>>>'}</span> [10:43:12] Gateway Audit: Status 200</p>
            <p className="flex items-center gap-3"><span className="text-luxury-gold">{'>>>'}</span> [10:42:01] Kernel Uplink: Node_Nexus</p>
            <p className="flex items-center gap-3 text-google-success animate-pulse"><span className="text-google-success">{'>>>'}</span> INTEGRITY_CHECK: ALL_SYSTEMS_GO</p>
          </div>
        </LuxuryCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <LuxuryCard title="Operational Overview" icon={Cpu}>
            <div className="space-y-6">
               {[
                 { label: 'Cluster Connectivity', val: '99.99%', status: 'success' },
                 { label: 'Data Sovereignty', val: 'LOCAL_ONLY', status: 'success' },
                 { label: 'Inference Quota', val: '842/1000', status: 'warning' }
               ].map((item, i) => (
                 <div key={i} className="flex justify-between items-center p-6 bg-black/40 border border-white/5 rounded-2xl">
                    <span className="text-xs font-black text-white/60 uppercase italic tracking-wider">{item.label}</span>
                    <div className="flex items-center gap-4">
                       <span className="text-sm font-mono text-white/80">{item.val}</span>
                       <StatusBadge status="OK" type={item.status as any} />
                    </div>
                 </div>
               ))}
            </div>
         </LuxuryCard>
         <LuxuryCard title="Topology Health" icon={Waves}>
            <div className="relative h-64 flex items-center justify-center">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                 className="absolute w-48 h-48 border border-dashed border-luxury-gold/10 rounded-full"
               />
               <div className="w-24 h-24 bg-luxury-gold/5 border border-luxury-gold/20 rounded-full flex items-center justify-center text-luxury-gold shadow-[0_0_50px_rgba(212,175,55,0.1)]">
                  <Hexagon size={40} className="animate-pulse" />
               </div>
               <div className="absolute inset-0 flex items-center justify-center">
                  {[0, 60, 120, 180, 240, 300].map(deg => (
                    <div key={deg} className="absolute h-full w-0.5 bg-gradient-to-t from-transparent via-luxury-gold/10 to-transparent" style={{ transform: `rotate(${deg}deg)` }} />
                  ))}
               </div>
            </div>
         </LuxuryCard>
      </div>
    </motion.div>
  );
};
