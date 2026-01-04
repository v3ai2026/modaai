
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-aurae-primary text-white py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <h3 className="font-extrabold text-2xl tracking-tighter">moda AI Studio</h3>
            <p className="text-aurae-muted text-sm font-light leading-relaxed">
              赋能开发者，通过全球领先的智能编译器构建未来的 Web 应用。
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-widest text-aurae-accent font-bold">平台</h4>
            <ul className="space-y-4 text-sm font-light text-aurae-muted">
              <li><a href="#" className="hover:text-white transition-colors">技术文档</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API 参考</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Vercel 集成</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Edge 函数</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-widest text-aurae-accent font-bold">资源</h4>
            <ul className="space-y-4 text-sm font-light text-aurae-muted">
              <li><a href="#" className="hover:text-white transition-colors">更新日志</a></li>
              <li><a href="#" className="hover:text-white transition-colors">组件库</a></li>
              <li><a href="#" className="hover:text-white transition-colors">安全合规</a></li>
              <li><a href="#" className="hover:text-white transition-colors">开源计划</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-widest text-aurae-accent font-bold">联系我们</h4>
            <div className="flex gap-4">
              <button className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-aurae-accent transition-colors">𝕏</button>
              <button className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-aurae-accent transition-colors">GH</button>
            </div>
            <p className="text-[10px] text-aurae-muted uppercase tracking-widest">系统状态: 正常运行</p>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-aurae-muted text-[10px] uppercase tracking-[0.3em]">
          <p>© 2025 moda AI Studio. Powered by Google Gemini.</p>
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
