import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // prebundle frequently used heavy libs to speed up dependency resolution
    include: [
      "react",
      "react-dom",
      "axios",
      "lucide-react",
      "socket.io-client",
      "react-router-dom",
      "zustand",
      "react-hot-toast",
    ],
  },
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          filename: "dist/bundle-stats.html",
          title: "Bundle Visualizer",
          gzipSize: true,
          brotliSize: true,
        }),
      ],
    },
  },
});
