
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import { SectionId, Message, PrivateNode } from '../types';
import SmartCompiler from './SmartCompiler';
import MediaStudio from './MediaStudio';
import AdminDashboard from './AdminDashboard';
import { Newsroom } from './Newsroom';
import { Docs } from './Docs';
import { LiveSandbox } from './LiveSandbox';
import { ClusterTopology } from './ClusterTopology';
import { AIMarket } from './AIMarket';
import { BrandVault } from './BrandVault'; 
import { MemoryVault } from './MemoryVault'; 
import { Plus, Minus, MousePointer2, LayoutDashboard, Search, Command, Command as CommandIcon, ArrowRight } from 'lucide-react';

const NodeWrapper: React.FC<{ x: number, y: number, w: number, h: number, title: string, children: React.ReactNode }> = ({ x, y, w, h, title, children }) => (
  <div 
    className="absolute group/node interactive"
    style={{ left: x, top: y, width: w, height: h, transform: 'translate(-50%, -50%)' }}
  >
    <div className="absolute -top-12 left-0 flex items-center gap-4 text-white/20 group-hover/node:text-luxury-gold transition-all duration-500">
      <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover/node:bg-luxury-gold animate-pulse"></div>
      <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">{title}</span>
    </div>
    <div className="w-full h-full bg-[#050505] border border-white/5 rounded-[4rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.8)] group-hover/node:border-luxury-gold/20 transition-all duration-700">
      {children}
    </div>
  </div>
);

interface WorkspaceProps {
  activeStep: string;
  messages: Message[];
  isProcessing: boolean;
  nodes: PrivateNode[];
  onSendMessage: (content: string) => void;
  onStepChange: (id: string) => void;
}

const SECTION_MAP: Record<string, { x: number, y: number, label: string }> = {
  [SectionId.Dashboard]: { x: 0, y: 0, label: 'Dashboard' },
  [SectionId.Admin]: { x: -1400, y: 0, label: 'Strategic Command' },
  [SectionId.Docs]: { x: -2800, y: 0, label: 'Tech Protocol' },
  [SectionId.MistBuilder]: { x: 1400, y: 0, label: 'Neural Compiler' },
  [SectionId.Preview]: { x: 2800, y: 0, label: 'Live Sandbox' },
  [SectionId.AIMarket]: { x: 0, y: 1400, label: 'AI Intel Market' },
  [SectionId.BrandVault]: { x: 1400, y: -1400, label: 'Brand Vault' }, 
  [SectionId.CreationLab]: { x: 1400, y: 1400, label: 'Creation Studio' },
  [SectionId.Newsroom]: { x: -1400, y: 1400, label: 'News Zeitgeist' },
  [SectionId.Cluster]: { x: -2800, y: 1400, label: 'Cluster Map' },
  [SectionId.Vault]: { x: -1400, y: -1400, label: 'Neural Memory' },
};

