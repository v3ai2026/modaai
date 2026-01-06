
import React, { useState } from 'react';

interface PromptBarProps {
  onSend: (content: string) => void;
  isProcessing: boolean;
}

const PromptBar: React.FC<PromptBarProps> = ({ onSend, isProcessing }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !isProcessing) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="p-6 bg-google-bg border-t border-google-border">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="relative group">
          <div className="absolute -inset-0.5 bg-google-success/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
          <div className="relative bg-google-surface border border-google-border rounded-2xl p-4 shadow-xl focus-within:border-google-success transition-all">
            <textarea 
              rows={3}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isProcessing}
              placeholder="输入编译指令... (指令将被分发至 5 个私有节点)"
              className="w-full bg-transparent resize-none outline-none text-sm font-light leading-relaxed placeholder:text-google-textMuted text-google-text disabled:opacity-50"
            ></textarea>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-2">
                <button type="button" title="上传蓝图" className="p-2 hover:bg-google-surfaceLight rounded-md transition-colors">🖼️</button>
                <button type="button" title="内网同步" className="p-2 hover:bg-google-surfaceLight rounded-md transition-colors">🔄</button>
                <button type="button" title="代码抓取" className="p-2 hover:bg-google-surfaceLight rounded-md transition-colors">🧩</button>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-google-textMuted uppercase font-bold hidden sm:inline">集群分发: Ctrl + Enter</span>
                <button 
                  type="submit"
                  disabled={!input.trim() || isProcessing}
                  className="px-6 py-2 bg-google-success text-google-bg rounded-lg text-sm font-bold hover:opacity-80 transition-all shadow-lg flex items-center gap-2 disabled:opacity-30"
                >
                   {isProcessing ? <span className="w-4 h-4 border-2 border-google-bg border-t-transparent rounded-full animate-spin"></span> : <span>运行编译</span>}
                   {!isProcessing && <span className="text-xs">▶</span>}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromptBar;
