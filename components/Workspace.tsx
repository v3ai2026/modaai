import React, { useState, useEffect, useRef, useMemo } from 'react';
import { SectionId, Asset, Message, PrivateNode } from '../types';
import SmartCompiler from './AIStylist';
import ResilientEmptyState from './ResilientEmptyState';
import { 
  Search, 
  Settings,
  ArrowUpRight,
  MoreHorizontal,
  X,
  Command,
  Tag,
  CreditCard,
  Layers,
  Activity,
  Terminal,
  Cpu,
  ChevronRight,
  ChevronDown,
  Server
} from 'lucide-react';

interface WorkspaceProps {
  activeStep: string;
  messages: Message[];
  isProcessing: boolean;
  assets: Asset[];
  onUpdateAsset: (id: string, updates: Partial<Asset>) => void;
  nodes: PrivateNode[];
  onNodeControl: (id: string, action: 'RESTART' | 'TOGGLE') => void;
  onSendMessage: (content: string) => void;
}

/**
 * Text highlighting component for search results
 */
const HighlightText: React.FC<{ text: string, highlight: string }> = ({ text, highlight }) => {
  if (!highlight.trim()) return <>{text}</>;
  const regex = new RegExp(`(${highlight.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-google-accent/30 text-google-accent rounded-sm px-0.5 border-b border-google-accent/50 font-bold">{part}</mark>
        ) : (
          part
        )
      )}
    </>
  );
};

const Workspace: React.FC<WorkspaceProps> = ({ 
  activeStep, messages, isProcessing, assets, onUpdateAsset, nodes, onNodeControl, onSendMessage 
}) => {
  const [adminTab, setAdminTab] = useState<'ASSETS' | 'FLEET' | 'SYSTEM'>('ASSETS');
  
  // Search and Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [monetizationFilter, setMonetizationFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'revenue'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Ctrl/Cmd + K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Comprehensive Filter Logic: Name, ID, Type, and Monetization
  const filteredAssets = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return assets.filter(a => {
      const matchesSearch = !q || a.name.toLowerCase().includes(q) || a.id.toLowerCase().includes(q);
      const matchesType = typeFilter === 'All' || a.type === typeFilter;
      const matchesMonetization = monetizationFilter === 'All' || a.monetizationModel === monetizationFilter;
      return matchesSearch && matchesType && matchesMonetization;
    }).sort((a, b) => {
      let valA: any = a[sortBy] || 0;
      let valB: any = b[sortBy] || 0;
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      return sortOrder === 'asc' ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });
  }, [assets, searchQuery, typeFilter, monetizationFilter, sortBy, sortOrder]);

  const toggleSort = (field: 'name' | 'revenue') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const renderAdminConsole = () => (
    <div className="h-full flex flex-col bg-[#0b0c0d] overflow-hidden">
      {/* Admin Header */}
      <div className="p-8 border-b border-google-border bg-google-bg/30 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div className="space-y-1">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white flex items-center gap-3">
            <Settings className="text-google-accent" size={28} />
            Admin Terminal
          </h2>
          <p className="text-[10px] font-mono text-google-textMuted uppercase tracking-widest">Global Asset & Fleet Management</p>
        </div>
        
        <div className="flex gap-2 bg-google-surface border border-google-border p-1.5 rounded-2xl shadow-inner">
          {(['ASSETS', 'FLEET', 'SYSTEM'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => { setAdminTab(tab); setSearchQuery(''); setTypeFilter('All'); setMonetizationFilter('All'); }}
              className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${adminTab === tab ? 'bg-google-accent text-google-bg shadow-xl' : 'text-google-textMuted hover:text-white'}`}
            >
              {tab === 'ASSETS' ? 'Vault Warehouse' : tab === 'FLEET' ? 'Fleet Nodes' : 'Kernel Config'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {adminTab === 'ASSETS' ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* PROMINENT SEARCH & FILTER INTERFACE */}
            <div className="p-10 lg:p-14 border-b border-google-border bg-google-surface/20">
               <div className="max-w-7xl mx-auto w-full space-y-12">
                  <div className="relative group">
                     {/* Dynamic Visual Glow Effect */}
                     <div className="absolute -inset-1 bg-google-accent/20 rounded-[3rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700"></div>
                     
                     <div className="relative flex items-center bg-google-bg border-2 border-google-border rounded-[3.5rem] px-12 py-10 focus-within:border-google-accent focus-within:ring-[20px] focus-within:ring-google-accent/5 transition-all shadow-2xl">
                        <div className="mr-12 p-8 bg-google-surface rounded-[2.5rem] border border-google-border text-google-textMuted group-focus-within:text-google-accent group-focus-within:border-google-accent transition-all duration-500 shadow-xl relative overflow-hidden">
                          <Search size={56} strokeWidth={2.5} className={searchQuery ? 'text-google-accent animate-pulse' : ''} />
                        </div>
                        
                        <div className="flex-1 flex flex-col">
                          <div className="flex items-center gap-3 mb-4">
                            <Terminal size={14} className="text-google-accent" />
                            <label className="text-[14px] font-black text-google-accent uppercase tracking-[0.5em] opacity-80 group-focus-within:opacity-100 transition-opacity pointer-events-none">
                              Neural Indexer Terminal
                            </label>
                          </div>
                          <input 
                            ref={searchInputRef}
                            type="text" 
                            placeholder="SEARCH BY ARTIFACT NAME OR ID..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent py-2 text-5xl text-white focus:outline-none placeholder:text-google-textMuted/10 font-black italic uppercase tracking-tighter"
                          />
                        </div>

                        <div className="flex items-center gap-12 ml-10">
                          {/* Search Stats Badge */}
                          <div className={`flex flex-col items-center justify-center px-10 py-6 rounded-[2.5rem] border-2 transition-all duration-500 ${searchQuery || typeFilter !== 'All' || monetizationFilter !== 'All' ? 'bg-google-accent/10 border-google-accent/40 text-google-accent shadow-[0_0_40px_rgba(138,180,248,0.2)]' : 'bg-google-surface/50 border-google-border text-google-textMuted opacity-30'}`}>
                             <span className="text-3xl font-black italic leading-none">{filteredAssets.length}</span>
                             <span className="text-[10px] font-black uppercase tracking-[0.2em] mt-2">Matches</span>
                          </div>

                          {/* Action Controls */}
                          <div className="flex items-center gap-6">
                            <div className="hidden xl:flex flex-col items-center gap-2 px-8 py-5 bg-google-bg border border-google-border rounded-3xl text-[12px] font-mono text-google-textMuted font-black uppercase shadow-inner opacity-40 group-focus-within:opacity-100 transition-all">
                               <div className="flex items-center gap-2">
                                  <Command size={18} />
                                  <span className="text-xl">K</span>
                               </div>
                            </div>
                            
                            {(searchQuery || typeFilter !== 'All' || monetizationFilter !== 'All') && (
                              <button 
                                onClick={() => { setSearchQuery(''); setTypeFilter('All'); setMonetizationFilter('All'); }}
                                className="p-7 bg-google-surface border border-google-border rounded-full text-google-textMuted hover:text-white hover:border-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] transition-all hover:scale-110 active:scale-90 shadow-2xl"
                                title="Reset All Filters"
                              >
                                <X size={36} />
                              </button>
                            )}
                          </div>
                        </div>
                     </div>
                  </div>

                  {/* ADVANCED FILTER CONTROLS */}
                  <div className="flex flex-wrap items-center gap-10 px-12 py-8 bg-google-surface/30 backdrop-blur-xl border border-google-border rounded-[3rem] shadow-xl animate-in fade-in slide-in-from-top-4 duration-1000">
                     <div className="flex items-center gap-6 group/filter">
                        <div className="p-4 bg-google-accent/15 border border-google-accent/30 rounded-2xl text-google-accent">
                           <Tag size={20} />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black text-google-accent uppercase tracking-[0.3em] mb-2 italic">Sector Vector</span>
                           <div className="relative">
                              <select 
                                 value={typeFilter}
                                 onChange={(e) => setTypeFilter(e.target.value)}
                                 className="appearance-none bg-google-bg border border-google-border rounded-xl px-5 py-2.5 text-[12px] text-white font-black uppercase tracking-widest focus:outline-none focus:border-google-accent w-56 pr-10 cursor-pointer hover:bg-google-surface transition-colors"
                              >
                                 <option value="All">All Sectors</option>
                                 <option value="Vertex Fine-tuned">Vertex Fine-tuned</option>
                                 <option value="Vertex LLM">Vertex LLM</option>
                                 <option value="Vertex Video">Vertex Video</option>
                                 <option value="Component">UI Component</option>
                                 <option value="Extension">Extension</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-google-accent pointer-events-none" size={14} />
                           </div>
                        </div>
                     </div>

                     <div className="w-[1px] h-12 bg-google-border/40 hidden lg:block"></div>

                     <div className="flex items-center gap-6 group/filter">
                        <div className="p-4 bg-google-success/15 border border-google-success/30 rounded-2xl text-google-success">
                           <CreditCard size={20} />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black text-google-success uppercase tracking-[0.3em] mb-2 italic">Revenue Logic</span>
                           <div className="relative">
                              <select 
                                 value={monetizationFilter}
                                 onChange={(e) => setMonetizationFilter(e.target.value)}
                                 className="appearance-none bg-google-bg border border-google-border rounded-xl px-5 py-2.5 text-[12px] text-white font-black uppercase tracking-widest focus:outline-none focus:border-google-success w-56 pr-10 cursor-pointer hover:bg-google-surface transition-colors"
                              >
                                 <option value="All">All Models</option>
                                 <option value="Subscription">Subscription</option>
                                 <option value="One-time">One-time</option>
                                 <option value="Ads">Ads</option>
                                 <option value="Free">Free</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-google-success pointer-events-none" size={14} />
                           </div>
                        </div>
                     </div>

                     <div className="ml-auto flex items-center gap-8">
                        <div className="flex flex-col items-end">
                           <span className="text-[9px] font-black text-google-textMuted uppercase tracking-widest mb-1 opacity-40">Sort Paradigm</span>
                           <div className="flex items-center gap-3">
                              <button 
                                onClick={() => toggleSort('name')}
                                className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${sortBy === 'name' ? 'bg-google-accent text-google-bg border-google-accent' : 'bg-google-surface border-google-border text-google-textMuted'}`}
                              >
                                Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                              </button>
                              <button 
                                onClick={() => toggleSort('revenue')}
                                className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${sortBy === 'revenue' ? 'bg-google-accent text-google-bg border-google-accent' : 'bg-google-surface border-google-border text-google-textMuted'}`}
                              >
                                Revenue {sortBy === 'revenue' && (sortOrder === 'asc' ? '↑' : '↓')}
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* ASSETS GRID / TABLE */}
            <div className="flex-1 overflow-y-auto studio-scroll p-10">
               {filteredAssets.length > 0 ? (
                 <div className="max-w-7xl mx-auto space-y-6">
                    <div className="flex items-center justify-between mb-8 px-6">
                       <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">Registry Manifest</h3>
                       <div className="flex items-center gap-3">
                          <Activity size={14} className="text-google-success animate-pulse" />
                          <span className="text-[10px] font-mono text-google-textMuted uppercase tracking-widest">Displaying {filteredAssets.length} Artifacts</span>
                       </div>
                    </div>
                    {filteredAssets.map(asset => (
                      <div key={asset.id} className="bg-google-surface/40 border border-google-border rounded-[2.5rem] p-10 flex flex-col lg:flex-row items-center gap-12 hover:border-google-accent transition-all group shadow-xl">
                        {/* Icon & ID Block */}
                        <div className="flex items-center gap-10 min-w-[350px]">
                           <div className="w-28 h-28 bg-google-bg border-2 border-google-border rounded-[2.5rem] flex items-center justify-center text-6xl shadow-2xl group-hover:scale-110 transition-transform duration-700 relative overflow-hidden shrink-0">
                              <div className="absolute inset-0 bg-google-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                              {asset.icon}
                           </div>
                           <div className="flex flex-col">
                              <h4 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-2">
                                <HighlightText text={asset.name} highlight={searchQuery} />
                              </h4>
                              <p className="text-[11px] font-mono text-google-textMuted uppercase tracking-[0.4em] opacity-40">
                                <HighlightText text={asset.id} highlight={searchQuery} />
                              </p>
                           </div>
                        </div>

                        {/* Metadata Block */}
                        <div className="flex-1 grid grid-cols-3 gap-8 w-full">
                           <div className="flex flex-col">
                              <span className="text-[10px] font-black uppercase tracking-widest text-google-textMuted mb-3 italic">Sector</span>
                              <div className="flex items-center gap-3">
                                 <Tag size={14} className="text-google-accent" />
                                 <span className="text-[13px] font-bold text-white uppercase tracking-tight">{asset.type}</span>
                              </div>
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[10px] font-black uppercase tracking-widest text-google-textMuted mb-3 italic">Lifecycle</span>
                              <div className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest w-fit ${asset.status === 'ACTIVE' ? 'bg-google-success/10 text-google-success border-google-success/30' : 'bg-orange-500/10 text-orange-400 border-orange-500/30'}`}>
                                 {asset.status}
                              </div>
                           </div>
                           <div className="flex flex-col items-end">
                              <span className="text-[10px] font-black uppercase tracking-widest text-google-textMuted mb-3 italic">Yield Profile</span>
                              <div className="flex items-baseline gap-2">
                                 <span className="text-3xl font-black italic text-google-success">${asset.revenue.toLocaleString()}</span>
                                 <span className="text-[10px] font-mono text-google-textMuted uppercase">YTD</span>
                              </div>
                           </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-6 shrink-0">
                           <button className="p-5 bg-google-bg border-2 border-google-border rounded-[1.8rem] text-google-textMuted hover:text-google-accent hover:border-google-accent transition-all shadow-xl active:scale-90">
                              <ArrowUpRight size={28} />
                           </button>
                           <button className="p-5 bg-google-bg border-2 border-google-border rounded-[1.8rem] text-google-textMuted hover:text-white transition-all shadow-xl active:scale-90">
                              <MoreHorizontal size={28} />
                           </button>
                        </div>
                      </div>
                    ))}
                 </div>
               ) : (
                 <ResilientEmptyState 
                    title="Vault Filter Nullified" 
                    description="No entries in the neural registry match the current combination of identifiers, sectors, or monetization parameters." 
                    onRetry={async () => { setSearchQuery(''); setTypeFilter('All'); setMonetizationFilter('All'); }} 
                 />
               )}
            </div>
          </div>
        ) : adminTab === 'FLEET' ? (
          <div className="flex-1 p-12 overflow-y-auto studio-scroll animate-in fade-in">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {nodes.map(node => (
                 <div key={node.id} className="p-10 bg-google-surface border border-google-border rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 transition-opacity">
                       <ChevronRight size={32} className="text-google-accent" />
                    </div>
                    <div className="flex justify-between items-start mb-10">
                       <div className="p-6 bg-google-bg border border-google-border rounded-[2rem] shadow-inner text-google-accent group-hover:scale-110 transition-transform">
                          <Cpu size={40} className={node.status === 'ONLINE' ? 'text-google-accent' : 'text-red-500'} />
                       </div>
                       <div className="flex flex-col items-end gap-3">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${node.status === 'ONLINE' ? 'bg-google-success/10 text-google-success border-google-success/30' : 'bg-red-500/10 text-red-500 border-red-500/30'}`}>
                             {node.status}
                          </span>
                          <span className="text-[10px] font-mono text-google-textMuted opacity-40">{node.ip}</span>
                       </div>
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-8">{node.name}</h3>
                    <div className="space-y-6">
                       <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
                          <span className="text-google-textMuted italic">Neural Load</span>
                          <span className={node.load > 80 ? 'text-red-500' : 'text-google-success'}>{Math.round(node.load)}%</span>
                       </div>
                       <div className="h-3 w-full bg-google-bg rounded-full overflow-hidden border border-google-border shadow-inner">
                          <div className={`h-full transition-all duration-1000 ${node.load > 80 ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-google-success shadow-[0_0_15px_rgba(129,201,149,0.5)]'}`} style={{ width: `${node.load}%` }}></div>
                       </div>
                    </div>
                    <div className="mt-10 flex gap-4 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                       <button onClick={() => onNodeControl(node.id, 'RESTART')} className="flex-1 py-4 bg-google-bg border border-google-border rounded-2xl text-[10px] font-black uppercase tracking-widest text-google-textMuted hover:text-google-accent hover:border-google-accent transition-all">Restart Node</button>
                       <button onClick={() => onNodeControl(node.id, 'TOGGLE')} className={`flex-1 py-4 bg-google-bg border border-google-border rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${node.status === 'ONLINE' ? 'text-red-400 hover:border-red-500' : 'text-google-success hover:border-google-success'}`}>{node.status === 'ONLINE' ? 'Terminate' : 'Deploy'}</button>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-12">
            <ResilientEmptyState title="Kernel Access Restricted" description="System configuration is locked to Level-7 authorization. Please re-authenticate your digital identity." />
          </div>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeStep) {
      case SectionId.Compiler:
        return <SmartCompiler messages={messages} isProcessing={isProcessing} onSendMessage={onSendMessage} />;
      case SectionId.Admin:
        return renderAdminConsole();
      case SectionId.Home:
        return (
          <div className="flex-1 p-16 overflow-y-auto studio-scroll bg-[#0b0c0d] space-y-20">
             <header className="flex justify-between items-end">
                <div className="space-y-4">
                   <h2 className="text-6xl font-black italic uppercase tracking-tighter text-white">Registry Hub</h2>
                   <div className="flex items-center gap-6">
                      <div className="flex items-center gap-3 px-4 py-2 bg-google-success/10 border border-google-success/20 rounded-2xl">
                         <div className="w-2 h-2 bg-google-success rounded-full animate-pulse shadow-[0_0_10px_#81c995]"></div>
                         <span className="text-[11px] font-black text-google-success uppercase tracking-[0.2em]">Cluster Sync Active</span>
                      </div>
                      <span className="text-[11px] font-mono text-google-textMuted uppercase tracking-widest opacity-30">Node_Master: 10.0.0.100</span>
                   </div>
                </div>
                <div className="flex flex-col items-end text-google-textMuted">
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] italic mb-1">Compute Uptime</span>
                   <span className="text-3xl font-mono font-black text-white">1,442:08:12</span>
                </div>
             </header>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {[
                  { label: 'Total Artifacts', val: assets.length, icon: Database },
                  { label: 'Network Fleet', val: nodes.length, icon: Server },
                  { label: 'System Latency', val: '14ms', icon: Activity },
                  { label: 'Registry Load', val: '12%', icon: Layers }
                ].map((stat, i) => (
                  <div key={i} className="p-10 bg-google-surface border border-google-border rounded-[3rem] shadow-2xl group hover:border-google-accent transition-all">
                     <div className="w-14 h-14 bg-google-bg border border-google-border rounded-2xl flex items-center justify-center text-google-accent mb-8 group-hover:scale-110 transition-transform">
                        <stat.icon size={28} />
                     </div>
                     <p className="text-[11px] font-black text-google-textMuted uppercase tracking-widest mb-3 italic">{stat.label}</p>
                     <p className="text-5xl font-black italic text-white tracking-tighter">{stat.val}</p>
                  </div>
                ))}
             </div>

             <div className="pt-20 border-t border-google-border/20">
               <ResilientEmptyState title="Standby Mode" description="The cluster is awaiting new generation directives. All private compute nodes are maintaining low-power state." />
             </div>
          </div>
        );
      default:
        return (
          <div className="flex-1 flex items-center justify-center p-12 bg-[#0b0c0d]">
            <div className="text-center max-w-xl">
               <div className="w-32 h-32 bg-google-surface border border-google-border rounded-[2.5rem] flex items-center justify-center text-6xl mx-auto mb-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] animate-pulse">🏗️</div>
               <h2 className="text-4xl font-black uppercase tracking-[0.2em] text-white mb-8 italic">Sector Rebuilding</h2>
               <p className="text-google-textMuted leading-relaxed italic text-lg mb-12">The {activeStep} sector is currently undergoing a structural re-sync to the moda_X framework.</p>
               <button 
                onClick={() => onSendMessage(`Force metadata sync for ${activeStep}`)}
                className="px-14 py-6 bg-google-accent text-google-bg rounded-[2rem] font-black uppercase tracking-[0.2em] hover:scale-110 transition-transform shadow-2xl shadow-google-accent/20 active:scale-95"
               >
                 Trigger Force Sync
               </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      <div className="absolute inset-0 bg-[#0b0c0d] pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-google-accent/5 blur-[200px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-google-success/5 blur-[150px] rounded-full"></div>
      </div>
      <div className="relative z-10 flex flex-col h-full">
        {renderContent()}
      </div>
    </div>
  );
};

export default Workspace;
