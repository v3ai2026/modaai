
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { SectionId, CompilerStatus, Message, PrivateNode, LLMProvider } from './types';
import Workspace from './components/Workspace';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import RightPanel from './components/RightPanel';
import PromptBar from './components/PromptBar';
import { AccessTerminal } from './components/AccessTerminal';
import { getAIResponseStream } from './services/geminiService';
import { memoryService } from './services/persistenceService';
import { SharePortal } from './components/SharePortal';
import { QuickActions } from './components/QuickActions';
import { VoiceConsultant } from './components/VoiceConsultant';

const INITIAL_NODES: PrivateNode[] = [
  { id: 'n1', name: 'Logic-Compute-01', ip: '10.0.0.101', status: 'ONLINE', load: 12, type: 'LOGIC' },
  { id: 'n2', name: 'Render-Worker-02', ip: '10.0.0.102', status: 'ONLINE', load: 45, type: 'RENDER' },
  { id: 'n3', name: 'Database-Relay-03', ip: '10.0.0.103', status: 'ONLINE', load: 5, type: 'DATA' },
  { id: 'n4', name: 'Veo-Engine-04', ip: '10.0.0.104', status: 'ONLINE', load: 0, type: 'VIDEO' },
  { id: 'n5', name: 'MCP-Gateway-05', ip: '10.0.0.105', status: 'ONLINE', load: 22, type: 'GATEWAY' }
];

const checkApiKey = async (): Promise<boolean> => {
  if (typeof (window as any).aistudio?.hasSelectedApiKey === 'function') {
    return await (window as any).aistudio.hasSelectedApiKey();
  }
  return !!process.env.API_KEY;
};

const openKeyDialog = async () => {
  if (typeof (window as any).aistudio?.openSelectKey === 'function') {
    await (window as any).aistudio.openSelectKey();
    return true;
  }
  return false;
};

// Map URL paths to SectionId
const PATH_TO_SECTION: Record<string, SectionId> = {
  '/': SectionId.Dashboard,
  '/compiler': SectionId.MistBuilder,
  '/preview': SectionId.Preview,
  '/market': SectionId.AIMarket,
  '/brand': SectionId.BrandVault,
  '/studio': SectionId.CreationLab,
  '/zeitgeist': SectionId.Newsroom,
  '/cluster': SectionId.Cluster,
  '/memory': SectionId.Vault,
  '/docs': SectionId.Docs,
  '/admin': SectionId.Admin
};

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [activeStep, setActiveStep] = useState<string>(SectionId.Dashboard);
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: "System Unlocked. Neural Uplink Established. Root authorization granted." }]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<CompilerStatus>('READY');
  const [memberId, setMemberId] = useState<string | null>(localStorage.getItem('MODA_USER_ID') || 'LOCAL_ARCHITECT');
  const [showAuth, setShowAuth] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [nodes] = useState<PrivateNode[]>(INITIAL_NODES);
  const [hasApiKey, setHasApiKey] = useState(false);

  // Sync state with URL
  useEffect(() => {
    const path = location.pathname.split('/')[1] || '';
    const section = PATH_TO_SECTION[`/${path}`] || SectionId.Dashboard;
    setActiveStep(section);
  }, [location]);

  useEffect(() => {
    checkApiKey().then(setHasApiKey);
    if (!localStorage.getItem('MODA_USER_ID')) {
      localStorage.setItem('MODA_USER_ID', 'LOCAL_ARCHITECT');
    }
  }, []);

  const handleSendMessage = async (content: string, provider: LLMProvider = 'GEMINI') => {
    if (!content.trim() || isProcessing) return;

    const keySelected = await checkApiKey();
    if (!keySelected) {
      await openKeyDialog();
      setHasApiKey(true);
      return;
    }

    if (activeStep !== SectionId.MistBuilder) {
      navigate('/compiler');
    }
    
    const newUserMsg: Message = { role: 'user', content };
    setMessages(prev => [...prev, newUserMsg]);
    setIsProcessing(true);
    setStatus('COMPILING');

    try {
      const memories = await memoryService.fetchAll(10);
      await getAIResponseStream(provider, [...messages, newUserMsg], content, memories, (text) => {
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
    } catch (error: any) {
      if (error.message?.includes("Requested entity was not found") || error.message?.includes("API_KEY_MISSING")) {
        setHasApiKey(false);
        await openKeyDialog();
      }
    } finally {
      setIsProcessing(false);
      setStatus('READY');
    }
  };

  return (
    <div className="h-screen bg-luxury-obsidian transition-colors duration-500 overflow-hidden flex flex-col font-sans">
      <Navbar 
        status={status} 
        onBack={() => navigate('/')} 
        user={memberId ? { uid: memberId, displayName: memberId, photoURL: '', email: '' } : null} 
        onLogin={() => setShowAuth(true)} 
        onLogout={() => { setMemberId(null); localStorage.removeItem('MODA_USER_ID'); }} 
        onShare={() => setShowShare(true)} 
        hasApiKey={hasApiKey} 
        onSelectKey={() => openKeyDialog().then(setHasApiKey)} 
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeStep={activeStep} onStepChange={(id) => {
          const path = Object.keys(PATH_TO_SECTION).find(k => PATH_TO_SECTION[k] === id);
          if (path) navigate(path);
        }} />
        
        <main className="flex-1 flex flex-col relative overflow-hidden">
          <Workspace 
            activeStep={activeStep} 
            messages={messages} 
            isProcessing={isProcessing} 
            nodes={nodes} 
            onSendMessage={handleSendMessage} 
            onStepChange={(id) => {
               const path = Object.keys(PATH_TO_SECTION).find(k => PATH_TO_SECTION[k] === id);
               if (path) navigate(path);
            }} 
          />
          
          <AnimatePresence>
            {activeStep === SectionId.MistBuilder && (
              <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}>
                <PromptBar onSend={(content) => handleSendMessage(content, 'GEMINI')} isProcessing={isProcessing} />
              </motion.div>
            )}
          </AnimatePresence>
          
          <QuickActions onShareOpen={() => setShowShare(true)} />
          <VoiceConsultant />
        </main>
        
        <RightPanel status={status} nodes={nodes} onNodeControl={() => {}} />
      </div>
      
      <AnimatePresence>
        {showAuth && <AccessTerminal onSuccess={(id) => { setMemberId(id); localStorage.setItem('MODA_USER_ID', id); setShowAuth(false); }} onClose={() => setShowAuth(false)} />}
        {showShare && <SharePortal blueprintName="Neural_Production_V3" onClose={() => setShowShare(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default App;
