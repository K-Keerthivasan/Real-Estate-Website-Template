import { Metadata } from "next";
import { FavoritesShell } from "@/app/_components/favorites-shell";
import { getProperties } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Saved Properties",
};

export default async function FavoritesPage() {
  const properties = await getProperties();
  return <FavoritesShell properties={properties} />;
}
