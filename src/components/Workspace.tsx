
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Motion, AnimatePresence } from '@/ui/animation';
import { SectionId, Asset, Message, PrivateNode } from '../types';
import SmartCompiler from './AIStylist';
import TemplateWarehouse from './TemplateWarehouse';
import MediaStudio from './MediaStudio';
import AdminDashboard from './AdminDashboard';
import { Newsroom } from './Newsroom';
import { Docs } from './Docs';
import { LiveSandbox } from './LiveSandbox';
import { ClusterTopology } from './ClusterTopology';
import { ComputeVault } from './ComputeVault';
import { AIMarket } from './AIMarket';
import { BrandVault } from './BrandVault'; 
import { MemoryVault } from './MemoryVault';
import { 
  Plus, Minus
} from '@/ui/icons';

interface WorkspaceProps {
  activeStep: string;
  messages: Message[];
  isProcessing: boolean;
  assets: Asset[];
  onUpdateAsset: (id: string, updates: Partial<Asset>) => void;
  nodes: PrivateNode[];
  onNodeControl: (id: string, action: 'RESTART' | 'TOGGLE') => void;
  onSendMessage: (content: string) => void;
  onStepChange: (id: string) => void;
}

const SECTION_MAP: Record<string, { x: number, y: number }> = {
  [SectionId.Dashboard]: { x: 0, y: 0 },
  [SectionId.MistBuilder]: { x: 1200, y: 0 },
  [SectionId.Preview]: { x: 2400, y: 0 },
  [SectionId.AIMarket]: { x: 0, y: 1200 },
  [SectionId.BrandVault]: { x: 1200, y: -1200 }, 
  [SectionId.CreationLab]: { x: 1200, y: 1200 },
  [SectionId.Newsroom]: { x: -1200, y: 1200 },
  [SectionId.Cluster]: { x: -2400, y: 1200 },
  [SectionId.Vault]: { x: -1200, y: -1200 },
  [SectionId.Docs]: { x: -2400, y: 0 },
  [SectionId.Admin]: { x: -1200, y: 0 },
};

