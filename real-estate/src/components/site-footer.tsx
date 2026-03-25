import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-foreground text-white dark:bg-panel-strong dark:text-foreground">
      <div className="shell grid gap-8 py-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="eyebrow text-sky">Luxury Property Boilerplate</p>
          <p className="max-w-md font-serif text-3xl">
            Built for editorial real estate launches and polished admin workflows.
          </p>
        </div>
        <div className="space-y-3 text-sm text-white/70 dark:text-foreground/70">
          <p className="font-medium text-white dark:text-foreground">Navigate</p>
          <Link href="/" className="block hover:text-white dark:hover:text-foreground">Home</Link>
          <Link href="/listings" className="block hover:text-white dark:hover:text-foreground">Listings</Link>
          <Link href="/favorites" className="block hover:text-white dark:hover:text-foreground">Saved Properties</Link>
          <Link href="/agents/olivia-bennett" className="block hover:text-white dark:hover:text-foreground">Agent Profile</Link>
          <Link href="/admin" className="block hover:text-white dark:hover:text-foreground">Admin Dashboard</Link>
        </div>
        <div className="space-y-3 text-sm text-white/70 dark:text-foreground/70">
          <p className="font-medium text-white dark:text-foreground">Contact</p>
          <p>hello@k2digitalmedia.com</p>
          <p>(212) 555-0108</p>
          <p>New York · Los Angeles · Miami</p>
        </div>
      </div>
      <div className="border-t border-white/10 dark:border-foreground/10">
        <div className="shell flex flex-wrap items-center justify-between gap-2 py-4 text-xs text-white/40 dark:text-foreground/40">
          <p>© 2026 K2 Digital Media. All rights reserved.</p>
          <p>Built with Next.js · Supabase · Algolia · Mapbox</p>
        </div>
      </div>
    </footer>
  );
}
