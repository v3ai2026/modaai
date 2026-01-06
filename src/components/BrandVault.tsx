
import React, { useState } from 'react';
import { Motion, AnimatePresence } from '@/ui/animation';
import { 
  Download, RefreshCw, Box, CheckCircle, 
  Terminal, Package, Cpu, ShieldCheck, 
  Layers, HardDrive, Binary, ArrowRight
} from '@/ui/icons';
import { BrandPackage } from '../types';

const BRANDS: BrandPackage[] = [
  { id: 'lv', name: 'Louis Vuitton', logo: 'LV', status: 'INSTALLED', version: '2.4.0', lastSync: '2h ago', dataWeight: '1.2GB', category: 'LUXURY' },
  { id: 'gucci', name: 'Gucci', logo: 'GC', status: 'UPDATE_AVAILABLE', version: '1.9.2', lastSync: '5h ago', dataWeight: '890MB', category: 'LUXURY' },
  { id: 'nike', name: 'Nike Global', logo: 'NK', status: 'INSTALLED', version: '4.0.1', lastSync: '12m ago', dataWeight: '2.5GB', category: 'STREETWEAR' },
  { id: 'adidas', name: 'Adidas', logo: 'AD', status: 'PENDING', version: '0.0.0', lastSync: 'Never', dataWeight: '1.1GB', category: 'STREETWEAR' },
  { id: 'prada', name: 'Prada', logo: 'PR', status: 'INSTALLED', version: '2.1.0', lastSync: '1d ago', dataWeight: '760MB', category: 'LUXURY' },
  { id: 'bal', name: 'Balenciaga', logo: 'BL', status: 'INSTALLED', version: '3.3.0', lastSync: '3h ago', dataWeight: '1.4GB', category: 'LUXURY' },
  { id: 'dior', name: 'Dior', logo: 'DR', status: 'UPDATE_AVAILABLE', version: '2.0.1', lastSync: '8h ago', dataWeight: '920MB', category: 'LUXURY' },
  { id: 'hermes', name: 'Hermès', logo: 'HM', status: 'INSTALLED', version: '1.5.0', lastSync: '2d ago', dataWeight: '600MB', category: 'LUXURY' },
  { id: 'zara', name: 'Zara Inditex', logo: 'ZR', status: 'INSTALLED', version: '5.2.1', lastSync: '10m ago', dataWeight: '3.8GB', category: 'FAST_FASHION' },
  { id: 'uniqlo', name: 'Uniqlo FR', logo: 'UQ', status: 'PENDING', version: '0.0.0', lastSync: 'Never', dataWeight: '1.9GB', category: 'FAST_FASHION' },
];

