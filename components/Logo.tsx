/**
 * Brand logo — the gold "VENDORA / THE ART OF SHOPPING" lockup.
 * Served from /public as a self-contained SVG (fonts embedded), so a plain
 * <img> keeps it crisp at any size and avoids next/image SVG optimization.
 */
export default function Logo({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/vendora-logo.svg"
      alt="Vendora — The Art of Shopping"
      className={className}
      width={1200}
      height={480}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
