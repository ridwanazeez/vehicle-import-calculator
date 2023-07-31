import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/vehicle-import-calculator/",
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        theme_color: "#00E6AC",
        background_color: "#00E6AC",
        display: "standalone",
        scope: "https://ridwanazeez.github.io/vehicle-import-calculator/",
        start_url: "https://ridwanazeez.github.io/vehicle-import-calculator/",
        name: "Vehicle Import Calculator",
        short_name: "Vehicle Import Calculator",
        icons: [
          {
            src: "/images/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/images/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/images/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
