import type { Product, Category, BlogPost, NavLink } from "./types";

/** Unsplash helper — keeps image URLs tidy and consistently sized. */
const img = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/* ----------------------------- Hero slides ----------------------------- */
export const heroSlides = [
  {
    label: "UP TO 15% OFF",
    titleTop: "Feel The Scent",
    titleBottom: "Live Bold",
    subtitle:
      "Let captivating fragrances define your confident, vibrant lifestyle.",
    image: img("1592945403244-b3fbafd7f539", 1000),
  },
  {
    label: "SIGNATURE COLLECTION",
    titleTop: "Crafted To",
    titleBottom: "Captivate",
    subtitle:
      "Timeless notes, blended by master perfumers for the modern icon.",
    image: img("1594035910387-fea47794261f", 1000),
  },
  {
    label: "NEW SEASON SCENTS",
    titleTop: "Wear Your",
    titleBottom: "Aura",
    subtitle:
      "A fragrance for every mood — discover the scent that defines you.",
    image: img("1541643600914-78b084683601", 1000),
  },
];

/* ----------------------------- Categories ------------------------------ */
export const categories: Category[] = [
  { id: "c1", name: "Floral Essence", itemCount: 7, image: img("1588405748880-12d1d2a59f75", 500) },
  { id: "c2", name: "Woody Vibes", itemCount: 8, image: img("1615634260167-c8cdede054de", 500) },
  { id: "c3", name: "Citrus Bloom", itemCount: 12, image: img("1557170334-a9632e77c6e4", 500) },
  { id: "c4", name: "Oriental Touch", itemCount: 9, image: img("1610461888750-10bfc601b874", 500) },
  { id: "c5", name: "Fresh Breeze", itemCount: 8, image: img("1523293182086-7651a899d37f", 500) },
];

/* ------------------------------ Products ------------------------------- */
const P = [
  "1592945403244-b3fbafd7f539",
  "1541643600914-78b084683601",
  "1594035910387-fea47794261f",
  "1588405748880-12d1d2a59f75",
  "1615634260167-c8cdede054de",
  "1610461888750-10bfc601b874",
  "1547887538-e3a2f32cb1cc",
  "1523293182086-7651a899d37f",
  "1557170334-a9632e77c6e4",
  "1605651531144-51381895e23d",
  "1592945403244-b3fbafd7f539",
  "1594035910387-fea47794261f",
];

export const newArrivals: Product[] = [
  { id: "p1", name: "Odeur Royale", image: img(P[0]), price: 289, regularPrice: 368, discount: 21, rating: 5, tag: "all" },
  { id: "p2", name: "Amber Whisper", image: img(P[1]), price: 372, regularPrice: 410, discount: 9, rating: 4, tag: "acne-prone" },
  { id: "p3", name: "Face BB Cream", image: img(P[2]), price: 371, rating: 4, tag: "hypersensitive" },
  { id: "p4", name: "Foundation Lotion", image: img(P[3]), price: 373, regularPrice: 420, discount: 11, rating: 5, tag: "acne-prone" },
  { id: "p5", name: "Dropped Beard Oil", image: img(P[4]), price: 374, rating: 4, tag: "all" },
  { id: "p6", name: "Body Oil & Lotion", image: img(P[5]), price: 372, regularPrice: 445, discount: 16, rating: 5, tag: "hypersensitive" },
  { id: "p7", name: "Mystic Woods Cologne", image: img(P[6]), price: 375, rating: 5, tag: "all" },
  { id: "p8", name: "Rose Garden Body Mist", image: img(P[7]), price: 371, regularPrice: 399, discount: 7, rating: 4, tag: "acne-prone" },
  { id: "p9", name: "Spiced Oud Perfume", image: img(P[8]), price: 374, rating: 5, tag: "hypersensitive" },
  { id: "p10", name: "Vanilla Dream Eau De Parfum", image: img(P[9]), price: 372, regularPrice: 430, discount: 13, rating: 5, tag: "all" },
  { id: "p11", name: "Eius Modi Tempora", image: img(P[10]), price: 373, rating: 4, tag: "acne-prone" },
  { id: "p12", name: "Bvlgari Aqva Pour Home", image: img(P[11]), price: 375, regularPrice: 460, discount: 18, rating: 5, tag: "hypersensitive" },
];

export const mostWanted: Product[] = [
  { id: "m1", name: "Noir Intense Parfum", image: img(P[6]), price: 289, regularPrice: 368, discount: 21, rating: 5, tag: "all" },
  { id: "m2", name: "Velvet Orchid Elixir", image: img(P[7]), price: 372, regularPrice: 410, discount: 9, rating: 5, tag: "all" },
  { id: "m3", name: "Golden Sands Cologne", image: img(P[8]), price: 371, rating: 4, tag: "all" },
  { id: "m4", name: "Midnight Saffron", image: img(P[9]), price: 373, regularPrice: 420, discount: 11, rating: 5, tag: "all" },
  { id: "m5", name: "Citrus Aura Mist", image: img(P[0]), price: 374, rating: 4, tag: "all" },
  { id: "m6", name: "Imperial Musk", image: img(P[1]), price: 372, regularPrice: 445, discount: 16, rating: 5, tag: "all" },
  { id: "m7", name: "Cedar & Smoke", image: img(P[2]), price: 375, rating: 5, tag: "all" },
  { id: "m8", name: "Blossom Couture", image: img(P[3]), price: 371, regularPrice: 399, discount: 7, rating: 4, tag: "all" },
];

