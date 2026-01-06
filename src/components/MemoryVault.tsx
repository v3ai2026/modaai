
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, Brain, ShieldCheck, Zap, 
  Trash2, Filter, Search, ChevronRight, 
  Activity, Clock, Layers, Sparkles 
} from 'lucide-react';
import { MemoryNode } from '../types';
import { memoryService } from '../services/persistenceService';

export const MemoryVault: React.FC = () => {
  const [memories, setMemories] = useState<MemoryNode[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'PREFERENCE' | 'ARCHITECTURE' | 'LOGIC'>('ALL');
  const [search, setSearch] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const loadMemories = async () => {
    setIsSyncing(true);
    const data = await memoryService.fetchAll(50);
    // If empty, add some mock seeds for visual demo
    if (data.length === 0) {
      const seeds: Omit<MemoryNode, 'id' | 'timestamp'>[] = [
        { title: "React Strict Mode Alignment", content: "Always use ES6 module imports and prioritize functional components.", category: "ARCHITECTURE" },
        { title: "Tailwind Color Palette Sync", content: "Prefer google-accent (#8ab4f8) for primary interactive elements.", category: "PREFERENCE" },
        { title: "Error Handling Protocol", content: "Implement exponential backoff for all API nodes automatically.", category: "LOGIC" },
        { title: "Glassmorphism Standard", content: "Use bg-white/[0.03] and backdrop-blur-3xl for container depth.", category: "PREFERENCE" }
      ];
      for (const seed of seeds) {
        await memoryService.save(seed);
      }
      const refreshed = await memoryService.fetchAll(50);
      setMemories(refreshed);
    } else {
      setMemories(data);
    }
    setTimeout(() => setIsSyncing(false), 800);
  };

  useEffect(() => {
    loadMemories();
  }, []);

  const handleClear = () => {
    if (confirm("Confirming memory wipe? This will reset compiler intuition.")) {
      memoryService.clearAll();
      setMemories([]);
    }
  };

  const filteredMemories = memories.filter(m => {
    const matchesFilter = filter === 'ALL' || m.category === filter;
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase()) || 
                          m.content.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="h-full bg-[#050505] flex flex-col p-12 overflow-hidden animate-in fade-in duration-1000">
      <header className="mb-16 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 shrink-0 relative z-20">
        <div>
          <span className="text-google-success text-[10px] font-black uppercase tracking-[0.5em] mb-4 block italic">Knowledge_Remediation_Center</span>
          <h1 className="text-5xl font-black italic text-white uppercase tracking-tighter leading-none">Neural Memory Vault</h1>
          <p className="text-white/20 text-xs mt-4 italic font-light">The "Treatment Database" where AI persists architectural logic and user preferences.</p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={loadMemories}
            disabled={isSyncing}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest italic hover:bg-white/10 transition-all text-white/40 hover:text-white"
          >
            <RefreshCwIcon className={isSyncing ? 'animate-spin' : ''} size={14} /> {isSyncing ? 'Syncing_Nodes' : 'Refresh_Vault'}
          </button>
          <button 
            onClick={handleClear}
            className="px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest italic hover:bg-red-500 hover:text-white transition-all shadow-xl"
          >
            <Trash2 size={14} /> Wipe_Memory
          </button>
        </div>
      </header>

      {/* Stats HUD */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 shrink-0">
         <VaultStat label="Total Memories" val={memories.length.toString()} icon={<Brain size={16} />} color="google-accent" />
         <VaultStat label="Integrity" val="99.8%" icon={<ShieldCheck size={16} />} color="google-success" />
         <VaultStat label="Latency" val="12ms" icon={<Zap size={16} />} color="fuchsia-400" />
         <VaultStat label="Last Pulse" val="Active" icon={<Activity size={16} />} color="google-accent" />
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-8 mb-12 items-center justify-between shrink-0">
        <div className="flex bg-white/5 p-1.5 rounded-[1.5rem] border border-white/5 overflow-x-auto no-scrollbar max-w-full">
           {['ALL', 'PREFERENCE', 'ARCHITECTURE', 'LOGIC'].map((cat) => (
             <button
               key={cat}
               onClick={() => setFilter(cat as any)}
               className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest italic transition-all whitespace-nowrap ${filter === cat ? 'bg-white text-black shadow-2xl' : 'text-white/30 hover:text-white/60'}`}
             >
               {cat}
             </button>
           ))}
        </div>
        
        <div className="relative group w-full md:w-80">
           <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-google-accent transition-colors" size={16} />
           <input 
             type="text" 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             placeholder="Search memory shards..." 
             className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-xs text-white placeholder:text-white/10 focus:border-google-accent/40 outline-none transition-all shadow-inner uppercase font-mono italic"
           />
        </div>
      </div>

      {/* Memory Shards Grid */}
      <main className="flex-1 overflow-y-auto studio-scroll pr-4 -mr-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredMemories.map((node) => (
              <motion.div 
                layout
                key={node.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-10 flex flex-col hover:border-google-accent/30 transition-all duration-700 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                  <Layers size={120} />
                </div>
                
                <div className="flex justify-between items-start mb-10">
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${
                     node.category === 'LOGIC' ? 'bg-google-accent/10 border-google-accent/20 text-google-accent' :
                     node.category === 'ARCHITECTURE' ? 'bg-google-success/10 border-google-success/20 text-google-success' :
                     'bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400'
                   }`}>
                      <Sparkles size={24} />
                   </div>
                   <div className="text-right">
                      <span className="text-[9px] font-mono text-white/20 uppercase italic tracking-widest">{new Date(node.timestamp).toLocaleDateString()}</span>
                   </div>
                </div>

                <h3 className="text-xl font-black italic text-white uppercase tracking-tighter mb-4 group-hover:text-google-accent transition-colors">{node.title}</h3>
                <p className="text-white/40 text-[13px] font-light italic leading-relaxed mb-10 group-hover:text-white/80 transition-colors">
                  {node.content}
                </p>

                <div className="mt-auto pt-8 border-t border-white/5 flex justify-between items-center">
                   <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] italic">{node.category}</span>
                   <button className="text-white/10 hover:text-red-400 transition-colors"><Trash2 size={14}/></button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredMemories.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-40 border-2 border-dashed border-white/5 rounded-[4rem] text-white/5">
              <Database size={80} className="mb-8 opacity-40 animate-pulse" />
              <p className="text-xl font-black uppercase tracking-[0.6em] italic">No shards found in this sector</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const RefreshCwIcon = ({ className, size }: { className: string, size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 2v6h-6" /><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M3 22v-6h6" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
  </svg>
);

const VaultStat = ({ label, val, icon, color }: any) => (
  <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl group hover:border-white/10 transition-all">
     <div className="flex items-center gap-4 mb-4">
        <div className={`text-${color} opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all`}>{icon}</div>
        <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] italic">{label}</span>
     </div>
     <div className="text-3xl font-black italic text-white tracking-tighter">{val}</div>
  </div>
);
