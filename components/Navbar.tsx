
import React from 'react';
import { CompilerStatus } from '../types';

interface NavbarProps {
  status: CompilerStatus;
}

const Navbar: React.FC<NavbarProps> = ({ status }) => {
  return (
    <header className="h-16 border-b border-google-border flex items-center justify-between px-4 bg-google-bg z-20">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-google-accent flex items-center justify-center">
            <span className="text-google-bg font-bold text-lg">m</span>
          </div>
          <span className="text-lg font-medium">moda <span className="text-google-textMuted font-normal">AI Studio</span></span>
        </div>
        
        <div className="h-6 w-[1px] bg-google-border mx-2"></div>
        
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-google-surface transition-colors cursor-pointer group">
          <span className="text-sm font-medium">编译任务: moda_v2.8_production</span>
          <svg className="w-4 h-4 text-google-textMuted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className={`flex items-center gap-2 px-3 py-1 border rounded-full transition-all ${
          status === 'COMPILING' ? 'bg-google-accent/10 border-google-accent/20' : 'bg-google-success/10 border-google-success/20'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            status === 'COMPILING' ? 'bg-google-accent animate-pulse' : 'bg-google-success'
          }`}></div>
          <span className={`text-[11px] font-bold uppercase tracking-wider ${
            status === 'COMPILING' ? 'text-google-accent' : 'text-google-success'
          }`}>
            {status === 'COMPILING' ? '正在编译' : '系统就绪'}
          </span>
        </div>
        
        <button className="px-5 py-2 bg-google-accent text-google-bg rounded-md text-sm font-bold hover:bg-blue-300 transition-all shadow-sm">
          部署上线
        </button>
        
        <div className="w-8 h-8 rounded-full bg-google-surfaceLight border border-google-border flex items-center justify-center text-xs">AI</div>
      </div>
    </header>
  );
};

export default Navbar;
