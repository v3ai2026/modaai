
import React, { useState, useEffect, useRef } from 'react';
import { Motion, AnimatePresence } from '@/ui/animation';
import { 
  Globe, Radio, RefreshCw, Zap, 
  Search, Link as LinkIcon, AlertCircle, 
  Compass, ShieldAlert, Cpu, Share2, TrendingUp, BarChart,
  Loader2, DollarSign, Activity, Eye, BookmarkPlus, ChevronRight,
  Database, Network, Terminal as TerminalIcon, Satellite, Radar,
  ShieldCheck, ArrowUpRight, Fingerprint, Waves, Layers, MousePointer2,
  Map as MapIcon, Target, SearchCode
} from '@/ui/icons';
import { fetchIntelligence } from '../services/geminiService';
import ResilientEmptyState from './ResilientEmptyState';

interface IntelShard {
  id: string;
  title: string;
  summary: string;
  impact: number;
  sentiment: string;
}

export const Newsroom: React.FC = () => {
  const [stream, setStream] = useState<'FASHION' | 'FINANCE' | 'DEEP_SEARCH'>('FINANCE');
  const [isCrawlActive, setIsCrawlActive] = useState(false);
  const [shards, setShards] = useState<IntelShard[]>([]);
  const [sources, setSources] = useState<{ title: string, uri: string }[]>([]);
  const [logs, setLogs] = useState<string[]>(["[KERNEL] OS_MODA v3.1 Boot Sequence Complete", "[SIGNAL] Ready for Neural Spider Uplink"]);
  const [activeNodeIndex, setActiveNodeIndex] = useState(-1);
  const [ticker, setTicker] = useState<{ s: string, p: string, c: string }[]>([]);
  const hasAutoScanned = useRef(false);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
    setLogs(prev => [`[${time}] ${msg}`, ...prev].slice(0, 15));
  };

  const handleRunScan = async () => {
    if (isCrawlActive) return;
    setIsCrawlActive(true);
    setShards([]);
    setSources([]);
    setActiveNodeIndex(0);
    
    addLog(`GOOGEL_CRAWLER :: Initializing ${stream}_PROTOCOL_FLOW...`);
    
    // Simulate flow sequence
    const flowInterval = setInterval(() => {
      setActiveNodeIndex(prev => (prev < 4 ? prev + 1 : prev));
    }, 1200);

    try {
      addLog(`SEARCH_GROUNDING :: Requesting real-time global index...`);
      const result = await fetchIntelligence(stream);
      addLog(`DATA_SYNTH :: Distilling shards from ground truth...`);
      
      const items = result.text.split(/\[INTEL_\d+\]/).filter(s => s.trim().length > 15);
      const parsed: IntelShard[] = items.map((s, i) => ({
        id: `intel_${Date.now()}_${i}`,
        title: s.match(/TITLE:\s*(.*)/)?.[1]?.trim() || "Unclassified Intel",
        summary: s.match(/SUMMARY:\s*([\s\S]*?)(?=IMPACT:|$)/)?.[1]?.trim() || "",
        impact: parseInt(s.match(/IMPACT:\s*(\d+)/)?.[1] || "85"),
        sentiment: s.match(/SENTIMENT:\s*(.*)/)?.[1]?.trim() || "NEUTRAL"
      }));

      setShards(parsed);
      setSources(result.sources);
      addLog(`SYNC_COMPLETE :: ${parsed.length} intelligence nodes linked.`);
    } catch (e: any) {
      addLog(`CRITICAL_FAILURE :: Search grounding disconnected.`);
      addLog(`REASON: ${e.message}`);
    } finally {
      clearInterval(flowInterval);
      setActiveNodeIndex(5);
      setIsCrawlActive(false);
    }
  };

  useEffect(() => {
    const symbols = stream === 'FINANCE' 
      ? ['NASDAQ', 'NVDA', 'BTC', 'ETH', 'SOL', 'SPX'] 
      : stream === 'FASHION' 
        ? ['LVMH', 'TIKTOK', 'XHS', 'NIKE', 'VOGUE', 'ADIDAS']
        : ['AGI', 'VEO', 'TSMC', 'STARLINK', 'MARS', 'ORBIT'];
    
    const tick = () => {
      setTicker(symbols.map(s => ({
        s,
        p: (Math.random() * 1000 + 100).toFixed(2),
        c: (Math.random() * 8 - 4).toFixed(2) + '%'
      })));
    };
    tick();
    const interval = setInterval(tick, 3000);
    return () => clearInterval(interval);
  }, [stream]);

  useEffect(() => {
    if (!hasAutoScanned.current) {
      handleRunScan();
      hasAutoScanned.current = true;
    }
  }, []);

  return (
    <div className="flex h-full flex-col lg:flex-row bg-[#020202] overflow-hidden font-sans select-none">
      {/* Googel Crawler Command HUD (Left) */}
      <aside className="lg:w-[480px] border-r border-white/5 p-10 flex flex-col gap-10 bg-black/40 backdrop-blur-3xl shrink-0 z-20 overflow-y-auto no-scrollbar">
        <header className="flex items-center gap-6">
           <div className={`w-20 h-20 rounded-[2.5rem] flex items-center justify-center transition-all duration-1000 ${isCrawlActive ? 'bg-google-accent text-google-bg animate-pulse shadow-[0_0_80px_#8ab4f866]' : 'bg-white/5 text-white/20 border border-white/10'}`}>
              <SearchCode size={40} className={isCrawlActive ? 'animate-spin-slow' : ''} />
           </div>
           <div>
              <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter leading-none">Newsroom</h2>
              <p className="text-[10px] font-mono text-google-accent uppercase tracking-[0.6em] mt-3 italic">Googel_Crawler_v4.0</p>
           </div>
        </header>

        {/* Protocol Selector Matrix */}
        <div className="flex flex-col gap-3 bg-white/5 p-3 rounded-[2.5rem] border border-white/5 shadow-inner">
           <div className="grid grid-cols-2 gap-3">
             <button 
               onClick={() => { setStream('FINANCE'); handleRunScan(); }}
               className={`py-5 rounded-3xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-4 transition-all ${stream === 'FINANCE' ? 'bg-white text-black shadow-2xl scale-[1.02]' : 'text-white/20 hover:text-white/40'}`}
             >
               <DollarSign size={16} /> Quant_Grid
             </button>
             <button 
               onClick={() => { setStream('FASHION'); handleRunScan(); }}
               className={`py-5 rounded-3xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-4 transition-all ${stream === 'FASHION' ? 'bg-white text-black shadow-2xl scale-[1.02]' : 'text-white/20 hover:text-white/40'}`}
             >
               <Zap size={16} /> Media_Pulse
             </button>
           </div>
           <button 
             onClick={() => { setStream('DEEP_SEARCH'); handleRunScan(); }}
             className={`w-full py-5 rounded-3xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-4 transition-all ${stream === 'DEEP_SEARCH' ? 'bg-google-accent text-google-bg shadow-2xl scale-[1.02]' : 'text-white/20 hover:text-white/40 border border-white/5'}`}
           >
             <Target size={16} /> Deep_Search_Uplink
           </button>
        </div>

        {/* Neural Spider Pipeline */}
        <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[3.5rem] relative overflow-hidden group">
           <div className="absolute inset-0 singularity-grid opacity-[0.05]" />
           <div className="flex justify-between items-center mb-10 relative z-10">
              <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic">Crawler_Pipeline_Telemetry</span>
              <Activity size={16} className="text-google-accent animate-pulse" />
           </div>
           
           <div className="relative h-64 flex flex-col items-center justify-between z-10">
              {[
                { id: 0, label: 'GOOGEL_INDEX_SYNC', icon: <Search size={14}/> },
                { id: 1, label: 'WEB_RECON_PROTOCOL', icon: <Fingerprint size={14}/> },
                { id: 2, label: 'GROUNDING_FILTER', icon: <Cpu size={14}/> },
                { id: 3, label: 'INTEL_SHARD_COMPILER', icon: <Layers size={14}/> }
              ].map((node, i) => (
                <div key={node.id} className="relative w-full flex flex-col items-center">
                   <div className={`flex items-center gap-4 px-6 py-3 rounded-2xl border transition-all duration-700 w-full ${activeNodeIndex >= node.id ? 'bg-google-accent/10 border-google-accent text-google-accent shadow-[0_0_20px_#8ab4f822]' : 'bg-white/5 border-white/10 text-white/20'}`}>
                      {node.icon}
                      <span className="text-[8px] font-mono tracking-widest">{node.label}</span>
                      {activeNodeIndex === node.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-google-accent animate-ping" />}
                   </div>
                   {i < 3 && (
                     <div className="h-6 w-px bg-white/10 relative">
                        <Motion 
                          initial={{ height: 0 }}
                          animate={{ height: activeNodeIndex > node.id ? '100%' : '0%' }}
                          className="w-full bg-google-accent shadow-[0_0_10px_#8ab4f8]"
                        />
                     </div>
                   )}
                </div>
              ))}
           </div>
        </div>

        {/* Global Signal Stream Ticker */}
        <div className="bg-black/60 rounded-[2.5rem] border border-white/5 overflow-hidden shadow-inner">
           <div className="h-12 bg-white/5 border-b border-white/5 flex items-center px-6 justify-between">
              <span className="text-[9px] font-black text-white/20 uppercase tracking-widest italic">Signal_Marquee</span>
              <Activity size={14} className="text-google-accent" />
           </div>
           <div className="p-6 space-y-4">
              {ticker.map((t, i) => (
                <div key={i} className="flex justify-between items-center group/ticker">
                   <span className="text-[11px] font-black text-white italic group-hover/ticker:text-google-accent transition-colors">{t.s}</span>
                   <div className="flex items-center gap-4">
                      <span className="text-[10px] font-mono text-white/40">{t.p}</span>
                      <span className={`text-[10px] font-black italic ${t.c.startsWith('-') ? 'text-red-400' : 'text-google-success'}`}>{t.c}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Kernel Distribution Log */}
        <div className="flex-1 min-h-[160px] bg-black/90 rounded-[2rem] border border-white/10 p-8 flex flex-col relative overflow-hidden">
           <div className="flex items-center gap-3 mb-6 text-google-accent/40">
              <TerminalIcon size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Kernel_Bus_Monitor</span>
           </div>
           <div className="flex-1 overflow-y-auto no-scrollbar font-mono text-[10px] space-y-3">
              {logs.map((log, i) => (
                <div key={i} className={`flex gap-4 ${i === 0 ? 'text-google-accent' : 'text-white/20'}`}>
                  <span>{log}</span>
                </div>
              ))}
           </div>
        </div>

        <button 
          onClick={handleRunScan}
          disabled={isCrawlActive}
          className="w-full py-6 bg-white text-black rounded-[2rem] font-black uppercase tracking-[0.5em] text-[12px] flex items-center justify-center gap-4 hover:bg-google-accent transition-all disabled:opacity-30 shadow-[0_40px_100px_rgba(0,0,0,0.8)] active:scale-95 group/btn italic"
        >
          {isCrawlActive ? <Loader2 className="animate-spin" size={20} /> : <RefreshCw size={20} className="group-hover/btn:rotate-180 transition-transform duration-1000" />}
          {isCrawlActive ? 'Executing_Crawler_Logic...' : 'Initiate_Global_Crawl'}
        </button>
      </aside>

      {/* Intelligence Display (Right) */}
      <main className="flex-1 flex flex-col bg-[#050505] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-google-accent/[0.03] blur-[300px] rounded-full pointer-events-none" />
        
        <header className="px-16 py-12 border-b border-white/5 bg-black/20 backdrop-blur-3xl flex justify-between items-center shrink-0 z-10">
           <div className="flex items-center gap-8">
              <div className={`w-18 h-18 rounded-[2rem] flex items-center justify-center border shadow-2xl transition-all ${
                stream === 'FINANCE' ? 'bg-google-success/10 border-google-success/30 text-google-success' : 
                stream === 'FASHION' ? 'bg-google-accent/10 border-google-accent/30 text-google-accent' :
                'bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-500'
              }`}>
                {stream === 'FINANCE' ? <BarChart size={32} /> : stream === 'FASHION' ? <Waves size={32} /> : <SearchCode size={32} />}
              </div>
              <div>
                <h3 className="text-4xl font-black italic text-white uppercase tracking-tighter leading-none">{stream} Intel Insight</h3>
                <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.6em] mt-3 italic">Grounding_Engine: Googel_Crawler /// Sync_Status: Live</p>
              </div>
           </div>

           <div className="flex gap-4 items-center">
              <div className="hidden xl:flex flex-col items-end mr-8 opacity-40">
                 <span className="text-[9px] font-black text-white/40 uppercase tracking-widest italic mb-1">Crawl_Density</span>
                 <div className="flex gap-1 h-1">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-4 rounded-full ${i <= shards.length + 1 ? 'bg-google-success' : 'bg-white/10'}`} />)}
                 </div>
              </div>
              <button 
                onClick={handleRunScan}
                disabled={isCrawlActive}
                className="p-5 bg-white/5 border border-white/10 rounded-2xl text-white/40 hover:text-white transition-all shadow-xl active:scale-90"
              >
                <RefreshCw size={24} className={isCrawlActive ? 'animate-spin' : ''} />
              </button>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto studio-scroll p-16 relative">
          <div className="max-w-6xl mx-auto relative z-10">
            <AnimatePresence mode="wait">
              {shards.length > 0 ? (
                <Motion 
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-10"
                >
                  {shards.map((shard, idx) => (
                    <Motion 
                      key={shard.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group bg-white/[0.02] border border-white/10 rounded-[4rem] p-12 hover:bg-white/[0.04] hover:border-google-accent/40 transition-all duration-700 shadow-2xl relative overflow-hidden"
                    >
                       <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                         <Fingerprint size={240} />
                       </div>
                       
                       <div className="flex justify-between items-center mb-10 relative z-10">
                          <div className="flex items-center gap-4">
                             <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest italic border ${
                               shard.sentiment.includes('风险') || shard.sentiment.includes('防御') || shard.sentiment.includes('预警') ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                               shard.sentiment.includes('牛市') || shard.sentiment.includes('积极') || shard.sentiment.includes('颠覆') || shard.sentiment.includes('跨越') ? 'bg-google-success/10 text-google-success border-google-success/20' :
                               'bg-google-accent/10 text-google-accent border-google-accent/20'
                             }`}>
                                {shard.sentiment}
                             </span>
                             <span className="text-[10px] font-mono text-white/20 uppercase italic">ARTIFACT_0{idx + 1}</span>
                          </div>
                          <div className="flex items-center gap-4">
                             <div className="flex flex-col items-end">
                                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest italic mb-1">Impact_Factor</span>
                                <div className="h-1.5 w-24 bg-white/5 rounded-full overflow-hidden">
                                   <Motion 
                                     initial={{ width: 0 }}
                                     animate={{ width: `${shard.impact}%` }}
                                     className="h-full bg-google-accent shadow-[0_0_15px_#8ab4f8]"
                                   />
                                </div>
                             </div>
                             <span className="text-[11px] font-black text-google-accent italic">{shard.impact}%</span>
                          </div>
                       </div>

                       <h4 className="text-3xl font-black italic text-white uppercase tracking-tighter mb-8 leading-tight group-hover:text-google-accent transition-colors relative z-10">{shard.title}</h4>
                       <p className="text-xl font-light italic text-white/40 leading-relaxed mb-12 group-hover:text-white/80 transition-colors relative z-10">
                          {shard.summary}
                       </p>

                       <div className="pt-10 border-t border-white/5 flex justify-between items-center relative z-10">
                          <div className="flex items-center gap-4">
                             <button className="flex items-center gap-3 text-[10px] font-black text-white/20 uppercase tracking-widest italic hover:text-white transition-all">
                                <BookmarkPlus size={16} /> Archive_Signal
                             </button>
                             <div className="h-4 w-px bg-white/5" />
                             <div className="flex items-center gap-2">
                               <ShieldCheck size={14} className="text-google-success/40" />
                               <span className="text-[9px] font-mono text-google-success/40 italic uppercase tracking-widest">Verified Grounding</span>
                             </div>
                          </div>
                          <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 hover:bg-white hover:text-black transition-all">
                             <ChevronRight size={22} />
                          </button>
                       </div>
                    </Motion>
                  ))}

                  {/* Grounding Source Nodes */}
                  {sources.length > 0 && (
                    <div className="col-span-full mt-24">
                       <h4 className="text-[11px] font-black text-white/20 uppercase tracking-[0.5em] mb-12 flex items-center gap-4">
                          <Satellite size={18} className="text-google-accent" /> Uplink_Reference_Nodes
                       </h4>
                       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          {sources.map((src, i) => (
                            <a 
                              key={i} 
                              href={src.uri} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl flex items-center justify-between hover:bg-white/10 hover:border-google-accent/40 transition-all group shadow-inner"
                            >
                               <div className="flex flex-col truncate pr-6">
                                  <span className="text-[10px] font-black text-white uppercase italic truncate">{src.title}</span>
                                  <span className="text-[8px] font-mono text-white/20 mt-1 uppercase truncate italic">{src.uri}</span>
                               </div>
                               <ArrowUpRight size={16} className="text-white/10 group-hover:text-google-accent shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                          ))}
                       </div>
                    </div>
                  )}
                </Motion>
              ) : isCrawlActive ? (
                <div key="loading" className="h-[65vh] flex flex-col items-center justify-center text-center gap-12 border-2 border-dashed border-white/5 rounded-[6rem]">
                   <div className="relative">
                      <div className="w-56 h-56 bg-google-accent/5 border border-google-accent/20 rounded-[4.5rem] flex items-center justify-center animate-pulse">
                         <Satellite size={96} className="text-google-accent animate-spin-slow" />
                      </div>
                      <div className="absolute -top-8 -right-8 w-20 h-20 bg-black border border-google-accent/40 rounded-3xl flex items-center justify-center text-google-accent shadow-2xl">
                         <Radar size={40} className="animate-spin" />
                      </div>
                   </div>
                   <div className="space-y-6">
                      <h3 className="text-4xl font-black italic text-white uppercase tracking-tighter">Synchronizing Intelligence Matrix</h3>
                      <div className="flex items-center gap-2 justify-center">
                         {[...Array(3)].map((_, i) => <div key={i} className={`w-2 h-2 rounded-full animate-ping ${activeNodeIndex >= i ? 'bg-google-accent' : 'bg-white/10'}`} style={{ animationDelay: `${i * 0.2}s` }} />)}
                      </div>
                      <p className="text-[12px] font-mono text-white/20 uppercase tracking-[0.8em] animate-pulse italic">Connecting_to_{stream}_Nodes...</p>
                   </div>
                </div>
              ) : (
                <ResilientEmptyState 
                  key="empty"
                  title="Intelligence Uplink Disconnected" 
                  description={`点击左侧“启动采集”以激活基于 Googel_Crawler 的全球 ${stream === 'FINANCE' ? '金融与 AI' : stream === 'FASHION' ? '媒体与趋势' : '深度搜索'} 情报同步。`}
                  onRetry={handleRunScan}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Matrix Connection HUD */}
        <div className="absolute bottom-12 right-16 px-12 py-6 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-full flex items-center gap-10 shadow-[0_60px_120px_rgba(0,0,0,0.9)] z-20 group">
           <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-google-success shadow-[0_0_15px_#81c995] animate-pulse" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest italic leading-none">System_Link: OK</span>
           </div>
           <div className="h-8 w-px bg-white/10" />
           <div className="flex items-center gap-4">
              <Globe size={20} className="text-google-accent animate-spin-slow" />
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest italic leading-none">Uplink: Googel_Crawler_v4</span>
           </div>
           <div className="h-8 w-px bg-white/10" />
           <button 
             onClick={() => { setShards([]); setSources([]); addLog("KERNEL :: Intelligence cache purged."); }}
             className="text-[9px] font-black text-red-400/40 hover:text-red-400 uppercase tracking-widest italic transition-colors"
           >
             Purge_Matrix
           </button>
        </div>
      </main>
    </div>
  );
};
