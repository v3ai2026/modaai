
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, Smartphone, Tablet, Monitor, 
  RotateCcw, ExternalLink, Shield, Code, Zap
} from 'lucide-react';

export const LiveSandbox: React.FC = () => {
  const [device, setDevice] = useState<'MOBILE' | 'TABLET' | 'DESKTOP'>('DESKTOP');
  const [url, setUrl] = useState('https://moda-synth-artifact-8821.cloud.run');

  const deviceWidths = {
    MOBILE: 'max-w-[375px]',
    TABLET: 'max-w-[768px]',
    DESKTOP: 'max-w-full'
  };

  return (
    <div className="h-full flex flex-col bg-black overflow-hidden p-8 animate-in fade-in duration-1000">
      {/* HUD Browser Header */}
      <header className="flex justify-between items-center mb-8 px-4">
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          </div>
          <div className="h-10 px-6 bg-white/[0.03] border border-white/10 rounded-full flex items-center gap-4 min-w-[400px]">
            <Globe size={14} className="text-white/20" />
            <span className="text-[10px] font-mono text-white/40 truncate">{url}</span>
            <Shield size={12} className="text-google-success ml-auto" />
          </div>
        </div>

        <div className="flex bg-white/[0.03] border border-white/10 rounded-2xl p-1.5 gap-2">
          <button onClick={() => setDevice('MOBILE')} className={`p-3 rounded-xl transition-all ${device === 'MOBILE' ? 'bg-white/10 text-white shadow-xl' : 'text-white/20 hover:text-white/40'}`}><Smartphone size={18}/></button>
          <button onClick={() => setDevice('TABLET')} className={`p-3 rounded-xl transition-all ${device === 'TABLET' ? 'bg-white/10 text-white shadow-xl' : 'text-white/20 hover:text-white/40'}`}><Tablet size={18}/></button>
          <button onClick={() => setDevice('DESKTOP')} className={`p-3 rounded-xl transition-all ${device === 'DESKTOP' ? 'bg-white/10 text-white shadow-xl' : 'text-white/20 hover:text-white/40'}`}><Monitor size={18}/></button>
        </div>
      </header>

      {/* The Viewport */}
      <main className="flex-1 flex flex-col items-center bg-[#050505] rounded-[3rem] border border-white/5 overflow-hidden relative shadow-inner">
        <div className="absolute inset-0 singularity-grid opacity-10 pointer-events-none" />
        
        {/* Toolbar Overlay */}
        <div className="absolute top-8 right-8 z-30 flex gap-4">
          <button className="w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-white/40 hover:text-white hover:border-white/40 transition-all"><RotateCcw size={18}/></button>
          <button className="px-6 h-12 bg-white text-black rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest italic hover:bg-google-accent transition-all shadow-2xl"><ExternalLink size={14}/> Open Artifact</button>
        </div>

        {/* Device Frame */}
        <div className={`flex-1 w-full flex items-center justify-center p-12 transition-all duration-700 ease-in-out`}>
           <motion.div 
              layout
              className={`${deviceWidths[device]} w-full aspect-[9/16] md:aspect-auto md:h-full bg-white rounded-[2rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.8)] border border-white/10 relative group`}
           >
              {/* Mock Content Placeholder */}
              <div className="w-full h-full bg-[#0a0a0a] flex flex-col">
                 <div className="p-12 space-y-8">
                    <div className="w-12 h-12 bg-google-accent rounded-xl animate-pulse"></div>
                    <div className="space-y-4">
                       <div className="h-8 w-2/3 bg-white/10 rounded-lg"></div>
                       <div className="h-4 w-full bg-white/5 rounded-md"></div>
                       <div className="h-4 w-full bg-white/5 rounded-md"></div>
                       <div className="h-4 w-1/2 bg-white/5 rounded-md"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="aspect-square bg-white/[0.02] border border-white/5 rounded-3xl"></div>
                       <div className="aspect-square bg-white/[0.02] border border-white/5 rounded-3xl"></div>
                    </div>
                 </div>
              </div>

              {/* Inspector Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                 <div className="absolute inset-0 border-[2px] border-google-accent/40 border-dashed" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-google-accent text-google-bg px-4 py-1 text-[8px] font-black uppercase tracking-widest rounded-full">DIV.CONTAINER_ROOT</div>
              </div>
           </motion.div>
        </div>

        {/* Bottom Console */}
        <footer className="w-full h-32 bg-black/60 border-t border-white/5 p-8 flex items-center justify-between z-20">
           <div className="flex items-center gap-10">
              <div className="flex flex-col">
                 <span className="text-[9px] font-black text-white/20 uppercase tracking-widest italic mb-1">Response_Time</span>
                 <span className="text-xl font-mono text-google-success italic">124ms</span>
              </div>
              <div className="w-px h-8 bg-white/5"></div>
              <div className="flex flex-col">
                 <span className="text-[9px] font-black text-white/20 uppercase tracking-widest italic mb-1">Artifact_Weight</span>
                 <span className="text-xl font-mono text-white/60 italic">1.2MB</span>
              </div>
           </div>
           
           <div className="flex gap-4">
              <button className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all"><Code size={14}/> View Logic</button>
              <button className="flex items-center gap-3 px-6 py-3 bg-google-success/10 border border-google-success/20 rounded-2xl text-[9px] font-black uppercase tracking-widest text-google-success hover:bg-google-success/20 transition-all italic"><Zap size={14}/> Auto-Optimize</button>
           </div>
        </footer>
      </main>
    </div>
  );
};
