import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Code splitting configuration
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'supabase-vendor': ['@supabase/supabase-js'],
          'animation-vendor': ['framer-motion'],
          'ui-vendor': ['lucide-react'],

          // Page chunks grouped by functionality
          'pages-marketing': [
            './src/pages/Home.new.tsx',
            './src/pages/Offres.tsx',
            './src/pages/ServicesPlus.tsx',
          ],
          'pages-services': [
            './src/pages/Coworking.tsx',
            './src/pages/Domiciliation.tsx',
            './src/pages/Salles.tsx',
            './src/pages/Studios/Studios.tsx',
          ],
          'pages-community': [
            './src/pages/Community.tsx',
            './src/pages/Events.tsx',
            './src/pages/Experts.tsx',
          ],
          'pages-content': [
            './src/pages/Blog.tsx',
            './src/pages/BlogPost.tsx',
          ],
        },
        // Optimize chunk size
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Optimize build settings
    minify: 'esbuild',
    cssMinify: true,
    cssCodeSplit: true,
    sourcemap: false, // Disable in production for smaller build
    chunkSizeWarningLimit: 600, // Increase from 500KB to 600KB
    reportCompressedSize: true,
    // Enable gzip compression reporting
    assetsInlineLimit: 4096, // Inline assets < 4KB
  },
  // Performance hints
  esbuild: {
    drop: ['console', 'debugger'], // Remove console.* in production (except logger)
  },
});
