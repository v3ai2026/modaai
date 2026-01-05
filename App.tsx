import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Box, Film, ArrowRight, Menu, X, 
  Lock, Unlock, ShieldCheck, Terminal, Loader2, 
  Cpu, Github, Twitter, Instagram, Globe 
} from 'lucide-react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Workspace from './components/Workspace';
import RightPanel from './components/RightPanel';
import PromptBar from './components/PromptBar';
import Hero from './components/Hero';
import Collection from './components/Collection';
import About from './components/About'; 
import Footer from './components/Footer';
import EngineeringCraft from './components/Craftsmanship';
import VisualPortal from './components/Sustainability';
import { Message, SectionId, CompilerStatus, User, Asset, PrivateNode } from './types';
import { getCompilerResponseStream } from './services/geminiService';
import { authService } from './services/persistenceService';

// ==========================================
// 1. 核心组件：品牌导航栏 (Brand Header)
// ==========================================
const AIModaHeader = ({ memberId, onLoginClick, onReset }: any) => (
  <nav className="fixed top-0 left-0 w-full z-[60] px-6 py-5 flex justify-between items-center bg-gradient-to-b from-black/90 to-transparent backdrop-blur-[2px] border-b border-white/5">
    <div className="flex items-center gap-3 cursor-pointer group" onClick={onReset}>
      <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-sm font-black text-lg tracking-tighter shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform duration-300">
        M
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl font-bold tracking-tight text-white leading-none flex items-center gap-2">
          AI MODA <span className="font-serif italic font-light text-zinc-400">STUDIO</span>
        </h1>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[9px] font-mono text-emerald-500/80 tracking-widest uppercase">
            SYSTEM ONLINE
          </span>
        </div>
      </div>
    </div>

    <div className="flex items-center gap-6">
      <div className="hidden md:flex items-center gap-2 text-xs font-mono text-zinc-600 border-r border-zinc-800 pr-6">
        <Cpu size={14} />
        <span>GPU: H100 [ACTIVE]</span>
      </div>

      {memberId ? (
        <motion.div 
          initial={{ scale: 0.9 }} 
          animate={{ scale: 1 }} 
          className="flex items-center gap-2 px-3 py-1.5 bg-[#0A0A0A] border border-zinc-800 rounded-full"
        >
          <ShieldCheck size={14} className="text-indigo-400" />
          <span className="text-xs font-bold text-zinc-200 tracking-wider uppercase">{memberId}</span>
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full ml-1"></span>
        </motion.div>
      ) : (
        <button 
          onClick={onLoginClick}
          className="text-xs font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest hover:underline decoration-zinc-700 underline-offset-4"
        >
          Member Login
        </button>
      )}

      <button className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
        <Menu size={24} />
      </button>
    </div>
  </nav>
);

