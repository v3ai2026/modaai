
import React, { useState, useRef, useEffect } from 'react';
import { SectionId, Message } from '../types';
// 修正导入名称
import { getCompilerResponse } from '../services/geminiService';

const SmartCompiler: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "系统就绪。我是 moda AI 智能编译器架构师。请输入您的开发需求（例如：'生成一个具有 AR 换衣功能的服装电商页面'）。" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    // 修正函数调用为 getCompilerResponse
    const responseText = await getCompilerResponse(messages, input);
    setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    setIsTyping(false);
  };

  return (
    <section id={SectionId.Compiler} className="py-24 bg-aurae-primary">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-12 text-center">
          <span className="text-aurae-accent text-[10px] font-bold uppercase tracking-widest mb-4 block">Step 03: 智能生成</span>
          <h2 className="text-3xl font-medium text-aurae-light">与编译器对话</h2>
        </header>

        <div className="code-window flex flex-col h-[650px]">
          {/* Header */}
          <div className="h-12 bg-aurae-secondary border-b border-aurae-border flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-aurae-success"></div>
              <span className="text-xs font-medium text-aurae-muted uppercase tracking-wider">Session Active: Gemini-3-Pro</span>
            </div>
            <div className="flex gap-2">
               <span className="text-[10px] font-mono text-aurae-accent bg-aurae-accent/10 px-2 py-0.5 rounded">MODA_V2.8</span>
            </div>
          </div>

          {/* Console Output */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar font-sans" ref={scrollRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-lg ${
                  msg.role === 'user' 
                    ? 'bg-aurae-accent text-aurae-primary font-bold' 
                    : 'bg-aurae-secondary border border-aurae-border text-aurae-light'
                }`}>
                  <p className="whitespace-pre-wrap text-[14px] leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-aurae-secondary p-5 rounded-lg border border-aurae-border flex gap-2">
                  <div className="w-1.5 h-1.5 bg-aurae-accent rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-aurae-accent rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-aurae-accent rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Prompt Input */}
          <form onSubmit={handleSubmit} className="p-6 bg-aurae-secondary border-t border-aurae-border">
            <div className="relative flex items-center bg-aurae-primary border border-aurae-border rounded-lg px-4 focus-within:border-aurae-accent transition-all">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="描述您的应用蓝图..."
                className="flex-1 bg-transparent py-4 text-sm focus:outline-none text-aurae-light font-light"
              />
              <button 
                type="submit"
                disabled={isTyping}
                className="px-6 py-2 bg-aurae-accent text-aurae-primary rounded-md font-bold text-xs uppercase hover:bg-blue-300 transition-all disabled:opacity-30"
              >
                编译运行
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SmartCompiler;
