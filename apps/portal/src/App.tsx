import React from 'react';
import { Sparkles, ShoppingCart, Rocket, Brain, Grid } from '@v3ai/ui-react/icons';
import { Motion } from '@v3ai/ui-react/animation';

interface AppCard {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  url: string;
  color: string;
}

const apps: AppCard[] = [
  {
    id: 'moda',
    name: 'Moda Studio',
    description: '智能编译器 - AI 驱动的代码生成',
    icon: Sparkles,
    url: 'http://localhost:3000',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'commerce',
    name: 'Vision Commerce',
    description: '电商平台 - 3D 产品展示与 AR',
    icon: ShoppingCart,
    url: 'http://localhost:3001',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'deploy',
    name: 'Deploy Hub',
    description: '部署平台 - 一键部署与管理',
    icon: Rocket,
    url: 'http://localhost:3002',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'intelligence',
    name: 'Intelligence Hub',
    description: 'AI 智能中心 - 多模态内容生成',
    icon: Brain,
    url: 'http://localhost:3003',
    color: 'from-orange-500 to-red-500'
  }
];

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Grid className="w-8 h-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">V3 AI Platform</h1>
            </div>
            <nav className="flex gap-4">
              <button className="px-4 py-2 text-white/70 hover:text-white transition">
                文档
              </button>
              <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
                登录
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-6 py-20 text-center">
        <Motion
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-6xl font-bold text-white mb-6">
            统一 AI 平台
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            四大核心应用，一个平台管理。从智能编译到电商平台，从部署管理到 AI 内容生成。
          </p>
        </Motion>
      </section>

      {/* App Grid */}
      <section className="container mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {apps.map((app, index) => {
            const Icon = app.icon;
            return (
              <Motion
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <a 
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="group relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer rounded-lg p-6">
                    <div className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-0 group-hover:opacity-20 transition-opacity`} />
                    
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${app.color} flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2">
                        {app.name}
                      </h3>
                      
                      <p className="text-white/60 text-sm">
                        {app.description}
                      </p>
                      
                      <div className="mt-4 flex items-center text-purple-400 text-sm font-medium">
                        启动应用 →
                      </div>
                    </div>
                  </div>
                </a>
              </Motion>
            );
          })}
        </div>
      </section>
    </div>
  );
}
