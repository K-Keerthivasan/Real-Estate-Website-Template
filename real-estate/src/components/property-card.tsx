import Link from "next/link";
import type { Property } from "@/lib/site-data";
import { formatCurrency, formatNumber } from "@/lib/format";
import { FavoriteButton } from "@/components/favorite-button";

type PropertyCardProps = {
  property: Property;
  compact?: boolean;
};

export function PropertyCard({ property, compact = false }: PropertyCardProps) {
  return (
    <article className="luxury-panel overflow-hidden">
      <div
        className={`${compact ? "h-52" : "h-72"} image-overlay soft-grid relative`}
        style={{ backgroundImage: property.images[0]?.gradient }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.56))]" />
        <div className="absolute left-5 top-5 rounded-full bg-white/92 px-3 py-1 text-xs font-medium text-[#1a1a1a]">
          {property.status}
        </div>
        <div className="absolute bottom-5 left-5 rounded-full bg-sky px-4 py-2 text-sm font-semibold text-white">
          {formatCurrency(property.price)}
        </div>
        <div className="absolute right-4 top-4">
          <FavoriteButton propertyId={property.id} />
        </div>
      </div>
      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-sky">
            {property.neighborhood}
          </p>
          <Link href={`/properties/${property.slug}`} className="block">
            <h3 className="font-serif text-3xl leading-none text-balance">
              {property.title}
            </h3>
          </Link>
          <p className="text-sm text-muted">{property.address}</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-muted">
          <span>{property.beds} beds</span>
          <span>{property.baths} baths</span>
          <span>{formatNumber(property.sqft)} sqft</span>
          <span>{property.type}</span>
        </div>
        <p className="text-sm leading-7 text-muted">{property.description}</p>
      </div>
    </article>
  );
}
