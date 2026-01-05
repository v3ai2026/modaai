import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { Mic, MicOff, Sparkles, Send, Terminal, Cpu } from 'lucide-react';
import { startTranscriptionSession, createPcmBlob } from '../services/geminiService';

interface SmartCompilerProps {
  messages: Message[];
  isProcessing: boolean;
  onSendMessage: (content: string) => void;
}

const SmartCompiler: React.FC<SmartCompilerProps> = ({ messages, isProcessing, onSendMessage }) => {
  const [input, setInput] = useState('');
  const [isDictating, setIsDictating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dictationSessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isProcessing]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopDictation();
    };
  }, []);

  const updateAudioLevel = () => {
    if (analyserRef.current) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      setAudioLevel(average / 128); // Normalize to 0-1 range roughly
    }
    animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
  };

  const startDictation = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextRef.current = audioContext;

      // Setup Visualizer
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      analyserRef.current = analyser;
      updateAudioLevel();

      const sessionPromise = startTranscriptionSession((text) => {
        if (text) {
          setInput(prev => {
            const trimmed = prev.trim();
            return trimmed + (trimmed ? ' ' : '') + text;
          });
        }
      });

      sessionPromise.then(session => {
        dictationSessionRef.current = session;
        const processor = audioContext.createScriptProcessor(4096, 1, 1);
        
        processor.onaudioprocess = (e) => {
          const inputData = e.inputBuffer.getChannelData(0);
          session.sendRealtimeInput({ media: createPcmBlob(inputData) });
        };

        source.connect(processor);
        processor.connect(audioContext.destination);
      });

      setIsDictating(true);
    } catch (error) {
      console.error("Dictation failed to start:", error);
      alert("Microphone access is required for dictation.");
    }
  };

  const stopDictation = () => {
    setIsDictating(false);
    setAudioLevel(0);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (dictationSessionRef.current) {
      dictationSessionRef.current.close?.();
      dictationSessionRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const toggleDictation = () => {
    if (isDictating) {
      stopDictation();
    } else {
      startDictation();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    if (isDictating) stopDictation();
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-google-bg overflow-hidden">
      {/* 顶部状态栏 */}
      <header className="p-8 border-b border-google-border flex justify-between items-center bg-black/40 backdrop-blur-xl z-10">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 bg-google-accent/10 border border-google-accent/20 rounded-2xl flex items-center justify-center text-google-accent shadow-lg shadow-google-accent/5">
            <Cpu size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white leading-none">Neural Compiler</h2>
            <div className="flex items-center gap-3 mt-2">
               <span className="w-1.5 h-1.5 rounded-full bg-google-success animate-pulse"></span>
               <p className="text-[10px] text-google-textMuted font-mono tracking-[0.3em] uppercase italic">System_Kernel: Active</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="px-5 py-2.5 bg-google-surface border border-google-border rounded-2xl text-[10px] font-black text-google-textMuted uppercase tracking-[0.2em] flex items-center gap-3">
             <Terminal size={14} />
             Session: {messages.length} Segments
          </div>
        </div>
      </header>

      {/* 消息历史区 */}
      <div className="flex-1 overflow-y-auto studio-scroll p-10 space-y-10" ref={scrollRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4 duration-500`}>
            <div className={`max-w-[75%] p-8 rounded-[2.5rem] shadow-2xl transition-all relative group ${
              msg.role === 'user' 
                ? 'bg-google-accent text-google-bg font-black italic rounded-tr-none' 
                : 'bg-google-surface border border-google-border text-white leading-relaxed rounded-tl-none'
            }`}>
              {msg.role === 'assistant' && (
                <div className="absolute -left-12 top-0 text-google-accent opacity-20 group-hover:opacity-100 transition-opacity">
                   <Sparkles size={24} />
                </div>
              )}
              <p className="whitespace-pre-wrap text-[16px] selection:bg-white/30">{msg.content}</p>
              <div className={`text-[9px] uppercase tracking-widest mt-4 font-mono opacity-40 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.role === 'user' ? 'TRANSMITTED_LOGIC' : 'NEURAL_OUTPUT'}
              </div>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-google-surface/40 border border-google-border px-10 py-6 rounded-full flex gap-6 items-center shadow-xl">
              <div className="flex gap-1.5">
                {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 bg-google-success rounded-full animate-bounce" style={{ animationDelay: `${i*0.2}s` }}></div>)}
              </div>
              <span className="text-[11px] font-mono text-google-success uppercase font-black tracking-[0.4em]">Compiling Intent Artifacts...</span>
            </div>
          </div>
        )}
      </div>

      {/* 输入控制区 */}
      <footer className="p-10 border-t border-google-border bg-gradient-to-t from-black/80 to-transparent backdrop-blur-md">
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto w-full">
          <div className={`relative flex items-center bg-google-surface/80 backdrop-blur-2xl border-2 rounded-[3.5rem] px-10 py-3 transition-all duration-500 shadow-2xl ${
            isDictating ? 'border-red-500/50 ring-4 ring-red-500/10' : 'border-google-border focus-within:border-google-accent focus-within:ring-4 focus-within:ring-google-accent/10'
          }`}>
            {/* 语音状态指示器 */}
            <div className="absolute left-10 flex items-center gap-1.5 pointer-events-none opacity-0 group-focus-within:opacity-100">
               {isDictating && [1, 2, 3, 4, 5].map(i => (
                 <div key={i} 
                    className="w-1 bg-red-500 rounded-full transition-all duration-100" 
                    style={{ height: `${8 + Math.random() * (20 * audioLevel)}px`, opacity: 0.4 + (audioLevel * 0.6) }}
                 ></div>
               ))}
            </div>

            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isProcessing}
              placeholder={isDictating ? "System is listening to your instructions..." : "描述应用逻辑 (例如: 构建一个带有 3D 转换效果的卡片组件)..."}
              className={`flex-1 bg-transparent py-6 text-lg focus:outline-none text-white font-medium placeholder:text-google-textMuted/40 transition-all ${isDictating ? 'pl-16 italic text-red-400' : 'pl-4'}`}
            />
            
            <div className="flex items-center gap-6">
              {/* 语音按钮 */}
              <button 
                type="button"
                onClick={toggleDictation}
                className={`p-5 rounded-full border-2 transition-all duration-500 relative group/mic ${
                  isDictating 
                    ? 'bg-red-500 border-red-400 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)] scale-110 rotate-12' 
                    : 'bg-google-bg border-google-border text-google-textMuted hover:border-google-accent hover:text-google-accent hover:shadow-[0_0_20px_rgba(138,180,248,0.1)] active:scale-90'
                }`}
                title={isDictating ? "Stop Dictation" : "Start Voice Dictation"}
              >
                {isDictating ? <MicOff size={28} /> : <Mic size={28} />}
                {isDictating && (
                  <span className="absolute -inset-2 rounded-full border border-red-500/30 animate-ping"></span>
                )}
              </button>

              {/* 提交按钮 */}
              <button 
                type="submit"
                disabled={!input.trim() || isProcessing}
                className={`flex items-center gap-4 px-12 py-5 bg-google-accent text-google-bg rounded-[2rem] font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl disabled:opacity-20 disabled:grayscale disabled:scale-100 group/send`}
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-3 border-google-bg border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Compile</span>
                    <Send size={18} className="group-hover/send:translate-x-1 group-hover/send:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* 辅助状态 */}
          <div className="flex justify-between items-center mt-6 px-10">
             <div className="flex gap-8">
                <span className="text-[10px] font-black text-google-textMuted uppercase tracking-widest flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${isDictating ? 'bg-red-500' : 'bg-google-success'}`}></span>
                  Voice Input: {isDictating ? 'SAMPLING_AUDIO' : 'READY'}
                </span>
                <span className="text-[10px] font-black text-google-textMuted uppercase tracking-widest opacity-40">
                  Secure Cluster Transit Active
                </span>
             </div>
             <p className="text-[10px] font-mono text-google-textMuted uppercase tracking-tighter italic">
               MODA_X_COMPILER_READY_V3.1
             </p>
          </div>
        </form>
      </footer>
    </div>
  );
};

export default SmartCompiler;
