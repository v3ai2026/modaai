
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Image as ImageIcon, Video, Wand2, 
  Type, Music, Layers, RefreshCw, 
  Sparkles, Monitor, Tablet, Smartphone, Settings
} from 'lucide-react';
import { AISoftwareUI } from './AISoftwareUI';

const MacBookMockup: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative mx-auto w-full max-w-6xl perspective-1000 group/mockup">
    <div className="relative bg-[#0d0d0d] rounded-[2.5rem] border-[10px] border-[#1a1a1a] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden aspect-[16/10] transform transition-transform duration-1000 group-hover/mockup:rotateX-2">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-7 bg-[#1a1a1a] rounded-b-2xl z-50 flex justify-center items-center">
        <div className="w-1.5 h-1.5 bg-[#080808] rounded-full border border-gray-800 shadow-inner" />
      </div>
      <div className="w-full h-full bg-[#0a0a0a] overflow-hidden text-white relative">
        {children}
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-30 z-40" />
    </div>
    <div className="relative -z-10 mx-auto w-[112%] h-5 bg-gradient-to-b from-[#2a2a2a] to-[#151515] rounded-b-[2rem] shadow-2xl transform -translate-y-3 opacity-90 border-t border-white/5" />
    <div className="relative -z-20 mx-auto w-[25%] h-2 bg-black/40 blur-md transform -translate-y-1" />
  </div>
);

const MediaStudio: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-[#0b0c0d] overflow-hidden animate-in fade-in duration-1000">
      <div className="p-12 pb-2 text-center max-w-3xl mx-auto shrink-0 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-google-accent/10 text-google-accent text-[10px] font-black uppercase tracking-[0.5em] mb-8 border border-google-accent/20 italic"
        >
           <Sparkles size={12} /> Creation Lab v3.0
        </motion.div>
        <h2 className="text-4xl lg:text-5xl font-black italic text-white tracking-tighter uppercase mb-6 leading-none">
          AI 媒体生产工坊
        </h2>
        <p className="text-base text-white/40 font-light italic leading-relaxed">
          在您的私有节点中运行顶级视觉引擎。无需繁重设备，直接在工作台中生成、剪辑、发布全模态内容。
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center px-12 pb-12 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-google-accent/[0.03] blur-[200px] rounded-full pointer-events-none" />
        <div className="w-full h-full max-h-[800px] flex items-center justify-center">
          <MacBookMockup>
            <AISoftwareUI />
          </MacBookMockup>
        </div>
      </div>

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
