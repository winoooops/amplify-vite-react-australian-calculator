import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true
    }),
    tailwindcss(),
    react()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate AWS Amplify (largest chunk - 623KB!)
          'aws-amplify': ['aws-amplify', '@aws-amplify/ui-react'],
          // Vendor libraries (React core)
          'vendor': ['react', 'react-dom'],
          // Router (74KB)
          'router': ['@tanstack/react-router', '@tanstack/react-router-devtools'],
          // UI components (icons, toast)
          'ui': ['lucide-react', 'react-toastify'],
          // Tax calculation logic
          'tax-calc': [
            './src/components/TaxCalculator/index.tsx',
            './src/components/TaxCalculator/TaxRateTable/index.tsx',
            './src/components/TaxCalculator/TaxResults/index.tsx'
          ],
          // Tax configuration logic
          'tax-config': [
            './src/components/TaxConfiguration/index.tsx',
            './src/shared/contexts/taxConfigsContext.tsx'
          ]
        }
      }
    },
    // Increase chunk size warning limit to avoid noise
    chunkSizeWarningLimit: 700,
  }
});
