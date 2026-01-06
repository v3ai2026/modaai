
import React, { useState } from 'react';
import { Motion, AnimatePresence } from '@/ui/animation';
import { X, Lock, Unlock, Terminal, Loader2, Info, Chrome, ShieldCheck } from '@/ui/icons';

export const AccessTerminal = ({ onSuccess, onClose }: { onSuccess: (id: string) => void; onClose: () => void }) => {
  const [inputVal, setInputVal] = useState('');
  const [status, setStatus] = useState('locked'); 

  const handleGoogleLogin = () => {
    setStatus('verifying');
    // Simulate Google OAuth flow
    setTimeout(() => {
      setStatus('granted');
      setTimeout(() => onSuccess('VIP-ARCHITECT'), 1000);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal) return;
    setStatus('verifying');
    setTimeout(() => {
      if (inputVal.length >= 3) {
        setStatus('granted');
        setTimeout(() => onSuccess(inputVal), 1000);
      } else {
        setStatus('denied');
        setTimeout(() => setStatus('locked'), 1500);
      }
    }, 1200);
  };

  return (
    <Motion initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
      <Motion initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_100px_200px_rgba(0,0,0,0.9)] relative">
        <div className="p-12 relative">
          <div className="flex justify-center mb-10">
            <AnimatePresence mode='wait'>
              {status === 'locked' && <Motion key="l" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="p-6 bg-white/5 rounded-full text-white/40"><Lock size={32} /></Motion>}
              {status === 'verifying' && <Motion key="v" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="p-6 bg-google-accent/10 rounded-full text-google-accent"><Loader2 size={32} className="animate-spin" /></Motion>}
              {status === 'granted' && <Motion key="g" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="p-6 bg-google-success/10 rounded-full text-google-success"><Unlock size={32} /></Motion>}
              {status === 'denied' && <Motion key="d" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="p-6 bg-red-500/10 rounded-full text-red-500"><X size={32} /></Motion>}
            </AnimatePresence>
          </div>

          <h2 className="text-2xl font-black italic text-center text-white uppercase tracking-tighter mb-4">Uplink Gateway</h2>
          <p className="text-white/20 text-center text-[10px] uppercase tracking-widest mb-10 italic">Google_Cloud_Auth_Active</p>

          <div className="space-y-6">
            <button 
              onClick={handleGoogleLogin}
              disabled={status !== 'locked'}
              className="w-full flex items-center justify-center gap-4 bg-white text-black font-black py-5 rounded-2xl hover:bg-google-accent transition-all disabled:opacity-30 uppercase tracking-[0.2em] text-[11px] italic shadow-2xl"
            >
              <Chrome size={18} /> Sign_in_with_Google
            </button>

            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-white/5" />
              <span className="text-[8px] font-mono text-white/10 uppercase italic">Or_Legacy_Override</span>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Terminal className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                <input 
                  type="text" 
                  value={inputVal} 
                  onChange={(e) => setInputVal(e.target.value.toUpperCase())} 
                  placeholder="ARCHITECT_ID" 
                  disabled={status !== 'locked' && status !== 'denied'} 
                  className="w-full bg-black border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white font-mono tracking-widest focus:outline-none focus:border-google-accent/40 transition-all placeholder:text-white/10 uppercase italic text-xs" 
                />
              </div>
              <button type="submit" disabled={status !== 'locked' && status !== 'denied'} className="w-full border border-white/10 text-white/40 font-black py-4 rounded-2xl hover:bg-white/5 transition-all disabled:opacity-30 uppercase tracking-[0.4em] text-[10px] italic">
                {status === 'verifying' ? 'Syncing...' : 'Uplink_Manual'}
              </button>
            </form>
          </div>

          {/* Billing Info Notice */}
          <div className="mt-10 pt-8 border-t border-white/5">
             <div className="flex items-start gap-4 p-5 bg-google-success/5 rounded-2xl border border-google-success/10">
                <ShieldCheck size={18} className="text-google-success shrink-0 mt-0.5" />
                <div className="space-y-2">
                   <p className="text-[10px] text-google-success font-black italic tracking-wider uppercase">Direct Billing Architecture</p>
                   <p className="text-[9px] text-white/40 leading-relaxed italic">
                     Once connected, you will be prompted to select a <span className="text-white">Google Cloud Paid Project</span>. 
                     This ensures zero-cost operation for developers while giving you 100% data residency.
                   </p>
                   <a 
                    href="https://ai.google.dev/gemini-api/docs/billing" 
                    target="_blank" 
                    className="text-[8px] text-google-accent underline uppercase tracking-widest font-black"
                   >
                     Billing Documentation
                   </a>
                </div>
             </div>
          </div>

          <button onClick={onClose} className="absolute top-6 right-6 p-2 text-white/10 hover:text-white transition-colors"><X size={20} /></button>
        </div>
      </Motion>
    </Motion>
  );
};
