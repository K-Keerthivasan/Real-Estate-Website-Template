import Link from "next/link";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/listings", label: "Listings" },
  { href: "/admin/enquiries", label: "Enquiries" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-panel">
      <div className="shell grid gap-8 py-12 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="luxury-panel h-fit p-5">
          <p className="eyebrow">Admin Console</p>
          <h2 className="mt-2 font-serif text-4xl">K2 Control Room</h2>
          <nav className="mt-6 space-y-2">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-muted hover:bg-panel hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="space-y-8">{children}</div>
      </div>
    </div>
  );
}
