
 // @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  base: "/dark-minimal/",

  integrations: [react()],

  // Disable Astro Dev Toolbar
  devToolbar: {
    enabled: false,
  },

  vite: {
    resolve: {
      alias: {
        "@": "/src",
        "@components": "/src/components",
      },
    },
  },

  output: "static",

  build: {
    inlineStylesheets: "auto",
  },

  server: {
    host: true,
    port: 4321,
  },
});