const Workspace: React.FC<WorkspaceProps> = ({ 
  activeStep, messages, isProcessing, nodes, onSendMessage, onStepChange
}) => {
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dragStart = useRef({ x: 0, y: 0 });
  
  const springConfig = { damping: 45, stiffness: 240 };
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);

  useEffect(() => {
    const coords = SECTION_MAP[activeStep];
    if (coords) {
      springX.set(-coords.x);
      springY.set(-coords.y);
    }
  }, [activeStep]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(prev => !prev);
      }
      if (e.key === 'Escape') setShowSearch(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, input, textarea, a, .interactive')) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - springX.get(), y: e.clientY - springY.get() };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    springX.set(e.clientX - dragStart.current.x);
    springY.set(e.clientY - dragStart.current.y);
  };

  const handleMouseUp = () => setIsDragging(false);

  const filteredSections = useMemo(() => {
    if (!searchQuery) return [];
    return Object.entries(SECTION_MAP).filter(([_, v]) => 
      v.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div 
      className="flex-1 h-full overflow-hidden bg-[#020202] relative cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <motion.div className="absolute inset-0 pointer-events-none singularity-grid" style={{ x: springX, y: springY, scale }} />

      <motion.div className="absolute left-1/2 top-1/2 w-0 h-0" style={{ x: springX, y: springY, scale }}>
        <NodeWrapper x={0} y={0} w={1200} h={800} title="CENTRAL_DASHBOARD">
          <div className="w-full h-full flex flex-col items-center justify-center p-20 text-center">
             <div className="w-32 h-32 bg-luxury-gold/10 rounded-[3rem] border border-luxury-gold/20 flex items-center justify-center text-luxury-gold mb-10 shadow-[0_0_80px_rgba(212,175,55,0.1)]">
                <LayoutDashboard size={64} />
             </div>
             <h2 className="text-5xl font-black italic text-white uppercase tracking-tighter mb-6">Welcome to Moda OS</h2>
             <p className="text-white/40 max-w-lg italic leading-relaxed mb-12 text-lg">
                Your private neural workstation is live. Access modules via the command palette (Cmd+K) or sidebar.
             </p>
             <button 
              onClick={() => onStepChange(SectionId.MistBuilder)}
              className="px-12 py-5 bg-white text-black rounded-2xl font-black uppercase text-[11px] tracking-[0.5em] italic hover:bg-luxury-gold transition-all shadow-2xl"
             >
                Enter Compiler
             </button>
          </div>
        </NodeWrapper>

        <NodeWrapper x={-1400} y={0} w={1200} h={850} title="STRATEGIC_COMMAND">
          <AdminDashboard nodes={nodes} />
        </NodeWrapper>

        <NodeWrapper x={-2800} y={0} w={1200} h={850} title="TECH_PROTOCOL">
          <Docs />
        </NodeWrapper>

        <NodeWrapper x={1400} y={0} w={1200} h={900} title="NEURAL_COMPILER">
           <SmartCompiler messages={messages} isProcessing={isProcessing} onSendMessage={onSendMessage} />
        </NodeWrapper>

        <NodeWrapper x={2800} y={0} w={1200} h={900} title="LIVE_PREVIEW">
           <LiveSandbox />
        </NodeWrapper>

        <NodeWrapper x={1400} y={1400} w={1200} h={900} title="CREATION_STUDIO">
           <MediaStudio />
        </NodeWrapper>

        <NodeWrapper x={0} y={1400} w={1200} h={900} title="AI_INTEL_MARKET">
           <AIMarket />
        </NodeWrapper>

        <NodeWrapper x={-1400} y={1400} w={1200} h={900} title="NEWS_ZEITGEIST">
           <Newsroom />
        </NodeWrapper>

        <NodeWrapper x={-1400} y={-1400} w={1200} h={900} title="NEURAL_MEMORY">
           <MemoryVault />
        </NodeWrapper>
        
        <NodeWrapper x={1400} y={-1400} w={1200} h={900} title="BRAND_VAULT">
           <BrandVault />
        </NodeWrapper>

        <NodeWrapper x={-2800} y={1400} w={1200} h={900} title="CLUSTER_MAP">
           <ClusterTopology nodes={nodes} />
        </NodeWrapper>
      </motion.div>

      {/* Global Toolbar */}
      <div className="fixed bottom-12 left-12 flex items-center gap-4 px-8 py-4 bg-black/60 backdrop-blur-3xl border border-white/5 rounded-full z-[110]">
        <button onClick={() => setScale(s => Math.max(0.1, s - 0.1))} className="p-2.5 hover:bg-white/10 rounded-full transition-all text-white/40"><Minus size={16}/></button>
        <div className="w-12 text-center text-[10px] font-mono font-black text-white/60">{Math.round(scale * 100)}%</div>
        <button onClick={() => setScale(s => Math.min(2, s + 0.1))} className="p-2.5 hover:bg-white/10 rounded-full transition-all text-white/40"><Plus size={16}/></button>
        <div className="w-px h-5 bg-white/10 mx-2"></div>
        <button 
          onClick={() => { springX.set(0); springY.set(0); setScale(1); onStepChange(SectionId.Dashboard); }}
          className="flex items-center gap-3 px-6 py-2 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-luxury-gold transition-all italic shadow-xl"
        >
          <MousePointer2 size={14} /> Center View
        </button>
      </div>

      <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[110]">
         <button 
          onClick={() => setShowSearch(true)}
          className="flex items-center gap-6 px-10 py-5 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-full hover:border-luxury-gold/40 transition-all group shadow-2xl"
         >
            <Search size={18} className="text-white/20 group-hover:text-luxury-gold transition-colors" />
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white/20 group-hover:text-white transition-colors italic">Command Palette</span>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[9px] font-mono text-white/20">
               <CommandIcon size={10} /> K
            </div>
         </button>
      </div>

      <AnimatePresence>
        {showSearch && (
          <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-40 px-6">
             <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowSearch(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
             />
             <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="w-full max-w-2xl bg-luxury-obsidian border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative z-10"
             >
                <div className="p-10 flex items-center gap-8 border-b border-white/5">
                   <CommandIcon className="text-luxury-gold" size={24} />
                   <input 
                    autoFocus
                    placeholder="Search neural sectors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-xl font-black italic uppercase text-white outline-none placeholder:text-white/10 tracking-widest"
                   />
                </div>
                <div className="p-4 max-h-[400px] overflow-y-auto studio-scroll">
                   {filteredSections.length > 0 ? (
                     <div className="space-y-2">
                        {filteredSections.map(([id, info]) => (
                          <button 
                            key={id} 
                            onClick={() => { onStepChange(id as SectionId); setShowSearch(false); setSearchQuery(''); }}
                            className="w-full flex items-center justify-between p-6 hover:bg-white/5 rounded-2xl transition-all group"
                          >
                             <div className="flex items-center gap-6">
                                <div className="w-10 h-10 rounded-xl bg-luxury-gold/5 border border-luxury-gold/20 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-black transition-all">
                                   <ArrowRight size={18} />
                                </div>
                                <span className="text-lg font-black italic uppercase text-white group-hover:text-luxury-gold transition-colors">{info.label}</span>
                             </div>
                             <span className="text-[9px] font-mono text-white/10 uppercase tracking-widest">Sector::{id}</span>
                          </button>
                        ))}
                     </div>
                   ) : searchQuery ? (
                     <div className="p-20 text-center space-y-4">
                        <Search size={40} className="mx-auto text-white/10" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20 italic">No Sector Linked to Query</p>
                     </div>
                   ) : (
                     <div className="p-10">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10 mb-6 italic">Quick Access Nodes</p>
                        <div className="grid grid-cols-2 gap-4">
                           {Object.entries(SECTION_MAP).slice(1, 5).map(([id, info]) => (
                             <button 
                               key={id}
                               onClick={() => { onStepChange(id as SectionId); setShowSearch(false); setSearchQuery(''); }}
                               className="w-full flex items-center justify-between p-6 hover:bg-white/5 rounded-2xl transition-all group"
                             >
                               <div className="flex items-center gap-6">
                                 <div className="w-10 h-10 rounded-xl bg-luxury-gold/5 border border-luxury-gold/20 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-black transition-all">
                                   <ArrowRight size={18} />
                                 </div>
                                 <span className="text-lg font-black italic uppercase text-white group-hover:text-luxury-gold transition-colors">{info.label}</span>
                               </div>
                               <span className="text-[9px] font-mono text-white/10 uppercase tracking-widest">Sector::{id}</span>
                             </button>
                           ))}
                        </div>
                     </div>
                   )}
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Workspace;