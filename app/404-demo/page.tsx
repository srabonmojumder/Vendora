import type { Metadata } from "next";
import NotFound from "../not-found";

export const metadata: Metadata = { title: "404 — Vendora" };

/** Demo route so the "404 Pages" menu link has a destination to preview. */
export default function Demo404Page() {
  return <NotFound />;
}
