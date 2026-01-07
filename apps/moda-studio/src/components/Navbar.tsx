
import React from 'react';
import { CompilerStatus, User } from '../types';
import { Share2, Globe, Shield, LogOut, Command, CreditCard, ExternalLink, AlertTriangle } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  status: CompilerStatus;
  onBack: () => void;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  onShare: () => void;
  hasApiKey: boolean;
  onSelectKey: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ status, user, onLogin, onLogout, onShare, hasApiKey, onSelectKey }) => {
  return (
    <header className="h-24 border-b border-white/5 dark:border-white/5 flex items-center justify-between px-12 bg-luxury-obsidian dark:bg-luxury-obsidian transition-colors duration-500 z-50 shrink-0 select-none">
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-5 group">
          <div className="w-12 h-12 rounded-[1.25rem] bg-luxury-gold text-luxury-obsidian flex items-center justify-center font-black text-2xl shadow-[0_0_40px_rgba(212,175,55,0.3)]">M</div>
          <div className="flex flex-col items-start">
            <span className="text-xl font-black tracking-tighter text-luxury-gold leading-none uppercase italic">
              MODA <span className="font-light opacity-30 italic">OS</span>
            </span>
            <span className="text-[9px] font-mono text-luxury-gold/20 uppercase tracking-[0.5em] mt-2 italic">Kernel_Unlocked</span>
          </div>
        </div>
        
        <div className="h-12 w-[1px] bg-white/10 hidden md:block"></div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onSelectKey}
            className={`flex items-center gap-4 px-5 py-2 border rounded-2xl transition-all interactive ${
              hasApiKey ? 'bg-google-success/5 border-google-success/20 text-google-success' : 'bg-red-500/5 border-red-500/20 text-red-400 animate-pulse'
            }`}
          >
            <CreditCard size={14} />
            <div className="flex flex-col items-start text-left">
              <span className="text-[9px] font-mono font-black uppercase tracking-widest italic leading-none">
                {hasApiKey ? 'Direct_Billing: ACTIVE' : 'Action_Required: KEY_MISSING'}
              </span>
              <span className="text-[7px] opacity-60 uppercase mt-1">
                {hasApiKey ? 'Linked to Cloud Project' : 'Select Key to Enable Production'}
              </span>
            </div>
          </button>

          <a 
            href="https://console.cloud.google.com/billing" 
            target="_blank" 
            className="hidden xl:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-luxury-gold hover:border-luxury-gold transition-all text-[9px] font-black uppercase tracking-widest italic"
          >
            Manage_Billing <ExternalLink size={10} />
          </a>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-3 text-red-400/40 text-[9px] font-mono italic">
          <AlertTriangle size={12} /> 
          <span>LOCAL_AUTH_BYPASS_ENABLED</span>
        </div>

        <div className={`hidden md:flex items-center gap-4 px-6 py-2 border rounded-full transition-all ${
          status === 'COMPILING' ? 'bg-google-accent/10 border-google-accent/40' : 'bg-google-success/10 border-google-success/40'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${
            status === 'COMPILING' ? 'bg-google-accent animate-pulse shadow-[0_0_10px_#8ab4f8]' : 'bg-google-success shadow-[0_0_10px_#81c995]'
          }`}></div>
          <span className={`text-[10px] font-black uppercase tracking-[0.4em] italic ${
            status === 'COMPILING' ? 'text-google-accent' : 'text-google-success'
          }`}>
            {status === 'COMPILING' ? 'Kernel_Synthesizing...' : 'Sync_Complete'}
          </span>
        </div>

        <div className="flex items-center gap-4">
           <ThemeToggle />
           <button 
            onClick={onShare}
            className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white/20 hover:text-luxury-gold hover:border-luxury-gold transition-all active:scale-90 interactive"
          >
            <Share2 size={20} />
          </button>
        </div>
        
        <div className="h-12 w-[1px] bg-white/10 mx-2"></div>

        {user ? (
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-end">
              <span className="text-[11px] font-black text-white dark:text-white leading-none uppercase tracking-widest italic">{user.displayName}</span>
              <span className="text-[9px] text-white/20 leading-none mt-2 font-mono italic">AUTO_AUTHORIZED</span>
            </div>
            <div className="relative group interactive">
               <button className="w-12 h-12 rounded-[1.25rem] border border-white/10 overflow-hidden shadow-2xl group-hover:border-luxury-gold transition-all">
                 <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=D4AF37&color=020308`} alt="User" className="w-full h-full object-cover" />
               </button>
               <button 
                onClick={onLogout}
                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg"
               >
                 <LogOut size={12} />
               </button>
            </div>
          </div>
        ) : (
          <button 
            onClick={onLogin}
            className="flex items-center gap-4 px-8 py-3 bg-luxury-gold text-luxury-obsidian rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] hover:bg-luxury-goldLight transition-all active:scale-95 italic interactive"
          >
            <Command size={16} /> CONNECT_NODE
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
