export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  /** Original price — present when the product is on sale. */
  regularPrice?: number;
  /** Whole-number discount percentage, e.g. 21 for "-21%". */
  discount?: number;
  rating: number; // 0–5
  currency?: string; // defaults to "DHS"
  /** Tag used by the New Arrival filter tabs. */
  tag?: ProductTag;
  /** Long-form copy shown on the product details page. */
  description?: string;
  /** Display category name shown on the details page. */
  category?: string;
  /** Gallery images for the details-page slider (first is the primary image). */
  gallery?: string[];
}

export interface CartItem {
  product: Product;
  qty: number;
}

export type PaymentMethod = "card" | "paypal" | "cod";

export interface CheckoutDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zip: string;
  notes?: string;
  paymentMethod: PaymentMethod;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  couponCode?: string;
  details: CheckoutDetails;
  createdAt: string;
}

export interface Coupon {
  code: string;
  discountPct: number;
}

export interface Toast {
  id: number;
  message: string;
  type: "success" | "info";
}

export type ProductTag = "all" | "acne-prone" | "hypersensitive";

export interface Category {
  id: string;
  name: string;
  itemCount: number;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  /** Display date split into day + month, e.g. { day: "16", month: "Jul" }. */
  date: { day: string; month: string };
}

export interface NavLink {
  label: string;
  href?: string;
  children?: NavLink[];
}
