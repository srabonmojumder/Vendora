"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

interface DropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

/** Compact click-to-open selector used for currency/language in the header. */
export default function Dropdown({ options, value, onChange, label }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        className="flex items-center gap-1 text-[12px] font-medium text-heading-muted transition hover:text-brand"
      >
        {value}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-3 min-w-[140px] border border-black/10 bg-white py-1 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
        >
          {options.map((opt) => {
            const active = opt === value;
            return (
              <li key={opt}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-[12px] transition hover:bg-mint ${
                    active ? "text-brand" : "text-heading-muted"
                  }`}
                >
                  {opt}
                  {active && <Check className="h-3.5 w-3.5" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
