import { AlgoliaListingsShell } from "@/app/_components/algolia-listings-shell";
import { getProperties } from "@/lib/site-data";

export const metadata = {
  title: "Listings",
};

export default async function ListingsPage() {
  const properties = await getProperties();

  return <AlgoliaListingsShell properties={properties} />;
}
