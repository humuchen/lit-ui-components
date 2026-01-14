import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { createViteEntries } from './scripts/build-entries';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: createViteEntries(__dirname),
      formats: ['es'],
    },
    rollupOptions: {
      external: [/^lit($|\/)/, '@lit/context'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          if (/\.css$/.test(assetInfo.name)) {
            return 'styles/[name][extname]';
          }
          return '[name][extname]';
        },
      },
    },
    target: 'esnext',
    minify: false,
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
