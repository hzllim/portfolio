// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import markdoc from "@astrojs/markdoc";

const isDev = process.env.NODE_ENV !== "production";

// https://astro.build/config
export default defineConfig({
  base: "/",
  integrations: [
    react(),
    markdoc(),
    // When running locally (`astro dev`), keystatic integration enables local file editing
    // When building for static GitHub Pages (`astro build`), it exports static HTML
    ...(isDev ? [keystatic()] : []),
  ],
  redirects: {
    "/admin": "/keystatic",
  },
});
