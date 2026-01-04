
import React from 'react';
import { SectionId } from '../types';

const Hero: React.FC = () => {
  return (
    <section id={SectionId.Home} className="relative min-h-[90vh] flex flex-col items-center justify-center pt-16 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-aurae-accent/5 blur-[120px] rounded-full"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-8xl font-medium tracking-tight mb-8 leading-[1.05] text-aurae-light">
          提示词即 <span className="gradient-text">生产级应用</span>
        </h1>
        
        <p className="text-aurae-muted text-lg md:text-2xl font-light mb-12 max-w-3xl mx-auto leading-relaxed">
          基于 Google Studio 规范，将自然语言转化为 <span className="text-aurae-light">自动化网站、4K 视频、AR 换衣</span> 及电商全链路系统。
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-3 bg-aurae-accent text-aurae-primary rounded-lg text-sm font-bold hover:scale-[1.02] transition-all shadow-lg">
            即刻开始编译
          </button>
          <button className="px-8 py-3 bg-transparent text-aurae-light border border-aurae-border rounded-lg text-sm font-bold hover:bg-white/5 transition-all">
            查看实施蓝图
          </button>
        </div>

        {/* Studio Preview Console */}
        <div className="mt-20 w-full max-w-4xl mx-auto code-window overflow-hidden text-left">
          <div className="h-10 bg-aurae-secondary flex items-center px-4 gap-2 border-b border-aurae-border">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <div className="ml-4 flex gap-4 text-[11px] font-medium text-aurae-muted">
              <span className="text-aurae-accent border-b border-aurae-accent pb-1">moda_compiler.ts</span>
              <span>vercel_deploy.yml</span>
              <span>ar_module_config.json</span>
            </div>
          </div>
          <div className="p-6 font-mono text-[13px] leading-relaxed space-y-1">
            <p className="text-aurae-muted"><span className="text-aurae-success">✓</span> 环境初始化成功 (Step 01)</p>
            <p className="text-aurae-muted"><span className="text-aurae-success">✓</span> LLM 节点选择: Gemini-3-Pro (Step 02)</p>
            <p className="text-aurae-light"><span className="text-aurae-accent">Compiling:</span> 正在生成 AR 换衣核心算法...</p>
            <p className="text-white/20">| Generating multi-modal vision transformer...</p>
            <p className="text-white/20">| Injecting 3D try-on physics engine...</p>
            <p className="text-aurae-accent animate-pulse">_</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
