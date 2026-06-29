"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Plus, Minus, User, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import type { NavLink } from "@/lib/types";
import { navLinks } from "@/lib/data";

interface MenuDrawerProps {
  open: boolean;
  onClose: () => void;
}

/** A single accordion row; recurses for nested children. */
function AccordionItem({
  link,
  depth,
  onNavigate,
}: {
  link: NavLink;
  depth: number;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = !!link.children?.length;

  // Indentation + type scale shrink with depth for visual hierarchy.
  const pad = depth === 0 ? "" : depth === 1 ? "pl-4" : "pl-8";
  const textClass =
    depth === 0
      ? "text-[13px] font-medium uppercase tracking-wider2 text-heading-soft"
      : depth === 1
        ? "text-[13px] font-normal text-heading-muted"
        : "text-[12px] font-light text-body";

  if (!hasChildren) {
    return (
      <Link
        href={link.href ?? "#"}
        onClick={onNavigate}
        className={`block border-b border-black/[0.06] py-3.5 ${pad} ${textClass} transition-colors hover:text-brand`}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div className={`border-b border-black/[0.06] ${pad}`}>
      <button
        onClick={() => setExpanded((v) => !v)}
        className={`flex w-full items-center justify-between py-3.5 text-left ${textClass} transition-colors hover:text-brand`}
        aria-expanded={expanded}
      >
        <span>{link.label}</span>
        {expanded ? (
          <Minus className="h-4 w-4 shrink-0 text-brand" />
        ) : (
          <Plus className="h-4 w-4 shrink-0" />
        )}
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {link.children!.map((child) => (
            <AccordionItem
              key={child.label}
              link={child}
              depth={depth + 1}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MenuDrawer({ open, onClose }: MenuDrawerProps) {
  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
      />

      {/* Drawer panel */}
      <aside
        className={`fixed left-0 top-0 z-[70] flex h-full w-[88%] max-w-[380px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
      >
        {/* Header row */}
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
          <Link href="/" onClick={onClose} aria-label="Vendora — home" className="inline-flex">
            <Logo className="h-9 w-auto" />
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-full p-1.5 text-heading-soft transition hover:bg-black/5 hover:text-brand"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-6 py-2">
          {navLinks.map((link) => (
            <AccordionItem
              key={link.label}
              link={link}
              depth={0}
              onNavigate={onClose}
            />
          ))}
        </nav>

        {/* Footer: currency + language + account */}
        <div className="border-t border-black/10 px-6 py-5">
          <div className="mb-4 flex items-center gap-6 text-[12px] text-heading-muted">
            <button className="flex items-center gap-1 transition hover:text-brand">
              AED <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <button className="flex items-center gap-1 transition hover:text-brand">
              English <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
          <Link
            href="/about"
            onClick={onClose}
            className="flex items-center gap-2 text-[13px] font-medium text-heading-soft transition hover:text-brand"
          >
            <User className="h-4 w-4" />
            Account
          </Link>
        </div>
      </aside>
    </>
  );
}
