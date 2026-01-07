
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Link, Activity, Save, Globe, Factory, Terminal, RefreshCw, Cpu, Code, Settings } from 'lucide-react';
import { Vendor } from '../../types';
import { LuxuryCard, GoldButton, StatusBadge, LuxuryInput } from './shared/Library';

const INITIAL_VENDORS: Vendor[] = [
  {
    id: 'v1', name: 'Gemini Primary', type: 'AI_MODEL', provider: 'Google AI Studio',
    status: 'active', latency: 450, apiKey: 'sk-proj-****************', 
    endpoint: 'https://generativelanguage.googleapis.com', costPerUnit: 'Free/Tier'
  },
  {
    id: 'v2', name: 'OpenAI Core', type: 'AI_MODEL', provider: 'GPT-4o',
    status: 'active', latency: 120, apiKey: 'sk-proj-******************', 
    endpoint: 'https://api.openai.com/v1', costPerUnit: '$0.01/1k'
  }
];

export const Deployments: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>(INITIAL_VENDORS);
  const [selectedId, setSelectedId] = useState<string>(INITIAL_VENDORS[0].id);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const activeVendor = vendors.find(v => v.id === selectedId) || vendors[0];

  const updateActiveVendor = (field: keyof Vendor, value: string) => {
    setVendors(prev => prev.map(v => v.id === selectedId ? { ...v, [field]: value } : v));
  };

  const handleCommit = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('Deployment configurations committed to Neural Core.');
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col lg:flex-row gap-12 h-full pb-20">
      <div className="lg:w-80 flex flex-col gap-6 shrink-0">
        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.6em] mb-4 italic ml-6">Deployment_Stack</p>
        {vendors.map(vendor => (
          <button 
            key={vendor.id}
            onClick={() => setSelectedId(vendor.id)}
            className={`w-full text-left p-8 rounded-[3rem] border transition-all duration-500 relative overflow-hidden group
              ${selectedId === vendor.id ? 'bg-luxury-gold/5 border-luxury-gold/40' : 'bg-white/[0.01] border-white/5'}
            `}
          >
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${vendor.status === 'active' ? 'bg-luxury-gold' : 'bg-red-500'}`} />
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-black italic text-white uppercase group-hover:text-luxury-gold transition-colors">{vendor.name}</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-white/20">
              <span>{vendor.provider}</span>
              <span className="flex items-center gap-2"><Activity size={10} /> {vendor.latency}ms</span>
            </div>
          </button>
        ))}
        
        <button className="w-full p-8 border border-dashed border-white/10 rounded-[3rem] flex flex-col items-center justify-center text-white/20 hover:text-luxury-gold hover:border-luxury-gold/40 transition-all group">
           <Link size={24} className="mb-2 group-hover:scale-110 transition-transform" />
           <span className="text-[10px] font-black uppercase tracking-widest italic">Add_New_Node</span>
        </button>
      </div>

      <div className="flex-1 space-y-12">
        <LuxuryCard className="flex flex-col gap-12">
          <header className="flex justify-between items-center border-b border-white/5 pb-12">
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 bg-luxury-gold/5 rounded-2xl border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shadow-2xl">
                <Globe size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-black italic text-white uppercase leading-none mb-4">{activeVendor.name}</h2>
                <div className="flex gap-4">
                   <StatusBadge status="UPLINK_STABLE" type="success" />
                   <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest self-center">{activeVendor.id}</span>
                </div>
              </div>
            </div>
            <GoldButton onClick={handleCommit}>
              {isSyncing ? <RefreshCw className="animate-spin inline mr-2" size={14} /> : <Save className="inline mr-2" size={14} />}
              Commit_Artifact
            </GoldButton>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-10">
              <LuxuryInput 
                label="Provider_Alias" 
                value={activeVendor.name} 
                onChange={(val) => updateActiveVendor('name', val)} 
                mono={false}
              />
              <LuxuryInput 
                label="Endpoint_Production_URL" 
                value={activeVendor.endpoint} 
                onChange={(val) => updateActiveVendor('endpoint', val)} 
              />
              <LuxuryInput 
                label="Cost_Matrix_Tier" 
                value={activeVendor.costPerUnit} 
                onChange={(val) => updateActiveVendor('costPerUnit', val)} 
                mono={false}
              />
            </div>
            <div className="space-y-10">
              <LuxuryCard title="Schema Configuration" icon={Settings} className="bg-black/60 !p-8">
                 <div className="space-y-6">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                       <span className="text-white/40">Retry_Protocol:</span>
                       <span className="text-luxury-gold italic uppercase">Exponential_Backoff</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono">
                       <span className="text-white/40">Auth_Method:</span>
                       <span className="text-luxury-gold italic uppercase">Bearer_Token_Rotation</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono">
                       <span className="text-white/40">Telemetry:</span>
                       <span className="text-google-success italic uppercase">Enabled</span>
                    </div>
                 </div>
              </LuxuryCard>
              <LuxuryCard title="Real-time Node Log" icon={Terminal} className="bg-black/80 !p-8 h-48">
                  <div className="font-mono text-[9px] text-luxury-gold/30 space-y-2 overflow-y-auto no-scrollbar">
                    <p>{'>>>>'} Initializing session with {activeVendor.provider}...</p>
                    <p>{'>>>>'} Handshake complete: TLS_v1.3_PRIVATE</p>
                    <p>{'>>>>'} Latency validated: {activeVendor.latency}ms</p>
                    <p className="text-google-success font-black">{'>>>'} READY_FOR_INFERENCE_ORCHESTRATION</p>
                  </div>
              </LuxuryCard>
            </div>
          </div>
        </LuxuryCard>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: 'API Status', val: '200 OK', icon: Globe },
             { title: 'Compute Load', val: 'Low', icon: Cpu },
             { title: 'Code Integration', val: 'Standard', icon: Code }
           ].map((stat, i) => (
             <LuxuryCard key={i} className="!p-8 flex items-center gap-6">
                <div className="p-3 bg-white/5 rounded-xl text-luxury-gold"><stat.icon size={20} /></div>
                <div>
                   <p className="text-[9px] font-black text-white/20 uppercase tracking-widest italic">{stat.title}</p>
                   <p className="text-lg font-black italic text-white tracking-tighter uppercase">{stat.val}</p>
                </div>
             </LuxuryCard>
           ))}
        </div>
      </div>
    </motion.div>
  );
};
