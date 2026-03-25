import { formatCurrency } from "@/lib/format";
import { getProperties } from "@/lib/site-data";

export const metadata = {
  title: "Listings Manager",
};

export default async function AdminListingsPage() {
  const properties = await getProperties();

  return (
    <section className="luxury-panel p-6">
      <div className="mb-5">
        <p className="eyebrow">Listings Manager</p>
        <h1 className="font-serif text-4xl">Inventory control</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-muted">
            <tr>
              <th className="border-b border-line px-3 py-3 font-medium">Property</th>
              <th className="border-b border-line px-3 py-3 font-medium">Address</th>
              <th className="border-b border-line px-3 py-3 font-medium">Price</th>
              <th className="border-b border-line px-3 py-3 font-medium">Status</th>
              <th className="border-b border-line px-3 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id}>
                <td className="border-b border-line/60 px-3 py-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="h-14 w-18 rounded-2xl"
                      style={{ backgroundImage: `url(${property.images[0]?.url})`, backgroundSize: "cover", backgroundPosition: "center" }}
                    />
                    <div>
                      <p className="font-medium text-foreground">{property.title}</p>
                      <p className="text-muted">{property.type}</p>
                    </div>
                  </div>
                </td>
                <td className="border-b border-line/60 px-3 py-4 text-muted">{property.address}</td>
                <td className="border-b border-line/60 px-3 py-4 text-muted">
                  {formatCurrency(property.price)}
                </td>
                <td className="border-b border-line/60 px-3 py-4">
                  <span className="rounded-full bg-panel px-3 py-1 text-xs font-medium text-foreground">
                    {property.status}
                  </span>
                </td>
                <td className="border-b border-line/60 px-3 py-4">
                  <div className="flex gap-2">
                    <button className="rounded-full border border-line px-3 py-2 hover:border-sky hover:text-sky">
                      Edit
                    </button>
                    <button className="rounded-full border border-line px-3 py-2 hover:border-sky hover:text-sky">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
