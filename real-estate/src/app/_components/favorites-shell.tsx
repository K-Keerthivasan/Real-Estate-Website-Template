"use client";

import { useFavorites } from "@/lib/favorites";
import { PropertyCard } from "@/components/property-card";
import type { Property } from "@/lib/site-data";
import Link from "next/link";

export function FavoritesShell({ properties }: { properties: Property[] }) {
  const { favorites } = useFavorites();
  const saved = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="shell space-y-10 py-16">
      <div className="space-y-3">
        <p className="eyebrow">My Collection</p>
        <h1 className="section-title">
          {saved.length > 0 ? "Saved Properties" : "No favorites yet"}
        </h1>
        {saved.length > 0 && (
          <p className="text-base text-muted">
            {saved.length} {saved.length === 1 ? "property" : "properties"} saved to your shortlist.
          </p>
        )}
      </div>

      {saved.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {saved.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="luxury-panel flex flex-col items-center gap-6 px-8 py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-panel">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <div className="space-y-2">
            <p className="font-serif text-3xl">Your shortlist is empty</p>
            <p className="text-sm text-muted">
              Browse listings and tap the heart icon to save properties here.
            </p>
          </div>
          <Link
            href="/listings"
            className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-sky hover:text-white"
          >
            Browse listings
          </Link>
        </div>
      )}
    </div>
  );
}
