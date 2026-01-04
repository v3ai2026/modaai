
import React from 'react';
import { SectionId } from '../types';

const sectors = [
  {
    title: '人工智能市场应用',
    focus: '智能体验、效率',
    desc: '面向企业级市场的智能代理与效率工具。深度集成 Gemini API，重塑数据看板与自动化决策流程。',
    icon: '📊'
  },
  {
    title: '网站和 AR 电子商务',
    focus: '沉浸交互、转化率',
    desc: '下一代 3D 购物体验。核心集成 AR 换衣 (Virtual Try-on) 技术，将转化率提升至 3D 沉浸式维度。',
    icon: '🕶️'
  },
  {
    title: '图像和视频合成',
    focus: '自动创建、个性化',
    desc: '利用 Veo 与 Imagen 4 实现营销内容全自动化。从文本直接生成生产级 4K 视频与个性化海报。',
    icon: '🎞️'
  }
];

const Collection: React.FC = () => {
  return (
    <section id={SectionId.Sectors} className="py-24 bg-aurae-primary border-t border-aurae-border">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-16">
          <h2 className="text-3xl font-medium text-aurae-light mb-4">核心行业对齐</h2>
          <p className="text-aurae-muted text-lg max-w-2xl font-light">
            moda AI Studio 针对现代数字化转型最核心的三个版块进行深度适配与组件预编译。
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {sectors.map((sector, idx) => (
            <div key={idx} className="bg-aurae-secondary border border-aurae-border p-8 rounded-xl hover:border-aurae-accent transition-all duration-300 group">
              <div className="text-3xl mb-6">{sector.icon}</div>
              <div className="mb-2">
                <span className="text-[10px] font-bold text-aurae-accent uppercase tracking-widest bg-aurae-accent/10 px-2 py-0.5 rounded">
                  {sector.focus}
                </span>
              </div>
              <h3 className="text-xl font-medium text-aurae-light mb-4">{sector.title}</h3>
              <p className="text-aurae-muted text-sm font-light leading-relaxed">
                {sector.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