// ==========================================
// 2. 核心组件：鉴权终端 (Access Terminal)
// ==========================================
const AccessTerminal = ({ onSuccess, onClose }: any) => {
  const [inputVal, setInputVal] = useState('');
  const [status, setStatus] = useState('locked'); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal) return;
    setStatus('verifying');
    
    setTimeout(() => {
      if (inputVal.length >= 3) {
        setStatus('granted');
        setTimeout(() => onSuccess(inputVal), 1000);
      } else {
        setStatus('denied');
        setTimeout(() => setStatus('locked'), 1500);
      }
    }, 1200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="w-full max-w-md bg-[#0a0a0a] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl relative"
      >
        <div className="bg-zinc-900 px-4 py-3 flex justify-between items-center border-b border-zinc-800">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
            <div className="w-3 h-3 rounded-full bg-green-500/20" />
          </div>
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Protocol Sync v2.5</div>
        </div>

        <div className="p-8 relative">
          <div className="flex justify-center mb-8">
            <AnimatePresence mode='wait'>
              {status === 'locked' && <motion.div key="l" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="p-4 bg-zinc-900 rounded-full text-zinc-500"><Lock size={32} /></motion.div>}
              {status === 'verifying' && <motion.div key="v" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="p-4 bg-indigo-900/20 rounded-full text-indigo-500"><Loader2 size={32} className="animate-spin" /></motion.div>}
              {status === 'granted' && <motion.div key="g" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="p-4 bg-emerald-900/20 rounded-full text-emerald-500"><Unlock size={32} /></motion.div>}
              {status === 'denied' && <motion.div key="d" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="p-4 bg-red-900/20 rounded-full text-red-500"><X size={32} /></motion.div>}
            </AnimatePresence>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="relative">
              <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
              <input 
                autoFocus 
                type="text" 
                value={inputVal} 
                onChange={(e) => setInputVal(e.target.value.toUpperCase())} 
                placeholder="ENTER ID (VIP-888)" 
                disabled={status !== 'locked' && status !== 'denied'}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl py-4 pl-12 pr-4 text-white font-mono tracking-wider focus:outline-none focus:border-indigo-500 transition-all placeholder:text-zinc-700 uppercase" 
              />
            </div>
            <button 
              type="submit" 
              disabled={status !== 'locked' && status !== 'denied'}
              className="w-full mt-4 bg-white text-black font-black py-4 rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50"
            >
              {status === 'verifying' ? 'SYNCHRONIZING...' : 'AUTHORIZE SESSION'}
            </button>
          </form>

          <button onClick={onClose} className="absolute top-0 right-0 p-4 text-zinc-500 hover:text-white">
            <X size={16} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ==========================================
// 3. 核心组件：功能卡片 (Feature Card)
// ==========================================
const FeatureCard = ({ title, subtitle, icon: Icon, delay, onClick, image, isLocked }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8 }}
    onClick={onClick}
    className="group relative h-[500px] w-full overflow-hidden rounded-sm cursor-pointer border border-zinc-800 bg-zinc-900 shadow-2xl"
  >
    <div className="absolute inset-0">
      <img 
        src={image} 
        alt={title}
        className={`w-full h-full object-cover transition-all duration-1000 ${isLocked ? 'grayscale opacity-30' : 'opacity-60 group-hover:scale-110 group-hover:opacity-100'}`} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
    </div>

    {isLocked && (
      <div className="absolute top-6 right-6 bg-black/50 backdrop-blur p-2.5 rounded-full border border-zinc-700 text-zinc-500">
        <Lock size={18} />
      </div>
    )}

    <div className="absolute bottom-0 left-0 w-full p-10">
      <div className={`mb-6 p-4 w-fit rounded-full border transition-all duration-500 ${isLocked ? 'bg-zinc-900 text-zinc-600 border-zinc-800' : 'bg-white/10 text-white border-white/20 group-hover:bg-google-success group-hover:text-google-bg group-hover:border-google-success'}`}>
        <Icon size={28} />
      </div>
      <h2 className="text-4xl font-serif italic text-white mb-3 tracking-tight">{title}</h2>
      <p className="text-xs text-zinc-400 font-mono uppercase tracking-[0.3em] mb-8">
        {isLocked ? 'MEMBER AUTHENTICATION REQUIRED' : subtitle}
      </p>
      
      {!isLocked && (
        <div className="flex items-center gap-3 text-xs font-black text-google-success opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 uppercase tracking-widest">
          Enter Lab <ArrowRight size={16} />
        </div>
      )}
    </div>
  </motion.div>
);

const INITIAL_NODES: PrivateNode[] = [
  { id: 'n1', name: 'Logic-Compute-01', ip: '10.0.0.101', status: 'ONLINE', load: 12, type: 'LOGIC' },
  { id: 'n2', name: 'Render-Worker-02', ip: '10.0.0.102', status: 'ONLINE', load: 45, type: 'RENDER' },
  { id: 'n3', name: 'Database-Relay-03', ip: '10.0.0.103', status: 'ONLINE', load: 5, type: 'DATA' },
  { id: 'n4', name: 'Veo-Engine-04', ip: '10.0.0.104', status: 'ONLINE', load: 0, type: 'VIDEO' },
  { id: 'n5', name: 'MCP-Gateway-05', ip: '10.0.0.105', status: 'ONLINE', load: 22, type: 'GATEWAY' }
];

