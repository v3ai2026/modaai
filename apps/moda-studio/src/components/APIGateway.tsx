
import React, { useState } from 'react';
import { 
  Server, Link, Activity, ShieldCheck, 
  RefreshCw, Plus, Save, Globe, Factory,
  ChevronDown, Terminal
} from 'lucide-react';
import { Vendor } from '../types';

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
  },
  {
    id: 'v3', name: 'DeepSeek Relay', type: 'AI_MODEL', provider: 'DeepSeek-V3',
    status: 'active', latency: 800, apiKey: 'sk-****************', 
    endpoint: 'https://api.deepseek.com', costPerUnit: '$0.001/1k'
  }
];

export const APIGateway: React.FC = () => {
  const [vendors] = useState<Vendor[]>(INITIAL_VENDORS);
  const [selectedId, setSelectedId] = useState<string>(INITIAL_VENDORS[0].id);
  const [isTesting, setTesting] = useState(false);
  const activeVendor = vendors.find(v => v.id === selectedId) || vendors[0];

  return (
    <div className="flex flex-col lg:flex-row gap-12 h-full animate-in fade-in duration-1000">
      <div className="lg:w-1/3 flex flex-col gap-6">
        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.6em] mb-4 italic ml-6">Active_Vendor_Stack</p>
        {vendors.map(vendor => (
          <button 
            key={vendor.id}
            onClick={() => setSelectedId(vendor.id)}
            className={`w-full text-left p-8 rounded-[3.5rem] border transition-all duration-500 relative overflow-hidden group
              ${selectedId === vendor.id ? 'bg-luxury-gold/5 border-luxury-gold/40' : 'bg-white/[0.01] border-white/5'}
            `}
          >
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${vendor.status === 'active' ? 'bg-luxury-gold' : 'bg-red-500'}`} />
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-black italic text-white uppercase group-hover:text-luxury-gold">{vendor.name}</span>
              <span className="text-[8px] font-black px-2 py-1 rounded bg-black/60 text-white/20 uppercase italic">{vendor.type}</span>
            </div>
            <div className="flex justify-between items-center text-[10px] font-mono text-white/20">
              <span>{vendor.provider}</span>
              <span className="flex items-center gap-2"><Activity size={10} /> {vendor.latency}ms</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex-1 bg-white/[0.01] backdrop-blur-3xl border border-white/5 rounded-[4rem] p-16 relative overflow-hidden">
        <header className="flex justify-between items-center mb-16 border-b border-white/5 pb-12">
          <div className="flex items-center gap-8">
            <div className="w-20 h-20 bg-luxury-gold/5 rounded-[2rem] border border-luxury-gold/30 flex items-center justify-center text-luxury-gold shadow-2xl">
              {activeVendor.type === 'FACTORY' ? <Factory size={36} /> : <Globe size={36} />}
            </div>
            <div>
              <h2 className="text-4xl font-black italic text-white uppercase leading-none mb-4">{activeVendor.name}</h2>
              <span className="text-[10px] font-black bg-luxury-gold text-luxury-obsidian px-4 py-1 rounded-full uppercase italic">SECURE_NODE</span>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setTesting(true)} className="px-8 py-4 border border-white/10 rounded-2xl text-[10px] font-black text-white/40 hover:text-white uppercase transition-all flex items-center gap-3 italic">
              {isTesting ? <RefreshCw size={14} className="animate-spin" /> : <Link size={14} />} Test_Uplink
            </button>
            <button className="px-10 py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-luxury-gold transition-all italic shadow-2xl">
              <Save size={14} /> Commit_Changes
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[9px] font-black text-white/20 uppercase tracking-widest ml-4">Endpoint_URL</label>
              <input type="text" defaultValue={activeVendor.endpoint} className="w-full bg-luxury-obsidian/60 border border-white/5 rounded-3xl p-6 text-xs text-luxury-gold font-mono outline-none" />
            </div>
            <div className="space-y-3">
              <label className="text-[9px] font-black text-white/20 uppercase tracking-widest ml-4">API_Access_Key</label>
              <input type="password" value={activeVendor.apiKey} readOnly className="w-full bg-luxury-obsidian/60 border border-white/5 rounded-3xl p-6 text-xs text-white/20 font-mono outline-none" />
            </div>
          </div>
          <div className="bg-black/40 rounded-[3rem] p-10 border border-white/5 flex flex-col gap-6">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/20 italic">
              <span>Telemetry_Stream</span>
              <Terminal size={14} />
            </div>
            <div className="flex-1 font-mono text-[10px] text-luxury-gold/40 space-y-2 overflow-y-auto no-scrollbar">
              <p>{'>>>>'} Handshake: TLS 1.3 Secure</p>
              <p>{'>>>>'} Region: auto-detect (Asia/Shanghai)</p>
              <p>{'>>>>'} Response: 200 OK (24ms)</p>
              <p className="text-google-success animate-pulse">{'>>>'} NODE_SYNCHRONIZED_SUCCESSFULLY</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
