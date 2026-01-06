
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Plus, MessageCircle, Twitter, Linkedin, X, Zap } from 'lucide-react';

export const QuickActions = ({ onShareOpen }: { onShareOpen: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: <Twitter size={18} />, label: 'X_Relay', color: 'bg-white text-black', action: onShareOpen },
    { icon: <MessageCircle size={18} />, label: 'Discord', color: 'bg-[#5865F2] text-white', action: onShareOpen },
    { icon: <Linkedin size={18} />, label: 'Network', color: 'bg-[#0077B5] text-white', action: onShareOpen },
  ];

  return (
    <div className="fixed bottom-12 right-12 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-end gap-3 mb-2">
            {actions.map((act, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ delay: i * 0.1, ease: "backOut" }}
                onClick={() => { act.action(); setIsOpen(false); }}
                className={`flex items-center gap-4 px-6 py-3 rounded-2xl shadow-2xl border border-white/10 group ${act.color} interactive`}
              >
                <span className="text-[10px] font-black uppercase tracking-widest italic opacity-0 group-hover:opacity-100 transition-opacity">
                  {act.label}
                </span>
                {act.icon}
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: isOpen ? 90 : 0 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-[2rem] flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 transition-all duration-500 interactive
          ${isOpen ? 'bg-red-500 text-white' : 'bg-google-accent text-google-bg'}
        `}
      >
        {isOpen ? <X size={24} /> : <Share2 size={24} />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-google-success rounded-full animate-ping pointer-events-none" />
        )}
      </motion.button>
    </div>
  );
};
