
import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // 初始化检查
    const isLight = document.documentElement.classList.contains('light');
    setIsDark(!isLight);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.add('light');
      setIsDark(false);
    } else {
      document.documentElement.classList.remove('light');
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 hover:border-luxury-gold transition-all duration-500 interactive group overflow-hidden"
      aria-label="Toggle Theme"
    >
      <div className="absolute inset-0 bg-luxury-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : 180,
          scale: isDark ? 1 : 0.8,
          opacity: isDark ? 1 : 0
        }}
        className="absolute flex items-center justify-center text-luxury-gold"
      >
        <Moon size={24} />
      </motion.div>

      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? -180 : 0,
          scale: isDark ? 0.8 : 1,
          opacity: isDark ? 0 : 1
        }}
        className="absolute flex items-center justify-center text-luxury-gold"
      >
        <Sun size={24} />
      </motion.div>
    </button>
  );
};
