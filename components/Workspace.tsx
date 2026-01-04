
import React from 'react';
import { SectionId, Message } from '../types';

interface WorkspaceProps {
  activeStep: string;
  messages: Message[];
  isProcessing: boolean;
}

const Workspace: React.FC<WorkspaceProps> = ({ activeStep, messages, isProcessing }) => {
  
  const renderStepContent = () => {
    switch (activeStep) {
      case SectionId.Home:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-medium">项目初始化 (Step 01)</h3>
            <div className="bg-google-surface border border-google-border rounded-xl p-6 font-mono text-sm">
              <p className="text-google-accent mb-2">// 自动生成的项目结构</p>
              <ul className="space-y-1 text-google-textMuted">
                <li>📁 app/</li>
                <li className="pl-4">📁 (ecommerce)/</li>
                <li className="pl-8">📄 page.tsx</li>
                <li className="pl-8">📄 layout.tsx</li>
                <li>📁 components/</li>
                <li className="pl-4">📁 ar/</li>
                <li className="pl-8">📄 VirtualTryOn.tsx</li>
                <li>📄 next.config.js</li>
                <li>📄 tailwind.config.ts</li>
              </ul>
            </div>
          </div>
        );
      case SectionId.Model:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-medium">模型节点拓扑 (Step 02)</h3>
            <div className="grid grid-cols-3 gap-4">
              {['Gemini 3 Pro', 'Veo 3.1', 'Imagen 4'].map(m => (
                <div key={m} className="p-4 bg-google-surface border border-google-border rounded-lg text-center">
                  <div className="w-12 h-12 bg-google-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 text-google-accent">⚡</div>
                  <p className="text-xs font-bold">{m}</p>
                  <p className="text-[10px] text-google-success mt-1">HEALTHY</p>
                </div>
              ))}
            </div>
          </div>
        );
      case SectionId.Compiler:
        return (
          <div className="flex-1 flex flex-col space-y-6 overflow-hidden">
            <h3 className="text-xl font-medium">智能编译流 (Step 03)</h3>
            <div className="flex-1 overflow-y-auto studio-scroll space-y-6 pr-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] p-4 rounded-xl text-sm leading-relaxed ${
                    m.role === 'user' ? 'bg-google-accent text-google-bg font-medium' : 'bg-google-surfaceLight border border-google-border'
                  }`}>
                    {m.content.split('```').map((part, index) => (
                      index % 2 === 1 ? (
                        <pre key={index} className="bg-black/30 p-4 rounded-md my-2 overflow-x-auto text-xs text-google-success font-mono">
                          <code>{part}</code>
                        </pre>
                      ) : <p key={index} className="whitespace-pre-wrap">{part}</p>
                    ))}
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-google-surfaceLight p-4 rounded-xl border border-google-border animate-pulse flex gap-2">
                    <span className="text-xs text-google-accent">编译引擎正在思考...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case SectionId.Automation:
        return (
          <div className="space-y-8">
             <h3 className="text-xl font-medium">Vercel 自动化部署 (Step 04)</h3>
             <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-google-border"></div>
                <div className="space-y-10 relative">
                   {[
                     { label: 'Build Pipeline Triggered', status: 'COMPLETE' },
                     { label: 'Edge Function Optimization', status: 'IN_PROGRESS' },
                     { label: 'Global CDN Propagation', status: 'WAITING' }
                   ].map((step, i) => (
                     <div key={i} className="flex items-center gap-6 ml-1.5">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] z-10 ${
                          step.status === 'COMPLETE' ? 'bg-google-success' : step.status === 'IN_PROGRESS' ? 'bg-google-accent animate-spin' : 'bg-google-surface'
                        }`}>
                          {step.status === 'COMPLETE' ? '✓' : '◌'}
                        </div>
                        <span className={`text-sm ${step.status === 'WAITING' ? 'text-google-textMuted' : 'text-google-text'}`}>{step.label}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        );
      case SectionId.Editor:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-medium">可视化预览 (Step 05)</h3>
            <div className="aspect-video bg-google-surface border border-google-border rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="text-center space-y-4">
                    <div className="text-8xl animate-bounce">🧥</div>
                    <div className="px-4 py-2 bg-google-accent/20 border border-google-accent rounded-full">
                       <span className="text-xs font-bold text-google-accent uppercase tracking-widest">AR Try-on Engine Active</span>
                    </div>
                 </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-google-bg/80 backdrop-blur-md p-4 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                 <p className="text-[10px] text-google-textMuted uppercase mb-2">交互控制台</p>
                 <div className="flex gap-4">
                    <button className="flex-1 py-1 bg-google-surfaceLight border border-google-border text-[10px] rounded">切换颜色</button>
                    <button className="flex-1 py-1 bg-google-surfaceLight border border-google-border text-[10px] rounded">3D 旋转</button>
                 </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="text-google-textMuted italic">功能模块加载中...</div>;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto studio-scroll p-8">
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default Workspace;
