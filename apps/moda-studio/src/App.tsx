
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionId, CompilerStatus, Message, PrivateNode, Asset } from './types';
import ImmersiveLanding from './components/ImmersiveLanding';
import Workspace from './components/Workspace';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import RightPanel from './components/RightPanel';
import PromptBar from './components/PromptBar';
import { AccessTerminal } from './components/AccessTerminal';
import { getCompilerResponseStream } from './services/geminiService';
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

const INITIAL_ASSETS: Asset[] = [
  { id: 'MODA_V1', name: 'Neural Fabric Weight', type: 'Weights', icon: '🧵', status: 'ACTIVE', revenue: 12000, monetizationModel: 'Subscription' },
  { id: 'MODA_V2', name: 'Cinematic Renderer', type: 'Engine', icon: '🎬', status: 'ACTIVE', revenue: 45000, monetizationModel: 'One-time' }
];

// Helper to check for Studio API Key - assuming window.aistudio is available globally
const checkApiKey = async (): Promise<boolean> => {
  if (typeof (window as any).aistudio?.hasSelectedApiKey === 'function') {
    return await (window as any).aistudio.hasSelectedApiKey();
  }
  return false;
};

const openKeyDialog = async () => {
  if (typeof (window as any).aistudio?.openSelectKey === 'function') {
    await (window as any).aistudio.openSelectKey();
    return true;
  }
  return false;
};

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'studio'>('landing');
  const [activeStep, setActiveStep] = useState<string>(SectionId.Dashboard);
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: "System Initialized. Moda OS Uplink Secure. Ready for prompt-to-app synthesis." }]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<CompilerStatus>('READY');
  const [memberId, setMemberId] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [nodes, setNodes] = useState<PrivateNode[]>(INITIAL_NODES);
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [hasApiKey, setHasApiKey] = useState(false);

  // Sync API Key status on load and view change
  useEffect(() => {
    checkApiKey().then(setHasApiKey);
  }, [view]);

  // Load balancing simulation
  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setNodes(prev => prev.map(node => ({
          ...node,
          load: node.status === 'ONLINE' ? Math.min(98, node.load + (Math.random() * 10)) : node.load,
          status: Math.random() > 0.95 ? 'BUSY' : node.status
        })));
      }, 500);
      return () => clearInterval(interval);
    } else {
      setNodes(INITIAL_NODES);
    }
  }, [isProcessing]);

  const handleStart = async () => {
    // Before entering, check for Key. If not found, it will be handled by Navbar or forced entry
    setView('studio');
    const keySelected = await checkApiKey();
    if (!keySelected) {
      // Force selection upon first entry if missing
      await openKeyDialog();
      setHasApiKey(true); // Proceed after triggering dialog
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isProcessing) return;

    if (!memberId) {
      setShowAuth(true);
      return;
    }

    // Secondary check: If user attempts production without a key, prompt them
    const keySelected = await checkApiKey();
    if (!keySelected) {
      await openKeyDialog();
      setHasApiKey(true);
      return;
    }

    if (activeStep !== SectionId.MistBuilder) setActiveStep(SectionId.MistBuilder);
    
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
    } catch (error: any) {
      // If the request fails with 404/not found, it might be an invalid key project
      if (error.message?.includes("Requested entity was not found")) {
        setHasApiKey(false);
        await openKeyDialog();
      }
    } finally {
      setIsProcessing(false);
      setStatus('READY');
    }
  };

  const handleSelectKey = async () => {
    await openKeyDialog();
    setHasApiKey(true);
  };

  return (
    <div className="h-screen bg-black overflow-hidden flex flex-col font-sans">
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, filter: 'blur(60px)', scale: 1.5, rotate: 2 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-full overflow-hidden"
          >
            <ImmersiveLanding 
              onStart={handleStart} 
              onLoginClick={() => setShowAuth(true)}
              memberId={memberId} 
            />
          </motion.div>
        ) : (
          <motion.div 
            key="studio"
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }} 
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col h-full bg-google-bg"
          >
            <Navbar 
              status={status} 
              onBack={() => setView('landing')} 
              user={memberId ? { uid: memberId, displayName: memberId, photoURL: '', email: '' } : null} 
              onLogin={() => setShowAuth(true)} 
              onLogout={() => { setMemberId(null); }} 
              onShare={() => setShowShare(true)}
              hasApiKey={hasApiKey}
              onSelectKey={handleSelectKey}
            />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar activeStep={activeStep} onStepChange={setActiveStep} />
              <main className="flex-1 flex flex-col relative bg-google-bg overflow-hidden">
                <Workspace 
                  activeStep={activeStep} 
                  messages={messages} 
                  isProcessing={isProcessing} 
                  assets={assets}
                  onUpdateAsset={() => {}}
                  nodes={nodes}
                  onNodeControl={() => {}}
                  onSendMessage={handleSendMessage}
                  onStepChange={setActiveStep}
                />
                {activeStep === SectionId.MistBuilder && (
                  <PromptBar onSend={handleSendMessage} isProcessing={isProcessing} />
                )}
                
                {/* Global HUD Elements */}
                <QuickActions onShareOpen={() => setShowShare(true)} />
                <VoiceConsultant />
              </main>
              <RightPanel status={status} nodes={nodes} onNodeControl={() => {}} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAuth && (
          <AccessTerminal 
            onSuccess={(id) => { setMemberId(id); setShowAuth(false); }} 
            onClose={() => setShowAuth(false)} 
          />
        )}
        {showShare && (
          <SharePortal 
            blueprintName="Production_Master_Logic_V1" 
            onClose={() => setShowShare(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
