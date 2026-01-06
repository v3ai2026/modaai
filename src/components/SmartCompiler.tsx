
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code, MessageSquare, ShieldCheck, Cpu } from 'lucide-react';
import { Message } from '../types';

interface SmartCompilerProps {
  messages: Message[];
  isProcessing: boolean;
  onSendMessage: (content: string) => void;
}

const SmartCompiler: React.FC<SmartCompilerProps> = ({ messages, isProcessing, onSendMessage }) => {
  const [input, setInput] = useState('');
  const [view, setView] = useState<'CHAT' | 'KERNEL'>('CHAT');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isProcessing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] animate-in fade-in duration-700 overflow-hidden relative">
      <header className="p-8 border-b border-white/5 flex justify-between items-center bg-black/40 backdrop-blur-3xl z-10">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Neural Compiler</h2>
          <p className="text-[11px] text-white/20 font-mono mt-2 tracking-[0.3em] uppercase italic flex items-center gap-3">
            <Cpu size={12} className="text-google-accent" /> Uplink_09: Secure
          </p>
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
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full overflow-y-auto studio-scroll p-10 space-y-10"
              ref={scrollRef}
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-8 rounded-[2.5rem] shadow-2xl transition-all relative group ${
                    msg.role === 'user' 
                      ? 'bg-google-accent text-google-bg font-black italic' 
                      : 'bg-white/[0.03] border border-white/10 text-white/80 leading-relaxed font-light'
                  }`}>
                    {msg.role === 'assistant' && (
                      <div className="absolute -top-3 -left-3 w-8 h-8 bg-black border border-white/10 rounded-lg flex items-center justify-center text-google-accent">
                        <ShieldCheck size={16} />
                      </div>
                    )}
                    <p className="whitespace-pre-wrap text-[15px] italic">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-full flex gap-4 items-center">
                    <div className="w-2 h-2 bg-google-accent rounded-full animate-ping"></div>
                    <span className="text-[11px] font-black text-google-accent uppercase tracking-[0.4em] italic">Synthesizing_Logic...</span>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="kernel"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full bg-black/60 p-10 font-mono text-[11px] text-google-success/60 overflow-y-auto studio-scroll"
            >
               <div className="space-y-2">
                 <p className="text-white/20">/// START_NEURAL_LOG_SYNC ///</p>
                 {messages.map((m, i) => (
                   <p key={i} className="break-all opacity-40">
                     [NODE_SYNC_{i}] -> {m.role.toUpperCase()}: {m.content.substring(0, 100)}...
                   </p>
                 ))}
                 {isProcessing && (
                   <>
                    <p className="animate-pulse text-google-accent">[RE-ROUTING] Global_Weights_Optimization_Active</p>
                    <p className="text-white/20">Packet_Loss: 0.00%</p>
                    <p className="text-white/20">Jitter: 2.1ms</p>
                    <p className="text-google-success/80">>>> STOCHASTIC_GRADIENT_DESCENT_STEP_COMPLETE</p>
                   </>
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
            placeholder="Command_Input... [CMD+ENTER to Sync]"
            className="flex-1 bg-transparent py-6 text-sm focus:outline-none text-white font-black italic tracking-widest placeholder:text-white/10 disabled:opacity-50 uppercase"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isProcessing}
            className="px-12 py-5 bg-white text-black rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.4em] hover:bg-google-accent transition-all disabled:opacity-30 shadow-2xl italic flex items-center gap-4 group/btn"
          >
            {isProcessing ? 'Synthesizing' : 'Sync_Node'}
            <Code size={14} className="group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SmartCompiler;
