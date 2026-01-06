
import React, { useTransition, useState } from 'react';
import { RefreshCw, AlertCircle, ArrowRight } from '@/ui/icons';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onRetry?: () => Promise<void>;
  className?: string;
}

const ResilientEmptyState: React.FC<EmptyStateProps> = ({
  title = "当前无数据流",
  description = "暂时没有检测到可用的机会或上下文。但这通常只是暂时的网络波动。",
  onRetry,
  className = "",
}) => {
  const [isPending, startTransition] = useTransition();
  const [retryCount, setRetryCount] = useState(0);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    
    if (onRetry) {
      startTransition(async () => {
        await onRetry();
      });
    } else {
      startTransition(async () => {
        await new Promise(resolve => setTimeout(resolve, 1500));
      });
    }
  };

  return (
    <div 
      className={`
        flex flex-col items-center justify-center 
        p-12 min-h-[400px] w-full rounded-[3rem] 
        bg-google-surface border border-google-border/60 
        backdrop-blur-sm transition-all duration-300
        ${className}
      `}
      role="alert"
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-google-accent/10 rounded-full blur-xl group-hover:bg-google-accent/20 transition-all" />
        <div className="relative flex items-center justify-center w-20 h-20 bg-google-bg rounded-full shadow-sm border border-google-border">
          <AlertCircle className="w-10 h-10 text-google-textMuted group-hover:text-google-accent transition-colors" />
        </div>
      </div>

      <h3 className="mt-6 text-xl font-bold text-white tracking-tight uppercase italic">
        {title}
      </h3>
      <p className="mt-2 text-google-textMuted text-center max-w-sm leading-relaxed text-sm font-light">
        {description}
      </p>

      <div className="mt-8">
        <button
          onClick={handleRetry}
          disabled={isPending}
          className={`
            group flex items-center gap-3 px-8 py-3 
            bg-google-accent text-google-bg text-[10px] font-black uppercase tracking-widest rounded-2xl
            hover:scale-[1.02] focus:ring-4 focus:ring-google-accent/20
            disabled:opacity-70 disabled:cursor-not-allowed
            transition-all active:scale-95 shadow-xl
          `}
        >
          {isPending ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>正在重构上下文...</span>
            </>
          ) : (
            <>
              <span>运行重试 (PULSE_{retryCount})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </div>

      {retryCount > 2 && (
        <p className="mt-6 text-[9px] font-mono text-google-accent/80 bg-google-accent/5 px-4 py-2 rounded-full uppercase tracking-tighter">
          [System Info]: 持续尝试是解决 Runtime Error 的唯一途径。
        </p>
      )}
    </div>
  );
};

export default ResilientEmptyState;
