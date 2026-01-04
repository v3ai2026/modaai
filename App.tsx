
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Workspace from './components/Workspace';
import RightPanel from './components/RightPanel';
import PromptBar from './components/PromptBar';
import { Message, SectionId, CompilerStatus } from './types';
import { getCompilerResponse } from './services/geminiService';

const App: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string>(SectionId.Compiler);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "moda AI 编译引擎已连接至 Google Brain。请描述您的应用愿景，我将引导您完成从初始化到部署的全流程。" }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<CompilerStatus>('READY');

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isProcessing) return;

    const newUserMsg: Message = { role: 'user', content };
    setMessages(prev => [...prev, newUserMsg]);
    setIsProcessing(true);
    setStatus('COMPILING');

    // 自动根据语境切换步骤（示例逻辑）
    if (content.includes('部署') || content.includes('上线')) setActiveStep(SectionId.Automation);
    if (content.includes('AR') || content.includes('换衣')) setActiveStep(SectionId.Editor);

    const aiResponse = await getCompilerResponse(messages, content);
    
    setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    setIsProcessing(false);
    setStatus('READY');
  };

  return (
    <div className="flex flex-col h-screen bg-google-bg text-google-text overflow-hidden">
      <Navbar status={status} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeStep={activeStep} onStepChange={setActiveStep} />

        <main className="flex-1 flex flex-col relative border-r border-google-border overflow-hidden">
          <Workspace 
            activeStep={activeStep} 
            messages={messages} 
            isProcessing={isProcessing}
          />
          
          <PromptBar onSend={handleSendMessage} isProcessing={isProcessing} />
        </main>

        <RightPanel status={status} />
      </div>
    </div>
  );
};

export default App;
