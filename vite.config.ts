import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
        ,
        // Build optimizations: increase warning limit and enable manual chunking
        build: {
          // increase the chunk size warning limit (kB) to reduce noisy warnings
          chunkSizeWarningLimit: 1024,
          rollupOptions: {
            output: {
              // Aggressive manualChunks to keep large node_modules split across logical vendor chunks
              manualChunks(id: string) {
                if (id.includes('node_modules')) {
                  if (id.includes('react')) return 'vendor-react';
                  if (id.includes('framer-motion')) return 'vendor-framer-motion';
                  if (id.includes('@google') || id.includes('genai')) return 'vendor-google-genai';
                  // fallback: group by top-level package name
                  const parts = id.split('node_modules/')[1]?.split('/');
                  if (parts && parts.length) return `vendor-${parts[0]}`;
                  return 'vendor';
                }
              }
            }
          }
        }
    };
});
