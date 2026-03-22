import { formatCurrency } from "@/lib/format";
import { getLeads, getProperties } from "@/lib/site-data";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  const [properties, leads] = await Promise.all([getProperties(), getLeads()]);
  const activeListings = properties.filter((property) => property.status === "Active");
  const newEnquiries = leads.filter((lead) => lead.status === "New");

  return (
    <>
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Active listings", value: `${activeListings.length}` },
          { label: "New enquiries", value: `${newEnquiries.length}` },
          { label: "Views this week", value: "18.4K" },
          { label: "Pipeline value", value: formatCurrency(42895000) },
        ].map((card) => (
          <div key={card.label} className="luxury-panel p-6">
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-3 font-serif text-5xl">{card.value}</p>
          </div>
        ))}
      </section>

      <section className="luxury-panel p-6">
        <div className="mb-5">
          <p className="eyebrow">Recent Leads</p>
          <h1 className="font-serif text-4xl">Latest buyer activity</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-muted">
              <tr>
                <th className="border-b border-line px-3 py-3 font-medium">Lead</th>
                <th className="border-b border-line px-3 py-3 font-medium">Property</th>
                <th className="border-b border-line px-3 py-3 font-medium">Source</th>
                <th className="border-b border-line px-3 py-3 font-medium">Status</th>
                <th className="border-b border-line px-3 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="border-b border-line/60 px-3 py-4">
                    <p className="font-medium text-foreground">{lead.name}</p>
                    <p className="text-muted">{lead.email}</p>
                  </td>
                  <td className="border-b border-line/60 px-3 py-4 text-muted">
                    {properties.find((property) => property.slug === lead.propertySlug)?.title}
                  </td>
                  <td className="border-b border-line/60 px-3 py-4 text-muted">{lead.source}</td>
                  <td className="border-b border-line/60 px-3 py-4">
                    <span className="rounded-full bg-sky-soft px-3 py-1 text-xs font-medium text-sky">
                      {lead.status}
                    </span>
                  </td>
                  <td className="border-b border-line/60 px-3 py-4 text-muted">{lead.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
