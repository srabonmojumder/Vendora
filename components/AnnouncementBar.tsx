import { Phone, Facebook, Youtube, Instagram } from "lucide-react";

/** Simple X (Twitter) glyph — lucide dropped the bird, so we inline it. */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socials = [
  { Icon: Facebook, label: "Facebook" },
  { Icon: Youtube, label: "YouTube" },
  { Icon: Instagram, label: "Instagram" },
  { Icon: XIcon, label: "X" },
];

export default function AnnouncementBar() {
  return (
    <div className="bg-brand-dark text-white">
      <div className="container-x flex h-10 items-center justify-between text-[12px] font-light tracking-wide">
        {/* Left */}
        <div className="hidden items-center gap-6 lg:flex">
          <span className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" />
            (+01) 234-567-89
          </span>
          <a href="#" className="opacity-80 transition hover:opacity-100">
            Store
          </a>
          <a href="#" className="opacity-80 transition hover:opacity-100">
            Virtual Appointment
          </a>
        </div>

        {/* Center */}
        <p className="mx-auto text-center text-[12px] lg:mx-0">
          Get up to 35% off + Free shipping{" "}
          <a href="#" className="font-medium underline underline-offset-2">
            Shop Now
          </a>
        </p>

        {/* Right */}
        <div className="hidden items-center gap-4 lg:flex">
          {socials.map(({ Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="opacity-80 transition hover:opacity-100"
            >
              <Icon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
