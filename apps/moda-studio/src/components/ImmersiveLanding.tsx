
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles, Loader2, Chrome } from 'lucide-react';

interface ImmersiveLandingProps {
  onStart: () => void;
  onLoginClick: () => void;
  memberId: string | null;
}

const ImmersiveLanding: React.FC<ImmersiveLandingProps> = ({ onStart, onLoginClick, memberId }) => {
  const [isInitiating, setIsInitiating] = useState(false);

  const handleStart = () => {
    setIsInitiating(true);
    setTimeout(onStart, 1200); 
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col">
      {/* Background Cinematic Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video 
          autoPlay loop muted playsInline 
          className="w-full h-full object-cover scale-110 opacity-60 animate-slow-pan"
          src="https://cdn.coverr.co/videos/coverr-fashion-photoshoot-with-a-model-2580/1080p.mp4"
        />
        <div className="absolute inset-0 bg-black/50 mix-blend-multiply" />
        <div className="absolute inset-0 singularity-grid opacity-30" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black opacity-60" />
      </div>

      <header className="relative z-20 px-12 py-10 flex justify-between items-center mix-blend-difference">
        <div className="flex flex-col">
          <h2 className="text-2xl font-black italic tracking-tighter uppercase leading-none text-white">MODA STUDIO</h2>
          <p className="text-[9px] font-mono tracking-[0.5em] text-white/50 mt-2 uppercase">Neural_Design_Protocol_v3.1</p>
        </div>
        <div className="flex gap-10 items-center">
          <div className="hidden md:flex flex-col items-end font-mono text-[9px] text-white/40 tracking-widest uppercase italic">
            <span>Grid_Status: ACTIVE</span>
            <span>Billing_Mode: DIRECT_SYNC</span>
          </div>
          {memberId ? (
            <div className="px-5 py-2 border border-google-success/40 bg-google-success/10 rounded-full text-[10px] font-black uppercase tracking-widest italic text-google-success shadow-[0_0_15px_rgba(129,201,149,0.2)]">
              Authorized: {memberId}
            </div>
          ) : (
            <button 
              onClick={onLoginClick} 
              className="flex items-center gap-3 px-6 py-2.5 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest italic hover:bg-google-accent transition-all active:scale-95 shadow-2xl interactive"
            >
              <Chrome size={14} /> Sign_in_with_Google
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 relative z-10 flex flex-col items-center justify-center text-center px-12">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mix-difference"
        >
          <div className="flex items-center justify-center gap-4 mb-8 opacity-40">
             <Sparkles size={14} className="text-white animate-pulse" />
             <p className="text-[10px] font-mono tracking-[1.2em] text-white uppercase italic">Zero Latency Orchestration</p>
             <Sparkles size={14} className="text-white animate-pulse" />
          </div>
          <h1 className="text-[14vw] font-black tracking-tighter leading-[0.85] uppercase text-white cursor-none interactive hover:scale-[1.02] transition-transform duration-1000">
            MODA
          </h1>
          <h1 className="text-[14vw] font-black tracking-tighter leading-[0.85] uppercase italic text-white cursor-none interactive hover:skew-x-6 transition-transform duration-1000">
            STUDIO
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-16 flex flex-col items-center min-h-[140px]"
        >
          {isInitiating ? (
            <div className="flex flex-col items-center gap-6">
              <Loader2 className="w-12 h-12 text-google-accent animate-spin" />
              <p className="text-[10px] font-black text-google-accent uppercase tracking-[0.6em] animate-pulse italic">Connecting to Neural Backbone...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-12">
              <p className="text-white/40 text-xl md:text-2xl font-light max-w-2xl leading-relaxed italic">
                Direct infrastructure billing via <span className="text-white border-b border-google-accent/40">Google Cloud Projects</span>. 
                Full ownership of your neural artifacts.
              </p>
              
              <button 
                onClick={memberId ? handleStart : onLoginClick}
                className="group relative flex items-center gap-6 px-12 py-6 bg-white text-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_60px_rgba(255,255,255,0.2)] interactive"
              >
                <span className="text-xs font-black uppercase tracking-[0.5em] italic relative z-10">
                  {memberId ? 'Initialize_Workspace' : 'Connect_Account_to_Start'}
                </span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-google-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
              
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-12 text-white/10"
              >
                <ChevronDown size={32} />
              </motion.div>
            </div>
          )}
        </motion.div>
      </main>

      <footer className="relative z-20 px-12 py-10 flex justify-between items-end mix-blend-difference opacity-40">
        <div className="flex flex-col gap-2">
          <span className="text-[8px] font-mono tracking-widest text-white uppercase italic">Copyright © 2025 Moda Labs</span>
          <span className="text-[8px] font-mono tracking-widest text-white uppercase italic">Zero-Cost Deployment Logic Active</span>
        </div>
        <div className="text-right">
          <span className="text-[8px] font-mono tracking-widest text-white uppercase italic">Built on Gemini 2.5/3 Pro</span>
        </div>
      </footer>
    </div>
  );
};

export default ImmersiveLanding;
