<div align="center">
  <img src="public/kingo.webp" alt="DownKingo" width="80" />
  <h1 align="center">DownKingo — Official Website</h1>
  <p align="center">
    <strong>Landing page, documentation and blog for the DownKingo desktop app.</strong>
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/Astro-0C1424?style=for-the-badge&logo=astro&logoColor=white" alt="Astro" />
    <img src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white" alt="Bun" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare Pages" />
  </p>
</div>

---

## About

This repository contains the **official website** for [DownKingo](https://downkingo.com) — a free, open source desktop app that works as a complete media toolbox:

- Download videos from **1000+ sites** (YouTube, Instagram, TikTok, Twitter, Twitch, Reddit and more)
- Media conversion across multiple formats (MP4, MKV, MP3, FLAC, WAV, WebP)
- AI-powered background removal from images (offline)
- Audio/video transcription to text via Whisper (offline)
- Full playlist downloads and batch processing

The desktop app is built with **Go + Wails + React 19** and uses **yt-dlp** + **FFmpeg** under the hood. This site is the public-facing showcase for the project.

## What the Site Includes

| Section | Description |
|---|---|
| **Landing Page** | App presentation with features, terminal demo and use cases |
| **Download** | Download page with automatic OS detection (Windows/macOS/Linux) via GitHub Releases API |
| **Use Cases** | Individual pages for each supported platform (YouTube Downloader, Instagram Downloader, etc.) |
| **Blog** | Posts with tags, author pages and Markdown/MDX content support |
| **Docs** | Technical documentation via Starlight (introduction, installation, features, roadmap) |
| **i18n** | Full bilingual support EN / PT-BR with hreflang tags |

## Tech Stack

- **Astro 5** — Static Site Generation with islands architecture
- **Starlight** — Documentation integrated with Astro
- **Tailwind CSS 4** — Utility-first styling
- **Bun** — Runtime and package manager
- **astro-icon** — Icons via Iconify (Lucide + Simple Icons)
- **astro-seo** — Meta tags, Open Graph and Twitter Cards
- **Cloudflare Pages** — Edge deployment with `_headers` for security (HSTS, CSP, X-Frame-Options)

## Performance

Maximum score on Core Web Vitals, accessibility and SEO — direct result of Astro's SSG with inlined CSS, asset compression and critical font preloading.

### PageSpeed Insights
<img src="public/page-speed.png" alt="PageSpeed Insights — Score 100" width="800" />

### GTmetrix
<img src="public/GTmetrix.png" alt="GTmetrix — Grade A" width="800" />

## Security

Security headers applied via `_headers` and middleware following OWASP recommendations: HSTS with preload, strict Content Security Policy, X-Frame-Options, X-Content-Type-Options and Referrer-Policy.

### Mozilla Observatory
<img src="public/observatory-mozilla.png" alt="Mozilla Observatory — A+" width="800" />

## Local Setup

Requires [Bun](https://bun.sh) installed.

```bash
# Install dependencies
bun install

# Development server
bun run dev

# Production build
bun run build

# Preview build
bun run preview
```

## Project Structure

```
src/
├── assets/          # Optimized images (avif, webp)
├── components/      # Reusable Astro components
├── content/         # Blog posts and docs (Markdown/MDX)
├── layouts/         # Base layouts
├── pages/
│   ├── pt/          # Portuguese pages
│   ├── blog/        # Blog (EN)
│   ├── download     # Download page
│   └── *-downloader # Platform-specific use case pages
├── styles/          # Global CSS + Tailwind
public/
├── fonts/           # Self-hosted fonts (Inter, JetBrains Mono)
├── scripts/         # Client-side JS (hero animation, OS detect, etc.)
└── _headers         # Security headers (Cloudflare Pages)
```

## Links

- **Website:** [downkingo.com](https://downkingo.com)
- **App (GitHub):** [down-kingo/downkingo](https://github.com/down-kingo/downkingo)
- **Roadmap:** [GitHub Projects](https://github.com/orgs/down-kingo/projects/2)
