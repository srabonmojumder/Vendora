"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  Heart,
  User,
  ShoppingBag,
  ChevronDown,
} from "lucide-react";
import MenuDrawer from "./MenuDrawer";
import Logo from "./Logo";
import { useStore } from "@/context/StoreContext";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, wishlistCount, openCart, openSearch } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.06)]" : ""
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between">
          {/* Left — hamburger */}
          <div className="flex flex-1 items-center">
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="flex items-center gap-2 text-heading-soft transition hover:text-brand"
            >
              <Menu className="h-6 w-6" />
              <span className="hidden text-[12px] font-medium uppercase tracking-button sm:inline">
                Menu
              </span>
            </button>
          </div>

          {/* Center — logo */}
          <div className="flex flex-1 justify-center">
            <Link href="/" aria-label="Vendora — home" className="inline-flex">
              <Logo className="h-9 w-auto sm:h-11" priority />
            </Link>
          </div>

          {/* Right — utilities */}
          <div className="flex flex-1 items-center justify-end gap-3 sm:gap-5">
            <button className="hidden items-center gap-1 text-[12px] font-medium text-heading-muted transition hover:text-brand lg:flex">
              AED <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <button className="hidden items-center gap-1 text-[12px] font-medium text-heading-muted transition hover:text-brand lg:flex">
              English <ChevronDown className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={openSearch}
              aria-label="Search"
              className="text-heading-soft transition hover:text-brand"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative text-heading-soft transition hover:text-brand"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && <CountBadge count={wishlistCount} />}
            </Link>

            <Link
              href="/about"
              aria-label="Account"
              className="hidden text-heading-soft transition hover:text-brand sm:block"
            >
              <User className="h-5 w-5" />
            </Link>

            <button
              onClick={openCart}
              aria-label="Cart"
              className="relative text-heading-soft transition hover:text-brand"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && <CountBadge count={cartCount} />}
            </button>
          </div>
        </div>
      </header>

      <MenuDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

function CountBadge({ count }: { count: number }) {
  return (
    <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[9px] font-semibold leading-none text-white">
      {count}
    </span>
  );
}
