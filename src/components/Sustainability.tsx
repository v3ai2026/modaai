
import React from 'react';
import { SectionId } from '../types';

const VisualPortal: React.FC = () => {
  return (
    <section id={SectionId.Editor} className="py-24 bg-google-bg border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
             <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[4rem] aspect-video p-10 flex flex-col shadow-[0_50px_100px_rgba(0,0,0,0.6)] overflow-hidden group">
                <div className="h-10 border-b border-white/10 flex items-center justify-between px-2 mb-8">
                  <div className="flex gap-6">
                    <span className="text-[10px] font-black text-google-success uppercase tracking-[0.2em] italic">Render View</span>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Frame_144</span>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-google-success/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-google-success animate-pulse"></div>
                  </div>
                </div>
                <div className="flex-1 flex gap-8">
                  <div className="w-1/3 bg-black/40 backdrop-blur-md rounded-[2.5rem] p-8 space-y-5 border border-white/5">
                    <div className="h-2 w-full bg-white/10 rounded animate-pulse"></div>
                    <div className="h-2 w-2/3 bg-white/10 rounded animate-pulse"></div>
                    <div className="h-2 w-1/2 bg-white/10 rounded animate-pulse"></div>
                    <div className="h-12 w-full bg-google-success/20 rounded-2xl mt-8 border border-google-success/30 flex items-center justify-center">
                      <div className="w-4 h-1 bg-google-success rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex-1 bg-black/40 backdrop-blur-md rounded-[2.5rem] flex flex-col items-center justify-center border border-dashed border-white/10 group-hover:border-google-success transition-all duration-1000">
                    <div className="text-center">
                      <p className="text-6xl mb-6 group-hover:scale-110 transition-transform drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">🎬</p>
                      <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] italic font-black">VEO_ENGINE_READY</p>
                    </div>
                  </div>
                </div>
             </div>
             
             {/* Stats Card */}
             <div className="absolute -bottom-8 -right-8 p-10 bg-google-success text-google-bg rounded-[3rem] shadow-[0_20px_40px_rgba(129,201,149,0.3)] transform rotate-3 hover:rotate-0 transition-all duration-700">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 opacity-60 italic">Sync Latency</p>
                <p className="text-4xl font-mono font-black italic tracking-tighter">24ms</p>
             </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-google-success text-[11px] font-black uppercase tracking-[0.4em] mb-4 block">Visual Interface</span>
            <h2 className="text-4xl md:text-5xl font-black italic text-white mb-10 tracking-tighter uppercase leading-none">可视化门户 <br/>编辑器系统</h2>
            <p className="text-lg text-google-textMuted font-light leading-relaxed mb-12 italic">
              moda AI Studio 提供了一个无缝的“编辑器+门户”环境，让您能够实时微调 AI 生成的内容与交互逻辑，并直接推送到私有节点。
            </p>

            <div className="space-y-10">
              <div className="flex gap-8 group">
                <div className="w-16 h-16 rounded-[1.5rem] bg-white/[0.05] backdrop-blur-xl border border-white/10 flex items-center justify-center text-3xl group-hover:border-google-success group-hover:scale-110 transition-all duration-500 shadow-xl">🖱️</div>
                <div>
                  <h4 className="font-black text-white text-lg mb-2 uppercase tracking-tight italic">直观可视化微调</h4>
                  <p className="text-google-textMuted text-sm font-light leading-relaxed">直接在画布上修改样式，编译器将同步重写底层逻辑代码。</p>
                </div>
              </div>
              <div className="flex gap-8 group">
                <div className="w-16 h-16 rounded-[1.5rem] bg-white/[0.05] backdrop-blur-xl border border-white/10 flex items-center justify-center text-3xl group-hover:border-google-accent group-hover:scale-110 transition-all duration-500 shadow-xl">🚀</div>
                <div>
                  <h4 className="font-black text-white text-lg mb-2 uppercase tracking-tight italic">集群一键分发</h4>
                  <p className="text-google-textMuted text-sm font-light leading-relaxed">满意后即刻全量推送到您的私有生产环境，零停机同步。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualPortal;
