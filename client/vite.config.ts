import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@services': path.resolve(__dirname, 'src/services/api'),
      '@functions': path.resolve(__dirname, 'src/functions'),
      '@slice': path.resolve(__dirname, 'src/store/slices'),
      '@servicesOther': path.resolve(__dirname, 'src/services/others'),
      '@servicesSocket': path.resolve(__dirname, 'src/services/socket'),
      '@types_': path.resolve(__dirname, 'src/types'),
      '@data': path.resolve(__dirname, 'src/data'),
    }
  },
  assetsInclude: ["src/assets/*.mkv"],
});
