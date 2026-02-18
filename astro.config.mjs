import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

import robotsTxt from "astro-robots-txt";
import compress from "@playform/compress";

// https://astro.build/config
export default defineConfig({
  site: "https://downkingo.com",
  prefetch: true,
  build: {
    // Inline all stylesheets to eliminate render-blocking CSS requests
    // This dramatically improves LCP on mobile devices
    inlineStylesheets: "always",
  },
  integrations: [
    icon(),
    starlight({
      title: "DownKingo Docs",
      disable404Route: true,
      defaultLocale: "root",
      locales: {
        root: {
          label: "English",
          lang: "en",
        },
        pt: {
          label: "Português",
          lang: "pt-BR",
        },
      },
      favicon: "/icon.ico",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/down-kingo/downkingo",
        },
      ],
      customCss: ["./src/styles/global.css"],
      components: {
        Head: "./src/components/starlight/Head.astro",
        TableOfContents: "./src/components/starlight/TableOfContents.astro",
      },
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Introduction", slug: "docs" },
            { label: "Installation", slug: "installation" },
            { label: "Features", slug: "features" },
          ],
        },
        {
          label: "Development",
          items: [{ label: "Dev Setup", slug: "development" }],
        },
        {
          label: "Project",
          items: [{ label: "Roadmap", slug: "roadmap" }],
        },
      ],
    }),
    sitemap(),

    robotsTxt(),
    compress({
      exclude: ["**/*.xml"],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
