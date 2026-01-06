
import React, { useState } from 'react';
import { 
  Server, Link, Activity, ShieldCheck, 
  RefreshCw, Plus, Save, Terminal, Globe, Factory,
  // Added ChevronDown to fix the "Cannot find name 'ChevronDown'" error
  ChevronDown
} from 'lucide-react';
import { Vendor } from '../types';

const INITIAL_VENDORS: Vendor[] = [
  {
    id: 'v1', name: 'Primary Image Gen', type: 'AI_MODEL', provider: 'Midjourney V6',
    status: 'active', latency: 450, apiKey: 'sk-proj-****************', 
    endpoint: 'https://api.midjourney.com/v1/imagine', costPerUnit: '$0.04/img'
  },
  {
    id: 'v2', name: 'Backup Image Gen', type: 'AI_MODEL', provider: 'Stable Diffusion XL',
    status: 'active', latency: 120, apiKey: 'sk-sd-******************', 
    endpoint: 'https://api.stability.ai/v1/generation', costPerUnit: '$0.01/img'
  },
  {
    id: 'v3', name: 'CN Textile Factory A', type: 'FACTORY', provider: 'Smart Supply Chain',
    status: 'active', latency: 800, apiKey: 'key_factory_a_8823', 
    endpoint: 'https://api.smart-factory.cn/orders', costPerUnit: 'Variable'
  },
  {
    id: 'v4', name: 'US Dropship Partner', type: 'FACTORY', provider: 'Printful',
    status: 'error', latency: 0, apiKey: 'pf_live_****************', 
    endpoint: 'https://api.printful.com/orders', costPerUnit: 'Variable'
  }
];

const ConnectionTerminal = ({ logs }: { logs: string[] }) => (
  <div className="bg-black/80 backdrop-blur-md border border-white/5 rounded-[2rem] p-6 font-mono text-[10px] h-48 overflow-y-auto flex flex-col-reverse shadow-inner studio-scroll no-scrollbar">
    {logs.map((log, i) => (
      <div key={i} className="mb-2 break-all flex gap-3">
        <span className="text-white/10">[{new Date().toLocaleTimeString()}]</span>
        <span className={log.includes('ERROR') ? 'text-red-400' : 'text-google-success/80'}>{log}</span>
      </div>
    ))}
    <div className="text-white/10 mb-2 uppercase tracking-widest italic">--- Gateway Uplink Initiated ---</div>
  </div>
);

