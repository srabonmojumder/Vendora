"use client";

import Image from "next/image";
import Link from "next/link";
import { X, GitCompareArrows } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function CompareBar() {
  const { compare, removeFromCompare, clearCompare } = useStore();

  if (compare.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[110] border-t border-black/10 bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
      <div className="container-x flex items-center gap-4 py-3">
        <span className="hidden items-center gap-2 text-[12px] font-semibold uppercase tracking-button text-heading-soft sm:flex">
          <GitCompareArrows className="h-4 w-4 text-brand" />
          Compare
        </span>

        {/* Selected thumbnails */}
        <ul className="flex flex-1 items-center gap-3 overflow-x-auto no-scrollbar">
          {compare.map((p) => (
            <li key={p.id} className="relative shrink-0">
              <div className="relative h-12 w-11  bg-[#f6f6f6]">
                <Image src={p.image} alt={p.name} fill sizes="44px" className="object-cover" />
              </div>
              <button
                onClick={() => removeFromCompare(p.id)}
                aria-label={`Remove ${p.name} from compare`}
                className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-white"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={clearCompare}
          className="hidden text-[12px] font-medium uppercase tracking-button text-body transition hover:text-brand sm:block"
        >
          Clear
        </button>
        <Link href="/compare" className="btn-primary shrink-0 px-6 py-3">
          Compare ({compare.length})
        </Link>
      </div>
    </div>
  );
}
