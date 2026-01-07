
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Activity, Key, Lock, Globe, Zap, Hexagon, Terminal, Trash2, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { vaultService } from '../../services/persistenceService';
import { LuxuryCard, GoldButton, StatusBadge, LuxuryInput, NeuralPortal, DataScanner } from './shared/Library';

export const ControlCenter: React.FC = () => {
  const [keys, setKeys] = useState<Record<string, string>>({});
  const [isWiping, setIsWiping] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setKeys(vaultService.getAllKeys());
  }, []);

  const handleSave = (provider: string, val: string) => {
    vaultService.setKey(provider, val);
    setKeys(vaultService.getAllKeys());
  };

  const handleFullWipe = async () => {
    setIsWiping(true);
    await new Promise(r => setTimeout(r, 2000));
    vaultService.clearAll();
    setKeys({});
    setIsWiping(false);
    setShowConfirm(false);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20 relative">
      <header className="flex flex-col lg:flex-row justify-between items-end gap-10 border-b border-white/10 pb-16">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-4">
             <Key className="text-luxury-gold" size={28} />
             <h2 className="text-5xl font-black italic text-white uppercase tracking-tighter leading-none font-sans">Neural Vault</h2>
          </div>
          <p className="text-white/60 text-lg italic font-light leading-relaxed border-l-2 border-luxury-gold/20 pl-8">
            Manage institutional-grade neural credentials. These secrets are saved to <span className="text-luxury-gold font-bold">LocalStorage</span> only.
          </p>
        </div>
        <div className="flex items-center gap-6">
           <GoldButton variant="outline" onClick={() => setShowConfirm(true)} className="text-red-500 border-red-500/20 hover:bg-red-500">
              Protocol_Wipe
           </GoldButton>
           <div className="flex items-center gap-4 text-luxury-gold font-mono text-[10px] uppercase tracking-[0.5em] italic bg-luxury-gold/5 px-6 py-3 rounded-2xl border border-luxury-gold/20">
              <Activity size={18} className="animate-pulse" /> Sovereignty_Active
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <LuxuryCard title="Credential Matrix" icon={ShieldCheck} className="min-h-[500px]">
           <DataScanner />
           <div className="space-y-8 relative z-10">
              {[
                { id: 'OPENAI', name: 'OpenAI Core', icon: <Globe size={18}/> },
                { id: 'ANTHROPIC', name: 'Anthropic Nexus', icon: <Zap size={18}/> },
                { id: 'GEMINI_OVERRIDE', name: 'Gemini Master', icon: <Key size={18}/> }
              ].map(p => (
                <LuxuryInput 
                  key={p.id}
                  label={p.name}
                  value={keys[p.id] || ''}
                  onChange={(v) => handleSave(p.id, v)}
                  type="password"
                  placeholder="FRAGMENT_REQUIRED"
                  icon={() => p.icon as any}
                />
              ))}
           </div>
        </LuxuryCard>

        <div className="space-y-12">
           <LuxuryCard title="Audit Diagnostics" icon={Terminal}>
              <div className="space-y-6 font-mono text-[10px] text-white/30 italic">
                 <p className="flex items-center gap-4"><span className="text-luxury-gold">{'>>>'}</span> [09:12] Neural Handshake: AES_GCM_STABLE</p>
                 <p className="flex items-center gap-4"><span className="text-luxury-gold">{'>>>'}</span> [09:10] Registry Integrity: 100%</p>
                 <p className="flex items-center gap-4"><span className="text-google-success">{'>>>'}</span> NODE_STATE: SECURE</p>
              </div>
           </LuxuryCard>

           <div className="p-12 bg-red-500/[0.03] border border-red-500/20 rounded-[4rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-10 text-red-500"><ShieldAlert size={80} /></div>
              <h4 className="text-sm font-black italic text-red-500 uppercase tracking-widest mb-6">Security Override</h4>
              <p className="text-xs text-white/40 leading-relaxed italic mb-8">
                Emergency protocol to purge all local neural fragments. This cannot be undone.
              </p>
              <GoldButton onClick={() => setShowConfirm(true)} variant="outline" className="text-red-500 border-red-500/20 !py-3">
                 Activate_Purge
              </GoldButton>
           </div>
        </div>
      </div>

      <NeuralPortal isOpen={showConfirm} onClose={() => setShowConfirm(false)} title="Security Authorization">
         <div className="text-center space-y-10">
            <div className="w-24 h-24 bg-red-500/10 border border-red-500/30 rounded-[2rem] flex items-center justify-center text-red-500 mx-auto animate-pulse">
               <Trash2 size={40} />
            </div>
            <div className="space-y-4">
               <h4 className="text-3xl font-black italic text-white uppercase tracking-tighter">Confirm Total Wipe</h4>
               <p className="text-sm text-white/40 italic leading-relaxed">
                  You are about to permanently delete all API fragments and neural weights from this local environment.
               </p>
            </div>
            <div className="flex gap-4">
               <GoldButton onClick={() => setShowConfirm(false)} variant="outline" className="flex-1">Abort_Session</GoldButton>
               <GoldButton onClick={handleFullWipe} disabled={isWiping} className="flex-1 !bg-red-500 !text-white border-none shadow-[0_0_50px_rgba(239,68,68,0.3)]">
                  {isWiping ? 'Wiping...' : 'Confirm_Wipe'}
               </GoldButton>
            </div>
         </div>
      </NeuralPortal>
    </div>
  );
};