/* ------------------------------- Blog ---------------------------------- */
export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "Scented Salamander",
    excerpt:
      "Balmy Bubbles is a captivating fragrance that transports you to a tranquil oasis of soothing...",
    image: img("1547887538-e3a2f32cb1cc", 700),
    date: { day: "16", month: "Jul" },
  },
  {
    id: "b2",
    title: "Essential Oil",
    excerpt:
      "Balmy Bubbles is a captivating fragrance that transports you to a tranquil oasis of soothing...",
    image: img("1615634260167-c8cdede054de", 700),
    date: { day: "12", month: "Jul" },
  },
  {
    id: "b3",
    title: "Graceful Lily",
    excerpt:
      "Balmy Bubbles is a captivating fragrance that transports you to a tranquil oasis of soothing...",
    image: img("1588405748880-12d1d2a59f75", 700),
    date: { day: "08", month: "Jul" },
  },
  {
    id: "b4",
    title: "Heavenly Fragrance",
    excerpt:
      "Balmy Bubbles is a captivating fragrance that transports you to a tranquil oasis of soothing...",
    image: img("1610461888750-10bfc601b874", 700),
    date: { day: "04", month: "Jul" },
  },
  {
    id: "b5",
    title: "Aroma Galore",
    excerpt:
      "Balmy Bubbles is a captivating fragrance that transports you to a tranquil oasis of soothing...",
    image: img("1523293182086-7651a899d37f", 700),
    date: { day: "28", month: "Jun" },
  },
  {
    id: "b6",
    title: "Balmy Bubbles",
    excerpt:
      "Balmy Bubbles is a captivating fragrance that transports you to a tranquil oasis of soothing...",
    image: img("1557170334-a9632e77c6e4", 700),
    date: { day: "21", month: "Jun" },
  },
];

/* --------------------------- Lookups ----------------------------------- */
/** Every product across the home sections, de-duplicated by id. */
export const allProducts: Product[] = (() => {
  const seen = new Map<string, Product>();
  for (const p of [...newArrivals, ...mostWanted]) {
    if (!seen.has(p.id)) seen.set(p.id, p);
  }
  return Array.from(seen.values());
})();

const DEFAULT_DESCRIPTION =
  "An exquisite, long-lasting fragrance crafted by master perfumers. " +
  "Top notes of bergamot and citrus melt into a warm heart of florals and " +
  "spice, settling on a sensual base of amber, oud and soft musk — a scent " +
  "made to define your most confident moments.";

/** Extra perfume shots used to flesh out each product's gallery slider. */
const GALLERY_POOL = [
  "1592945403244-b3fbafd7f539",
  "1547887538-e3a2f32cb1cc",
  "1610461888750-10bfc601b874",
  "1523293182086-7651a899d37f",
  "1594035910387-fea47794261f",
];

export function getProductById(id: string): Product | undefined {
  const p = allProducts.find((x) => x.id === id);
  if (!p) return undefined;
  // Lead with the product's own image, then top up from the shared pool.
  const gallery = Array.from(
    new Set([p.image, ...GALLERY_POOL.map((gid) => img(gid, 800))])
  ).slice(0, 5);
  return {
    category: "Fragrance",
    description: DEFAULT_DESCRIPTION,
    ...p,
    gallery,
  };
}

/** Up to `count` other products, excluding the given id. */
export function getRelatedProducts(id: string, count = 4): Product[] {
  return allProducts.filter((p) => p.id !== id).slice(0, count);
}

/** Case-insensitive name search across all products. */
export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return allProducts.filter((p) => p.name.toLowerCase().includes(q));
}

export function getBlogPostById(id: string): BlogPost | undefined {
  return blogPosts.find((p) => p.id === id);
}

/* ------------------------ Slide-in menu nav ---------------------------- */
export const navLinks: NavLink[] = [
  {
    label: "HOME",
    children: [
      { label: "Home 01", href: "/" },
      { label: "Home 02", href: "/" },
      { label: "Home 03", href: "/" },
      { label: "Home 04", href: "/" },
      { label: "Home 05", href: "/" },
    ],
  },
  {
    label: "SHOP",
    children: [
      {
        label: "Collection Layouts",
        children: [
          { label: "1. Filter Left Sidebar", href: "/shop" },
          { label: "2. Filter Right Sidebar", href: "/shop" },
          { label: "3. Filter Top", href: "/shop" },
          { label: "4. Coupon Filter", href: "/shop" },
          { label: "5. List Filter", href: "/shop" },
          { label: "6. Pagination", href: "/shop" },
        ],
      },
      {
        label: "Product Style",
        children: [
          { label: "Default", href: "/shop" },
          { label: "Left Thumb", href: "/shop" },
          { label: "Right Thumb", href: "/shop" },
          { label: "Scroll Fixed", href: "/shop" },
          { label: "Without Thumb", href: "/shop" },
        ],
      },
      {
        label: "Product Type",
        children: [
          { label: "With Video", href: "/shop" },
          { label: "Upsell", href: "/shop" },
          { label: "Crosssell", href: "/shop" },
          { label: "Soldout - In Coming", href: "/shop" },
          { label: "Product Countdown", href: "/shop" },
        ],
      },
    ],
  },
  {
    label: "PAGES",
    children: [
      { label: "About Us", href: "/about" },
      { label: "FAQs", href: "/faqs" },
      { label: "Look Book", href: "/shop" },
      { label: "Our Team", href: "/about" },
      { label: "Privacy Policy", href: "/faqs" },
      { label: "404 Pages", href: "/404-demo" },
    ],
  },
  {
    label: "BLOG",
    children: [
      { label: "Blog - Standard", href: "/blog" },
      { label: "Blog - Grid View", href: "/blog" },
      { label: "Single Post", href: "/blog/b1" },
    ],
  },
  { label: "CONTACT", href: "/contact" },
];
