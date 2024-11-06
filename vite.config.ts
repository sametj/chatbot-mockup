import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import restart from 'vite-plugin-restart';

import path from "path";

//Remember to run
// npm i @types/node -D vite-plugin-restart

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(),
  restart({ restart: ['../static/**',] }),

  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    host: false,

    open: !("SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env),
  }
})
