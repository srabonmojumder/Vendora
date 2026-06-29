"use client";

import { StoreProvider } from "@/context/StoreContext";
import CartDrawer from "@/components/CartDrawer";
import SearchOverlay from "@/components/SearchOverlay";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      {children}
      <CartDrawer />
      <SearchOverlay />
    </StoreProvider>
  );
}
