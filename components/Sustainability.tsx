
import React from 'react';
import { SectionId } from '../types';

const VisualPortal: React.FC = () => {
  return (
    <section id={SectionId.Editor} className="py-24 bg-aurae-secondary border-y border-aurae-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
             <div className="code-window aspect-video p-4 flex flex-col">
                <div className="h-10 border-b border-aurae-border flex items-center justify-between px-2 mb-4">
                  <div className="flex gap-4">
                    <span className="text-[10px] font-bold text-aurae-accent uppercase">Live View</span>
                    <span className="text-[10px] font-bold text-aurae-muted uppercase">Assets</span>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-aurae-accent/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-aurae-accent"></div>
                  </div>
                </div>
                <div className="flex-1 flex gap-4">
                  <div className="w-1/3 bg-aurae-primary/50 rounded-lg p-3 space-y-2">
                    <div className="h-2 w-full bg-white/5 rounded"></div>
                    <div className="h-2 w-2/3 bg-white/5 rounded"></div>
                    <div className="h-8 w-full bg-aurae-accent/10 rounded-md mt-6"></div>
                  </div>
                  <div className="flex-1 bg-aurae-primary/30 rounded-lg flex items-center justify-center border border-dashed border-aurae-border">
                    <div className="text-center">
                      <p className="text-4xl mb-3">👗</p>
                      <p className="text-[9px] font-mono text-aurae-muted">AR_TRYON_PREVIEW</p>
                    </div>
                  </div>
                </div>
             </div>
             
             {/* Info Card */}
             <div className="absolute -bottom-6 -right-6 p-6 bg-aurae-accent text-aurae-primary rounded-xl shadow-2xl">
                <p className="text-[10px] font-black uppercase tracking-wider mb-1 opacity-60">Sync Latency</p>
                <p className="text-2xl font-mono font-bold">24ms</p>
             </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-aurae-accent text-[10px] font-bold uppercase tracking-widest mb-4 block">Step 05: 可视化门户</span>
            <h2 className="text-3xl font-medium text-aurae-light mb-8 leading-tight">所见即所得的 <br/>编辑器门户界面</h2>
            <p className="text-lg text-aurae-muted font-light leading-relaxed mb-10">
              这是编译流程的关键交互层。moda AI Studio 提供了一个无缝的“编辑器+门户”环境，让您能够实时微调 AI 生成的内容与交互逻辑。
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-aurae-accent/10 border border-aurae-accent/20 flex items-center justify-center text-lg">🖱️</div>
                <div>
                  <h4 className="font-medium text-aurae-light text-sm mb-1">直观可视化</h4>
                  <p className="text-aurae-muted text-xs font-light">直接在画布上修改样式，编译器将同步重写底层代码逻辑。</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-aurae-accent/10 border border-aurae-accent/20 flex items-center justify-center text-lg">🚀</div>
                <div>
                  <h4 className="font-medium text-aurae-light text-sm mb-1">一键式部署</h4>
                  <p className="text-aurae-muted text-xs font-light">集成 Vercel API，满意后即刻全量推送到生产环境。</p>
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
