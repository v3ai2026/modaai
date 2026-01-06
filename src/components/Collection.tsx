
import React from 'react';
import { SectionId } from '../types';
import { LayoutDashboard, Zap, ShoppingCart, Palette, Hexagon, Component } from '@/ui/icons';

const sectors = [
  {
    title: 'AI 首页广告与看板',
    focus: 'Market Intelligence',
    desc: '集成实时流量分析与广告收益预测。基于多维数据看板，精准把控数字资产每一分产出。',
    icon: <LayoutDashboard size={40} className="text-google-accent" />,
    tag: 'RT_ANALYTICS',
    video: 'https://cdn.coverr.co/videos/coverr-blue-abstract-waves-lines-5452/1080p.mp4',
    span: 'md:col-span-2'
  },
  {
    title: '迷失做站模板引擎',
    focus: 'Dynamic CMS',
    desc: '从自然语言直接编译为生产级 React 组件，内置海量 B2B/B2C 逻辑模板。',
    icon: <Zap size={40} className="text-google-success" />,
    tag: 'LOGIC_FORGE',
    video: 'https://cdn.coverr.co/videos/coverr-walking-in-a-futuristic-tunnel-4475/1080p.mp4',
    span: 'md:col-span-1'
  },
  {
    title: 'AI 市场与资产库',
    focus: 'Artifact Exchange',
    desc: '链接全球集成模型与本地私有化资产。一键调度 Gemini 核心权重。',
    icon: <ShoppingCart size={40} className="text-google-accent" />,
    tag: 'MODEL_VAULT',
    video: 'https://cdn.coverr.co/videos/coverr-liquid-purple-waves-5438/1080p.mp4',
    span: 'md:col-span-1'
  },
  {
    title: '内容创作中心',
    focus: 'Multimodal Synth',
    desc: '视频、画画、穿搭。集成 Veo 3.1 为时尚与电商提供全链路生产引擎。',
    icon: <Palette size={40} className="text-google-success" />,
    tag: 'VEO_ENGINE',
    video: 'https://cdn.coverr.co/videos/coverr-fashion-photoshoot-with-a-model-2580/1080p.mp4',
    span: 'md:col-span-2'
  }
];

const Collection: React.FC = () => {
  return (
    <section id={SectionId.Sectors} className="py-40 bg-[#050505] relative overflow-hidden">
      {/* Background Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:40px_40px] opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-google-accent/[0.03] blur-[200px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-12 relative z-10">
        <header className="mb-32 flex flex-col lg:flex-row items-end justify-between gap-12">
          <div className="max-w-2xl">
            <span className="text-google-accent text-[11px] font-black uppercase tracking-[0.5em] mb-6 block italic">Production Pillars</span>
            <h2 className="text-5xl md:text-7xl font-black italic text-white mb-8 tracking-tighter uppercase leading-tight">
              Everything you need.<br/>
              <span className="text-white/20">Nothing you don't.</span>
            </h2>
          </div>
          <p className="text-white/30 text-xl font-light leading-relaxed italic max-w-sm text-right">
            Modular architecture designed for scale. Activate features as you grow your digital brand.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sectors.map((sector, idx) => (
            <div key={idx} className={`group relative bg-[#0a0a0a] border border-white/10 rounded-[3rem] overflow-hidden hover:border-white/20 transition-all duration-1000 shadow-[0_50px_100px_rgba(0,0,0,0.6)] ${sector.span}`}>
              {/* Living 3D Background */}
              <div className="absolute inset-0 z-0">
                <video 
                  src={sector.video} 
                  autoPlay loop muted playsInline 
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-[2s] ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                {/* HUD Elements Overlay */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20">
                   <Hexagon size={16} className="text-white/20 animate-spin-slow" />
                </div>
              </div>

              <div className="relative z-20 p-12 h-full flex flex-col">
                <div className="mb-8 w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center group-hover:scale-110 transition-all duration-700">
                  {sector.icon}
                </div>
                
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] italic bg-white/5 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md group-hover:text-google-accent transition-colors">
                    {sector.tag}
                  </span>
                  <div className="h-[1px] flex-1 bg-white/5 group-hover:bg-google-accent/20 transition-colors" />
                </div>
                
                <h3 className="text-3xl font-black italic text-white mb-6 uppercase tracking-tighter group-hover:text-google-accent transition-colors">{sector.title}</h3>
                <p className="text-white/40 text-lg font-light leading-relaxed mb-10 group-hover:text-white/70 transition-colors italic">
                  {sector.desc}
                </p>

                <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-black text-white/20 uppercase tracking-[0.4em] italic">{sector.focus}</span>
                  <Component size={16} className="text-white/10 group-hover:text-google-accent transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scrolling Tech Marquee */}
      <div className="mt-40 py-12 border-y border-white/5 bg-black/50 overflow-hidden relative">
        <div className="flex gap-16 animate-marquee whitespace-nowrap text-white/10 font-black text-sm tracking-[0.6em] italic uppercase">
           <span>Neural Engine v3.0</span>
           <span>///</span>
           <span>Edge Deployment Active</span>
           <span>///</span>
           <span>Gemini 3 Pro Runtime</span>
           <span>///</span>
           <span>4K Synth Ready</span>
           <span>///</span>
           <span>Model Vault Encrypted</span>
           <span>///</span>
           <span>Real-time Rendering</span>
           <span>///</span>
           <span>Bento Architecture</span>
        </div>
      </div>
    </section>
  );
};

export default Collection;
