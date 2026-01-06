
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';

interface SmartCompilerProps {
  messages: Message[];
  isProcessing: boolean;
  onSendMessage: (content: string) => void;
}

const SmartCompiler: React.FC<SmartCompilerProps> = ({ messages, isProcessing, onSendMessage }) => {
  const [input, setInput] = useState('');
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
    <div className="flex flex-col h-full bg-google-bg animate-in fade-in duration-700">
      <header className="p-8 border-b border-google-border flex justify-between items-center bg-black/20 backdrop-blur-md">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Neural Compiler</h2>
          <p className="text-[11px] text-google-textMuted font-mono mt-2 tracking-[0.3em] uppercase italic">Internal_Node_Sync: Active</p>
        </div>
        <div className="px-5 py-2.5 bg-google-success/10 border border-google-success/20 rounded-2xl text-[10px] font-black text-google-success uppercase tracking-[0.3em] flex items-center gap-3">
           <span className="w-1.5 h-1.5 bg-google-success rounded-full animate-ping"></span>
           Compiler_Live
        </div>
      </header>

      <div className="flex-1 overflow-y-auto studio-scroll p-8 space-y-8" ref={scrollRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-8 rounded-[2.5rem] shadow-2xl transition-all ${
              msg.role === 'user' 
                ? 'bg-google-success text-google-bg font-black italic' 
                : 'bg-google-surface border border-google-border text-white leading-relaxed'
            }`}>
              <p className="whitespace-pre-wrap text-[15px]">{msg.content}</p>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-google-bg border border-google-border px-8 py-4 rounded-full flex gap-4 items-center">
              <div className="w-2 h-2 bg-google-success rounded-full animate-ping"></div>
              <span className="text-[11px] font-mono text-google-success uppercase font-black tracking-widest">Compiler Computing Logic...</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-8 border-t border-google-border bg-google-bg/80 backdrop-blur-xl">
        <div className="relative flex items-center bg-google-surface border border-google-border rounded-[2.5rem] px-8 py-2 focus-within:border-google-success transition-all group shadow-2xl max-w-5xl mx-auto w-full">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isProcessing}
            placeholder="描述您的应用蓝图 (例如: 重构登陆页逻辑)..."
            className="flex-1 bg-transparent py-6 text-sm focus:outline-none text-white font-light placeholder:text-google-textMuted disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isProcessing}
            className="px-10 py-4 bg-google-success text-google-bg rounded-[1.2rem] font-black text-xs uppercase tracking-widest hover:scale-95 transition-all disabled:opacity-30 shadow-xl"
          >
            {isProcessing ? '编译中...' : '运行编译 ▶'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SmartCompiler;
