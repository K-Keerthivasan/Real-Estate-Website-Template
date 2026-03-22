import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/app/_components/contact-form";
import { PropertyGallery } from "@/app/_components/property-gallery";
import { PropertyCard } from "@/components/property-card";
import { FavoriteButton } from "@/components/favorite-button";
import { formatCurrency, formatNumber } from "@/lib/format";
import {
  agents,
  getPropertyBySlug,
  getSimilarProperties,
  properties,
} from "@/lib/site-data";

export async function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const agent = agents.find((item) => item.slug === property.agentSlug);
  const similarProperties = await getSimilarProperties(property);

  return (
    <div className="shell space-y-10 py-14">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="eyebrow">{property.neighborhood}</p>
          <h1 className="section-title">{property.title}</h1>
          <p className="text-base text-muted">{property.address}</p>
        </div>
        <div className="flex items-end gap-4">
          <div className="space-y-2 rounded-[28px] border border-line bg-background px-6 py-5">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky">
              Offered at
            </p>
            <p className="font-serif text-5xl">{formatCurrency(property.price)}</p>
          </div>
          <FavoriteButton propertyId={property.id} className="h-11 w-11" />
        </div>
      </div>

      <PropertyGallery images={property.images} title={property.title} />

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-8">
          <div className="luxury-panel grid gap-4 p-6 sm:grid-cols-4">
            {[
              `${property.beds} Beds`,
              `${property.baths} Baths`,
              `${formatNumber(property.sqft)} Sqft`,
              `${property.yearBuilt}`,
            ].map((item) => (
              <div key={item} className="rounded-[22px] bg-panel px-4 py-5 text-center text-sm font-medium text-muted">
                {item}
              </div>
            ))}
          </div>

          <div className="luxury-panel p-8">
            <p className="eyebrow">Overview</p>
            <p className="mt-4 text-base leading-8 text-muted">{property.description}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {property.features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-[22px] border border-line bg-panel px-4 py-4 text-sm text-muted"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {agent ? (
            <div className="luxury-panel p-6">
              <p className="eyebrow">Listing Agent</p>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex h-18 w-18 items-center justify-center rounded-[24px] bg-[linear-gradient(135deg,#1a1a1a,#0ea5e9)] text-2xl font-serif text-white">
                  OB
                </div>
                <div>
                  <h3 className="font-serif text-3xl">{agent.name}</h3>
                  <p className="text-sm text-muted">{agent.title}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted">{agent.intro}</p>
              <div className="mt-5 space-y-2 text-sm text-muted">
                <p>{agent.phone}</p>
                <p>{agent.email}</p>
              </div>
              <Link
                href={`/agents/${agent.slug}`}
                className="mt-5 inline-flex rounded-full border border-line px-4 py-2 text-sm font-medium hover:border-sky hover:text-sky"
              >
                View profile
              </Link>
            </div>
          ) : null}

          <ContactForm
            title="Book a private showing"
            description="Reach out to arrange a private tour or request additional information about this property."
            buttonLabel="Send inquiry"
            propertySlug={property.slug}
            agentEmail={agent?.email}
          />
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <p className="eyebrow">Similar Properties</p>
          <h2 className="section-title">Buyers viewing this home also shortlist.</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {similarProperties.map((item) => (
            <PropertyCard key={item.id} property={item} compact />
          ))}
        </div>
      </section>
    </div>
  );
}
