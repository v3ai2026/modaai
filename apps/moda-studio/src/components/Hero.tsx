
import React from 'react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 overflow-hidden bg-[#0d0d0e]">
      {/* 动态背景背景 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-google-accent/5 blur-[160px] rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 bg-google-surface border border-google-border rounded-full shadow-lg">
           <span className="flex h-2 w-2 relative">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-google-success opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-google-success"></span>
           </span>
           <span className="text-[11px] font-bold text-google-text tracking-[0.2em] uppercase">moda AI Studio Engine v3.1 Live</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-medium tracking-tighter mb-10 leading-[1.05] text-white">
          提示词即 <span className="text-google-accent bg-clip-text text-transparent bg-gradient-to-r from-google-accent to-blue-300">生产级应用</span>
        </h1>
        
        <p className="text-google-textMuted text-xl md:text-2xl font-light mb-14 max-w-3xl mx-auto leading-relaxed">
          基于 Google Studio 规范，一键将自然语言蓝图转化为全栈网站、AR 电子商务组件及 4K 营销视频。
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24">
          <button 
            onClick={onStart}
            className="group relative px-10 py-4 bg-google-accent text-google-bg rounded-2xl text-base font-bold hover:scale-[1.05] transition-all shadow-[0_0_40px_rgba(138,180,248,0.3)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="relative">立即进入编译器</span>
          </button>
          <button className="px-10 py-4 bg-transparent text-white border border-google-border rounded-2xl text-base font-bold hover:bg-google-surface transition-all">
            查看技术蓝图 (BlueMap)
          </button>
        </div>

        {/* 动态终端窗口 */}
        <div className="w-full max-w-4xl mx-auto bg-[#1e1f20] border border-google-border rounded-2xl overflow-hidden shadow-2xl text-left transform perspective-1000 rotateX-2">
          <div className="h-12 bg-[#2b2c2f] border-b border-google-border flex items-center px-5 justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <div className="text-[10px] font-mono text-google-textMuted uppercase tracking-widest">Compiler_Kernel_BETA.sh</div>
            <div className="w-12"></div>
          </div>
          <div className="p-8 font-mono text-[13px] leading-relaxed space-y-2 h-64 studio-scroll overflow-y-auto bg-black/40">
            <p className="text-google-textMuted"><span className="text-google-success">[OK]</span> 建立 Google Cloud 资产链接...</p>
            <p className="text-google-textMuted"><span className="text-google-success">[OK]</span> 加载 Gemini-3-Pro 逻辑推理引擎...</p>
            <p className="text-google-accent animate-pulse">| 正在解析：AR 电子商务组件蓝图 (MODA_V3)...</p>
            <p className="text-google-textMuted opacity-50">| 挂载 Artifact Registry: services/149C-F9EC...</p>
            <p className="text-google-textMuted opacity-50">| 注入 Cloud Run 部署模板...</p>
            <p className="text-[#81c995]">| 状态：已就绪，等待用户指令输入。</p>
            <p className="text-google-accent">_</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
