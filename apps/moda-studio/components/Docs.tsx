
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Book, Code, Terminal, ChevronRight, Copy, 
  Check, Hash, FileJson, Zap, Search, Laptop, Cpu, Settings,
  ShieldCheck, Globe, Database, Cpu as CpuIcon, Layers, Share2, Rocket, Download
} from 'lucide-react';

const DOC_SECTIONS = [
  {
    category: "ARCHITECTURE",
    items: [
      { id: 'sys-arch', title: 'System Architecture' },
      { id: 'sovereignty', title: 'Data Sovereignty' },
      { id: 'local-setup', title: 'Local Deployment' }
    ]
  },
  {
    category: "CORE RESOURCES",
    items: [
      { id: 'gen', title: 'Generation API' },
      { id: 'tex', title: 'Texture Engine' }
    ]
  }
];

const CodeBlock = ({ lang, code }: { lang: string, code: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="my-8 rounded-[2rem] overflow-hidden border border-white/5 bg-black/60 shadow-2xl group transition-all hover:border-luxury-gold/20">
      <div className="flex justify-between items-center px-8 py-4 bg-white/[0.03] border-b border-white/5">
        <span className="text-[10px] font-black font-mono text-white/30 uppercase tracking-[0.2em] italic">{lang}_BUFFER</span>
        <button onClick={handleCopy} className="text-white/20 hover:text-luxury-gold transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
          {copied ? <Check size={14} className="text-google-success"/> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="p-8 overflow-x-auto studio-scroll no-scrollbar text-white/70 font-mono text-sm leading-relaxed">
        <code className="whitespace-pre">{code}</code>
      </div>
    </div>
  );
};

export const Docs: React.FC = () => {
  const [activeId, setActiveId] = useState('sys-arch');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return DOC_SECTIONS;
    const query = searchQuery.toLowerCase();
    return DOC_SECTIONS.map(section => {
      const categoryMatches = section.category.toLowerCase().includes(query);
      const matchedItems = section.items.filter(item => item.title.toLowerCase().includes(query));
      if (categoryMatches || matchedItems.length > 0) return { ...section, items: categoryMatches ? section.items : matchedItems };
      return null;
    }).filter(Boolean) as typeof DOC_SECTIONS;
  }, [searchQuery]);

  return (
    <div className="flex h-full bg-luxury-obsidian text-white font-sans overflow-hidden">
      <aside className="w-80 border-r border-white/5 bg-black/40 backdrop-blur-3xl h-full flex flex-col shrink-0">
        <div className="p-10 sticky top-0 bg-transparent z-10">
          <div className="flex items-center gap-4 font-black italic text-2xl tracking-tighter mb-10 uppercase text-luxury-gold">
            <Book size={24} /> MODA_DOCS
          </div>
          <div className="relative mb-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
            <input 
              type="text" 
              placeholder="Query Protocol..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-[10px] text-white font-mono uppercase tracking-widest focus:border-luxury-gold/40 outline-none transition-all placeholder:text-white/10"
            />
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto studio-scroll no-scrollbar px-10 pb-20">
          {filteredSections.map((section, idx) => (
            <div key={idx} className="mb-10">
              <h4 className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em] mb-6 italic">{section.category}</h4>
              <ul className="space-y-2">
                {section.items.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveId(item.id)}
                      className={`w-full text-left px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-between group italic
                        ${activeId === item.id ? 'bg-luxury-gold/5 text-luxury-gold border border-luxury-gold/10' : 'text-white/30 hover:text-white hover:bg-white/5'}
                      `}
                    >
                      {item.title}
                      {activeId === item.id && <ChevronRight size={14} />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 h-full overflow-y-auto studio-scroll no-scrollbar relative p-12 md:p-24">
        <div className="absolute inset-0 singularity-grid opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <AnimatePresence mode="wait">
            {activeId === 'sys-arch' && (
              <motion.div key="sys" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex items-center gap-3 text-[9px] font-mono font-black text-luxury-gold/40 mb-10 uppercase tracking-[0.4em] italic">
                  <span>ARCHITECTURE</span> <ChevronRight size={10} /> <span className="text-luxury-gold">SYSTEM_MODALITY</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-10 text-white uppercase leading-none">核心架构</h1>
                <p className="text-2xl text-white/40 font-light italic leading-relaxed mb-16 border-l-4 border-luxury-gold/20 pl-10">
                  Moda OS 并非封闭的孤岛。它的“骨架”基于全球最通用的 <b>React + Tailwind</b> 技术栈。这意味着，你在这里生成的任何代码，都可以完美运行在 VS Code 或任何现代浏览器环境中。
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="p-10 bg-white/[0.02] border border-luxury-gold/20 rounded-[3rem] shadow-2xl group">
                    <div className="flex items-center gap-4 text-luxury-gold mb-8">
                      <Globe size={24} /> <h3 className="text-xl font-black italic uppercase tracking-widest">API (云端智能)</h3>
                    </div>
                    <p className="text-xs text-white/40 italic leading-relaxed mb-8">这些能力依赖 Google 提供的计算集群，没有它们，系统将失去“思考”能力。</p>
                    <ul className="space-y-4">
                      {['Gemini 3 Pro (逻辑核心)', 'Veo 3.1 (视频生成)', 'Imagen (图像合成)'].map((t, i) => (
                        <li key={i} className="flex items-center gap-3 text-[11px] font-black italic uppercase text-white/60">
                          <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" /> {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-10 bg-white/[0.02] border border-white/10 rounded-[3rem] shadow-2xl group">
                    <div className="flex items-center gap-4 text-white/40 mb-8">
                      <CpuIcon size={24} /> <h3 className="text-xl font-black italic uppercase tracking-widest">Native (本地逻辑)</h3>
                    </div>
                    <p className="text-xs text-white/40 italic leading-relaxed mb-8">这些代码是你的“私产”。即使断开 API，它们依然可以作为前端组件独立运行。</p>
                    <ul className="space-y-4">
                      {['React 19 Hooks', 'Framer Motion 动画', 'Tailwind CSS 3.0'].map((t, i) => (
                        <li key={i} className="flex items-center gap-3 text-[11px] font-black italic uppercase text-white/60">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/20" /> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeId === 'sovereignty' && (
              <motion.div key="sov" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex items-center gap-3 text-[9px] font-mono font-black text-luxury-gold/40 mb-10 uppercase tracking-[0.4em] italic">
                  <span>ARCHITECTURE</span> <ChevronRight size={10} /> <span className="text-luxury-gold">SOVEREIGNTY</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-10 text-white uppercase leading-none">代码主权</h1>
                <div className="space-y-12">
                   <div className="p-10 bg-luxury-gold/5 border border-luxury-gold/20 rounded-[3rem]">
                      <h3 className="text-2xl font-black italic text-white uppercase mb-6 flex items-center gap-4">
                         <ShieldCheck className="text-luxury-gold" /> 离开这里，你依然拥有它
                      </h3>
                      <p className="text-lg text-white/60 font-light italic leading-relaxed">
                         在 Moda OS 中生成的代码通过 <b>Standard Export</b> 协议导出。你可以直接将生成的组件复制到你的本地项目中，配合 <code>npm install</code> 安装相应的依赖，它们就能在你的生产环境中立即上线。
                      </p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {[
                        { icon: <Download />, t: "一键离线", d: "所有聊天与配置均保存在 LocalStorage，无需服务器。" },
                        { icon: <Code />, t: "标准语法", d: "使用业界标准的 ES6 模块和 TSX 语法。" },
                        { icon: <Share2 />, t: "开放生态", d: "支持 Vercel / Netlify 一键部署。" }
                      ].map((item, i) => (
                        <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl text-center">
                           <div className="w-12 h-12 mx-auto mb-6 text-luxury-gold">{item.icon}</div>
                           <h4 className="text-[11px] font-black uppercase italic mb-4">{item.t}</h4>
                           <p className="text-[10px] text-white/30 leading-relaxed uppercase italic">{item.d}</p>
                        </div>
                      ))}
                   </div>
                </div>
              </motion.div>
            )}

            {activeId === 'local-setup' && (
              <motion.div key="local" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="flex items-center gap-3 text-[9px] font-mono font-black text-luxury-gold/40 mb-10 uppercase tracking-[0.4em] italic">
                  <span>DEPLOYMENT</span> <ChevronRight size={10} /> <span className="text-luxury-gold">STEP_BY_STEP</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-10 text-white uppercase leading-none">本地化部署</h1>
                
                <div className="space-y-12">
                   <div className="flex gap-10">
                      <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shrink-0 text-luxury-gold font-mono font-black italic">01</div>
                      <div className="flex-1">
                         <h3 className="text-xl font-black italic text-white uppercase mb-4">克隆环境与项目初始化</h3>
                         <p className="text-sm text-white/40 italic mb-4 leading-relaxed">在终端中进入项目根目录：</p>
                         <CodeBlock lang="BASH" code={`git clone https://github.com/your-repo/moda-os.git\ncd moda-os`} />
                      </div>
                   </div>

                   <div className="flex gap-10">
                      <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shrink-0 text-luxury-gold font-mono font-black italic">02</div>
                      <div className="flex-1">
                         <h3 className="text-xl font-black italic text-white uppercase mb-4">安装核心依赖</h3>
                         <p className="text-sm text-white/40 italic mb-4 leading-relaxed">安装 React 19 和 Google GenAI SDK 等必要依赖：</p>
                         <CodeBlock lang="TERMINAL" code={`npm install`} />
                      </div>
                   </div>

                   <div className="flex gap-10">
                      <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shrink-0 text-luxury-gold font-mono font-black italic">03</div>
                      <div className="flex-1">
                         <h3 className="text-xl font-black italic text-white uppercase mb-4">激活 AI 大脑 (API Key)</h3>
                         <p className="text-sm text-white/40 italic mb-4 leading-relaxed">在根目录创建 <code>.env</code> 文件并填入你的 Google API Key。</p>
                         <CodeBlock lang="ENV" code={`API_KEY=your_gemini_api_key_here`} />
                      </div>
                   </div>

                   <div className="flex gap-10">
                      <div className="w-12 h-12 bg-google-success/10 border border-google-success/20 rounded-2xl flex items-center justify-center shrink-0 text-google-success font-mono font-black italic">04</div>
                      <div className="flex-1">
                         <h3 className="text-xl font-black italic text-white uppercase mb-4">启动本地编译器</h3>
                         <p className="text-sm text-white/40 italic mb-4 leading-relaxed">运行开发服务器，开启你的本地 Moda OS 工作站：</p>
                         <CodeBlock lang="TERMINAL" code={`npm run dev`} />
                      </div>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
