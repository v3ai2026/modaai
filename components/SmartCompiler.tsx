
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code, MessageSquare, ShieldCheck, Cpu, Send, Zap, ChevronDown, Globe } from 'lucide-react';
import { Message, LLMProvider } from '../types';

interface SmartCompilerProps {
  messages: Message[];
  isProcessing: boolean;
  onSendMessage: (content: string, provider: LLMProvider) => void;
}

const SmartCompiler: React.FC<SmartCompilerProps> = ({ messages, isProcessing, onSendMessage }) => {
  const [input, setInput] = useState('');
  const [view, setView] = useState<'CHAT' | 'KERNEL'>('CHAT');
  const [provider, setProvider] = useState<LLMProvider>('GEMINI');
  const [showProviderMenu, setShowProviderMenu] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isProcessing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    onSendMessage(input, provider);
    setInput('');
  };

  const providers = [
    { id: 'GEMINI' as LLMProvider, name: 'Google_Titan_Core', icon: <Cpu size={14} />, color: 'text-google-accent' },
    { id: 'OPENAI' as LLMProvider, name: 'OpenAI_GPT_Core', icon: <Globe size={14} />, color: 'text-google-success' }
  ];

  return (
    <div className="flex flex-col h-full bg-[#050505] overflow-hidden relative">
      <header className="p-8 border-b border-white/5 flex justify-between items-center bg-black/40 backdrop-blur-3xl z-10">
        <div className="flex items-center gap-6">
          <div>
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Neural Compiler</h2>
            <p className="text-[11px] text-white/20 font-mono mt-2 tracking-[0.3em] uppercase italic flex items-center gap-3">
              <span className={`w-1.5 h-1.5 rounded-full ${provider === 'GEMINI' ? 'bg-google-accent animate-pulse' : 'bg-google-success'}`} /> 
              {provider === 'GEMINI' ? 'Node_Titan_v3.1' : 'Node_GPT_4o'}
            </p>
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowProviderMenu(!showProviderMenu)}
              className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:border-luxury-gold/40 transition-all text-[10px] font-black uppercase tracking-widest text-white/60 italic"
            >
              {provider === 'GEMINI' ? <Cpu size={14} className="text-google-accent" /> : <Globe size={14} className="text-google-success" />}
              {provider} <ChevronDown size={12} />
            </button>

            <AnimatePresence>
              {showProviderMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-56 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
                >
                  {providers.map(p => (
                    <button
                      key={p.id}
                      onClick={() => { setProvider(p.id); setShowProviderMenu(false); }}
                      className={`w-full flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-widest italic ${provider === p.id ? p.color : 'text-white/40'}`}
                    >
                      <div className="flex items-center gap-4">
                        {p.icon}
                        {p.name}
                      </div>
                      {provider === p.id && <div className={`w-1 h-1 rounded-full ${p.color} bg-current animate-ping`} />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
           <button 
             onClick={() => setView('CHAT')}
             className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${view === 'CHAT' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
           >
             <MessageSquare size={14} /> Briefing
           </button>
           <button 
             onClick={() => setView('KERNEL')}
             className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${view === 'KERNEL' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
           >
             <Terminal size={14} /> Kernel_Log
           </button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {view === 'CHAT' ? (
            <motion.div 
              key="chat"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full overflow-y-auto studio-scroll p-10 space-y-8"
              ref={scrollRef}
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-8 rounded-[2.5rem] shadow-2xl transition-all relative ${
                    msg.role === 'user' 
                      ? 'bg-google-accent text-google-bg font-black italic' 
                      : 'bg-white/[0.03] border border-white/10 text-white/80 font-light'
                  }`}>
                    {msg.role === 'assistant' && (
                      <div className={`absolute -top-3 -left-3 w-8 h-8 bg-black border border-white/10 rounded-lg flex items-center justify-center ${provider === 'GEMINI' ? 'text-google-accent' : 'text-google-success'}`}>
                        <ShieldCheck size={16} />
                      </div>
                    )}
                    <p className="whitespace-pre-wrap text-[15px] italic leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-full flex gap-4 items-center">
                    <div className={`w-2 h-2 rounded-full animate-ping ${provider === 'GEMINI' ? 'bg-google-accent' : 'bg-google-success'}`} />
                    <span className={`text-[11px] font-black uppercase tracking-[0.4em] italic ${provider === 'GEMINI' ? 'text-google-accent' : 'text-google-success'}`}>Synthesizing_Logic...</span>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="kernel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full bg-black/60 p-10 font-mono text-[11px] text-google-success/60 overflow-y-auto studio-scroll"
            >
               <div className="space-y-2">
                 <p className="text-white/20">/// START_NEURAL_LOG_SYNC ///</p>
                 <p className="text-luxury-gold/40">{'>>>'} ACTIVE_PROVIDER: {provider}</p>
                 {messages.map((m, i) => (
                   <p key={i} className="break-all opacity-40">
                     {'[NODE_SYNC_'}{i}{']'} {'→'} {m.role.toUpperCase()}: {m.content.substring(0, 80)}...
                   </p>
                 ))}
                 {isProcessing && (
                   <p className={`animate-pulse ${provider === 'GEMINI' ? 'text-google-accent' : 'text-google-success'}`}>{'>>>>'} EXECUTING_STOCHASTIC_OPTIMIZATION...</p>
                 )}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} className="p-10 border-t border-white/5 bg-black/40 backdrop-blur-3xl relative z-10">
        <div className="relative flex items-center bg-white/[0.03] border border-white/10 rounded-[2.5rem] px-10 py-3 focus-within:border-google-accent/40 transition-all group shadow-2xl max-w-5xl mx-auto w-full">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isProcessing}
            placeholder={`Describe your blueprint to ${provider}...`}
            className="flex-1 bg-transparent py-6 text-sm focus:outline-none text-white font-black italic tracking-widest placeholder:text-white/10 disabled:opacity-50 uppercase"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isProcessing}
            className={`px-10 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.4em] transition-all disabled:opacity-30 shadow-2xl italic flex items-center gap-3 ${provider === 'GEMINI' ? 'bg-white text-black hover:bg-google-accent' : 'bg-google-success text-black'}`}
          >
            {isProcessing ? <Zap className="animate-spin" size={14}/> : <Send size={14} />}
            {isProcessing ? 'Synthesizing' : 'Sync_Node'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SmartCompiler;
