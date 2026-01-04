
import React from 'react';
import { SectionId } from '../types';

const steps = [
  { id: '01', title: '环境与项目初始化', detail: '自动化配置 Next.js 15 + Tailwind 架构，确保 100% 性能跑分。' },
  { id: '02', title: 'LLM API 节点选择', detail: '智能匹配任务最优节点 (Gemini 2.5/3 Pro)，实现逻辑精准表达。' },
  { id: '03', title: '提示到组件的生成', detail: '核心环节：将自然语言意图（如 AR 试衣）转码为生产级组件。' },
  { id: '04', title: 'Vercel Automation', detail: '深度集成 CI/CD，实现代码自动化推送与全球 Edge 网络部署。' },
  { id: '05', title: '编辑器与门户界面', detail: '为非技术人员提供可视化调整界面，实现所见即所得的 AI 协同。' },
  { id: '06', title: '优化与反馈循环', detail: '基于真实用户数据自动重构代码与 Prompt，系统持续自我进化。' }
];

const About: React.FC = () => {
  return (
    <section id={SectionId.Workflow} className="py-24 bg-aurae-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <h2 className="text-3xl font-medium text-aurae-light mb-6">六步实施计划</h2>
            <p className="text-aurae-muted text-lg font-light leading-relaxed mb-8">
              moda AI Studio 遵循严密的工程学逻辑。我们不只是在生成代码，我们是在为您构建一整套自动化的数字工厂。
            </p>
            <div className="p-6 bg-aurae-primary border border-aurae-border rounded-xl">
               <p className="text-xs text-aurae-muted font-mono mb-2 uppercase">Compiler Status</p>
               <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-aurae-success"></div>
                  <span className="text-sm font-bold text-aurae-success">Production Ready</span>
               </div>
            </div>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step) => (
              <div key={step.id} className="p-6 bg-aurae-primary border border-aurae-border rounded-xl hover:bg-white/5 transition-colors">
                <div className="text-aurae-accent font-mono text-sm mb-4">STEP_{step.id}</div>
                <h3 className="text-lg font-medium text-aurae-light mb-3">{step.title}</h3>
                <p className="text-aurae-muted text-sm font-light leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
