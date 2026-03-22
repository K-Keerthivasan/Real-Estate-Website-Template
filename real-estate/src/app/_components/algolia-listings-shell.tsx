"use client";

import { useDeferredValue, useState } from "react";
import { InstantSearch, useHits, useSearchBox } from "react-instantsearch";
import { MapPanel } from "@/components/map-panel";
import { FavoriteButton } from "@/components/favorite-button";
import { formatCurrency, formatNumber } from "@/lib/format";
import type { Property } from "@/lib/site-data";

type PropertyHit = Property & {
  objectID: string;
};

// Stub client — swap for real Algolia client when keys are set
const searchClient = {
  async search(
    requests: Array<{ params?: { query?: string } }>,
  ): Promise<{
    results: Array<{
      hits: PropertyHit[];
      nbHits: number;
      page: number;
      nbPages: number;
      hitsPerPage: number;
      exhaustiveNbHits: boolean;
      processingTimeMS: number;
      query: string;
      params: string;
    }>;
  }> {
    return {
      results: requests.map((request) => ({
        hits: [],
        nbHits: 0,
        page: 0,
        nbPages: 0,
        hitsPerPage: 20,
        exhaustiveNbHits: true,
        processingTimeMS: 1,
        query: request.params?.query ?? "",
        params: "",
      })),
    };
  },
  async searchForFacetValues() {
    return [];
  },
} as never;

function KeywordSearch() {
  const { query, refine } = useSearchBox();

  return (
    <label className="block space-y-2 text-sm font-medium">
      Keyword search
      <input
        value={query}
        onChange={(event) => refine(event.currentTarget.value)}
        placeholder="Search by address, neighborhood, or city"
        className="w-full rounded-2xl border border-line bg-background px-4 py-3 outline-none focus:border-sky"
      />
    </label>
  );
}

function ListingsResults({
  properties,
  type,
  price,
  beds,
  baths,
  activeId,
  onHover,
}: {
  properties: Property[];
  type: string;
  price: string;
  beds: string;
  baths: string;
  activeId: string | null;
  onHover: (id: string | null) => void;
}) {
  const { query } = useSearchBox();
  useHits<PropertyHit>();
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const filtered = properties.filter((property) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      [
        property.title,
        property.address,
        property.city,
        property.neighborhood,
        property.type,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);

    const matchesType = !type || property.type === type;
    const matchesBeds = !beds || property.beds >= Number(beds);
    const matchesBaths = !baths || property.baths >= Number(baths);
    const matchesPrice =
      !price ||
      (() => {
        const [min, max] = price.split("-").map(Number);
        return property.price >= min && property.price <= max;
      })();

    return matchesQuery && matchesType && matchesBeds && matchesBaths && matchesPrice;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-[24px] border border-line bg-background px-5 py-4">
        <div>
          <p className="text-sm font-medium text-foreground">{filtered.length} results</p>
          <p className="text-sm text-muted">
            Filtered from {properties.length} active listings
          </p>
        </div>
        <div className="rounded-full bg-sky-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky">
          Live search
        </div>
      </div>
      {filtered.map((property) => (
        <article
          key={property.id}
          id={`card-${property.id}`}
          onMouseEnter={() => onHover(property.id)}
          onMouseLeave={() => onHover(null)}
          className={`luxury-panel grid overflow-hidden transition-all md:grid-cols-[260px_minmax(0,1fr)] ${activeId === property.id ? "ring-2 ring-sky" : ""}`}
        >
          <div
            className="image-overlay soft-grid relative min-h-64"
            style={{ backgroundImage: property.images[0]?.gradient }}
          >
            <div className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-medium text-[#1a1a1a]">
              {property.status}
            </div>
            <div className="absolute bottom-4 left-4 rounded-full bg-sky px-4 py-2 text-sm font-semibold text-white">
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
              <h3 className="font-serif text-3xl">{property.title}</h3>
              <p className="text-sm text-muted">{property.address}</p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-muted">
              <span>{property.beds} beds</span>
              <span>{property.baths} baths</span>
              <span>{formatNumber(property.sqft)} sqft</span>
              <span>{property.type}</span>
            </div>
            <p className="text-sm leading-7 text-muted">{property.description}</p>
            <a
              href={`/properties/${property.slug}`}
              className="inline-flex rounded-full border border-line px-4 py-2 text-sm font-medium text-foreground hover:border-sky hover:text-sky"
            >
              View property
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

export function AlgoliaListingsShell({ properties }: { properties: Property[] }) {
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);

  const selectClass =
    "block rounded-2xl border border-line bg-panel px-4 py-3 text-sm outline-none focus:border-sky";

  return (
    <InstantSearch indexName="properties" searchClient={searchClient}>
      <section className="shell space-y-8 py-16">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="eyebrow">Search Experience</p>
            <h1 className="section-title">Listings crafted for fast high-intent browsing.</h1>
          </div>
          <div className="luxury-panel flex flex-wrap gap-3 p-3">
            <label className="space-y-2 text-sm font-medium">
              Price
              <select value={price} onChange={(e) => setPrice(e.currentTarget.value)} className={selectClass}>
                <option value="">Any</option>
                <option value="0-3000000">Up to $3M</option>
                <option value="3000000-6000000">$3M–$6M</option>
                <option value="6000000-10000000">$6M–$10M</option>
                <option value="10000000-20000000">$10M+</option>
              </select>
            </label>
            <label className="space-y-2 text-sm font-medium">
              Beds
              <select value={beds} onChange={(e) => setBeds(e.currentTarget.value)} className={selectClass}>
                <option value="">Any</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </label>
            <label className="space-y-2 text-sm font-medium">
              Baths
              <select value={baths} onChange={(e) => setBaths(e.currentTarget.value)} className={selectClass}>
                <option value="">Any</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </label>
            <label className="space-y-2 text-sm font-medium">
              Type
              <select value={type} onChange={(e) => setType(e.currentTarget.value)} className={selectClass}>
                <option value="">Any</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Condo">Condo</option>
                <option value="Townhome">Townhome</option>
                <option value="Villa">Villa</option>
                <option value="Estate">Estate</option>
              </select>
            </label>
          </div>
        </div>
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="space-y-6">
            <div className="luxury-panel p-5">
              <KeywordSearch />
            </div>
            <ListingsResults
              properties={properties}
              type={type}
              price={price}
              beds={beds}
              baths={baths}
              activeId={activeId}
              onHover={setActiveId}
            />
          </div>
          <MapPanel
            properties={properties}
            activeId={activeId}
            onPropertyClick={(id) => {
              setActiveId(id);
              document.getElementById(`card-${id}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }}
          />
        </div>
      </section>
    </InstantSearch>
  );
}
