import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

export default defineConfig({
  envPrefix: 'PUBLIC_',
  base: './',
  plugins: [
    TanStackRouterVite({
      routesDirectory: 'src/scenes',
      generatedRouteTree: 'src/core/router/route-tree.ts',
      autoCodeSplitting: true,
    }),
    react({
      babel: {
        plugins: ['@emotion'],
      },
    }),
  ],
});
