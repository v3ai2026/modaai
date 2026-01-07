
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Image as ImageIcon, Video, Wand2, 
  Type, Music, Settings, Sparkles, RefreshCw, 
  Download, Share2, Layers, Cpu
} from 'lucide-react';
import { generateImage, generateVideo } from '../services/geminiService';

export const AISoftwareUI = () => {
  const [mode, setMode] = useState<'VIDEO' | 'IMAGE'>('IMAGE');
  const [isGenerating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prompt, setPrompt] = useState('A high-fashion editorial of a futuristic cyberpunk model in neon Tokyo, 8k resolution, cinematic lighting.');
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState('Awaiting Instructions...');

  const handleGenerate = async () => {
    setGenerating(true);
    setResultUrl(null);
    setProgress(5);
    setStatusMsg("Initializing Neural Stream...");
    
    try {
      if (mode === 'IMAGE') {
        setStatusMsg("Synthesizing Layers...");
        const url = await generateImage(prompt);
        setResultUrl(url);
        setProgress(100);
      } else {
        const url = await generateVideo(prompt, (msg) => {
          setStatusMsg(msg);
          setProgress(p => Math.min(95, p + 5));
        });
        setResultUrl(url);
        setProgress(100);
      }
    } catch (error: any) {
      setStatusMsg(`ERROR: ${error.message}`);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex h-full bg-[#050505] text-white select-none">
      <aside className="w-16 bg-[#111] border-r border-white/5 flex flex-col items-center py-8 gap-8 shrink-0">
        <div className="w-10 h-10 bg-luxury-gold text-black rounded-xl flex items-center justify-center font-black text-xl">M</div>
        <div className="flex flex-col gap-6">
          <button onClick={() => setMode('VIDEO')} className={`p-3 rounded-xl transition-all ${mode === 'VIDEO' ? 'bg-luxury-gold text-black' : 'text-white/20 hover:text-white/60'}`}>
            <Video size={20} />
          </button>
          <button onClick={() => setMode('IMAGE')} className={`p-3 rounded-xl transition-all ${mode === 'IMAGE' ? 'bg-luxury-gold text-black' : 'text-white/20 hover:text-white/60'}`}>
            <ImageIcon size={20} />
          </button>
          <button className="p-3 text-white/10 hover:text-white/40 transition-colors"><Type size={20}/></button>
          <button className="p-3 text-white/10 hover:text-white/40 transition-colors"><Music size={20}/></button>
        </div>
        <button className="mt-auto p-3 text-white/10 hover:text-white/40 transition-colors"><Settings size={20}/></button>
      </aside>

      <main className="flex-1 relative flex flex-col overflow-hidden">
        <header className="h-14 border-b border-white/5 flex items-center justify-between px-8 bg-black/40 backdrop-blur-xl">
           <div className="flex items-center gap-6">
              <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] italic">Project_Artifact_01</span>
              <div className="h-4 w-px bg-white/5" />
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest italic text-luxury-gold">
                 <Cpu size={14} /> 
                 {mode === 'IMAGE' ? 'Imagen_Engine_v3' : 'Veo_Fast_Flow'}
              </div>
           </div>
           <div className="flex gap-4">
              <button className="p-2 text-white/20 hover:text-white transition-colors"><Share2 size={16}/></button>
              <button className="p-2 text-white/20 hover:text-white transition-colors"><Download size={16}/></button>
           </div>
        </header>

        <div className="flex-1 p-10 flex items-center justify-center relative overflow-hidden">
           <div className="absolute inset-0 singularity-grid opacity-[0.05]" />
           
           <div className="relative z-10 w-full max-w-5xl aspect-video bg-black/60 rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden group">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  <motion.div key="gen" className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20">
                    <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden mb-6">
                       <motion.div className="h-full bg-luxury-gold" animate={{ width: `${progress}%` }} />
                    </div>
                    <span className="text-[10px] font-black text-luxury-gold uppercase tracking-[0.5em] animate-pulse italic">{statusMsg}</span>
                  </motion.div>
                ) : resultUrl ? (
                  <motion.div key="res" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full">
                    {mode === 'VIDEO' ? (
                      <video src={resultUrl} controls autoPlay loop className="w-full h-full object-contain" />
                    ) : (
                      <img src={resultUrl} className="w-full h-full object-contain" alt="Gen" />
                    )}
                  </motion.div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white/5">
                     <Sparkles size={64} className="mb-6 opacity-20" />
                     <p className="text-[10px] font-black uppercase tracking-[0.6em] italic">Engine_Awaiting_Prompt</p>
                  </div>
                )}
              </AnimatePresence>
           </div>
        </div>

        <footer className="p-10 border-t border-white/5 bg-black/40 backdrop-blur-2xl">
           <div className="max-w-4xl mx-auto flex items-center gap-8">
              <div className="flex-1 relative">
                 <textarea 
                  value={prompt} 
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] p-6 text-xs text-white/80 outline-none focus:border-luxury-gold/40 transition-all resize-none h-24"
                  placeholder="Describe your vision..."
                 />
                 <div className="absolute right-6 bottom-6 text-[8px] font-mono text-white/20">CTRL_ENTER_SYNC</div>
              </div>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-12 py-8 bg-white text-black rounded-[2rem] font-black uppercase tracking-[0.4em] text-[11px] hover:bg-luxury-gold transition-all italic shadow-2xl disabled:opacity-30 active:scale-95 flex items-center gap-4"
              >
                {isGenerating ? <RefreshCw className="animate-spin" size={16}/> : <Wand2 size={16}/>}
                Synthesize
              </button>
           </div>
        </footer>
      </main>

      <aside className="w-72 bg-[#111] border-l border-white/5 p-8 flex flex-col gap-10 shrink-0">
         <div>
            <h4 className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-6 italic">Visual Control</h4>
            <div className="space-y-4">
               {['Aspect Ratio', 'Resolution', 'Sampling', 'Motion Scale'].map(item => (
                 <div key={item} className="flex justify-between items-center p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <span className="text-[9px] font-black text-white/40 uppercase italic">{item}</span>
                    <span className="text-[10px] font-mono text-luxury-gold">DEFAULT</span>
                 </div>
               ))}
            </div>
         </div>
         <div className="flex-1 bg-luxury-gold/5 border border-luxury-gold/10 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center gap-4">
            <Layers size={32} className="text-luxury-gold opacity-40" />
            <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Asset History</p>
            <p className="text-[8px] text-white/20 uppercase italic">Linked to Brand Vault</p>
         </div>
      </aside>
    </div>
  );
};