const INITIAL_ASSETS: Asset[] = [
  { id: 'MODA_HANFU_V4', name: '汉服专项精调权重 (v4)', type: 'Vertex Fine-tuned', icon: '👘', status: 'ACTIVE', revenue: 12400, monetizationModel: 'One-time' },
  { id: 'BRAIN_KERNEL_X', name: '智算大脑核心内核', type: 'Vertex LLM', icon: '🧠', status: 'ACTIVE', revenue: 85000, monetizationModel: 'Subscription' },
  { id: 'VEO_4K_RENDERER', name: 'Veo 4K 商业渲染器', type: 'Vertex Video', icon: '🎬', status: 'ACTIVE', revenue: 32000, monetizationModel: 'Subscription' },
  { id: 'ADS_GEN_SDK', name: '智能广告生成 SDK', type: 'Extension', icon: '📢', status: 'ACTIVE', revenue: 8900, monetizationModel: 'Ads' },
  { id: 'OS_UI_KIT', name: '开源 UI 基础套件', type: 'Component', icon: '📦', status: 'ACTIVE', revenue: 0, monetizationModel: 'Free' },
  { id: 'MODA_COMP_BENTO', name: 'Bento UI 自动生成组件', type: 'Component', icon: '🍱', status: 'ACTIVE', revenue: 5600, monetizationModel: 'One-time' },
  { id: 'MODA_AR_MODULE', name: 'AR 实时试衣引擎', type: 'Extension', icon: '✨', status: 'PENDING', revenue: 0, monetizationModel: 'Subscription' }
];

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'studio'>('landing');
  const [activeStep, setActiveStep] = useState<string>(SectionId.Home);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "系统就绪。moda AI 私有化 Studio 已建立安全连接。当前内网 5 个算力节点状态健康。" }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<CompilerStatus>('READY');
  const [memberId, setMemberId] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [targetStep, setTargetStep] = useState<string | null>(null);
  
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [nodes, setNodes] = useState<PrivateNode[]>(INITIAL_NODES);

  useEffect(() => {
    const timer = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        load: node.status === 'ONLINE' ? Math.min(100, Math.max(5, node.load + (Math.random() * 10 - 5))) : 0
      })));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleUpdateAsset = (id: string, updates: Partial<Asset>) => {
    setAssets(prev => prev.map(asset => asset.id === id ? { ...asset, ...updates } : asset));
  };

  const handleNodeControl = (id: string, action: 'RESTART' | 'TOGGLE') => {
    setNodes(prev => prev.map(n => {
      if (n.id === id) {
        if (action === 'TOGGLE') return { ...n, status: n.status === 'ONLINE' ? 'OFFLINE' : 'ONLINE' };
        if (action === 'RESTART') return { ...n, status: 'BUSY', load: 0 };
      }
      return n;
    }));
    if (action === 'RESTART') {
      setTimeout(() => {
        setNodes(prev => prev.map(n => n.id === id ? { ...n, status: 'ONLINE', load: 10 } : n));
      }, 2500);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isProcessing) return;
    if (activeStep !== SectionId.Compiler) setActiveStep(SectionId.Compiler);
    
    const newUserMsg: Message = { role: 'user', content };
    setMessages(prev => [...prev, newUserMsg]);
    setIsProcessing(true);
    setStatus('COMPILING');

    try {
      await getCompilerResponseStream([...messages, newUserMsg], content, [], (text) => {
        setMessages(prev => {
          const newMsgs = [...prev];
          const last = newMsgs[newMsgs.length - 1];
          if (last?.role === 'assistant') {
            last.content = text;
            return [...newMsgs];
          } else {
            return [...newMsgs, { role: 'assistant', content: text }];
          }
        });
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
      setStatus('READY');
    }
  };

  const handleFeatureClick = (stepId: string) => {
    if (memberId) {
      setActiveStep(stepId);
      setView('studio');
    } else {
      setTargetStep(stepId);
      setShowAuth(true);
    }
  };

  const handleAuthSuccess = (id: string) => {
    setMemberId(id);
    setShowAuth(false);
    if (targetStep) {
      setActiveStep(targetStep);
      setView('studio');
      setTargetStep(null);
    } else {
      setView('studio');
    }
  };

  if (view === 'landing') {
    return (
      <div className="bg-black text-google-text font-sans h-screen overflow-y-auto studio-scroll selection:bg-emerald-500/30">
        <AIModaHeader 
          memberId={memberId} 
          onLoginClick={() => setShowAuth(true)} 
          onReset={() => setView('landing')} 
        />
        
        <AnimatePresence>
          {showAuth && (
            <AccessTerminal 
              onSuccess={handleAuthSuccess} 
              onClose={() => setShowAuth(false)} 
            />
          )}
        </AnimatePresence>

        <motion.main 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="pb-20 pt-48"
        >
          <div className="text-center mb-32 px-6">
            <div className="flex items-center justify-center gap-3 mb-8">
               <span className={`w-2 h-2 rounded-full ${memberId ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-zinc-700'}`} />
               <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.4em]">
                 {memberId ? 'SESSION AUTHORIZED' : 'GUEST MODE | READ-ONLY'}
               </span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white mb-10 leading-[0.9]">
              AI MODA <span className="font-serif italic font-light text-zinc-500">STUDIO</span>
            </h1>
            <p className="max-w-2xl mx-auto text-zinc-500 text-lg font-light leading-relaxed">
              The integrated operating system for digital fashion generation, virtualization, and manufacturing. <br className="hidden md:block" />
              Empowering designers with Google-native AI infrastructure.
            </p>
          </div>
          
          <div className="max-w-[1700px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              title="Mist Engine" 
              subtitle="Generative Design Lab" 
              icon={Zap} 
              delay={0.1} 
              image="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200"
              onClick={() => handleFeatureClick(SectionId.Compiler)}
              isLocked={!memberId}
            />
            <FeatureCard 
              title="TrueFit 3D" 
              subtitle="Digital Atelier & AR" 
              icon={Box} 
              delay={0.2} 
              image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200"
              onClick={() => handleFeatureClick(SectionId.VisualPortal)}
              isLocked={!memberId}
            />
            <FeatureCard 
              title="Motion Synth" 
              subtitle="Production Distribution" 
              icon={Film} 
              delay={0.3} 
              image="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200"
              onClick={() => handleFeatureClick(SectionId.Automation)}
              isLocked={!memberId}
            />
          </div>

          <Footer />
        </motion.main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-google-bg text-google-text overflow-hidden font-sans">
      <Navbar 
        status={status} 
        onBack={() => setView('landing')} 
        user={memberId ? { uid: memberId, displayName: memberId, photoURL: '', email: '' } : null} 
        onLogin={() => setShowAuth(true)} 
        onLogout={() => { setMemberId(null); setView('landing'); }} 
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeStep={activeStep} onStepChange={setActiveStep} isAuthenticated={!!memberId} />
        <main className="flex-1 flex flex-col relative border-r border-google-border overflow-hidden bg-[#0b0c0d]">
          <Workspace 
            activeStep={activeStep} 
            messages={messages} 
            isProcessing={isProcessing} 
            assets={assets}
            onUpdateAsset={handleUpdateAsset}
            nodes={nodes}
            onNodeControl={handleNodeControl}
            onSendMessage={handleSendMessage}
          />
          {activeStep !== SectionId.Compiler && <PromptBar onSend={handleSendMessage} isProcessing={isProcessing} />}
        </main>
        <RightPanel status={status} nodes={nodes} onNodeControl={handleNodeControl} />
      </div>
    </div>
  );
};

export default App;