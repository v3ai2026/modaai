
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-google-bg text-white py-24 border-t border-google-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <h3 className="font-black text-2xl tracking-tighter italic uppercase">moda AI Studio</h3>
            <p className="text-google-textMuted text-sm font-light leading-relaxed">
              基于 Google Studio 规范，构建私有化部署的下一代智能编译器。
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-google-accent font-black">平台能力</h4>
            <ul className="space-y-4 text-sm font-light text-google-textMuted">
              <li><a href="#" className="hover:text-google-success transition-colors">Neural Compiler</a></li>
              <li><a href="#" className="hover:text-google-success transition-colors">Veo 3.1 Lab</a></li>
              <li><a href="#" className="hover:text-google-success transition-colors">MCP Integration</a></li>
              <li><a href="#" className="hover:text-google-success transition-colors">Edge Services</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-google-accent font-black">基础设施</h4>
            <ul className="space-y-4 text-sm font-light text-google-textMuted">
              <li><a href="#" className="hover:text-google-success transition-colors">Private Nodes</a></li>
              <li><a href="#" className="hover:text-google-success transition-colors">Asset Vault</a></li>
              <li><a href="#" className="hover:text-google-success transition-colors">Admin Console</a></li>
              <li><a href="#" className="hover:text-google-success transition-colors">Logs Audit</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-google-accent font-black">连接状态</h4>
            <div className="flex gap-4">
              <button className="w-10 h-10 bg-google-surface border border-google-border rounded-full flex items-center justify-center hover:border-google-success transition-colors">𝕏</button>
              <button className="w-10 h-10 bg-google-surface border border-google-border rounded-full flex items-center justify-center hover:border-google-success transition-colors">GH</button>
            </div>
            <p className="text-[10px] text-google-success font-black uppercase tracking-widest">Status: Cluster Healthy</p>
          </div>
        </div>

        <div className="pt-10 border-t border-google-border flex flex-col md:flex-row justify-between items-center gap-6 text-google-textMuted text-[10px] uppercase tracking-[0.3em]">
          <p>© 2025 moda AI Studio. Powered by Google Gemini. Local Persistence Active.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">隐私协议</a>
            <a href="#" className="hover:text-white transition-colors">服务条款</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
