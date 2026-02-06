import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig(({ mode }) => {
  return {
    define: { 'process.env.NODE_ENV': JSON.stringify(mode) },
    plugins: [react(), tsconfigPaths({ root: '.' }), cssInjectedByJsPlugin()],

    // ✅ lucide를 lucide-react로 강제 매핑 (Vite가 lucide 엔트리 해석 실패하는 문제 해결)
    resolve: {
      alias: {
        lucide: 'lucide-react',
      },
    },

    build: {
      lib: {
        entry: 'src/index.ts',
        name: '@pdfme/ui',
        fileName: (format) => `index.${format}.js`,
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'pdfjs-dist', 'antd'],
      exclude: ['@pdfme/common', '@pdfme/schemas', '@pdfme/converter'],
    },
  };
});
