
import React, { useState } from 'react';
import { Motion, AnimatePresence } from '@/ui/animation';
import { 
  ShoppingCart, Sparkles, Zap, Shield, 
  BarChart3, Box, Cpu, ChevronRight, Search,
  Filter, Star, Globe, Layers
} from '@/ui/icons';

const MODELS = [
  {
    id: 'm1',
    name: 'Gemini-3 Pro Vision',
    provider: 'Google DeepMind',
    type: 'Multimodal',
    accuracy: 99.2,
    latency: '800ms',
    price: '$0.01/1k tokens',
    status: 'OPTIMIZED',
    tags: ['Visual', 'Reasoning'],
    color: 'google-accent'
  },
  {
    id: 'm2',
    name: 'Veo-3.1 Cinematic',
    provider: 'Moda Native',
    type: 'Video Synth',
    accuracy: 94.5,
    latency: '15s/clip',
    price: '$0.50/gen',
    status: 'ACTIVE',
    tags: ['4K', 'High-FPS'],
    color: 'google-success'
  },
  {
    id: 'm3',
    name: 'Cloth-Phys-V2',
    provider: 'Moda Private',
    type: 'Physics Engine',
    accuracy: 98.8,
    latency: '120ms',
    price: '$50/mo',
    status: 'STABLE',
    tags: ['AR', 'Simulation'],
    color: 'fuchsia-500'
  },
  {
    id: 'm4',
    name: 'Llama-3.1 405B',
    provider: 'Meta',
    type: 'Logic LLM',
    accuracy: 96.2,
    latency: '450ms',
    price: 'Local_Node',
    status: 'READY',
    tags: ['Logic', 'Coding'],
    color: 'blue-500'
  }
];

export const AIMarket: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="h-full bg-black flex flex-col p-12 overflow-y-auto studio-scroll animate-in fade-in duration-1000">
      <header className="mb-16 flex justify-between items-end shrink-0">
        <div>
          <span className="text-google-accent text-[10px] font-black uppercase tracking-[0.5em] mb-4 block italic">Global_Intelligence_Grid</span>
          <h1 className="text-5xl font-black italic text-white uppercase tracking-tighter leading-none">AI Market</h1>
        </div>
        
        <div className="flex gap-6 items-center">
          <div className="relative group w-80">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-google-accent transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search neural weights..." 
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-xs text-white placeholder:text-white/20 focus:border-google-accent/40 outline-none transition-all"
            />
          </div>
          <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white/40 hover:text-white transition-all"><Filter size={20}/></button>
        </div>
      </header>

      {/* Featured Model Hero */}
      <div className="mb-16 relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-google-accent/20 to-transparent rounded-[3.5rem] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
        <div className="relative bg-[#0a0a0a] border border-white/5 rounded-[3.5rem] p-12 flex flex-col md:flex-row items-center gap-12 overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 p-16 opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-[2s]">
             <Layers size={300} />
           </div>
           
           <div className="w-32 h-32 bg-google-accent/10 rounded-[2.5rem] flex items-center justify-center text-google-accent border border-google-accent/20 shadow-[0_0_50px_rgba(138,180,248,0.1)]">
             <Sparkles size={48} />
           </div>
           
           <div className="flex-1 space-y-4">
              <div className="flex items-center gap-4">
                 <span className="px-3 py-1 bg-google-accent text-google-bg text-[9px] font-black uppercase tracking-widest rounded-full">New Arrival</span>
                 <span className="text-[10px] font-mono text-white/20 italic">Gemini_3_Flash_092025</span>
              </div>
              <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter">Native Multimodal Synthesis</h2>
              <p className="text-white/40 text-lg font-light leading-relaxed max-w-xl italic">
                Direct neural-to-pixel rendering with 128k context window. Integrated native cloth simulation.
              </p>
           </div>
           
           <button className="px-10 py-5 bg-white text-black rounded-2xl font-black uppercase text-[11px] tracking-widest italic hover:scale-105 transition-all shadow-2xl shrink-0">
             Deploy to Fleet
           </button>
        </div>
      </div>

      {/* Grid of Models */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
        {MODELS.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
        
        {/* Custom Request Card */}
        <div className="bg-white/[0.01] border border-dashed border-white/10 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center group hover:bg-white/[0.03] hover:border-google-accent/20 transition-all cursor-pointer">
           <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><PlusIcon /></div>
           <h3 className="text-[11px] font-black uppercase tracking-widest text-white/40 mb-2 italic">Custom Weights</h3>
           <p className="text-[9px] text-white/10 uppercase tracking-widest">Train_Private_Model</p>
        </div>
      </div>
    </div>
  );
};

const ModelCard = ({ model }: any) => (
  <Motion 
    whileHover={{ y: -5 }}
    className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-8 flex flex-col hover:border-white/20 transition-all shadow-xl group relative overflow-hidden"
  >
    <div className={`absolute top-0 right-0 w-24 h-24 bg-${model.color}/5 blur-2xl rounded-full -mr-12 -mt-12 group-hover:opacity-100 opacity-40 transition-opacity`} />
    
    <div className="flex justify-between items-start mb-10">
       <div className={`w-14 h-14 bg-${model.color}/10 border border-${model.color}/20 rounded-2xl flex items-center justify-center text-${model.color} shadow-lg`}>
          <Cpu size={24} />
       </div>
       <div className="text-right">
          <p className={`text-[10px] font-black text-${model.color} uppercase tracking-widest italic`}>{model.status}</p>
          <p className="text-[8px] font-mono text-white/20 mt-1">{model.provider}</p>
       </div>
    </div>

    <h3 className="text-xl font-black italic text-white uppercase tracking-tighter mb-4 group-hover:text-google-accent transition-colors">{model.name}</h3>
    
    <div className="flex flex-wrap gap-2 mb-10">
       {model.tags.map((tag: string) => (
         <span key={tag} className="px-3 py-1 bg-white/5 rounded-lg text-[8px] font-black text-white/40 uppercase tracking-widest italic border border-white/5">{tag}</span>
       ))}
    </div>

    <div className="space-y-4 pt-6 border-t border-white/5">
       <div className="flex justify-between items-center">
          <span className="text-[9px] font-black text-white/20 uppercase tracking-widest italic">Inference</span>
          <span className="text-[11px] font-mono text-white/60">{model.latency}</span>
       </div>
       <div className="flex justify-between items-center">
          <span className="text-[9px] font-black text-white/20 uppercase tracking-widest italic">Perf_Index</span>
          <div className="flex items-center gap-2">
             <BarChart3 size={12} className="text-google-success" />
             <span className="text-[11px] font-mono text-google-success">{model.accuracy}%</span>
          </div>
       </div>
    </div>

    <button className="w-full mt-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:bg-white group-hover:text-black transition-all italic active:scale-95 shadow-2xl">
      Sync Node
    </button>
  </Motion>
);

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
