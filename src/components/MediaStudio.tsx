
import React, { useState } from 'react';
import { Motion, AnimatePresence } from '@/ui/animation';
import { 
  Play, Image as ImageIcon, Video, Wand2, 
  Type, Music, Layers, RefreshCw, 
  Sparkles, Monitor, Tablet, Smartphone, Settings
} from '@/ui/icons';

// --- MacBook Mockup Wrapper ---
const MacBookMockup = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto w-full max-w-6xl perspective-1000 group/mockup">
    {/* Reflective screen surface/frame */}
    <div className="relative bg-[#0d0d0d] rounded-[2.5rem] border-[10px] border-[#1a1a1a] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden aspect-[16/10] transform transition-transform duration-1000 group-hover/mockup:rotateX-2">
      {/* Top Notch/Camera */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-7 bg-[#1a1a1a] rounded-b-2xl z-50 flex justify-center items-center">
        <div className="w-1.5 h-1.5 bg-[#080808] rounded-full border border-gray-800 shadow-inner" />
      </div>
      
      {/* Internal Content Display */}
      <div className="w-full h-full bg-[#0a0a0a] overflow-hidden text-white relative">
        {children}
      </div>

      {/* Screen Glare Effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-30 z-40" />
    </div>
    
    {/* MacBook Base/Body */}
    <div className="relative -z-10 mx-auto w-[112%] h-5 bg-gradient-to-b from-[#2a2a2a] to-[#151515] rounded-b-[2rem] shadow-2xl transform -translate-y-3 opacity-90 border-t border-white/5" />
    <div className="relative -z-20 mx-auto w-[25%] h-2 bg-black/40 blur-md transform -translate-y-1" />
  </div>
);

// --- AI Software UI (Internal Screen Content) ---
export const AISoftwareUI = () => {
  const [mode, setMode] = useState<'VIDEO' | 'IMAGE'>('VIDEO');
  const [isGenerating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = () => {
    setGenerating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setGenerating(false);
          return 100;
        }
        return p + 4;
      });
    }, 60);
  };

  return (
    <div className="flex h-full font-sans select-none">
      
      {/* Internal Toolbar */}
      <aside className="w-20 bg-[#111]/80 backdrop-blur-xl border-r border-white/5 flex flex-col items-center py-8 gap-8 z-20">
        <div className="w-10 h-10 bg-google-accent text-google-bg rounded-xl flex items-center justify-center font-black text-lg shadow-[0_0_20px_rgba(138,180,248,0.3)]">M</div>
        <div className="h-px w-10 bg-white/5" />
        <button 
          onClick={() => setMode('VIDEO')} 
          className={`p-3 rounded-2xl transition-all duration-500 ${mode === 'VIDEO' ? 'bg-google-accent/10 text-google-accent shadow-[0_0_15px_rgba(138,180,248,0.1)]' : 'text-white/20 hover:text-white/50'}`}
        >
          <Video size={22}/>
        </button>
        <button 
          onClick={() => setMode('IMAGE')} 
          className={`p-3 rounded-2xl transition-all duration-500 ${mode === 'IMAGE' ? 'bg-fuchsia-500/10 text-fuchsia-400 shadow-[0_0_15px_rgba(232,121,249,0.1)]' : 'text-white/20 hover:text-white/50'}`}
        >
          <ImageIcon size={22}/>
        </button>
        <button className="p-3 text-white/20 hover:text-white/50 transition-colors"><Type size={22}/></button>
        <button className="p-3 text-white/20 hover:text-white/50 transition-colors"><Music size={22}/></button>
        <div className="mt-auto p-3 text-white/10"><Settings size={22}/></div>
      </aside>

      {/* Canvas / Viewport */}
      <main className="flex-1 bg-[#050505] relative flex items-center justify-center p-12 overflow-hidden">
        {/* Workspace Grids */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        {/* Rendering Content */}
        <div className="relative z-10 w-full max-w-4xl aspect-video bg-black rounded-3xl border border-white/5 shadow-[0_40px_80px_rgba(0,0,0,0.6)] overflow-hidden group/canvas">
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <Motion 
                key="gen"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-20"
              >
                <div className="w-72 h-1.5 bg-white/5 rounded-full overflow-hidden mb-6 border border-white/5">
                  <Motion 
                    className="h-full bg-google-accent shadow-[0_0_15px_#8ab4f8]" 
                    style={{ width: `${progress}%` }} 
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-google-accent font-black uppercase tracking-[0.5em] animate-pulse">Neural Synth Core Active</span>
                  <span className="text-[10px] font-mono text-white/40">{progress}%</span>
                </div>
              </Motion>
            ) : (
              <Motion 
                key="result"
                initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }}
                className="w-full h-full"
              >
                {mode === 'VIDEO' ? (
                  <video 
                    autoPlay loop muted playsInline
                    src="https://cdn.coverr.co/videos/coverr-fashion-photoshoot-with-a-model-2580/1080p.mp4"
                    className="w-full h-full object-cover opacity-60 group-hover/canvas:opacity-100 transition-opacity duration-1000"
                  />
                ) : (
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop"
                    className="w-full h-full object-cover opacity-80 group-hover/canvas:opacity-100 transition-opacity duration-1000"
                  />
                )}
                
                {/* Play Overlay */}
                {mode === 'VIDEO' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-20 h-20 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/10 group-hover/canvas:scale-110 transition-transform duration-700">
                      <Play fill="white" className="ml-1 text-white" size={32} />
                    </div>
                  </div>
                )}
              </Motion>
            )}
          </AnimatePresence>

          {/* Canvas Metadata Overlay */}
          <div className="absolute top-6 left-6 flex gap-3">
            <div className="bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-xl border border-white/10 text-[9px] text-white/50 font-black uppercase tracking-widest italic">
              {mode === 'VIDEO' ? 'VEO_ENGINE_SYNTH_4K' : 'IMAGEN_4_PRO_RENDER'}
            </div>
            <div className="bg-google-success/20 backdrop-blur-md px-4 py-1.5 rounded-xl border border-google-success/20 text-[9px] text-google-success font-black uppercase tracking-widest italic">
              Bitrate: 45mbps
            </div>
          </div>
        </div>
      </main>

      {/* Internal Sidebar (Control Panel) */}
      <aside className="w-80 bg-[#111]/80 backdrop-blur-xl border-l border-white/5 p-8 flex flex-col gap-10">
        <div>
          <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-6 italic">Prompt Engine</h3>
          <div className="relative group">
            <textarea 
              className="w-full h-40 bg-black/60 border border-white/5 rounded-[1.5rem] p-5 text-xs text-white/80 focus:outline-none focus:border-google-accent/40 transition-all resize-none shadow-inner leading-relaxed"
              defaultValue="A cinematic editorial of a techwear collection, futuristic rainy environment, high contrast neon lighting, shot on 35mm..."
            />
            <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/20">UTF-8_ALIGNED</div>
          </div>
        </div>

        <div className="space-y-6 flex-1">
          <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-4 italic">Neural Config</h3>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-black text-white/40 uppercase tracking-widest italic">Refinement</span>
              <span className="text-[11px] font-mono text-google-accent">92.4%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-black text-white/40 uppercase tracking-widest italic">Frame Flow</span>
              <div className="flex gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-google-success shadow-[0_0_5px_currentColor]"></div>
                 <div className="w-1.5 h-1.5 rounded-full bg-google-success shadow-[0_0_5px_currentColor]"></div>
                 <div className="w-1.5 h-1.5 rounded-full bg-google-success shadow-[0_0_5px_currentColor]"></div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5">
             <div className="flex justify-between text-[9px] font-black text-white/20 uppercase tracking-widest mb-3 italic"><span>Creativity Bias</span><span>85%</span></div>
             <div className="h-1.5 w-full bg-black rounded-full overflow-hidden border border-white/5"><div className="h-full bg-google-accent w-[85%] shadow-[0_0_10px_#8ab4f8]"></div></div>
          </div>
        </div>

        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full py-5 bg-white text-black rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 hover:bg-google-accent transition-all disabled:opacity-30 shadow-2xl active:scale-95 group/btn"
        >
          {isGenerating ? <RefreshCw className="animate-spin" size={16}/> : <Wand2 size={16} className="group-hover/btn:rotate-12 transition-transform" />}
          {isGenerating ? 'Synthesizing...' : 'Generate Artifact'}
        </button>
      </aside>

    </div>
  );
};