const Workspace: React.FC<WorkspaceProps> = ({ 
  activeStep, messages, isProcessing, assets, onUpdateAsset, nodes, onNodeControl, onSendMessage, onStepChange
}) => {
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 40, stiffness: 220, mass: 1 };
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);

  useEffect(() => {
    const coords = SECTION_MAP[activeStep];
    if (coords) {
      springX.set(-coords.x);
      springY.set(-coords.y);
    }
  }, [activeStep, springX, springY]);

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

  const teleportTo = useCallback((id: string) => {
    onStepChange(id);
  }, [onStepChange]);

  return (
    <div 
      ref={containerRef}
      className="flex-1 h-full overflow-hidden bg-[#020202] relative cursor-grab active:cursor-grabbing no-scrollbar"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Motion 
        className="absolute inset-0 pointer-events-none singularity-grid"
        style={{ 
          x: springX, 
          y: springY, 
          scale,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-google-accent/[0.02] to-transparent animate-pulse" />
      </Motion>

      <div className="fixed top-28 left-12 z-[60] mix-difference pointer-events-none">
        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] italic block mb-2">Current_Sector</span>
        <AnimatePresence mode="wait">
          <motion.h2 
            key={activeStep}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="text-2xl font-black italic text-white uppercase tracking-tighter"
          >
            {activeStep.replace('_', ' ')}
          </motion.h2>
        </AnimatePresence>
      </div>

      <div className="fixed bottom-12 right-12 z-[60] group">
        <div className="w-64 h-48 bg-black/60 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-7 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group-hover:border-google-accent/30 transition-all duration-700">
           <div className="flex justify-between items-center mb-5">
              <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] italic flex items-center gap-3">
                <MapIcon size={12} className="text-google-accent" /> Teleport_Grid
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-google-success shadow-[0_0_10px_#81c995]" />
           </div>
           
           <div className="relative w-full h-full border border-white/5 rounded-2xl bg-black/40 p-4">
              {Object.entries(SECTION_MAP).map(([id, coords]) => (
                <button 
                  key={id}
                  onClick={() => teleportTo(id)}
                  title={`Teleport to ${id}`}
                  className={`absolute w-3 h-3 rounded-full transition-all duration-500 hover:scale-150 interactive ${
                    id === activeStep ? 'bg-google-accent shadow-[0_0_15px_#8ab4f8] scale-125 z-10' : 'bg-white/10 hover:bg-white/40'
                  }`}
                  style={{ 
                    left: `calc(50% + ${coords.x / 50}px)`, 
                    top: `calc(50% + ${coords.y / 50}px)`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}
              
              <Motion 
                className="absolute border-[1.5px] border-google-accent/40 bg-google-accent/5 rounded-[4px] pointer-events-none"
                style={{
                  width: 40 / scale,
                  height: 25 / scale,
                  left: `calc(50% - ${springX}px / 50)`,
                  top: `calc(50% - ${springY}px / 50)`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
           </div>
        </div>
      </div>

      <Motion 
        className="absolute left-1/2 top-1/2 w-0 h-0"
        style={{ x: springX, y: springY, scale }}
      >
        <NodeWrapper x={0} y={0} w={1000} h={700} title="CORE_DASHBOARD">
          <div className="p-12 space-y-12 h-full overflow-y-auto no-scrollbar bg-black/40 backdrop-blur-3xl rounded-[4rem]">
             <header><span className="text-google-accent text-[11px] font-black uppercase tracking-[0.5em] mb-4 block italic">System Pulse</span><h2 className="text-6xl font-black italic text-white tracking-tighter uppercase leading-none">Global Stats</h2></header>
             <div className="grid grid-cols-2 gap-8">
                <StatBox label="Impressions" val="14.2M" sub="+12.5%" color="google-accent" />
                <StatBox label="Conversion" val="8.9%" sub="Optimized" color="google-success" />
             </div>
          </div>
        </NodeWrapper>

        <NodeWrapper x={1200} y={0} w={1100} h={800} title="NEURAL_COMPILER_IDE">
           <SmartCompiler messages={messages} isProcessing={isProcessing} onSendMessage={onSendMessage} />
        </NodeWrapper>

        <NodeWrapper x={2400} y={0} w={1200} h={850} title="LIVE_PREVIEW_SANDBOX">
           <LiveSandbox />
        </NodeWrapper>

        <NodeWrapper x={0} y={1200} w={1200} h={850} title="GLOBAL_INTELLIGENCE_MARKET">
           <AIMarket />
        </NodeWrapper>

        <NodeWrapper x={1200} y={-1200} w={1200} h={850} title="BRAND_VAULT_WIN_PKGS">
           <BrandVault />
        </NodeWrapper>

        <NodeWrapper x={1200} y={1200} w={1200} h={850} title="CREATION_STUDIO_LAB">
           <MediaStudio />
        </NodeWrapper>

        <NodeWrapper x={1200} y={2400} w={1200} h={900} title="ARCHETYPE_VAULT">
           <TemplateWarehouse />
        </NodeWrapper>

        <NodeWrapper x={-1200} y={1200} w={1200} h={850} title="ZEITGEIST_RADAR_NODE">
           <Newsroom />
        </NodeWrapper>

        <NodeWrapper x={-2400} y={1200} w={1200} h={850} title="CLUSTER_TOPOLOGY_MONITOR">
           <ClusterTopology nodes={nodes} />
        </NodeWrapper>

        <NodeWrapper x={-1200} y={-1200} w={1200} h={850} title="NEURAL_MEMORY_VAULT">
           <MemoryVault />
        </NodeWrapper>

        <NodeWrapper x={-2400} y={0} w={1200} h={850} title="TECHNICAL_PROTOCOL_DOCS">
           <Docs />
        </NodeWrapper>

        <NodeWrapper x={-1200} y={0} w={1100} h={800} title="MISSION_CONTROL_GATEWAY">
           <AdminDashboard nodes={nodes} />
        </NodeWrapper>

        <NodeDecoration x={-800} y={-800} text="SPATIAL" />
        <NodeDecoration x={2000} y={1500} text="SYNTH" />
        <NodeDecoration x={-1500} y={2000} text="PROTO" />
        <NodeDecoration x={1500} y={-1500} text="BRAND" />
      </Motion>

      <div className="fixed bottom-12 left-12 flex items-center gap-4 px-8 py-5 bg-black/60 backdrop-blur-3xl border border-white/5 rounded-full shadow-2xl z-50">
        <button onClick={() => setScale(s => Math.max(0.2, s - 0.1))} className="p-3 hover:bg-white/10 rounded-full transition-all text-white/40 hover:text-white interactive"><Minus size={18}/></button>
        <div className="w-16 text-center text-[10px] font-mono font-black text-white/60 uppercase tracking-widest">{Math.round(scale * 100)}%</div>
        <button onClick={() => setScale(s => Math.min(2, s + 0.1))} className="p-3 hover:bg-white/10 rounded-full transition-all text-white/40 hover:text-white interactive"><Plus size={18}/></button>
        <div className="w-px h-6 bg-white/10 mx-2"></div>
        <button 
          onClick={() => { springX.set(0); springY.set(0); setScale(1); teleportTo(SectionId.Dashboard); }}
          className="flex items-center gap-3 px-6 py-2 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-google-accent transition-all italic active:scale-95 shadow-xl interactive"
        >
          <MousePointer2 size={14} /> Reset View
        </button>
      </div>
    </div>
  );
};

const NodeWrapper = ({ x, y, w, h, title, children }: { x: number, y: number, w: number, h: number, title: string, children: React.ReactNode }) => (
  <div 
    className="absolute group/node interactive"
    style={{ left: x, top: y, width: w, height: h, transform: 'translate(-50%, -50%)' }}
  >
    <div className="absolute -top-12 left-0 flex items-center gap-4 text-white/20 group-hover/node:text-google-accent transition-all duration-500">
      <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover/node:bg-google-accent animate-pulse shadow-[0_0_10px_currentColor]"></div>
      <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">{title}</span>
    </div>
    
    <div className="w-full h-full bg-[#080808] border border-white/5 rounded-[4rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.8)] group-hover/node:border-google-accent/20 group-hover/node:-translate-y-2 group-hover/node:shadow-[0_80px_160px_rgba(0,0,0,0.9)] transition-all duration-700 ease-out">
      {children}
    </div>

    <div className="absolute -z-10 top-1/2 left-full w-40 h-[1px] bg-gradient-to-r from-white/10 to-transparent"></div>
    <div className="absolute -z-10 top-1/2 right-full w-40 h-[1px] bg-gradient-to-l from-white/10 to-transparent"></div>
  </div>
);

const NodeDecoration = ({ x, y, text }: { x: number, y: number, text: string }) => (
  <div className="absolute opacity-[0.03] select-none pointer-events-none" style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}>
    <span className="text-[160px] font-black italic text-white tracking-tighter uppercase">{text}</span>
  </div>
);

const StatBox = ({ label, val, sub, color }: any) => (
  <div className="p-10 bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Layers size={80} /></div>
    <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em] mb-8 italic">{label}</p>
    <div className="flex items-baseline gap-3"><span className={`text-7xl font-black italic text-${color} tracking-tighter`}>{val}</span></div>
    <p className="text-[10px] text-google-success mt-14 font-black uppercase flex items-center gap-4 tracking-[0.3em] italic">{sub}</p>
  </div>
);

export default Workspace;
