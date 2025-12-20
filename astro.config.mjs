import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
// import sitemap from "@astrojs/sitemap"; // <-- REMOVE THIS IMPORT
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";

import config from "./src/config/config.json";

// https://astro.build/config
export default defineConfig({
  site: "https://txchyon.com",

  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",

  image: {
    service: { entrypoint: "astro/assets/services/sharp" },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),

    // ← AutoImport moved BEFORE mdx to fix the warning
    AutoImport({
      imports: [
        "@/shortcodes/Button",
        "@/shortcodes/Accordion",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Youtube",
        "@/shortcodes/Tabs",
        "@/shortcodes/Tab",
      ],
    }),

    mdx(), // ← Now comes after AutoImport
  ],

  markdown: {
    remarkPlugins: [
      remarkToc,
      [remarkCollapse, { test: "Table of contents" }],
    ],
    shikiConfig: { theme: "one-dark-pro", wrap: true },
    extendDefaultPlugins: true,
  },
});