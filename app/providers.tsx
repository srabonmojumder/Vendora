"use client";

import { StoreProvider } from "@/context/StoreContext";
import CartDrawer from "@/components/CartDrawer";
import SearchOverlay from "@/components/SearchOverlay";
import Toaster from "@/components/Toaster";
import CompareBar from "@/components/CompareBar";
import BackToTop from "@/components/BackToTop";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      {children}
      <CartDrawer />
      <SearchOverlay />
      <CompareBar />
      <BackToTop />
      <Toaster />
    </StoreProvider>
  );
}
