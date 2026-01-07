
import React from 'react';
import { Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Zap, Key, Users, Gavel, 
  ShieldCheck, Lock, Bell
} from 'lucide-react';
import { PrivateNode } from '../types';

// Importing private library components
import { DashboardOverview } from './admin/DashboardOverview';
import { Deployments } from './admin/Deployments';
import { Vault } from './admin/Vault';
import { Members } from './admin/Members';
import { Governance } from './admin/Governance';

interface AdminDashboardProps {
  nodes: PrivateNode[];
}

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const navItems = [
    { to: '/admin/dashboard', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { to: '/admin/deployments', label: 'Deployments', icon: <Zap size={20} /> },
    { to: '/admin/vault', label: 'Neural Vault', icon: <Key size={20} /> },
    { to: '/admin/members', label: 'Members', icon: <Users size={20} /> },
    { to: '/admin/governance', label: 'Governance', icon: <Gavel size={20} /> },
  ];

  return (
    <div className="w-80 border-r border-white/5 flex flex-col p-10 bg-black/60 shrink-0 relative z-50">
      <div className="mb-20">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-12 h-12 bg-luxury-gold rounded-2xl flex items-center justify-center text-luxury-obsidian font-black text-2xl shadow-[0_0_30px_#D4AF3744]">M</div>
          <div>
            <p className="text-[10px] font-mono text-luxury-gold/60 uppercase tracking-[0.5em] italic leading-none mb-1">Strat_Layer</p>
            <p className="text-sm font-black text-white italic tracking-tighter uppercase leading-none">Institutional</p>
          </div>
        </div>
        
        <nav className="space-y-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex items-center gap-6 px-8 py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.4em] italic transition-all relative group overflow-hidden
                ${isActive 
                  ? 'bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/30 shadow-[0_10px_30px_#D4AF3711]' 
                  : 'text-white/30 hover:text-white/80 hover:bg-white/[0.03] hover:border-white/10 border border-transparent'}
              `}
            >
              <span className={`transition-transform duration-500 ${location.pathname === item.to ? 'scale-110' : 'group-hover:scale-110 opacity-40 group-hover:opacity-100'}`}>
                {item.icon}
              </span>
              {item.label}
              {location.pathname === item.to && (
                <motion.div layoutId="adminNavGlow" className="absolute left-0 w-1.5 h-6 bg-luxury-gold rounded-full shadow-[0_0_15px_#D4AF37]" />
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-10 bg-luxury-gold/[0.03] border border-luxury-gold/10 rounded-[3rem] flex flex-col items-center gap-6 text-center">
        <div className="relative">
          <ShieldCheck size={40} className="text-luxury-gold opacity-30" />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 italic mb-2">System Integrity</p>
          <p className="text-[9px] font-mono text-luxury-gold/60 uppercase tracking-[0.2em] italic">ROOT_SECURE_NODE_01</p>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ nodes }) => {
  return (
    <div className="flex h-full bg-[#020308] animate-in fade-in duration-1000 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-luxury-gold/[0.02] blur-[300px] rounded-full pointer-events-none" />
      
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0 h-full relative z-10">
        <header className="px-16 py-14 border-b border-white/5 flex justify-between items-center bg-black/20 backdrop-blur-md">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <ShieldCheck className="text-luxury-gold" size={20} />
              <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none font-sans">Institutional Terminal</h1>
            </div>
            <p className="text-[10px] font-mono text-luxury-gold/50 uppercase tracking-[0.6em] italic">Infrastructure_Audit</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 px-8 py-4 bg-luxury-gold/5 border border-luxury-gold/20 rounded-2xl shadow-xl">
              <Lock size={18} className="text-luxury-gold" />
              <span className="text-[10px] font-black text-luxury-gold uppercase tracking-[0.4em] italic font-mono">Encrypted Session</span>
            </div>
            <button className="p-5 bg-white/5 border border-white/10 rounded-2xl text-white/40 hover:text-luxury-gold hover:border-luxury-gold/30 transition-all active:scale-95 group">
              <Bell size={24} />
            </button>
          </div>
        </header>

        <main className="flex-1 p-16 overflow-y-auto studio-scroll no-scrollbar">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="dashboard" element={<DashboardOverview nodes={nodes} />} />
              <Route path="deployments" element={<Deployments />} />
              <Route path="vault" element={<Vault />} />
              <Route path="members" element={<Members />} />
              <Route path="governance" element={<Governance />} />
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
