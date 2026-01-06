
import React, { useState } from 'react';
import { Motion, AnimatePresence } from '@/ui/animation';
import { Search, Sparkles, Layout, Eye, ArrowRight, Zap, Filter, Command, Hexagon } from '@/ui/icons';

export const TEMPLATE_DB = [
  {
    id: 't1',
    name: 'Maison Minimal',
    style: 'Minimalist',
    desc: 'Clean lines, heavy whitespace. Perfect for luxury basics.',
    video: 'https://cdn.coverr.co/videos/coverr-abstract-3d-waves-animation-5447/1080p.mp4',
    tags: ['Luxury', 'Clean'],
    color: 'bg-stone-800'
  },
  {
    id: 't2',
    name: 'Neon District',
    style: 'Cyberpunk',
    desc: 'Dark mode, glitched typography, neon accents. For streetwear.',
    video: 'https://cdn.coverr.co/videos/coverr-walking-in-a-futuristic-tunnel-4475/1080p.mp4',
    tags: ['Streetwear', 'Dark'],
    color: 'bg-blue-900'
  },
  {
    id: 't3',
    name: 'Vogue Editorial',
    style: 'Magazine',
    desc: 'Serif fonts, large imagery, grid layouts. Storytelling focus.',
    video: 'https://cdn.coverr.co/videos/coverr-fashion-photoshoot-with-a-model-2580/1080p.mp4',
    tags: ['Editorial', 'Blog'],
    color: 'bg-zinc-700'
  },
  {
    id: 't4',
    name: 'Concrete Jungle',
    style: 'Brutalist',
    desc: 'Raw aesthetics, monospaced fonts, bold borders.',
    video: 'https://cdn.coverr.co/videos/coverr-abstract-blue-waves-lines-5452/1080p.mp4',
    tags: ['Avant-Garde', 'Bold'],
    color: 'bg-stone-600'
  }
];

const TemplateCard = ({ template }: { template: typeof TEMPLATE_DB[0] }) => (
  <Motion 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-google-accent/40 transition-all duration-700 shadow-2xl"
  >
    <div className="aspect-[3/4] overflow-hidden relative">
      <video 
        src={template.video} 
        autoPlay loop muted playsInline
        className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[2s] ease-out opacity-40 group-hover:opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_2px] pointer-events-none opacity-20 z-15" />

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/60 backdrop-blur-sm">
        <Motion 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-white text-black rounded-full font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 shadow-2xl italic"
        >
          <Layout size={14} /> Forge Template
        </Motion>
        <button className="px-8 py-3 border border-white/20 text-white rounded-full font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-3 hover:bg-white/10 transition-all italic">
          <Eye size={14} /> Live Peek
        </button>
      </div>

      <div className="absolute top-6 left-6 z-10 flex gap-2">
         {template.tags.map(tag => (
           <span key={tag} className="px-3 py-1 bg-black/60 backdrop-blur-md text-[8px] text-white/80 font-black uppercase tracking-widest rounded-lg border border-white/10 italic">
             {tag}
           </span>
         ))}
      </div>
      
      <div className="absolute top-6 right-6 z-10 opacity-40 group-hover:opacity-100 transition-opacity">
        <Hexagon size={14} className="text-google-accent animate-spin-slow" />
      </div>
    </div>

    <div className="p-8 relative z-20">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-white font-black italic uppercase tracking-tighter text-xl group-hover:text-google-accent transition-colors">{template.name}</h3>
        <span className="text-[9px] text-white/20 font-mono uppercase border border-white/10 px-2 py-0.5 rounded italic">{template.style}</span>
      </div>
      <p className="text-white/40 text-xs font-light leading-relaxed italic group-hover:text-white/70 transition-colors">{template.desc}</p>
    </div>
  </Motion>
);

const TemplateWarehouse: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Luxury', 'Streetwear', 'Editorial', 'Sport'];

  return (
    <div className="h-full flex flex-col bg-[#050505] overflow-hidden">
      <header className="px-12 py-10 border-b border-white/5 bg-black/40 backdrop-blur-3xl flex flex-col lg:flex-row justify-between items-center gap-8 relative z-20">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 bg-google-accent text-google-bg rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(138,180,248,0.3)]">
            <Layout size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-black italic text-white uppercase tracking-tighter leading-none mb-2">Archetype Vault</h1>
            <p className="text-[10px] text-white/20 font-mono uppercase tracking-[0.4em] italic leading-none">Select logical blueprint for synthesis</p>
          </div>
        </div>

        <div className="flex items-center gap-6 w-full lg:w-auto">
          <div className="relative group flex-1 lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-google-accent transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Query archetypes..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-google-accent/40 focus:bg-white/[0.08] transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-20">
               <Command size={10} /> <span className="text-[9px]">K</span>
            </div>
          </div>
          <button className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl">
            <Sparkles size={24} />
          </button>
        </div>
      </header>

      <div className="px-12 py-6 border-b border-white/5 bg-black/10 backdrop-blur-md flex gap-10 overflow-x-auto studio-scroll shrink-0 relative z-10">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-[10px] font-black uppercase tracking-[0.4em] italic whitespace-nowrap transition-all relative py-2
              ${filter === cat ? 'text-google-accent' : 'text-white/30 hover:text-white/60'}
            `}
          >
            {cat}
            {filter === cat && (
              <Motion layoutId="filter-active" className="absolute bottom-0 left-0 w-full h-0.5 bg-google-accent shadow-[0_0_10px_#8ab4f8]" />
            )}
          </button>
        ))}
      </div>

      <main className="flex-1 overflow-y-auto studio-scroll p-12 bg-[#050505] relative">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:48px_48px] opacity-20 pointer-events-none" />
        
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-sm font-black italic text-white/40 uppercase tracking-[0.5em] flex items-center gap-4">
              <Zap size={16} className="text-google-success" /> Logic Fragments
            </h2>
            <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Active_Archive_{TEMPLATE_DB.length}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {TEMPLATE_DB.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
            
            <div className="border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-12 hover:bg-white/[0.03] hover:border-white/10 transition-all cursor-pointer group shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-google-accent/[0.02] to-transparent pointer-events-none" />
               <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-700">
                 <ArrowRight size={32} className="text-white/20 group-hover:text-white transition-colors" />
               </div>
               <h3 className="font-black italic text-white/20 uppercase tracking-widest text-lg mb-2 group-hover:text-white/60 transition-colors">Forge Custom</h3>
               <p className="text-[9px] text-white/10 uppercase tracking-[0.3em] italic">Private_Request_Open</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TemplateWarehouse;
