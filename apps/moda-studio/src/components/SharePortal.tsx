
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Copy, Share2, Check, Globe, Shield, QrCode, 
  Twitter, MessageCircle, Linkedin, Instagram, ExternalLink,
  Github, Slack
} from 'lucide-react';

interface SharePortalProps {
  onClose: () => void;
  blueprintName: string;
}

const SOCIAL_PLATFORMS = [
  { name: 'X / Twitter', icon: <Twitter size={18} />, color: 'hover:bg-white hover:text-black', url: (l: string) => `https://twitter.com/intent/tweet?text=Check out my new AI Blueprint: ${l}` },
  { name: 'Discord', icon: <MessageCircle size={18} />, color: 'hover:bg-[#5865F2] hover:text-white', url: (l: string) => `https://discord.com/channels/@me` },
  { name: 'LinkedIn', icon: <Linkedin size={18} />, color: 'hover:bg-[#0077B5] hover:text-white', url: (l: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${l}` },
  { name: 'GitHub', icon: <Github size={18} />, color: 'hover:bg-[#24292e] hover:text-white', url: (l: string) => `https://github.com/` },
  { name: 'Slack', icon: <Slack size={18} />, color: 'hover:bg-[#4A154B] hover:text-white', url: (l: string) => `https://slack.com/` },
  { name: 'Matrix', icon: <QrCode size={18} />, color: 'hover:bg-google-success hover:text-black', url: (l: string) => l },
];

export const SharePortal: React.FC<SharePortalProps> = ({ onClose, blueprintName }) => {
  const [copied, setCopied] = useState(false);
  const shareLink = `https://moda.ai/artifact/${Math.random().toString(36).substring(7).toUpperCase()}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: typeof SOCIAL_PLATFORMS[0]) => {
    window.open(platform.url(shareLink), '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-6"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 40, rotateX: 10 }} 
        animate={{ scale: 1, y: 0, rotateX: 0 }} 
        exit={{ scale: 0.9, y: 40, opacity: 0 }}
        className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[4rem] overflow-hidden shadow-[0_80px_160px_rgba(0,0,0,0.9)] relative"
      >
        <div className="p-16">
          <header className="mb-12 text-center relative">
            <div className="w-20 h-20 bg-google-accent/10 border border-google-accent/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(138,180,248,0.2)] animate-pulse">
              <Share2 className="text-google-accent" size={32} />
            </div>
            <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter mb-3">Deploy Social Node</h3>
            <p className="text-[10px] text-white/20 font-mono uppercase tracking-[0.6em] italic">Quantum_Diffusion_Active</p>
          </header>

          <div className="space-y-10">
            {/* Artifact Info */}
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] relative group hover:border-google-accent/30 transition-all duration-700">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-2 italic">Active_Blueprint</p>
                  <h4 className="text-xl font-black italic text-white uppercase tracking-tighter">{blueprintName}</h4>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-google-success shadow-[0_0_8px_#81c995]" />
                  <Globe size={16} className="text-white/10" />
                </div>
              </div>
            </div>

            {/* Quick Copy */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-google-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative bg-black border border-white/10 rounded-[1.5rem] flex items-center overflow-hidden">
                <input 
                  readOnly 
                  value={shareLink}
                  className="flex-1 bg-transparent py-5 px-8 text-xs text-white/60 font-mono focus:outline-none"
                />
                <button 
                  onClick={handleCopy}
                  className="px-10 py-5 bg-white text-black font-black uppercase text-[10px] tracking-widest flex items-center gap-3 hover:bg-google-accent transition-all active:scale-95 shadow-2xl"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Linked' : 'Copy_Node'}
                </button>
              </div>
            </div>

            {/* Platform Matrix */}
            <div>
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-6 italic text-center">Broadcast_Matrix</p>
              <div className="grid grid-cols-3 gap-6">
                {SOCIAL_PLATFORMS.map((platform) => (
                  <button 
                    key={platform.name}
                    onClick={() => handleShare(platform)}
                    className={`flex flex-col items-center justify-center gap-4 p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] transition-all duration-500 group ${platform.color} interactive`}
                  >
                    <div className="transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6">
                      {platform.icon}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 italic">
                      {platform.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="mt-16 w-full py-5 border border-white/5 text-white/10 hover:text-white/40 hover:bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.8em] transition-all italic tracking-widest"
          >
            TERMINATE_SESSION [ESC]
          </button>
        </div>
        
        {/* Decorative HUD corners */}
        <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-white/10" />
        <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-white/10" />
      </motion.div>
    </motion.div>
  );
};
