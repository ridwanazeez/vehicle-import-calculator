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
      // Generate service worker in dev mode
      // devOptions: {
      //   enabled: true,
      // },
      registerType: "autoUpdate",
      manifest: {
        theme_color: "#00E6AC",
        background_color: "#00E6AC",
        display: "standalone",
        scope: "https://ridwanazeez.github.io/vehicle-import-calculator/",
        start_url: "https://ridwanazeez.github.io/vehicle-import-calculator/",
        name: "Vehicle Import Taxes Calculator",
        short_name: "Vehicle Import Taxes Calculator",
        icons: [
          {
            src: "/images/vehicle-import-calculator-icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/vehicle-import-calculator-icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/images/vehicle-import-calculator-icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/images/vehicle-import-calculator-icons/icon-512x512.png",
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