export const BrandVault: React.FC = () => {
  const [packages, setPackages] = useState<BrandPackage[]>(BRANDS);
  const [installingId, setInstallingId] = useState<string | null>(null);
  const [installProgress, setInstallProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => setLogs(prev => [msg, ...prev].slice(0, 12));

  const simulateInstall = (id: string) => {
    setInstallingId(id);
    setInstallProgress(0);
    const brand = packages.find(p => p.id === id);
    addLog(`>>> BOOT_INSTALLER: ${id.toUpperCase()}_WIN_X64_RELEASE`);
    addLog(`>>> REQUESTING_CLUSTER_PERMISSIONS...`);
    
    const interval = setInterval(() => {
      setInstallProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setPackages(prev => prev.map(pkg => 
            pkg.id === id ? { ...pkg, status: 'INSTALLED', lastSync: 'Just now', version: '1.0.0' } : pkg
          ));
          addLog(`SUCCESS: ${id.toUpperCase()} Node Integrated.`);
          setTimeout(() => setInstallingId(null), 1000);
          return 100;
        }
        
        if (p === 10) addLog(`CHECKING: checksum_v3_sha256... OK`);
        if (p === 30) addLog(`EXTRACTING: brand_assets.winpkg [${brand?.dataWeight}]`);
        if (p === 60) addLog(`WRITING: neural_registry_keys...`);
        if (p === 85) addLog(`SYNCING: global_edge_mirrors...`);
        
        return p + 1;
      });
    }, 40);
  };

  return (
    <div className="h-full bg-[#050505] flex flex-col p-12 overflow-y-auto studio-scroll no-scrollbar">
      <header className="mb-16 flex justify-between items-end">
        <div>
          <span className="text-google-success text-[10px] font-black uppercase tracking-[0.5em] mb-4 block italic">International_Asset_Registry</span>
          <h1 className="text-5xl font-black italic text-white uppercase tracking-tighter leading-none">Brand Vault</h1>
          <p className="text-white/20 text-xs mt-4 italic font-light">Manage and install certified Win-Packages for global fashion entities.</p>
        </div>
        
        <div className="flex gap-8 items-center bg-white/[0.02] p-6 rounded-[2rem] border border-white/5 shadow-2xl">
          <div className="flex flex-col items-end">
             <span className="text-[9px] font-black text-white/30 uppercase tracking-widest italic mb-1">Vault_Occupancy</span>
             <span className="text-xl font-mono text-google-accent italic">15.2 / 100 GB</span>
          </div>
          <div className="w-12 h-12 bg-google-accent/10 border border-google-accent/20 rounded-xl flex items-center justify-center text-google-accent">
             <HardDrive size={24} className="animate-pulse" />
          </div>
        </div>
      </header>

      {/* Brand Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-8 mb-16">
        {packages.map((pkg) => (
          <Motion 
            key={pkg.id}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`relative bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-10 flex flex-col group transition-all duration-700 overflow-hidden shadow-2xl
              ${pkg.status === 'INSTALLED' ? 'hover:border-google-success/40' : 'hover:border-google-accent/40'}
            `}
          >
            {/* Visual HUD Element */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="mb-10 w-20 h-20 rounded-[1.5rem] bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-all relative overflow-hidden">
               <span className="text-3xl font-black italic text-white/10 group-hover:text-google-accent transition-colors z-10">{pkg.logo}</span>
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff05_1px,transparent_1px)] bg-[size:10px:10px]" />
            </div>

            <h3 className="text-xl font-black italic text-white uppercase tracking-tighter mb-2 truncate">{pkg.name}</h3>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest italic">{pkg.category}</span>
              <div className="w-1 h-1 rounded-full bg-white/10" />
              <span className="text-[9px] font-mono text-google-accent italic">v{pkg.version}</span>
            </div>

            <div className="mt-auto space-y-4">
               <div className="flex justify-between items-center text-[9px] font-mono text-white/20">
                  <span>Pkg_Weight:</span>
                  <span>{pkg.dataWeight}</span>
               </div>
               
               {pkg.status === 'INSTALLED' ? (
                 <div className="w-full py-4 bg-google-success/5 border border-google-success/20 rounded-2xl flex items-center justify-center gap-3 text-google-success text-[10px] font-black uppercase tracking-widest italic">
                    <ShieldCheck size={14} /> Installed
                 </div>
               ) : (
                 <button 
                  onClick={() => simulateInstall(pkg.id)}
                  className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 italic
                    ${pkg.status === 'UPDATE_AVAILABLE' ? 'bg-google-accent text-google-bg shadow-[0_10px_30px_rgba(138,180,248,0.3)]' : 'bg-white text-black hover:bg-google-accent'}
                  `}
                 >
                   {pkg.status === 'UPDATE_AVAILABLE' ? <RefreshCw size={14} className="animate-spin-slow" /> : <Download size={14} />}
                   {pkg.status === 'UPDATE_AVAILABLE' ? 'Update_Win' : 'Install_Win'}
                 </button>
               )}
            </div>

            {/* Installer Overlay */}
            <AnimatePresence>
              {installingId === pkg.id && (
                <Motion 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/95 z-30 flex flex-col items-center justify-center p-8 text-center"
                >
                   <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-6">
                      <Motion 
                        className="h-full bg-google-accent shadow-[0_0_15px_#8ab4f8]" 
                        initial={{ width: 0 }}
                        animate={{ width: `${installProgress}%` }}
                      />
                   </div>
                   <Binary size={32} className="text-google-accent animate-pulse mb-4" />
                   <p className="text-[10px] font-black text-white uppercase tracking-[0.5em] italic">Synthesizing_Registry</p>
                   <span className="text-[9px] font-mono text-white/20 mt-4">{installProgress}%</span>
                </Motion>
              )}
            </AnimatePresence>
          </Motion>
        ))}
      </div>

      {/* Global Sync Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         <div className="lg:col-span-8 bg-white/[0.01] border border-white/5 rounded-[4rem] p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none">
              <Terminal size={180} />
            </div>
            <div className="flex items-center gap-4 mb-10">
               <div className="w-2 h-2 rounded-full bg-google-success shadow-[0_0_8px_#81c995]" />
               <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.5em] italic">Kernel_Distribution_Center</h3>
            </div>
            
            <div className="bg-black/40 rounded-[2.5rem] border border-white/5 p-10 font-mono text-[11px] space-y-3 h-64 overflow-y-auto studio-scroll shadow-inner">
               <AnimatePresence>
                 {logs.length > 0 ? logs.map((log, i) => (
                   <Motion key={i + log} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: '0' }} className="flex gap-4">
                     <span className="text-google-accent">&gt;&gt;</span>
                     <span className="text-white/40">{log}</span>
                   </Motion>
                 )) : <p className="text-white/5 italic">Awaiting brand deployment instructions...</p>}
               </AnimatePresence>
            </div>
         </div>

         <div className="lg:col-span-4 flex flex-col gap-10">
            <div className="bg-google-accent/5 border border-google-accent/20 rounded-[4rem] p-10 flex-1 flex flex-col justify-between shadow-2xl group overflow-hidden relative">
               <div className="absolute inset-0 bg-[radial-gradient(#8ab4f810_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
               <div className="relative z-10">
                  <h4 className="text-[10px] font-black text-google-accent uppercase tracking-[0.4em] mb-10 italic">Cluster_Multiplexing</h4>
                  <div className="space-y-6">
                     {['NYC_NODE', 'PARIS_CORE', 'TOKYO_EDGE'].map((loc, i) => (
                       <div key={i} className="flex justify-between items-center group/item">
                          <span className="text-[11px] font-black text-white/60 uppercase italic group-hover/item:text-google-accent transition-colors">{loc}</span>
                          <span className="text-[9px] font-mono text-google-success italic">STABLE</span>
                       </div>
                     ))}
                  </div>
               </div>
               
               <div className="relative z-10 pt-10 border-t border-white/5 flex items-center gap-6">
                  <Cpu size={32} className="text-google-accent" />
                  <div>
                    <p className="text-[11px] font-black text-white uppercase italic">Neural Backbone</p>
                    <p className="text-[9px] text-white/20 font-mono italic">SYNC_ACTIVE</p>
                  </div>
                  <ArrowRight size={16} className="ml-auto text-white/10 group-hover:text-google-accent transition-all group-hover:translate-x-2" />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
