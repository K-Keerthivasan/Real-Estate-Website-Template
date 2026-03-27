"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Listings" },
  { href: "/favorites", label: "Favorites" },
  { href: "/agents/olivia-bennett", label: "Agent" },
  { href: "/admin", label: "Admin" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-[var(--k2-demo-top-offset,0px)] z-40 border-b border-line/70 bg-background/80 backdrop-blur-xl">
      <div className="shell flex items-center justify-between gap-6 py-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-sm font-semibold tracking-[0.28em] text-background">
            K2
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.34em] text-sky">
              K2 Digital Media
            </p>
            <p className="font-serif text-2xl leading-none">K2 Estate</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-foreground transition-colors ${pathname === item.href ? "text-foreground" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/listings"
            className="hidden rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background hover:bg-sky hover:text-white sm:inline-flex"
          >
            Explore properties
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line/70 md:hidden"
          >
            {mobileOpen ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <nav className="border-t border-line/50 bg-background/95 px-5 py-4 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-xl px-3 py-3 text-sm font-medium transition-colors hover:bg-panel hover:text-foreground ${pathname === item.href ? "text-foreground" : "text-muted"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

