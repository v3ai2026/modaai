
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SectionId, User, Asset, Message } from '../types';

interface WorkspaceProps {
  activeStep: string;
  messages: Message[];
  isProcessing: boolean;
  user: User | null;
  onLogin: () => void;
}

const Workspace: React.FC<WorkspaceProps> = ({ activeStep, messages, isProcessing, user, onLogin }) => {
  const [adminTab, setAdminTab] = useState<'MARKETPLACE' | 'STRATEGY' | 'APIS'>('MARKETPLACE');
  const [strategyView, setStrategyView] = useState<'FOUNDATION' | 'CUSTOM'>('CUSTOM');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // --- Search & Filter & Sort States ---
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterMode, setFilterMode] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'REVENUE_DESC' | 'REVENUE_ASC' | 'NAME' | 'STATUS'>('REVENUE_DESC');

  // Production Logs
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] Kernal initialized. Private Warehouse detected.",
    "[AUTH] Project: gen-lang-client-0654563230 verified.",
    "[WAREHOUSE] 1,240 Private Training Assets Linked.",
    "[READY] Custom Fine-tuned weights (v2.4) standby."
  ]);

  useEffect(() => {
    if (isProcessing) {
      const newLogs = [
        `[FETCH] Switching to Custom Fine-tuned Endpoint...`,
        `[SYNC] Loading weights from private warehouse...`,
        `[PARSE] Applying vertical industry constraints (Fashion/AR)...`,
        `[GEN] Architecture rendering using custom latent space...`,
        `[DEPLOY] Preparing Vertex AI prediction node...`
      ];
      let i = 0;
      const interval = setInterval(() => {
        if (i < newLogs.length) {
          setLogs(prev => [...prev, newLogs[i]]);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 600);
      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Expanded Mock Asset Data
  const [assets] = useState<Asset[]>([
    { id: 'MODA_CUSTOM_V2', name: '精调服装垂直 LLM', type: 'Vertex Fine-tuned', mode: 'FOR_SALE', price: '$8,999', status: 'ACTIVE', revenue: '$142,000', revenueValue: 142000, endpointId: '99023418571' },
    { id: 'AR_TRYON_PRO', name: 'AR 实时换衣 (精调版)', type: 'Custom Diffusion', mode: 'RENTAL', price: '$4.5/min', status: 'ACTIVE', revenue: '$68,800', revenueValue: 68800, endpointId: '8823419023' },
    { id: 'VEO_ENGINE', name: 'Veo 基础节点', type: 'Vertex Video', mode: 'RENTAL', price: '$0.85/min', status: 'ACTIVE', revenue: '$12,400', revenueValue: 12400 },
    { id: 'MODA_V3_CORE', name: 'Gemini 3 Pro 核心端点', type: 'Vertex LLM', mode: 'RENTAL', price: '$0.05/call', status: 'ACTIVE', revenue: '$48,200', revenueValue: 48200, endpointId: '7685491023451' },
    { id: 'HANFU_MODEL_X', name: '汉服纹理专项精调 v4', type: 'Vertex Fine-tuned', mode: 'FOR_SALE', price: '$12,500', status: 'ACTIVE', revenue: '$210,000', revenueValue: 210000, endpointId: '1029384756' },
    { id: 'TAILOR_AI_V1', name: '智能量体算法 (Beta)', type: 'Custom Diffusion', mode: 'RENTAL', price: '$1.2/call', status: 'PENDING', revenue: '$1,200', revenueValue: 1200 },
    { id: 'LEGACY_MODA_V1', name: 'Moda 早期生成器', type: 'Vertex LLM', mode: 'OPEN_SOURCE', price: '$0', status: 'ARCHIVED', revenue: '$4,200', revenueValue: 4200 },
  ]);

  // --- Computed: Filtered & Sorted Assets ---
  const filteredAssets = useMemo(() => {
    let result = assets.filter(asset => {
      const matchesSearch = 
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        asset.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (asset.endpointId && asset.endpointId.includes(searchQuery));
      
      const matchesType = filterType === 'ALL' || asset.type === filterType;
      const matchesMode = filterMode === 'ALL' || asset.mode === filterMode;
      const matchesStatus = filterStatus === 'ALL' || asset.status === filterStatus;
      
      return matchesSearch && matchesType && matchesMode && matchesStatus;
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case 'REVENUE_DESC': return b.revenueValue - a.revenueValue;
        case 'REVENUE_ASC': return a.revenueValue - b.revenueValue;
        case 'NAME': return a.name.localeCompare(b.name);
        case 'STATUS': return a.status.localeCompare(b.status);
        default: return 0;
      }
    });

    return result;
  }, [assets, searchQuery, filterType, filterMode, filterStatus, sortBy]);

  const uniqueTypes = useMemo(() => Array.from(new Set(assets.map(a => a.type))), [assets]);

  const AuthGate = ({ title, description }: { title: string, description: string }) => (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-google-surface border border-google-border p-12 rounded-[2.5rem] shadow-2xl max-w-md w-full text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-google-accent via-indigo-500 to-amber-500"></div>
        <div className="w-20 h-20 bg-google-bg border border-google-border rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-inner">🔐</div>
        <div>
          <h3 className="text-2xl font-bold tracking-tight mb-2 text-google-text">{title}</h3>
          <p className="text-google-textMuted text-sm leading-relaxed px-4">{description}</p>
        </div>
        <button onClick={onLogin} className="w-full py-4 bg-google-accent text-google-bg rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-all">
          登录授权云端生产
        </button>
      </div>
    </div>
  );

  const renderStrategyCompass = () => (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-[#0b0c0d] border border-google-border rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8">
           <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
              <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Warehouse Synced</span>
           </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           <div className="space-y-2">
              <p className="text-[10px] text-google-textMuted uppercase font-bold">私有数据集</p>
              <p className="text-3xl font-mono font-bold text-google-text">1.2M+</p>
              <div className="w-full h-1 bg-google-surface rounded-full overflow-hidden">
                 <div className="w-[85%] h-full bg-indigo-500"></div>
              </div>
           </div>
           <div className="space-y-2">
              <p className="text-[10px] text-google-textMuted uppercase font-bold">训练迭代次数</p>
              <p className="text-3xl font-mono font-bold text-google-text">450</p>
              <p className="text-[10px] text-google-success">+12 from last week</p>
           </div>
           <div className="space-y-2">
              <p className="text-[10px] text-google-textMuted uppercase font-bold">端点延迟 (ms)</p>
              <p className="text-3xl font-mono font-bold text-google-accent">18ms</p>
              <p className="text-[10px] text-google-textMuted">Ultra Low Latency</p>
           </div>
           <div className="space-y-2">
              <p className="text-[10px] text-google-textMuted uppercase font-bold">垂直领域准确度</p>
              <p className="text-3xl font-mono font-bold text-google-success">98.4%</p>
              <p className="text-[10px] text-google-textMuted">Fine-tuned Win Rate</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`p-8 rounded-[2rem] border transition-all cursor-pointer ${strategyView === 'FOUNDATION' ? 'bg-google-accent/10 border-google-accent' : 'bg-google-surface border-google-border'}`} onClick={() => setStrategyView('FOUNDATION')}>
           <h4 className="text-xl font-bold mb-2">基础模型路径</h4>
           <p className="text-xs text-google-textMuted leading-relaxed mb-6">适合快速原型，但缺乏行业深度。</p>
        </div>
        <div className={`p-8 rounded-[2rem] border transition-all cursor-pointer ${strategyView === 'CUSTOM' ? 'bg-indigo-500/10 border-indigo-500 shadow-xl' : 'bg-google-surface border-google-border'}`} onClick={() => setStrategyView('CUSTOM')}>
           <div className="flex justify-between items-start mb-4">
              <h4 className="text-xl font-bold">精调模型路径 (已激活)</h4>
              <span className="bg-indigo-500 text-google-bg text-[10px] font-black px-2 py-1 rounded">核心壁垒</span>
           </div>
           <p className="text-xs text-google-textMuted leading-relaxed mb-6">利用您的私有数据集打造的垂直行业专家模型。</p>
        </div>
      </div>
    </div>
  );

  const renderMarketplace = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* --- Advanced Control Bar --- */}
      <div className="bg-google-surface border border-google-border rounded-[1.5rem] p-5 shadow-2xl flex flex-col xl:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full group">
           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-google-textMuted group-focus-within:text-google-accent transition-colors">🔍</span>
           <input 
             type="text" 
             placeholder="搜索资产名称、ID 或端点编号..."
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full bg-google-bg border border-google-border rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-google-accent transition-all placeholder:text-google-textMuted"
           />
        </div>
        
        <div className="flex flex-wrap gap-2 w-full xl:w-auto">
           {/* Type Filter */}
           <select 
             value={filterType} 
             onChange={(e) => setFilterType(e.target.value)}
             className="flex-1 min-w-[120px] bg-google-bg border border-google-border rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-wider focus:outline-none focus:border-google-accent cursor-pointer"
           >
              <option value="ALL">所有类型</option>
              {uniqueTypes.map(t => <option key={t} value={t}>{t}</option>)}
           </select>

           {/* Mode Filter */}
           <select 
             value={filterMode} 
             onChange={(e) => setFilterMode(e.target.value)}
             className="flex-1 min-w-[120px] bg-google-bg border border-google-border rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-wider focus:outline-none focus:border-google-accent cursor-pointer"
           >
              <option value="ALL">盈利模式</option>
              <option value="FOR_SALE">Moat (License)</option>
              <option value="RENTAL">Service (Rental)</option>
              <option value="OPEN_SOURCE">开源节点</option>
           </select>

           {/* Status Filter */}
           <select 
             value={filterStatus} 
             onChange={(e) => setFilterStatus(e.target.value)}
             className="flex-1 min-w-[120px] bg-google-bg border border-google-border rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-wider focus:outline-none focus:border-google-accent cursor-pointer"
           >
              <option value="ALL">状态</option>
              <option value="ACTIVE">活跃</option>
              <option value="PENDING">测试</option>
              <option value="ARCHIVED">存档</option>
           </select>

           {/* Sort By */}
           <select 
             value={sortBy} 
             onChange={(e) => setSortBy(e.target.value as any)}
             className="flex-1 min-w-[120px] bg-google-bg border border-google-border rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-wider focus:outline-none focus:border-google-accent cursor-pointer"
           >
              <option value="REVENUE_DESC">营收 (从高到低)</option>
              <option value="REVENUE_ASC">营收 (从低到高)</option>
              <option value="NAME">名称 (A-Z)</option>
              <option value="STATUS">按状态排序</option>
           </select>
        </div>
      </div>

      {/* --- Asset Grid Display --- */}
      <div className="bg-google-surface border border-google-border rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
         <div className="flex justify-between items-center mb-8">
           <div className="flex items-center gap-3">
             <h4 className="text-xl font-bold">核心精调资产市场</h4>
             <span className="text-[10px] font-mono bg-google-bg border border-google-border px-2.5 py-1 rounded text-google-textMuted uppercase tracking-widest">
               Hits: {filteredAssets.length}
             </span>
           </div>
           <div className="flex gap-2">
              <button onClick={() => {setSearchQuery(''); setFilterType('ALL'); setFilterMode('ALL'); setFilterStatus('ALL'); setSortBy('REVENUE_DESC');}} className="text-[9px] font-black bg-google-surfaceLight text-google-text px-4 py-2 rounded-lg uppercase hover:bg-google-border transition-all">重置过滤器</button>
              <button className="text-[9px] font-black bg-indigo-500 text-google-bg px-4 py-2 rounded-lg uppercase hover:scale-105 transition-all shadow-lg">同步新权重</button>
           </div>
         </div>
         
         {filteredAssets.length > 0 ? (
           <div className="grid grid-cols-1 gap-4">
              {filteredAssets.map(asset => (
                <div key={asset.id} className="p-6 bg-google-bg/40 border border-google-border rounded-2xl flex flex-col md:flex-row justify-between items-center group hover:border-indigo-500/50 hover:bg-google-bg/60 transition-all cursor-pointer">
                  <div className="flex items-center gap-6 flex-1">
                     <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-3xl transition-all ${
                       asset.status === 'ACTIVE' ? 'bg-indigo-500/10 border-indigo-500/20 shadow-inner' : 'bg-google-surfaceLight border-google-border grayscale opacity-50'
                     }`}>
                        {asset.type.includes('Fine-tuned') ? '💎' : asset.type.includes('Video') ? '🎥' : '☁️'}
                     </div>
                     <div className="flex-1">
                        <div className="flex items-center gap-3">
                           <p className="text-base font-bold text-google-text group-hover:text-indigo-400 transition-colors">{asset.name}</p>
                           <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                             asset.status === 'ACTIVE' ? 'bg-google-success/20 text-google-success' : 
                             asset.status === 'PENDING' ? 'bg-amber-500/20 text-amber-500' : 'bg-google-textMuted/20 text-google-textMuted'
                           }`}>
                              {asset.status}
                           </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 mt-2">
                           <span className="text-[10px] text-google-textMuted font-mono">ID: {asset.id}</span>
                           <span className="w-1 h-1 bg-google-border rounded-full hidden sm:block"></span>
                           <span className="text-[10px] text-indigo-400 font-mono">Endpoint: {asset.endpointId || 'N/A'}</span>
                           <span className="w-1 h-1 bg-google-border rounded-full hidden sm:block"></span>
                           <span className={`text-[9px] font-black uppercase tracking-tighter ${asset.mode === 'FOR_SALE' ? 'text-amber-500' : 'text-google-success'}`}>
                              {asset.mode === 'FOR_SALE' ? 'Deep Moat (License)' : asset.mode === 'RENTAL' ? 'Service (Rental)' : 'Open Node'}
                           </span>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-10 mt-4 md:mt-0">
                     <div className="text-right flex flex-col items-end">
                        <div className="flex items-center gap-2 mb-1">
                           {asset.revenueValue > 50000 && <span className="text-[8px] font-bold text-google-success uppercase">Trend ▲</span>}
                           <p className="text-[9px] text-google-textMuted font-bold uppercase tracking-widest">Total Revenue</p>
                        </div>
                        <p className="text-xl font-mono text-google-text font-bold leading-none">{asset.revenue}</p>
                     </div>
                     <div className="w-10 h-10 flex items-center justify-center rounded-xl border border-google-border text-google-textMuted group-hover:text-indigo-400 group-hover:border-indigo-400 transition-all">
                        →
                     </div>
                  </div>
                </div>
              ))}
           </div>
         ) : (
           <div className="py-24 text-center space-y-6 animate-in fade-in zoom-in-95 duration-700">
              <div className="text-6xl grayscale opacity-30">🛰️</div>
              <div>
                <p className="text-google-text font-bold text-lg">未检索到匹配的战略资产</p>
                <p className="text-google-textMuted text-xs mt-1">请尝试调整过滤器或检查私有仓库同步状态。</p>
              </div>
              <button 
                onClick={() => {setSearchQuery(''); setFilterType('ALL'); setFilterMode('ALL'); setFilterStatus('ALL');}} 
                className="text-xs text-google-accent font-bold hover:underline bg-google-accent/10 px-6 py-2.5 rounded-xl transition-all"
              >
                清除所有过滤器
              </button>
           </div>
         )}
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (activeStep) {
      case SectionId.Compiler:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full animate-in fade-in duration-500">
            <div className="lg:col-span-7 flex flex-col h-full bg-google-surface border border-google-border rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="p-5 border-b border-google-border bg-google-bg/30 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-google-success shadow-[0_0_8px_rgba(129,201,149,0.5)]"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-google-text">Compiler Session</span>
                </div>
                <div className="flex gap-2">
                   <span className="text-[9px] font-mono text-indigo-400 border border-indigo-400/20 px-2.5 py-1 rounded-full bg-indigo-500/5">PRIVATE_ENDPOINT_ACTIVE</span>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto studio-scroll p-10 space-y-8">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-6 rounded-[1.5rem] text-sm leading-relaxed shadow-lg ${
                      msg.role === 'user' 
                        ? 'bg-google-accent text-google-bg font-bold rounded-tr-none' 
                        : 'bg-google-bg border border-google-border text-google-text rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6 h-full">
              <div className="flex-1 bg-[#0b0c0d] border border-google-border rounded-[2.5rem] p-8 font-mono text-[11px] overflow-hidden flex flex-col shadow-inner">
                <div className="flex justify-between items-center mb-6 text-google-textMuted border-b border-google-border pb-4">
                   <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                     <span className="font-bold tracking-tight">TERMINAL: PRODUCTION_LOGS</span>
                   </div>
                   <span className="animate-pulse text-indigo-400 text-[9px] font-black uppercase">Warehouse Link: OK</span>
                </div>
                <div className="flex-1 overflow-y-auto studio-scroll space-y-2 opacity-90">
                  {logs.map((log, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="text-google-border shrink-0">{i.toString().padStart(3, '0')}</span>
                      <span className={log.includes('[WAREHOUSE]') ? 'text-indigo-400 font-bold' : log.includes('[FETCH]') ? 'text-google-accent' : 'text-google-textMuted'}>
                        {log}
                      </span>
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>
              </div>
            </div>
          </div>
        );

      case SectionId.Admin:
        if (!user) return <AuthGate title="战略资产授权" description="进入 Admin 中心管理您的私有精调资产市场。" />;
        return (
          <div className="space-y-10 pb-20 max-w-7xl mx-auto animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-4xl font-medium tracking-tight">战略与资产中心</h3>
                <p className="text-[10px] text-google-textMuted uppercase font-black tracking-[0.3em] mt-2">Core Moat: Deep Assets & Revenue Management</p>
              </div>
              <div className="flex bg-google-bg border border-google-border rounded-2xl p-1 shadow-2xl">
                {(['MARKETPLACE', 'STRATEGY', 'APIS'] as const).map(t => (
                  <button 
                    key={t} 
                    onClick={() => setAdminTab(t)} 
                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      adminTab === t ? 'bg-indigo-500 text-google-bg shadow-xl' : 'text-google-textMuted hover:text-google-text'
                    }`}
                  >
                    {t === 'STRATEGY' ? '护城河分析' : t === 'MARKETPLACE' ? '资产市场' : '云端接口'}
                  </button>
                ))}
              </div>
            </div>

            {adminTab === 'STRATEGY' ? renderStrategyCompass() : renderMarketplace()}
          </div>
        );

      default:
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-20 text-center space-y-8 animate-pulse">
             <div className="text-7xl">🧬</div>
             <div>
               <h3 className="text-2xl font-bold">节点初始化</h3>
               <p className="text-google-textMuted max-w-sm mx-auto mt-2">正在从私有仓库挂载权重，请稍候...</p>
             </div>
             <div className="w-64 h-1.5 bg-google-surface rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 animate-progress w-full"></div>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 overflow-y-auto studio-scroll px-10 py-12 bg-gradient-to-br from-google-bg via-google-bg to-google-surface/30">
      {renderStepContent()}
    </div>
  );
};

export default Workspace;
