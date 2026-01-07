
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gavel, AlertCircle, ShieldCheck, FileText, Globe, Key, Database, Activity, Lock, Layers } from 'lucide-react';
import { LuxuryCard, StatusBadge, GoldButton } from './shared/Library';

export const Governance: React.FC = () => {
  const [policies] = useState([
    { id: 'p1', label: 'Local_Sovereignty_Strict', status: 'Enforced', desc: 'Data must remain on local nodes at all times. Cloud synchronization of secrets is prohibited.' },
    { id: 'p2', label: 'Neural_Audit_Trail', status: 'Active', desc: 'All inference calls to external LLMs must be logged with hash-level integrity checking.' },
    { id: 'p3', label: 'Artifact_Residency', status: 'Enforced', desc: 'Generated assets must be cached in the Brand Vault before export.' },
    { id: 'p4', label: 'Zero_Knowledge_Auth', status: 'Pending', desc: 'Implementing institutional credential handshakes via local RSA clusters.' }
  ]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 pb-20">
      <header className="flex justify-between items-end mb-10 border-b border-white/10 pb-12">
        <div>
          <h2 className="text-5xl font-black italic text-white uppercase tracking-tighter leading-none mb-4 font-sans">Institutional Governance</h2>
          <p className="text-[10px] font-mono text-luxury-gold/50 uppercase tracking-[0.5em] italic">Compliance_Framework_Level_Alpha</p>
        </div>
        <GoldButton variant="outline">
           <FileText className="inline mr-3" size={14} /> Export_Audit_Report
        </GoldButton>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-10">
           <LuxuryCard title="Policy Engine" icon={Gavel}>
              <div className="space-y-8">
                 {policies.map((p) => (
                   <div key={p.id} className="p-10 bg-black/40 border border-white/5 rounded-[3rem] group/policy hover:border-luxury-gold/20 transition-all duration-700">
                      <div className="flex justify-between items-center mb-6">
                         <div className="flex items-center gap-4">
                            <span className="text-sm font-black text-white uppercase italic tracking-wider group-hover:text-luxury-gold transition-colors">{p.label}</span>
                         </div>
                         <StatusBadge status={p.status} type={p.status === 'Enforced' ? 'success' : 'warning'} />
                      </div>
                      <p className="text-sm text-white/40 italic font-light leading-relaxed mb-8 border-l-2 border-white/5 pl-8">
                         {p.desc}
                      </p>
                      <div className="flex justify-between items-center text-[9px] font-mono text-white/20 uppercase tracking-[0.4em] italic">
                         <span>Updated: 2025-05-12</span>
                         <span className="text-luxury-gold/40">v1.2.0_STABLE</span>
                      </div>
                   </div>
                 ))}
              </div>
           </LuxuryCard>
        </div>

        <div className="lg:col-span-5 space-y-10">
           <LuxuryCard title="Compliance Health" icon={ShieldCheck}>
              <div className="space-y-8">
                 {[
                   { label: 'GDPR_Residency', val: 100 },
                   { label: 'Cyber_Sec_Audit', val: 94 },
                   { label: 'Neural_Isolation', val: 100 }
                 ].map((stat, i) => (
                   <div key={i} className="space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest italic">
                         <span className="text-white/40">{stat.label}</span>
                         <span className="text-luxury-gold">{stat.val}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${stat.val}%` }}
                           className={`h-full ${stat.val === 100 ? 'bg-google-success' : 'bg-luxury-gold'} shadow-[0_0_10px_currentColor] opacity-60`}
                         />
                      </div>
                   </div>
                 ))}
              </div>
           </LuxuryCard>

           <LuxuryCard title="Protocol Diagnostics" icon={Activity} className="bg-red-500/[0.02] !border-red-500/10">
              <div className="flex items-start gap-6 p-8 bg-black/40 border border-red-500/10 rounded-[2.5rem] relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-10 text-red-500 group-hover:scale-110 transition-transform"><AlertCircle size={80} /></div>
                 <AlertCircle size={24} className="text-red-500 shrink-0 mt-1" />
                 <div className="space-y-4 relative z-10">
                    <h4 className="text-sm font-black italic text-red-500 uppercase tracking-widest">Integrity_Warning</h4>
                    <p className="text-[11px] text-white/40 leading-relaxed italic font-light">
                       Node_04 has exceeded inference threshold without an active rotation handshake. Policy <span className="text-red-400">P2_Neural_Audit</span> requires manual verification.
                    </p>
                    <GoldButton variant="outline" className="!px-6 !py-3 !text-[9px] border-red-500/20 text-red-500 hover:bg-red-500">
                       Acknowledge_Risk
                    </GoldButton>
                 </div>
              </div>
           </LuxuryCard>

           <LuxuryCard title="Governance Flow" icon={Layers}>
              <div className="font-mono text-[9px] text-white/20 italic space-y-4">
                 <p className="flex items-center gap-3"><span className="text-luxury-gold">{'>>>'}</span> Scanning Neural Registry...</p>
                 <p className="flex items-center gap-3"><span className="text-luxury-gold">{'>>>'}</span> All Policies: STABLE</p>
                 <p className="flex items-center gap-3"><span className="text-google-success">{'>>>'}</span> AUDIT_SYNC: PASSED_Institutional_v4</p>
              </div>
           </LuxuryCard>
        </div>
      </div>
    </motion.div>
  );
};
