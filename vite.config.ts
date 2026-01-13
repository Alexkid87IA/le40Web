import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY),
    },
    optimizeDeps: {
      include: ['lucide-react'],
    },
    build: {
      target: 'es2015',
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'framer-motion': ['framer-motion'],
            'supabase': ['@supabase/supabase-js'],
            'icons': ['lucide-react'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      sourcemap: false,
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
    server: {
      open: true,
      port: 5173,
    },
  };
});
