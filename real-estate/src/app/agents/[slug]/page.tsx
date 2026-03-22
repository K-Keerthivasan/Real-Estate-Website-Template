import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ContactForm } from "@/app/_components/contact-form";
import { PropertyCard } from "@/components/property-card";
import { agents, getAgentBySlug, getAgentListings } from "@/lib/site-data";

export async function generateStaticParams() {
  return agents.map((agent) => ({ slug: agent.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);
  return { title: agent ? `${agent.name} — Agent Profile` : "Agent Not Found" };
}

export default async function AgentProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = await getAgentBySlug(slug);

  if (!agent) {
    notFound();
  }

  const listings = await getAgentListings(slug);
  const initials = agent.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="shell space-y-10 py-14">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="luxury-panel image-overlay soft-grid flex min-h-[460px] items-end overflow-hidden p-8 text-white">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.32em] text-white/68">Agent profile</p>
            <h1 className="font-serif text-6xl leading-none">{agent.name}</h1>
            <p className="text-sm text-white/72">{agent.title}</p>
            <div className="flex gap-3 pt-2">
              <a
                href={`tel:${agent.phone}`}
                className="rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
              >
                {agent.phone}
              </a>
              <a
                href={`mailto:${agent.email}`}
                className="rounded-full bg-sky px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-[#1a1a1a]"
              >
                Email
              </a>
            </div>
          </div>
        </div>
        <div className="luxury-panel p-8">
          <div className="flex items-center gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[linear-gradient(135deg,#1a1a1a,#0ea5e9)] font-serif text-xl text-white"
              aria-hidden
            >
              {initials}
            </div>
            <div>
              <p className="eyebrow">About {agent.name.split(" ")[0]}</p>
              <p className="font-serif text-2xl">{agent.title}</p>
            </div>
          </div>
          <p className="mt-6 text-base leading-8 text-muted">{agent.bio}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {agent.statLine.map((item) => (
              <div key={item.label} className="rounded-[22px] bg-panel px-4 py-5">
                <p className="font-serif text-3xl">{item.value}</p>
                <p className="text-sm text-muted">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {agent.specialties.map((specialty) => (
              <span
                key={specialty}
                className="rounded-full border border-line px-4 py-2 text-sm text-muted"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="eyebrow">Active Listings</p>
            <h2 className="section-title">
              Current inventory under {agent.name.split(" ")[0]}&apos;s direction.
            </h2>
            <p className="text-sm text-muted">
              {listings.length} {listings.length === 1 ? "property" : "properties"} across all markets
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {listings.slice(0, 4).map((property) => (
              <PropertyCard key={property.id} property={property} compact />
            ))}
          </div>
        </div>
        <ContactForm
          title={`Connect with ${agent.name.split(" ")[0]}`}
          description="Reach out directly to discuss listings, valuations, or off-market opportunities."
          buttonLabel="Request consultation"
          agentEmail={agent.email}
        />
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <p className="eyebrow">Client Reviews</p>
          <h2 className="section-title">Proof of trust across sellers, buyers, and developers.</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {agent.reviews.map((review) => (
            <article key={review.id} className="luxury-panel p-6">
              <p className="font-serif text-3xl">&quot;</p>
              <p className="mt-3 text-sm leading-7 text-muted">{review.quote}</p>
              <div className="mt-6">
                <p className="font-medium">{review.name}</p>
                <p className="text-sm text-muted">{review.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
