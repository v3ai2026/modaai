import React, { useState } from 'react';
import { 
  Sparkles, 
  Database, 
  Code, 
  Settings,
  Play,
  Heart,
  Star,
  Zap
} from '@v3ai/ui-react/icons';
import { Motion } from '@v3ai/ui-react/animation';
import { Button, Dialog } from '@v3ai/ui-react/components';
import { useToggle, useLocalStorage } from '@v3ai/ui-react/hooks';

function App() {
  const [dialogOpen, toggleDialog] = useToggle(false);
  const [count, setCount] = useLocalStorage('demo-count', 0);

  return (
    <div style={{ 
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <Motion
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 500 }}
      >
        <h1 style={{ 
          fontSize: '3rem', 
          marginBottom: '0.5rem',
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          <Sparkles size={48} style={{ marginRight: '1rem', verticalAlign: 'middle' }} />
          V3 AI UI React Demo
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '2rem' }}>
          零外部依赖的通用 UI 组件库
        </p>
      </Motion>

      <Motion
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 500, delay: 200 }}
      >
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Icons</h2>
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            flexWrap: 'wrap',
            padding: '1.5rem',
            background: '#f9fafb',
            borderRadius: '0.5rem'
          }}>
            <Sparkles size={32} color="#3b82f6" />
            <Database size={32} color="#8b5cf6" />
            <Code size={32} color="#10b981" />
            <Settings size={32} color="#f59e0b" />
            <Play size={32} color="#ef4444" />
            <Heart size={32} color="#ec4899" />
            <Star size={32} color="#f59e0b" />
            <Zap size={32} color="#3b82f6" />
          </div>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Buttons</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="primary" onClick={() => setCount(count + 1)}>
              <Sparkles size={20} />
              Primary ({count})
            </Button>
            <Button variant="secondary">
              <Heart size={20} />
              Secondary
            </Button>
            <Button variant="outline">
              <Star size={20} />
              Outline
            </Button>
            <Button variant="ghost">
              <Settings size={20} />
              Ghost
            </Button>
          </div>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Button Sizes</h2>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Dialog</h2>
          <Button onClick={toggleDialog}>
            Open Dialog
          </Button>

          <Dialog
            open={dialogOpen}
            onClose={toggleDialog}
            title="Welcome to V3 AI UI"
            size="md"
            footer={
              <>
                <Button variant="outline" onClick={toggleDialog}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={toggleDialog}>
                  <Sparkles size={20} />
                  Confirm
                </Button>
              </>
            }
          >
            <p style={{ lineHeight: 1.6, color: '#374151' }}>
              This is a demo of the V3 AI UI component library. It features:
            </p>
            <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: 1.8 }}>
              <li>🎯 Zero external dependencies</li>
              <li>🎨 40+ beautiful SVG icons</li>
              <li>🎬 Powerful animation system</li>
              <li>🧩 Practical UI components</li>
              <li>🔧 Useful React hooks</li>
            </ul>
          </Dialog>
        </div>

        <div style={{ 
          marginTop: '4rem', 
          padding: '2rem', 
          background: '#f9fafb', 
          borderRadius: '0.5rem',
          textAlign: 'center'
        }}>
          <p style={{ color: '#6b7280' }}>
            Made with <Heart size={16} style={{ verticalAlign: 'middle', color: '#ef4444' }} /> by V3 AI Team
          </p>
        </div>
      </Motion>
    </div>
  );
}

export default App;
