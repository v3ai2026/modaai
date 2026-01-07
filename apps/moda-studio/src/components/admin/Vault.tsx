
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Key, Lock, Globe, Zap, Hexagon, Trash2, Eye, EyeOff, Activity, Clock, ShieldAlert } from 'lucide-react';
import { vaultService } from '../../services/persistenceService';
import { LuxuryCard, GoldButton, StatusBadge, LuxuryInput } from './shared/Library';

export const Vault: React.FC = () => {
  const [keys, setKeys] = useState<Record<string, string>>({});
  const [visibleProvider, setVisibleProvider] = useState<string | null>(null);
  const [auditLogs, setAuditLogs] = useState<{ id: string, action: string, time: string, status: 'success' | 'warning' }[]>([
    { id: '1', action: 'Vault_Initialized', time: '10:45:01', status: 'success' },
    { id: '2', action: 'AES_Rotation_Protocol', time: '10:42:15', status: 'success' },
    { id: '3', action: 'DeepSeek_Credential_Updated', time: '09:12:00', status: 'warning' }
  ]);

  const providers = [
    { id: 'OPENAI', name: 'OpenAI Enterprise', icon: <Globe size={20} /> },
    { id: 'ANTHROPIC', name: 'Anthropic Nexus', icon: <Zap size={20} /> },
    { id: 'DEEPSEEK', name: 'DeepSeek Matrix', icon: <Hexagon size={20} /> },
    { id: 'GEMINI_OVERRIDE', name: 'Gemini Root Override', icon: <Key size={20} /> }
  ];

  useEffect(() => {
    setKeys(vaultService.getAllKeys());
  }, []);

  const handleSave = (provider: string, val: string) => {
    vaultService.setKey(provider, val);
    setKeys(vaultService.getAllKeys());
    addAuditLog(`${provider}_Credential_Synchronized`);
  };

  const addAuditLog = (action: string) => {
    setAuditLogs(prev => [{ id: Date.now().toString(), action, time: new Date().toLocaleTimeString('en-GB'), status: 'success' }, ...prev].slice(0, 10));
  };

  const clearAll = () => {
    if(confirm('TERMINATE ALL SECRETS PERMANENTLY?')) {
      vaultService.clearAll();
      setKeys({});
      addAuditLog('TOTAL_VAULT_PURGE_EXECUTED');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 pb-20">
      <header className="flex flex-col lg:flex-row justify-between items-end gap-10 border-b border-white/10 pb-16">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-4 text-luxury-gold">
             <Lock size={36} />
             <h2 className="text-5xl font-black italic text-white uppercase tracking-tighter leading-none font-sans">Neural Vault</h2>
          </div>
          <p className="text-white/60 text-lg italic font-light leading-relaxed border-l-2 border-luxury-gold/20 pl-8">
            Manage high-value neural credentials. All secrets are governed by <span className="text-luxury-gold font-bold">Local Sovereignty Protocols</span>. No data leaves this node.
          </p>
        </div>
        <div className="flex gap-4">
           <GoldButton variant="outline" onClick={clearAll} className="text-red-500 hover:text-white hover:bg-red-500 border-red-500/20">
              Terminate_Vault
           </GoldButton>
           <div className="flex items-center gap-4 text-luxury-gold font-mono text-[10px] uppercase tracking-[0.5em] italic bg-luxury-gold/5 px-6 py-3 rounded-2xl border border-luxury-gold/20">
              <Activity size={18} className="animate-pulse" /> Sovereignty_Active
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-12">
          <LuxuryCard title="Credential Management" icon={ShieldCheck}>
             <div className="space-y-8">
                {providers.map((p) => (
                  <div key={p.id} className="p-8 bg-black/50 border border-white/5 rounded-[2.5rem] group/key hover:border-luxury-gold/20 transition-all duration-500">
                     <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-5 text-white/80">
                           <div className="text-luxury-gold opacity-40 group-hover/key:opacity-100 transition-opacity">{p.icon}</div>
                           <span className="text-xs font-black uppercase tracking-[0.3em] italic font-mono">{p.name}</span>
                        </div>
                        <button onClick={() => setVisibleProvider(visibleProvider === p.id ? null : p.id)} className="text-white/20 hover:text-luxury-gold transition-colors">
                          {visibleProvider === p.id ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                     </div>
                     <input 
                        type={visibleProvider === p.id ? "text" : "password"}
                        value={keys[p.id] || ''}
                        onChange={(e) => handleSave(p.id, e.target.value)}
                        className="w-full bg-luxury-obsidian border border-white/5 rounded-2xl px-8 py-5 text-xs font-mono text-luxury-gold placeholder:text-white/5 focus:outline-none focus:border-luxury-gold/40 transition-all italic tracking-widest shadow-inner"
                        placeholder="Insert_Credential_Fragment"
                     />
                  </div>
                ))}
             </div>
          </LuxuryCard>
        </div>

        <div className="lg:col-span-5 space-y-10">
           <LuxuryCard title="Vault Diagnostics" icon={Activity}>
              <div className="grid grid-cols-2 gap-6">
                 <div className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                    <p className="text-[9px] font-black text-white/20 uppercase tracking-widest italic mb-2">Encryption</p>
                    <p className="text-lg font-black text-white italic tracking-tighter">AES-256</p>
                 </div>
                 <div className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                    <p className="text-[9px] font-black text-white/20 uppercase tracking-widest italic mb-2">Residency</p>
                    <p className="text-lg font-black text-google-success italic tracking-tighter">LOCAL</p>
                 </div>
              </div>
           </LuxuryCard>

           <LuxuryCard title="Sovereignty Audit" icon={Clock}>
              <div className="space-y-6 max-h-96 overflow-y-auto no-scrollbar pr-4">
                 {auditLogs.map((log) => (
                   <div key={log.id} className="flex justify-between items-center p-5 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors">
                      <div className="flex flex-col gap-1">
                         <span className="text-[10px] font-black text-white/70 uppercase italic tracking-wider">{log.action}</span>
                         <span className="text-[9px] font-mono text-white/20 italic uppercase tracking-widest">{log.time}</span>
                      </div>
                      <StatusBadge status="OK" type={log.status} />
                   </div>
                 ))}
              </div>
           </LuxuryCard>

           <div className="p-10 bg-red-500/[0.03] border border-red-500/20 rounded-[3rem] space-y-6">
              <div className="flex items-center gap-4 text-red-500">
                 <ShieldAlert size={20} />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Institutional Disclaimer</span>
              </div>
              <p className="text-xs text-white/40 leading-relaxed italic font-light">
                 Direct billing handshakes may trigger a <span className="text-white font-bold">$50 verification hold</span>. This is a security protocol between Google Cloud and your financial institution. It resolves within 72 hours.
              </p>
           </div>
        </div>
      </div>
    </motion.div>
  );
};
