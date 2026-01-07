
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Search, ShieldCheck } from 'lucide-react';
import { GoldButton, StatusBadge, LuxuryTable, LuxuryInput } from './shared/Library';

const INITIAL_MEMBERS = [
  { id: 'm1', name: 'Root Architect', role: 'Super_Admin', status: 'Active', avatar: 'RA' },
  { id: 'm2', name: 'Neural Proxy', role: 'Editor', status: 'Away', avatar: 'NP' },
  { id: 'm3', name: 'Compliance Auditor', role: 'Auditor', status: 'Offline', avatar: 'CA' }
];

export const Members: React.FC = () => {
  const [search, setSearch] = useState('');

  const headers = ["Identity_Signature", "Role_Assignment", "Uplink_Node", "Access_Status"];
  
  const rows = INITIAL_MEMBERS.map(m => [
    <div className="flex items-center gap-6">
      <div className="w-12 h-12 bg-luxury-gold/10 border border-luxury-gold/30 rounded-2xl flex items-center justify-center text-luxury-gold font-black italic">{m.avatar}</div>
      <div className="flex flex-col">
        <span className="font-black italic uppercase group-hover:text-luxury-gold tracking-tighter text-lg">{m.name}</span>
        <span className="text-[8px] font-mono text-white/20 uppercase italic tracking-widest">{m.id}</span>
      </div>
    </div>,
    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 italic">{m.role}</span>,
    <span className="text-[8px] font-black text-white/20 uppercase tracking-widest italic bg-white/5 px-3 py-1 rounded-lg border border-white/10">Node_Nexus_01</span>,
    <StatusBadge status={m.status} type={m.status === 'Active' ? 'success' : 'neutral'} />
  ]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 pb-20">
      <header className="flex justify-between items-end mb-10 border-b border-white/10 pb-12">
        <div>
          <h2 className="text-5xl font-black italic text-white uppercase tracking-tighter leading-none mb-4 font-sans">Access Control</h2>
          <p className="text-[10px] font-mono text-luxury-gold/50 uppercase tracking-[0.5em] italic">Institutional_Privilege_Matrix</p>
        </div>
        <div className="flex gap-6 items-center">
           <div className="w-80">
              <LuxuryInput label="" value={search} onChange={setSearch} placeholder="Search_ID..." icon={Search as any} />
           </div>
           <GoldButton>
              <UserPlus className="inline mr-3" size={14} /> Add_Architect
           </GoldButton>
        </div>
      </header>

      <LuxuryTable headers={headers} rows={rows} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {[
          { label: 'Total Architects', val: '12', icon: <Users size={16}/> },
          { label: 'Active Sessions', val: '04', icon: <ShieldCheck size={16}/> },
          { label: 'Security Level', val: 'Alpha', icon: <ShieldCheck size={16}/> }
        ].map((s, i) => (
          <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex items-center justify-between group hover:border-luxury-gold/20 transition-all">
             <div>
                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest italic mb-2">{s.label}</p>
                <p className="text-3xl font-black italic text-white group-hover:text-luxury-gold transition-colors">{s.val}</p>
             </div>
             <div className="text-luxury-gold opacity-20 group-hover:opacity-100 transition-all">{s.icon}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
