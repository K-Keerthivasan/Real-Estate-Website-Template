import Link from "next/link";
import { PropertyCard } from "@/components/property-card";
import { PropertySearchForm } from "@/components/property-search-form";
import { getFeaturedProperties, neighborhoods, stats } from "@/lib/site-data";

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties();

  return (
    <div className="space-y-20 pb-20">
      <section className="shell grid gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-18">
        <div className="space-y-8">
          <div className="space-y-5">
            <p className="eyebrow">Modern Luxury Property</p>
            <h1 className="font-serif text-6xl leading-[0.9] text-balance text-foreground sm:text-7xl">
              Designed to sell exceptional homes with calm authority.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted">
              A premium real estate starter for K2 Digital Media with editorial
              layouts, refined search, and practical admin tooling for modern
              property teams.
            </p>
          </div>
          <PropertySearchForm />
        </div>
        <div className="luxury-panel image-overlay soft-grid relative overflow-hidden p-6 sm:p-8">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.92),rgba(14,165,233,0.58),rgba(248,250,252,0.12))]" />
          <div className="relative grid h-full min-h-[480px] content-between gap-8 text-white">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-white/70">
                  Featured campaign
                </p>
                <h2 className="mt-3 max-w-sm font-serif text-5xl leading-none">
                  Skyline Penthouse
                </h2>
              </div>
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
                Manhattan
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-white/14 bg-white/10 p-5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.26em] text-white/65">
                  Signature detail
                </p>
                <p className="mt-3 text-lg leading-7">
                  Double-height skyline salon and rooftop terrace designed for private entertaining.
                </p>
              </div>
              <div className="rounded-[24px] border border-white/14 bg-[#1a1a1a]/25 p-5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.26em] text-white/65">
                  Market position
                </p>
                <p className="mt-3 text-lg leading-7">
                  Targeted for global buyers seeking design-forward downtown inventory.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell">
        <div className="luxury-panel grid gap-4 px-6 py-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[22px] bg-panel px-5 py-5">
              <p className="font-serif text-4xl">{stat.value}</p>
              <p className="text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <p className="eyebrow">Featured Listings</p>
            <h2 className="section-title">Property-first presentation from search through close.</h2>
          </div>
          <Link
            href="/listings"
            className="text-sm font-medium text-sky hover:text-foreground"
          >
            View all inventory
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} compact />
          ))}
        </div>
      </section>

      <section className="shell grid gap-6 lg:grid-cols-3">
        {neighborhoods.map((neighborhood) => (
          <div key={neighborhood.name} className="luxury-panel p-6">
            <p className="eyebrow">{neighborhood.name}</p>
            <h3 className="mt-3 font-serif text-3xl">{neighborhood.name}</h3>
            <p className="mt-4 text-sm leading-7 text-muted">{neighborhood.summary}</p>
          </div>
        ))}
      </section>

      <section className="shell">
        <div className="luxury-panel grid gap-8 overflow-hidden bg-foreground p-8 text-background lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-5">
            <p className="eyebrow">Lead Agent</p>
            <h2 className="font-serif text-5xl leading-none">
              A trusted advisor for design-led homes and discerning buyers.
            </h2>
            <p className="max-w-xl text-base leading-8 text-background/72">
              Olivia Bennett anchors the brand with white-glove service, sharp pricing strategy, and a calm transaction process that keeps premium sellers confident.
            </p>
            <Link
              href="/agents/olivia-bennett"
              className="inline-flex rounded-full bg-sky px-5 py-3 text-sm font-medium text-white hover:bg-background hover:text-foreground"
            >
              Meet Olivia
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              "Editorial launch strategy",
              "Qualified global buyer outreach",
              "Concierge-level showing flow",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-background/12 bg-background/6 p-5 text-sm leading-7 text-background/78"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
