import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line/70 bg-foreground text-background">
      <div className="shell grid gap-8 py-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="eyebrow text-sky">Luxury Property Boilerplate</p>
          <p className="max-w-md font-serif text-3xl">
            Built for editorial real estate launches and polished admin workflows.
          </p>
        </div>
        <div className="space-y-3 text-sm text-background/70">
          <p className="font-medium text-background">Navigate</p>
          <Link href="/" className="block hover:text-background">Home</Link>
          <Link href="/listings" className="block hover:text-background">Listings</Link>
          <Link href="/favorites" className="block hover:text-background">Saved Properties</Link>
          <Link href="/agents/olivia-bennett" className="block hover:text-background">Agent Profile</Link>
          <Link href="/admin" className="block hover:text-background">Admin Dashboard</Link>
        </div>
        <div className="space-y-3 text-sm text-background/70">
          <p className="font-medium text-background">Contact</p>
          <p>hello@k2digitalmedia.com</p>
          <p>(212) 555-0108</p>
          <p>New York · Los Angeles · Miami</p>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="shell flex items-center justify-between py-4 text-xs text-background/40">
          <p>© 2026 K2 Digital Media. All rights reserved.</p>
          <p>Built with Next.js · Supabase · Algolia · Mapbox</p>
        </div>
      </div>
    </footer>
  );
}
