"use client";

import { Check, Info, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function Toaster() {
  const { toasts, dismissToast } = useStore();

  return (
    <div className="pointer-events-none fixed right-5 top-20 z-[120] flex flex-col gap-2.5">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center gap-3 border border-black/10 bg-white px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.14)] animate-fade-up"
          role="status"
        >
          <span
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
              t.type === "info" ? "bg-black/5 text-heading-soft" : "bg-brand/10 text-brand"
            }`}
          >
            {t.type === "info" ? (
              <Info className="h-3.5 w-3.5" />
            ) : (
              <Check className="h-3.5 w-3.5" />
            )}
          </span>
          <p className="text-[13px] font-medium text-heading-soft">{t.message}</p>
          <button
            onClick={() => dismissToast(t.id)}
            aria-label="Dismiss"
            className="ml-1 text-body transition hover:text-brand"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
