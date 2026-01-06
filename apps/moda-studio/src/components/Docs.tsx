
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Book, Code, Terminal, ChevronRight, Copy, 
  Check, Hash, FileJson, Zap, Search 
} from 'lucide-react';

const DOC_SECTIONS = [
  {
    category: "GETTING STARTED",
    items: [
      { id: 'intro', title: 'Introduction' },
      { id: 'auth', title: 'Authentication' },
      { id: 'rate', title: 'Rate Limits' }
    ]
  },
  {
    category: "CORE RESOURCES",
    items: [
      { id: 'gen', title: 'Generation API' },
      { id: 'tex', title: 'Texture Engine' },
      { id: 'avatar', title: '3D Avatar' }
    ]
  },
  {
    category: "SDK REFERENCES",
    items: [
      { id: 'react', title: 'React Hooks' },
      { id: 'node', title: 'Node.js Client' }
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
    <div className="my-8 rounded-[2rem] overflow-hidden border border-white/5 bg-black/60 shadow-2xl group transition-all hover:border-google-accent/20">
      <div className="flex justify-between items-center px-8 py-4 bg-white/[0.03] border-b border-white/5">
        <span className="text-[10px] font-black font-mono text-white/30 uppercase tracking-[0.2em] italic">{lang}_BUFFER</span>
        <button 
          onClick={handleCopy}
          className="text-white/20 hover:text-white transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
        >
          {copied ? <Check size={14} className="text-google-success"/> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="p-8 overflow-x-auto studio-scroll no-scrollbar">
        <pre className="font-mono text-sm leading-relaxed text-white/70">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export const Docs: React.FC = () => {
  const [activeId, setActiveId] = useState('gen');

  return (
    <div className="flex h-full bg-[#050505] text-white font-sans overflow-hidden">
      {/* Left Sidebar: The Index */}
      <aside className="w-80 border-r border-white/5 bg-black/40 backdrop-blur-3xl h-full flex flex-col shrink-0">
        <div className="p-10 sticky top-0 bg-transparent z-10">
          <div className="flex items-center gap-4 font-black italic text-2xl tracking-tighter mb-10 uppercase">
            <Book className="text-google-accent" size={24} /> MODA.PROTOCOLS
          </div>
          <div className="relative mb-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10" size={16} />
            <input 
              type="text" 
              placeholder="Query Kernel..." 
              className="w-full bg-black border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-[10px] text-white font-mono uppercase tracking-widest focus:border-google-accent/40 outline-none transition-all placeholder:text-white/10"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto studio-scroll no-scrollbar px-10 pb-20">
          {DOC_SECTIONS.map((section, idx) => (
            <div key={idx} className="mb-10">
              <h4 className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em] mb-6 italic">
                {section.category}
              </h4>
              <ul className="space-y-2">
                {section.items.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveId(item.id)}
                      className={`w-full text-left px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-between group italic
                        ${activeId === item.id 
                          ? 'bg-google-accent/5 text-google-accent border border-google-accent/10 shadow-[0_0_20px_rgba(138,180,248,0.05)]' 
                          : 'text-white/30 hover:text-white hover:bg-white/5'}
                      `}
                    >
                      {item.title}
                      {activeId === item.id && <ChevronRight size={14} className="text-google-accent" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content Area: The Blueprint */}
      <main className="flex-1 h-full overflow-y-auto studio-scroll no-scrollbar relative bg-[#050505] p-12 md:p-24">
        {/* Infinite Grid Background Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none opacity-40" />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-3 text-[9px] font-mono font-black text-white/20 mb-10 uppercase tracking-[0.4em] italic">
            <span>MODA_OS</span>
            <ChevronRight size={10} />
            <span>CORE_PROTOCOLS</span>
            <ChevronRight size={10} />
            <span className="text-google-accent">GENERATION_API</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-10 text-white uppercase leading-none">Generation API</h1>
          <p className="text-2xl text-white/40 font-light italic leading-relaxed mb-20 border-l-4 border-google-accent/20 pl-10 transition-colors hover:border-google-accent/40">
            Programmatically generate high-fidelity fashion assets using our neural synthesis engines. 
            Supports distributed rendering and 4K output pipelines.
          </p>

          {/* Section: Endpoint */}
          <section className="mb-24">
            <h2 className="text-[12px] font-black italic text-white/60 uppercase tracking-[0.5em] mb-10 flex items-center gap-4">
              <Zap size={20} className="text-google-success" /> Protocol_Endpoint
            </h2>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-black/60 border border-white/5 p-8 rounded-[2rem] font-mono text-sm shadow-inner group hover:border-google-accent/20 transition-all">
              <span className="bg-google-accent/10 text-google-accent px-4 py-2 rounded-full text-[10px] font-black uppercase italic tracking-widest border border-google-accent/20">POST</span>
              <span className="text-white/40 group-hover:text-white/70 transition-colors">https://api.moda.ai/v1/generations</span>
            </div>
          </section>

          {/* Section: Request Example */}
          <section className="mb-24">
            <h2 className="text-[12px] font-black italic text-white/60 uppercase tracking-[0.5em] mb-10 flex items-center gap-4">
              <Terminal size={20} className="text-google-accent" /> Kernel_Request_Structure
            </h2>
            <p className="text-white/30 text-sm italic mb-8 leading-relaxed">
              Send an encrypted JSON payload with your neural prompt and sampling parameters. 
              The <code className="bg-white/5 px-2 py-0.5 rounded text-google-accent font-mono italic">blueprint_id</code> determines the aesthetic architecture.
            </p>
            
            <CodeBlock lang="CURL_CMD" code={`curl https://api.moda.ai/v1/generations \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "prompt": "Cyberpunk digital couture, neon luminescence, 4k render",
    "blueprint_id": "moda-v3-synth",
    "aspect_ratio": "16:9",
    "samples": 1
  }'`} />
          </section>

          {/* Section: Response Example */}
          <section className="mb-24">
            <h2 className="text-[12px] font-black italic text-white/60 uppercase tracking-[0.5em] mb-10 flex items-center gap-4">
              <FileJson size={20} className="text-google-success" /> Response_Artifact
            </h2>
            <CodeBlock lang="JSON_STUB" code={`{
  "id": "gen_88329102",
  "created_at": "2024-05-12T10:42:01Z",
  "artifacts": [
    {
      "uri": "https://cdn.moda.ai/vault/render_001.png",
      "entropy_seed": 482910
    }
  ],
  "telemetry": {
    "compute_units": 2.4,
    "synth_time": "0.8s"
  }
}`} />
          </section>

          {/* Section: Parameters Table */}
          <section className="mb-32">
            <h2 className="text-[12px] font-black italic text-white/60 uppercase tracking-[0.5em] mb-10 flex items-center gap-4">
              <Hash size={20} className="text-white/20" /> Schema_Definition
            </h2>
            <div className="border border-white/5 bg-black/40 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <table className="w-full text-left text-[11px] border-collapse">
                <thead className="bg-white/[0.03] text-white/20 font-mono italic uppercase tracking-widest border-b border-white/5">
                  <tr>
                    <th className="px-8 py-6">Property</th>
                    <th className="px-8 py-6">Type</th>
                    <th className="px-8 py-6">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { name: 'prompt', type: 'String', desc: 'The neural linguistic input for synthesis.' },
                    { name: 'blueprint_id', type: 'String', desc: 'The specific architecture model to deploy.' },
                    { name: 'negative_constraints', type: 'Array', desc: 'Forbidden artifacts in generation.' },
                    { name: 'entropy_seed', type: 'Integer', desc: 'Deterministic seed for replication.' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-6 font-mono text-google-accent font-black italic uppercase">{row.name}</td>
                      <td className="px-8 py-6 font-mono text-white/20">{row.type}</td>
                      <td className="px-8 py-6 text-white/40 italic group-hover:text-white/60 transition-colors">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Next/Prev Navigation */}
          <div className="flex justify-between items-center py-20 border-t border-white/5">
            <button className="text-[10px] font-black text-white/20 hover:text-white uppercase tracking-[0.5em] transition-all italic flex items-center gap-4 group">
               <ChevronRight size={14} className="rotate-180 text-white/10 group-hover:text-google-accent" /> Authentication
            </button>
            <button className="px-10 py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-[0.5em] hover:bg-google-accent transition-all italic flex items-center gap-4 group active:scale-95 shadow-xl">
               Next: Texture Engine <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
