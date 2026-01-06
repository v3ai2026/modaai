import { defineConfig } from 'tsup';
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export default defineConfig({
  entry: {
    'index': 'src/index.ts',
    'icons/index': 'src/icons/index.ts',
    'animation/index': 'src/animation/index.ts',
    'components/index': 'src/components/index.ts',
    'hooks/index': 'src/hooks/index.ts',
    'utils/index': 'src/utils/index.ts'
  },
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
  onSuccess: async () => {
    // Copy CSS files to dist
    const copyCss = (src: string, dest: string) => {
      if (existsSync(src)) {
        copyFileSync(src, dest);
      }
    };

    // Create dist directory if it doesn't exist
    if (!existsSync('dist')) {
      mkdirSync('dist', { recursive: true });
    }

    // Copy animation CSS
    copyCss('src/animation/animations.css', 'dist/animation/animations.css');
    
    // Copy component CSS files
    const components = ['Button', 'Dialog'];
    components.forEach(component => {
      const src = `src/components/${component}/${component}.module.css`;
      const dest = `dist/components/${component}.module.css`;
      copyCss(src, dest);
    });

    // Create combined styles.css
    let allStyles = '';
    if (existsSync('src/animation/animations.css')) {
      allStyles += readFileSync('src/animation/animations.css', 'utf-8') + '\n';
    }
    components.forEach(component => {
      const src = `src/components/${component}/${component}.module.css`;
      if (existsSync(src)) {
        allStyles += readFileSync(src, 'utf-8') + '\n';
      }
    });
    writeFileSync('dist/styles.css', allStyles);
  }
});

