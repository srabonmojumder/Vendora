import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

export default function PageBanner({
  title,
  crumbs = [],
}: {
  title: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="bg-mint">
      <div className="container-x flex flex-col items-center py-14 text-center lg:py-20">
        <h1 className="font-display text-[36px] text-brand sm:text-[48px]">
          {title}
        </h1>
        <nav className="mt-4 flex items-center gap-1.5 text-[13px] text-body">
          <Link href="/" className="transition hover:text-brand">
            Home
          </Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5" />
              {c.href ? (
                <Link href={c.href} className="transition hover:text-brand">
                  {c.label}
                </Link>
              ) : (
                <span className="text-brand">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
