
import React, { useMemo } from 'react';
import { 
  MemoryRouter, 
  Routes, 
  Route, 
  NavLink, 
  Navigate,
  useLocation
} from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, Zap, Bell, Hexagon, Globe, Cpu, Shield, 
  Database, Activity, Lock, Layers, Download, ExternalLink, 
  Users, Gavel, LayoutDashboard, Key, Terminal, AlertCircle
} from 'lucide-react';
import { PrivateNode } from '../types';
import { APIGateway } from './APIGateway';
import { ControlCenter } from './admin/ControlCenter';

interface AdminDashboardProps {
  nodes: PrivateNode[];
}

const StatCard = ({ title, value, change, trend }: { title: string, value: string, change: string, trend: 'up' | 'down' }) => (
  <div className="bg-white/[0.02] backdrop-blur-3xl border border-luxury-gold/10 p-8 rounded-[2.5rem] flex flex-col justify-between h-44 hover:border-luxury-gold/40 transition-all group relative overflow-hidden shadow-2xl">
    <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:scale-110 transition-all text-luxury-gold">
      <Hexagon size={64} />
    </div>
    <div className="flex justify-between items-start relative z-10">
      <span className="text-luxury-gold/60 text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">{title}</span>
      <span className={`text-[10px] font-black px-4 py-1.5 rounded-full flex items-center gap-2 italic ${trend === 'up' ? 'bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
        {change} <ArrowUpRight size={14} className={trend === 'down' ? 'rotate-90' : ''} />
      </span>
    </div>
    <div className="text-6xl font-black italic tracking-tighter text-white group-hover:text-luxury-gold transition-colors duration-500 origin-left relative z-10">{value}</div>
  </div>
);

const DashboardView: React.FC<{ nodes: PrivateNode[] }> = ({ nodes }) => {
  const onlineCount = nodes.filter(n => n.status === 'ONLINE').length;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <StatCard title="Total Liquidity" value="$128.4K" change="+12.5%" trend="up" />
        <StatCard title="Active Sockets" value="2,845" change="+34.2%" trend="up" />
        <StatCard title="Throughput" value="3.2%" change="-0.4%" trend="down" />
        <StatCard title="Cluster" value={`${onlineCount}/${nodes.length}`} change="Stable" trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white/[0.01] backdrop-blur-3xl border border-white/5 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden group">
          <div className="flex items-center gap-4 mb-12">
            <Layers size={18} className="text-luxury-gold animate-pulse" />
            <h3 className="text-[11px] font-black italic text-white/60 uppercase tracking-[0.5em]">Project Portability & Health</h3>
          </div>
          <div className="grid grid-cols-2 gap-10 h-64 items-center">
            <div className="flex flex-col gap-6">
              <div className="p-6 bg-luxury-gold/5 border border-luxury-gold/20 rounded-[2rem] flex items-center justify-between group/export cursor-pointer">
                <div className="flex items-center gap-4">
                  <Download size={20} className="text-luxury-gold" />
                  <div>
                    <p className="text-[12px] font-black text-white uppercase italic">Bundle Artifacts</p>
                    <p className="text-[9px] text-white/20 font-mono italic">Ready_for_Local_Sync</p>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-luxury-gold opacity-0 group-hover/export:opacity-100 transition-all" />
              </div>
            </div>
            <div className="flex flex-col items-center border-l border-white/5 gap-4">
              <div className="text-4xl font-black italic text-white leading-none">100%</div>
              <p className="text-[9px] font-mono text-luxury-gold/40 uppercase tracking-[0.4em] italic text-center">Ownership_Index: Guaranteed</p>
            </div>
          </div>
        </div>

        <div className="bg-white/[0.01] border border-white/5 rounded-[4rem] p-12 shadow-2xl overflow-hidden">
          <div className="flex items-center gap-4 mb-10 text-luxury-gold">
            <Database size={20} /><h3 className="text-[11px] font-black italic text-white/60 uppercase tracking-[0.5em]">Kernel Bus</h3>
          </div>
          <div className="h-64 font-mono text-[11px] text-luxury-gold/50 overflow-y-auto no-scrollbar space-y-4">
            <p className="opacity-40">[10:42:01] Neural Synth active Node-04</p>
            <p className="opacity-40">[10:41:55] Gateway encryption: OK</p>
            <p className="opacity-40">[10:40:22] Global routing updated</p>
            <p className="text-google-success animate-pulse">[MODA_CORE] >> System Integrity: Verified</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MembersView: React.FC = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
    <div className="flex justify-between items-center mb-10">
      <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">Member Access Control</h2>
      <button className="px-8 py-3 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest italic">Add_Member</button>
    </div>
    <div className="bg-white/[0.01] border border-white/5 rounded-[3rem] overflow-hidden">
      <table className="w-full text-left">
        <thead className="border-b border-white/5 bg-white/[0.02]">
          <tr className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
            <th className="px-10 py-6">Identity</th>
            <th className="px-10 py-6">Access_Level</th>
            <th className="px-10 py-6">Status</th>
            <th className="px-10 py-6 text-right">Activity</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {[
            { name: 'Root Architect', role: 'Super_Admin', status: 'Active', activity: '2m ago' },
            { name: 'Design Proxy', role: 'Editor', status: 'Away', activity: '1h ago' },
            { name: 'Neural Auditor', role: 'Auditor', status: 'Offline', activity: '2d ago' }
          ].map((m, i) => (
            <tr key={i} className="text-sm text-white/60 hover:bg-white/[0.01] transition-colors group">
              <td className="px-10 py-8 font-black italic uppercase group-hover:text-luxury-gold">{m.name}</td>
              <td className="px-10 py-8 font-mono text-[10px] uppercase">{m.role}</td>
              <td className="px-10 py-8">
                <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase italic ${m.status === 'Active' ? 'bg-google-success/10 text-google-success' : 'bg-white/5 text-white/20'}`}>{m.status}</span>
              </td>
              <td className="px-10 py-8 text-right font-mono text-[10px] opacity-30">{m.activity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.div>
);

const GovernanceView: React.FC = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="bg-white/[0.01] border border-white/5 rounded-[4rem] p-12 space-y-8">
        <div className="flex items-center gap-4 text-luxury-gold">
          <Gavel size={24} /> <h3 className="text-xl font-black italic uppercase tracking-widest">Policy Engine</h3>
        </div>
        <div className="space-y-6">
          {[
            { label: 'Data Residency', status: 'Strict' },
            { label: 'Audit Logging', status: 'Enabled' },
            { label: 'Neural Isolation', status: 'Active' }
          ].map((p, i) => (
            <div key={i} className="flex justify-between items-center p-6 bg-black/40 border border-white/5 rounded-2xl">
              <span className="text-[11px] font-black text-white/60 uppercase italic">{p.label}</span>
              <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-widest">{p.status}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-red-500/5 border border-red-500/10 rounded-[4rem] p-12 space-y-8">
        <div className="flex items-center gap-4 text-red-400">
          <AlertCircle size={24} /> <h3 className="text-xl font-black italic uppercase tracking-widest">Compliance Audit</h3>
        </div>
        <div className="flex-1 space-y-4 font-mono text-[10px] text-red-400/40 italic">
          <p>>>> Scanning neural artifacts for data leaks...</p>
          <p>>>> GDPR_COMPLIANCE: Verified</p>
          <p>>>> CCPA_ALIGNED: Active</p>
          <p className="text-google-success font-black mt-4">>>> SYSTEM_GOVERNANCE_PASSED_AUDIT_78B</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const navItems = [
    { to: '/overview', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { to: '/nexus', label: 'LLM Nexus', icon: <Zap size={18} /> },
    { to: '/vault', label: 'Neural Vault', icon: <Key size={18} /> },
    { to: '/members', label: 'Members', icon: <Users size={18} /> },
    { to: '/governance', label: 'Governance', icon: <Gavel size={18} /> },
  ];

  return (
    <div className="w-80 border-r border-white/5 flex flex-col p-10 bg-black/40 shrink-0">
      <div className="mb-20">
        <p className="text-[9px] font-mono text-luxury-gold/50 uppercase tracking-[0.6em] italic mb-10">Strategic_Control</p>
        <nav className="space-y-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex items-center gap-6 px-8 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest italic transition-all relative group
                ${isActive ? 'bg-luxury-gold/5 text-luxury-gold border border-luxury-gold/20' : 'text-white/20 hover:text-white hover:bg-white/5'}
              `}
            >
              <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
              {item.label}
              {location.pathname === item.to && <motion.div layoutId="adminNav" className="absolute left-0 w-1.5 h-6 bg-luxury-gold rounded-full" />}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-10 bg-luxury-gold/5 border border-luxury-gold/10 rounded-[2.5rem] flex flex-col items-center gap-6 text-center">
        <Shield size={32} className="text-luxury-gold opacity-40" />
        <p className="text-[10px] font-black uppercase tracking-widest text-white/40 italic">Root_Status: Secure</p>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ nodes }) => {
  return (
    <MemoryRouter initialEntries={['/overview']}>
      <div className="flex h-full bg-luxury-obsidian animate-in fade-in duration-1000 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-luxury-gold/[0.02] blur-[180px] rounded-full pointer-events-none" />
        
        <AdminSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="px-16 py-12 border-b border-white/5 flex justify-between items-center z-10">
            <div>
              <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none mb-3">Institutional Control</h1>
              <p className="text-[10px] font-mono text-luxury-gold/50 uppercase tracking-[0.6em] italic">Infrastructure_Audit_Terminal</p>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4 px-6 py-3 bg-luxury-gold/5 border border-luxury-gold/20 rounded-2xl shadow-xl">
                <Lock size={16} className="text-luxury-gold" />
                <span className="text-[10px] font-black text-luxury-gold uppercase tracking-widest italic">Encrypted Session</span>
              </div>
              <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white/40 hover:text-luxury-gold transition-all active:scale-95">
                <Bell size={20} />
              </button>
            </div>
          </header>

          <main className="flex-1 p-16 overflow-y-auto studio-scroll no-scrollbar relative z-10">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/overview" element={<DashboardView nodes={nodes} />} />
                <Route path="/nexus" element={<APIGateway />} />
                <Route path="/vault" element={<ControlCenter />} />
                <Route path="/members" element={<MembersView />} />
                <Route path="/governance" element={<GovernanceView />} />
                <Route path="*" element={<Navigate to="/overview" />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </MemoryRouter>
  );
};

export default AdminDashboard;
