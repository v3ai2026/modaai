
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, CreditCard, ExternalLink, HelpCircle, 
  AlertCircle, Hexagon, Lock, Globe, Key, Eye, EyeOff, Save, Trash2, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { vaultService } from '../../services/persistenceService';

export const ControlCenter: React.FC = () => {
  const [keys, setKeys] = useState<Record<string, string>>({});
  const [visibleProvider, setVisibleProvider] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const providers = [
    { id: 'OPENAI', name: 'OpenAI (GPT-4o/o1)', icon: <Globe size={18} />, placeholder: 'sk-...' },
    { id: 'ANTHROPIC', name: 'Anthropic (Claude 3.5)', icon: <Zap size={18} />, placeholder: 'sk-ant-...' },
    { id: 'DEEPSEEK', name: 'DeepSeek (V3/R1)', icon: <Hexagon size={18} />, placeholder: 'sk-...' },
    { id: 'GEMINI_OVERRIDE', name: 'Gemini (Override Manual)', icon: <Key size={18} />, placeholder: 'AI...' }
  ];

  useEffect(() => {
    setKeys(vaultService.getAllKeys());
  }, []);

  const handleSave = (provider: string, val: string) => {
    vaultService.setKey(provider, val);
    setKeys(vaultService.getAllKeys());
    setSaveStatus(provider);
    setTimeout(() => setSaveStatus(null), 2000);
  };

  const handleClear = (provider: string) => {
    if(confirm(`确定删除 ${provider} 的密钥吗？`)) {
      vaultService.removeKey(provider);
      setKeys(vaultService.getAllKeys());
    }
  };

  return (
    <div className="p-12 space-y-12 animate-in fade-in duration-1000">
      <header className="flex flex-col lg:flex-row justify-between items-end gap-10 border-b border-white/5 pb-12">
        <div className="max-w-2xl">
          <h2 className="text-5xl font-black italic text-white uppercase tracking-tighter mb-4 leading-none">Strategic Intelligence</h2>
          <p className="text-white/40 text-lg italic font-light leading-relaxed">
            Monitor institutional-grade infrastructure billing and neural node integrity via the moda OS Strategic Layer.
          </p>
        </div>
        <div className="flex items-center gap-4 text-luxury-gold font-mono text-[10px] uppercase tracking-[0.5em] italic">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
           </svg>
           Infrastructure_Monitored
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Neural Secret Vault */}
        <div className="bg-white/[0.01] backdrop-blur-3xl border border-luxury-gold/10 rounded-[4rem] p-12 space-y-10 relative overflow-hidden group shadow-2xl">
           <div className="absolute top-0 right-0 p-12 opacity-[0.03] text-luxury-gold"><Key size={180} /></div>
           <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 bg-luxury-gold/5 border border-luxury-gold/20 rounded-[1.5rem] flex items-center justify-center text-luxury-gold shadow-lg">
                    <Lock size={32} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">Neural Secret Vault</h3>
                    <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mt-1">Multi_Protocol_Sync: Active</p>
                 </div>
              </div>
              <button 
                onClick={() => { vaultService.clearAll(); setKeys({}); }}
                className="text-[10px] font-black text-red-500/40 hover:text-red-500 uppercase tracking-widest italic transition-colors"
              >
                Destroy_All_Secrets
              </button>
           </div>

           <div className="space-y-6 relative z-10">
              {providers.map((p) => (
                <div key={p.id} className="p-8 bg-black/40 border border-white/5 rounded-[2.5rem] group/key hover:border-luxury-gold/20 transition-all duration-500">
                   <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-4 text-white/60">
                         {p.icon}
                         <span className="text-[11px] font-black uppercase tracking-widest italic">{p.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <button onClick={() => setVisibleProvider(visibleProvider === p.id ? null : p.id)} className="text-white/20 hover:text-white transition-colors">
                          {visibleProvider === p.id ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                        <button onClick={() => handleClear(p.id)} className="text-white/20 hover:text-red-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                   </div>
                   <div className="relative flex items-center gap-4">
                      <input 
                        type={visibleProvider === p.id ? "text" : "password"}
                        placeholder={p.placeholder}
                        value={keys[p.id] || ''}
                        onChange={(e) => handleSave(p.id, e.target.value)}
                        className="flex-1 bg-luxury-obsidian/60 border border-white/5 rounded-2xl px-6 py-4 text-xs font-mono text-luxury-gold focus:outline-none focus:border-luxury-gold/40 transition-all italic"
                      />
                      <AnimatePresence>
                        {saveStatus === p.id && (
                          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute right-4 text-google-success">
                            <ShieldCheck size={18} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Original Billing Section */}
        <div className="bg-white/[0.01] backdrop-blur-3xl border border-white/5 rounded-[4rem] p-12 space-y-10 relative overflow-hidden group shadow-2xl hover:border-luxury-gold/30 transition-all duration-700">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000 text-luxury-gold">
            <CreditCard size={180} />
          </div>
          <div className="flex items-center gap-6 mb-10 relative z-10">
            <div className="w-16 h-16 bg-luxury-gold/5 border border-luxury-gold/20 rounded-[1.5rem] flex items-center justify-center text-luxury-gold shadow-lg group-hover:bg-luxury-gold/10 transition-colors">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">Billing Diagnostics</h3>
              <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mt-1">Audit_Protocol: v2.4</p>
            </div>
          </div>
          <div className="space-y-8 relative z-10">
            <div className="p-10 bg-red-500/5 border border-red-500/10 rounded-[2.5rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-red-500"><AlertCircle size={64} /></div>
              <div className="flex items-center gap-4 text-red-400 text-[11px] font-black uppercase tracking-[0.3em] mb-6 italic">
                <AlertCircle size={16} /> Billing_Anomaly_Mitigation
              </div>
              <p className="text-base text-white/50 leading-relaxed italic mb-8 border-l-2 border-red-500/20 pl-6">
                Detected 50 USD / 350 CNY pending hold? This is typically a <span className="text-white font-bold italic">Verification Authorization</span>. 
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <a href="https://console.cloud.google.com/billing" target="_blank" className="group/link w-full py-5 bg-white text-black rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-luxury-gold transition-all italic shadow-2xl active:scale-95">
                GCP_Billing_Portal <ExternalLink size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
              </a>
              <a href="https://support.google.com/cloud/answer/6288653" target="_blank" className="w-full py-5 border border-white/10 text-white/40 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-white/5 hover:text-white transition-all italic active:scale-95">
                Request_Refund <HelpCircle size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
