// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import markdoc from "@astrojs/markdoc";
import vercel from "@astrojs/vercel";

const isDev = process.env.NODE_ENV !== "production";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  site: process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:4321",
  base: "/",
  integrations: [react(), markdoc(), keystatic()],
  redirects: {
    "/admin": "/keystatic",
  },
});
