# Vendora — Luxury Fragrance Storefront

A modern, fully mobile-responsive e-commerce front-end for the luxury perfume brand
**Vendora**, built with **Next.js 15 (App Router) + TypeScript + Tailwind CSS**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Stack

- **Next.js 15** (App Router) — Faculty Glyphic ships in Next 15's `next/font` registry, so the project targets 15 + React 19.
- **TypeScript** — typed `Product`, `Category`, `BlogPost`, `NavLink` models in [`lib/types.ts`](lib/types.ts).
- **Tailwind CSS** — design tokens in [`tailwind.config.ts`](tailwind.config.ts).
- **Fonts** via `next/font/google`: **Faculty Glyphic** (`--font-display`) + **Poppins** (`--font-body`).
- **lucide-react** icons, **Swiper** carousels.

## Design tokens

| Token | Value |
|-------|-------|
| Brand green | `#004132` |
| Body text | `#92959A` |
| Headings | `#000` / `#282828` / `#464646` |
| Mint hero bg | `#EAF5EF` |
| Buttons | solid green, white text, square corners, uppercase, tracked |

## Components

`Header` · `MenuDrawer` (accordion slide-in) · `Hero` (3-slide Swiper) ·
`CategoryCarousel` · `ProductCard` / `ProductGrid` (filter tabs) · `PromoBanner`
(light + dark) · `BlogCard` / `BlogSection` · `Footer` · `Reveal` (scroll-reveal).

All sample data lives in [`lib/data.ts`](lib/data.ts). Product imagery uses Unsplash
(allow-listed in [`next.config.mjs`](next.config.mjs)).
