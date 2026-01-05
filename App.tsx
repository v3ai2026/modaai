
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Workspace from './components/Workspace';
import RightPanel from './components/RightPanel';
import PromptBar from './components/PromptBar';
import Hero from './components/Hero';
import Collection from './components/Collection';
import Footer from './components/Footer';
import { Message, SectionId, CompilerStatus, User } from './types';
import { getCompilerResponse } from './services/geminiService';
import { auth, googleProvider, requestNotificationPermission } from './services/firebaseService';
import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'studio'>('landing');
  const [activeStep, setActiveStep] = useState<string>(SectionId.Compiler);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "moda AI 编译引擎已就绪。请描述您的应用愿景，我将引导您完成从初始化到部署的全流程。" }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<CompilerStatus>('READY');
  const [user, setUser] = useState<User | null>(null);

  // Sync state with Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL
        });
        // 登录成功后自动请求推送权限
        requestNotificationPermission();
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isProcessing) return;
    const newUserMsg: Message = { role: 'user', content };
    setMessages(prev => [...prev, newUserMsg]);
    setIsProcessing(true);
    setStatus('COMPILING');
    const aiResponse = await getCompilerResponse(messages, content);
    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    setIsProcessing(false);
    setStatus('READY');
  };

  const startStudio = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setView('studio'), 300);
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Firebase Login Error:", error);
      alert("登录失败，请检查网络或配置。");
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Firebase Logout Error:", error);
    }
  };

  if (view === 'landing') {
    return (
      <div className="bg-google-bg text-google-text font-sans scroll-smooth">
        <div className="h-16 border-b border-google-border flex items-center justify-between px-8 bg-google-bg/80 backdrop-blur-md sticky top-0 z-50">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded bg-google-accent flex items-center justify-center font-bold text-google-bg">m</div>
             <span className="font-medium tracking-tight">moda AI Studio</span>
           </div>
           <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-[10px] text-google-textMuted hidden sm:inline">已登录: {user.displayName}</span>
                  <button onClick={handleLogout} className="text-xs text-google-textMuted hover:text-white transition-colors">退出登录</button>
                </div>
              ) : (
                <button onClick={handleLogin} className="text-xs text-google-textMuted hover:text-white transition-colors">管理员登录</button>
              )}
              <button onClick={startStudio} className="px-5 py-2 bg-google-accent text-google-bg rounded-full text-sm font-bold hover:scale-105 transition-all">进入编译器</button>
           </div>
        </div>
        <Hero onStart={startStudio} />
        <Collection />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-google-bg text-google-text overflow-hidden animate-in fade-in duration-700">
      <Navbar status={status} onBack={() => setView('landing')} user={user} onLogin={handleLogin} onLogout={handleLogout} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeStep={activeStep} onStepChange={setActiveStep} isAuthenticated={!!user} />
        <main className="flex-1 flex flex-col relative border-r border-google-border overflow-hidden">
          <Workspace 
            activeStep={activeStep} 
            messages={messages} 
            isProcessing={isProcessing} 
            user={user} 
            onLogin={handleLogin} 
          />
          <PromptBar onSend={handleSendMessage} isProcessing={isProcessing} />
        </main>
        <RightPanel status={status} />
      </div>
    </div>
  );
};

export default App;
