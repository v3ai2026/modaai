
import React, { useEffect, useRef, useState } from 'react';
import { Motion, AnimatePresence } from '@/ui/animation';
import { Mic, MicOff } from '@/ui/icons';
import { connectLiveConsultant, decodeAudioData, decodeAudio, createPcmBlob } from '../services/geminiService';

export const VoiceConsultant: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [aiText, setAiText] = useState('');
  const [userText, setUserText] = useState('');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const toggleSession = async () => {
    if (isActive) {
      setIsActive(false);
      sessionRef.current?.close();
      streamRef.current?.getTracks().forEach(t => t.stop());
      setAiText('');
      setUserText('');
      return;
    }

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      
      const session = await connectLiveConsultant({
        onAudioData: async (base64) => {
          setIsSpeaking(true);
          const ctx = audioContextRef.current!;
          const audioData = decodeAudio(base64);
          const buffer = await decodeAudioData(audioData, ctx, 24000, 1);
          
          const source = ctx.createBufferSource();
          source.buffer = buffer;
          source.connect(ctx.destination);
          
          const startTime = Math.max(ctx.currentTime, nextStartTimeRef.current);
          source.start(startTime);
          nextStartTimeRef.current = startTime + buffer.duration;
          
          source.onended = () => {
            if (ctx.currentTime >= nextStartTimeRef.current - 0.1) setIsSpeaking(false);
          };
        },
        onOutputTranscription: (text) => {
          setAiText(prev => prev + text);
        },
        onInputTranscription: (text) => {
          setIsListening(true);
          setUserText(text);
        },
        onTurnComplete: () => {
          setIsListening(false);
          setUserText('');
        },
        onInterrupted: () => {
          nextStartTimeRef.current = 0;
          setIsSpeaking(false);
          setAiText('(Interrupted)');
        }
      });

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const source = inputCtx.createMediaStreamSource(stream);
      const processor = inputCtx.createScriptProcessor(4096, 1, 1);
      
      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        const pcmBlob = createPcmBlob(inputData);
        session.sendRealtimeInput({ media: pcmBlob });
      };
      
      source.connect(processor);
      processor.connect(inputCtx.destination);

      sessionRef.current = session;
      setIsActive(true);
      setAiText('System online. I am synced with your brand vault. How shall we begin?');
    } catch (e) {
      console.error("Voice Sync Failed", e);
    }
  };

  return (
    <div className="fixed bottom-12 right-12 z-[100] flex flex-col items-end gap-6">
      <AnimatePresence>
        {isActive && (
          <div className="flex flex-col items-end gap-4 max-w-lg">
            {/* AI Speech Bubble */}
            <Motion 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-google-accent/5 to-transparent pointer-events-none" />
              
              <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <Sparkles size={14} className="text-google-accent animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 italic">Neural_Consultant_v3</span>
                </div>
                <div className="flex items-center gap-2">
                   <Activity size={12} className={isSpeaking ? "text-google-success animate-bounce" : "text-white/10"} />
                   <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">{isSpeaking ? 'Voicing' : 'Standby'}</span>
                </div>
              </div>
              
              <p className="text-lg font-light italic leading-relaxed text-white/90 mb-6">
                {aiText || (isListening ? <span className="text-google-success/40 animate-pulse italic">Awaiting your design prompt...</span> : <span className="opacity-10 italic">Initialized...</span>)}
              </p>

              {/* Real-time Dynamic Waveform HUD */}
              <div className="h-6 flex items-center gap-1">
                {[...Array(24)].map((_, i) => (
                  <Motion 
                    key={i}
                    animate={{ 
                      height: isSpeaking ? [4, Math.random() * 20 + 4, 4] : isListening ? [2, Math.random() * 8 + 2, 2] : 2,
                      opacity: isSpeaking ? 1 : isListening ? 0.6 : 0.2
                    }}
                    transition={{ repeat: Infinity, duration: 0.3, delay: i * 0.02 }}
                    className={`w-1 rounded-full ${isSpeaking ? 'bg-google-accent shadow-[0_0_8px_#8ab4f8]' : isListening ? 'bg-google-success' : 'bg-white/10'}`}
                  />
                ))}
              </div>
            </Motion>

            {/* User Input Ghost Feedback */}
            {userText && (
              <Motion 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 backdrop-blur-xl px-8 py-3 rounded-full border border-white/10 shadow-2xl"
              >
                <p className="text-[11px] font-black text-google-success italic uppercase tracking-[0.3em]">User_Input: {userText}</p>
              </Motion>
            )}

            {/* Consultant Avatar */}
            <Motion 
              initial={{ scale: 0.8 }} animate={{ scale: 1 }}
              className="w-28 h-28 bg-black border border-white/10 rounded-[3.5rem] flex items-center justify-center relative overflow-hidden group shadow-2xl shadow-google-accent/5"
            >
              <div className={`absolute inset-0 transition-all duration-1000 ${isSpeaking ? 'bg-google-accent/10' : 'bg-transparent'}`} />
              <Motion 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute inset-2 border border-dashed border-white/10 rounded-full"
              />
              <div className="relative z-10 flex flex-col items-center">
                {isSpeaking ? (
                  <Waves size={36} className="text-google-accent animate-pulse" />
                ) : isListening ? (
                  <BrainCircuit size={36} className="text-google-success animate-spin-slow" />
                ) : (
                  <MessageCircle size={36} className="text-white/10 group-hover:text-white transition-colors" />
                )}
              </div>
            </Motion>
          </div>
        )}
      </AnimatePresence>

      <Motion
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleSession}
        className={`w-20 h-20 rounded-[2.5rem] flex flex-col items-center justify-center shadow-[0_25px_50px_rgba(0,0,0,0.8)] border transition-all duration-500 interactive group
          ${isActive ? 'bg-google-accent text-google-bg border-google-accent/40' : 'bg-white/5 text-white/40 border-white/10 hover:border-white/40'}
        `}
      >
        {isActive ? <Mic size={24} /> : <MicOff size={24} />}
        <span className="text-[7px] font-black uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {isActive ? 'Live' : 'Connect'}
        </span>
      </Motion>
    </div>
  );
};
