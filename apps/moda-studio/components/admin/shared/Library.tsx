
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon, Shield, Search, X, Maximize2, Minimize2, Check, Copy } from 'lucide-react';

/**
 * MODA OS Private Component Library v5.0
 * Unified Design System for Luxury Institutional UI
 */

export const LuxuryCard: React.FC<{
  title?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}> = ({ title, icon: Icon, children, className = "", glow = false }) => (
  <div className={`bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[3rem] p-10 relative overflow-hidden group shadow-2xl transition-all duration-700 hover:border-luxury-gold/20 ${className}`}>
    {glow && <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-gold/[0.03] blur-[100px] rounded-full pointer-events-none" />}
    {title && (
      <div className="flex items-center gap-4 mb-10 relative z-10">
        {Icon && <Icon size={20} className="text-luxury-gold" />}
        <h3 className="text-xs font-black italic text-white/40 uppercase tracking-[0.5em] font-mono">{title}</h3>
      </div>
    )}
    <div className="relative z-10 h-full">{children}</div>
  </div>
);

export const GoldButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'solid' | 'outline' | 'ghost';
  disabled?: boolean;
}> = ({ children, onClick, className = "", variant = 'solid', disabled = false }) => {
  const base = "px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] italic transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-3";
  const variants = {
    solid: "bg-white text-black hover:bg-luxury-gold hover:text-black disabled:bg-white/20 disabled:text-white/20",
    outline: "bg-transparent border border-white/10 text-white/40 hover:border-luxury-gold hover:text-white disabled:opacity-20",
    ghost: "bg-transparent text-white/20 hover:text-white hover:bg-white/5"
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export const StatusBadge: React.FC<{
  status: string;
  type?: 'success' | 'warning' | 'error' | 'neutral' | 'gold';
}> = ({ status, type = 'neutral' }) => {
  const styles = {
    success: 'bg-google-success/10 text-google-success border-google-success/20',
    warning: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    error: 'bg-red-500/10 text-red-500 border-red-500/20',
    gold: 'bg-luxury-gold/10 text-luxury-gold border-luxury-gold/20',
    neutral: 'bg-white/5 text-white/20 border-white/10'
  };
  return (
    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase italic tracking-widest border ${styles[type]}`}>
      {status}
    </span>
  );
};

export const LuxuryInput: React.FC<{
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  placeholder?: string;
  mono?: boolean;
  icon?: LucideIcon;
}> = ({ label, value, onChange, type = "text", placeholder, mono = true, icon: Icon }) => (
  <div className="space-y-3">
    <label className="text-[9px] font-black text-white/20 uppercase tracking-widest ml-4 italic">{label}</label>
    <div className="relative group">
      {Icon && <Icon className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-luxury-gold transition-colors" size={16} />}
      <input 
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full bg-black/60 border border-white/5 rounded-2xl py-5 text-sm outline-none transition-all 
          focus:border-luxury-gold/40 focus:bg-black/80 shadow-inner
          ${Icon ? 'pl-16 pr-8' : 'px-8'}
          ${mono ? 'font-mono text-luxury-gold italic tracking-widest' : 'text-white/80'}
        `}
      />
    </div>
  </div>
);

export const NeuralPortal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}> = ({ isOpen, onClose, title, children, width = "max-w-2xl" }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
        />
        <motion.div 
          initial={{ scale: 0.9, y: 50, opacity: 0 }} 
          animate={{ scale: 1, y: 0, opacity: 1 }} 
          exit={{ scale: 0.9, y: 50, opacity: 0 }}
          className={`w-full ${width} bg-luxury-obsidian border border-white/10 rounded-[4rem] overflow-hidden shadow-[0_100px_200px_rgba(0,0,0,0.8)] relative z-10`}
        >
          <header className="px-12 py-10 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <div className="flex items-center gap-6">
              <Shield className="text-luxury-gold" size={24} />
              <div>
                <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">{title}</h3>
                <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest italic">MODA_OS_SECURE_FRAGMENT</p>
              </div>
            </div>
            <button onClick={onClose} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 hover:text-red-500 transition-all">
              <X size={20} />
            </button>
          </header>
          <div className="p-12 max-h-[80vh] overflow-y-auto studio-scroll">{children}</div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export const DataScanner: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
    <motion.div 
      animate={{ y: ['0%', '100%'] }}
      transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      className="w-full h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent shadow-[0_0_20px_#D4AF37]"
    />
  </div>
);

export const LuxuryTable: React.FC<{
  headers: string[];
  rows: any[][];
  onRowClick?: (idx: number) => void;
}> = ({ headers, rows, onRowClick }) => (
  <div className="w-full bg-white/[0.02] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
    <table className="w-full text-left">
      <thead className="bg-white/[0.03] border-b border-white/10">
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.4em] text-white/30 font-mono italic">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5">
        {rows.map((row, ridx) => (
          <tr key={ridx} onClick={() => onRowClick?.(ridx)} className="group hover:bg-white/[0.02] transition-colors cursor-pointer">
            {row.map((cell, cidx) => (
              <td key={cidx} className="px-10 py-8">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