export const APIGateway: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>(INITIAL_VENDORS);
  const [selectedId, setSelectedId] = useState<string>(INITIAL_VENDORS[0].id);
  const [logs, setLogs] = useState<string[]>(['System Protocol Initialized.']);
  const [isTesting, setTesting] = useState(false);

  const activeVendor = vendors.find(v => v.id === selectedId) || vendors[0];

  const handleTestConnection = () => {
    setTesting(true);
    addLog(`Pinging Node: ${activeVendor.endpoint}...`);
    
    setTimeout(() => {
      const isSuccess = activeVendor.status !== 'error';
      if (isSuccess) {
        addLog(`Response: 200 OK | Latency: ${activeVendor.latency}ms`);
        addLog(`Auth: HMAC-SHA256 Validated`);
      } else {
        addLog(`ERROR: 503 SERVICE_UNAVAILABLE`);
      }
      setTesting(false);
    }, 1200);
  };

  const addLog = (msg: string) => setLogs(prev => [msg, ...prev]);

  return (
    <div className="flex flex-col lg:flex-row gap-10 h-full">
      {/* Left Column: Vendor List */}
      <div className="lg:w-1/3 flex flex-col gap-8">
        <div className="space-y-4">
          {vendors.map(vendor => (
            <button 
              key={vendor.id}
              onClick={() => setSelectedId(vendor.id)}
              className={`w-full text-left p-6 rounded-[2.5rem] border transition-all duration-500 relative overflow-hidden group
                ${selectedId === vendor.id 
                  ? 'bg-google-accent/5 border-google-accent/40 shadow-[0_20px_40px_rgba(138,180,248,0.1)]' 
                  : 'bg-white/[0.02] border-white/5 hover:border-white/20'}
              `}
            >
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${vendor.status === 'active' ? 'bg-google-success' : 'bg-red-500'} shadow-[0_0_10px_currentColor]`} />
              
              <div className="flex justify-between items-start mb-3">
                <span className="text-[11px] font-black italic text-white uppercase tracking-tighter">{vendor.name}</span>
                <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-black/40 border border-white/10 text-white/30 uppercase italic tracking-widest">
                  {vendor.type}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-mono text-white/20 uppercase italic tracking-widest">{vendor.provider}</span>
                <div className={`flex items-center gap-2 text-[9px] font-mono ${vendor.status === 'active' ? 'text-google-success/60' : 'text-red-400/60'}`}>
                  <Activity size={10} className={vendor.status === 'active' ? 'animate-pulse' : ''} /> {vendor.latency}ms
                </div>
              </div>
            </button>
          ))}
          
          <button className="w-full py-6 border border-dashed border-white/5 rounded-[2.5rem] text-white/10 text-[10px] font-black uppercase tracking-[0.4em] hover:text-white/40 hover:border-white/20 transition-all flex items-center justify-center gap-3 italic">
            <Plus size={16} /> Integrate_New_Stream
          </button>
        </div>
      </div>

      {/* Right Column: Configuration Console */}
      <div className="flex-1 flex flex-col bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
          <Globe size={240} />
        </div>

        <header className="flex justify-between items-start mb-12 border-b border-white/5 pb-10 relative z-10">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-google-accent/10 rounded-2xl flex items-center justify-center border border-google-accent/20 text-google-accent shadow-[0_0_30px_rgba(138,180,248,0.1)]">
              {activeVendor.type === 'FACTORY' ? <Factory size={28} /> : <Globe size={28} />}
            </div>
            <div>
              <h2 className="text-3xl font-black italic text-white tracking-tighter uppercase leading-none mb-3">{activeVendor.name}</h2>
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-black bg-google-accent/20 text-google-accent px-3 py-1 rounded-full uppercase italic tracking-widest">REST_NODE</span>
                <span className="text-[10px] font-mono text-white/20 truncate max-w-xs">{activeVendor.endpoint}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
             <button 
               onClick={handleTestConnection}
               disabled={isTesting}
               className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-white/40 hover:text-white uppercase tracking-widest transition-all flex items-center gap-3 italic active:scale-95"
             >
               {isTesting ? <RefreshCw className="animate-spin" size={14} /> : <Link size={14} />}
               Test Ping
             </button>
             <button className="px-8 py-3 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-google-accent transition-all flex items-center gap-3 italic active:scale-95 shadow-xl">
               <Save size={14} /> Commit Changes
             </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12 relative z-10">
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic block ml-2">Endpoint_Uplink</label>
              <input 
                type="text" 
                defaultValue={activeVendor.endpoint} 
                className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-xs text-google-accent font-mono focus:outline-none focus:border-google-accent/40 transition-all shadow-inner"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic block ml-2">Encrypted_Access_Token</label>
              <div className="relative">
                <input 
                  type="password" 
                  defaultValue={activeVendor.apiKey} 
                  className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-xs text-white/60 font-mono focus:outline-none focus:border-google-accent/40 transition-all shadow-inner"
                />
                <ShieldCheck className="absolute right-5 top-1/2 -translate-y-1/2 text-google-success/40" size={18} />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic block ml-2">Credit_Limit (Monthly)</label>
              <input 
                type="text" 
                defaultValue="$1,200.00 / mo" 
                className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-xs text-white/60 font-mono focus:outline-none focus:border-google-accent/40 transition-all shadow-inner"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic block ml-2">Failover_Protocol</label>
              <div className="relative">
                <select className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-xs text-white/60 focus:outline-none focus:border-google-accent/40 transition-all shadow-inner appearance-none uppercase tracking-widest italic font-black">
                  <option>Neural_Reroute_Backup</option>
                  <option>Priority_3_Retry</option>
                  <option>Stack_Queue_Buffer</option>
                </select>
                <ChevronDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Terminal size={14} className="text-white/20" />
            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic">Live Connection Stream</span>
          </div>
          <ConnectionTerminal logs={logs} />
        </div>
      </div>
    </div>
  );
};
