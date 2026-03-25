import { getLeads, getProperties } from "@/lib/site-data";

export const metadata = {
  title: "Enquiries Manager",
};

export default async function AdminEnquiriesPage() {
  const [leads, properties] = await Promise.all([getLeads(), getProperties()]);

  return (
    <section className="space-y-6">
      <div>
        <p className="eyebrow">Enquiries Manager</p>
        <h1 className="font-serif text-4xl">Lead follow-up board</h1>
      </div>
      <div className="grid gap-6">
        {leads.map((lead) => {
          const property = properties.find((item) => item.slug === lead.propertySlug);

          return (
            <article key={lead.id} className="luxury-panel p-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_240px]">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-foreground">{lead.name}</p>
                      <p className="text-sm text-muted">
                        {lead.email} • {lead.phone}
                      </p>
                    </div>
                    <span className="rounded-full bg-sky-soft px-3 py-1 text-xs font-medium text-sky">
                      {lead.status}
                    </span>
                  </div>
                  <div className="grid gap-3 text-sm text-muted sm:grid-cols-3">
                    <div className="rounded-[20px] bg-panel px-4 py-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-sky">Property</p>
                      <p className="mt-2 text-foreground">{property?.title}</p>
                    </div>
                    <div className="rounded-[20px] bg-panel px-4 py-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-sky">Source</p>
                      <p className="mt-2 text-foreground">{lead.source}</p>
                    </div>
                    <div className="rounded-[20px] bg-panel px-4 py-4">
                      <p className="text-xs uppercase tracking-[0.22em] text-sky">Created</p>
                      <p className="mt-2 text-foreground">{lead.createdAt}</p>
                    </div>
                  </div>
                  <label className="block space-y-2 text-sm font-medium">
                    Notes
                    <textarea
                      defaultValue={lead.notes}
                      rows={4}
                      className="w-full rounded-2xl border border-line bg-panel px-4 py-3 outline-none focus:border-sky"
                    />
                  </label>
                </div>
                <div className="rounded-[24px] bg-foreground p-5 text-background">
                  <p className="text-xs uppercase tracking-[0.28em] text-background/62">Follow up</p>
                  <p className="mt-3 text-sm leading-7 text-background/78">
                    Prepared for a CRM action bar or Supabase-backed status updates.
                  </p>
                  <div className="mt-5 space-y-2">
                    {["Schedule call", "Send brochure", "Update stage"].map((action) => (
                      <button
                        key={action}
                        className="w-full rounded-full border border-background/16 px-4 py-3 text-left text-sm hover:bg-background hover:text-foreground"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