const MediaStudio: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-[#0b0c0d] overflow-hidden animate-in fade-in duration-1000">
      
      {/* External Page Context */}
      <div className="p-12 pb-2 text-center max-w-3xl mx-auto shrink-0 relative z-20">
        <Motion 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-google-accent/10 text-google-accent text-[10px] font-black uppercase tracking-[0.5em] mb-8 border border-google-accent/20 italic"
        >
           <Sparkles size={12} /> Creation Lab v3.0
        </Motion>
        <h2 className="text-4xl lg:text-5xl font-black italic text-white tracking-tighter uppercase mb-6 leading-none">
          AI 媒体生产工坊
        </h2>
        <p className="text-base text-white/40 font-light italic leading-relaxed">
          在您的私有节点中运行顶级视觉引擎。无需繁重设备，直接在工作台中生成、剪辑、发布全模态内容。
        </p>
      </div>

      {/* Main Interactive Laptop Area */}
      <div className="flex-1 flex items-center justify-center px-12 pb-12 relative overflow-hidden">
        {/* Decorative background aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-google-accent/[0.03] blur-[200px] rounded-full pointer-events-none" />
        
        <div className="w-full h-full max-h-[800px] flex items-center justify-center">
          <MacBookMockup>
            <AISoftwareUI />
          </MacBookMockup>
        </div>
      </div>

      {/* Quick Specs / Sub-footer for the lab */}
      <div className="px-12 py-8 border-t border-white/5 bg-black/20 backdrop-blur-xl grid grid-cols-2 lg:grid-cols-4 gap-8 shrink-0">
        {[
          { icon: <Monitor size={18}/>, label: 'Resolution', val: '4K Native' },
          { icon: <Tablet size={18}/>, label: 'Model', val: 'Gemini-3 Pro' },
          { icon: <Smartphone size={18}/>, label: 'Latency', val: '< 1.2s' },
          { icon: <RefreshCw size={18}/>, label: 'Syncing', val: 'Asset Vault' }
        ].map((spec, i) => (
          <div key={i} className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/20 group-hover:text-google-accent transition-colors">{spec.icon}</div>
            <div>
              <p className="text-[9px] text-white/30 uppercase font-black tracking-widest italic">{spec.label}</p>
              <p className="text-[11px] text-white/80 font-bold uppercase italic tracking-tighter">{spec.val}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default MediaStudio;
