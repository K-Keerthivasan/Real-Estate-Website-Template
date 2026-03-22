/**
 * Algolia Sync — Supabase Edge Function
 *
 * Triggered by a Supabase Database Webhook on the `properties` table.
 * Pushes INSERT / UPDATE / DELETE events to Algolia.
 *
 * Deploy:
 *   supabase functions deploy algolia-sync
 *
 * Set secrets:
 *   supabase secrets set ALGOLIA_APP_ID=<your-app-id>
 *   supabase secrets set ALGOLIA_ADMIN_KEY=<your-admin-key>
 *   supabase secrets set ALGOLIA_INDEX=properties
 *
 * Create the Database Webhook in the Supabase dashboard:
 *   Table: properties  |  Events: INSERT, UPDATE, DELETE
 *   HTTP Request → POST → https://<project>.supabase.co/functions/v1/algolia-sync
 */

Deno.serve(async (req: Request) => {
  const secret = Deno.env.get("WEBHOOK_SECRET");
  if (secret) {
    const sig = req.headers.get("x-webhook-signature");
    if (sig !== secret) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  const appId = Deno.env.get("ALGOLIA_APP_ID");
  const adminKey = Deno.env.get("ALGOLIA_ADMIN_KEY");
  const indexName = Deno.env.get("ALGOLIA_INDEX") ?? "properties";

  if (!appId || !adminKey) {
    return new Response("Algolia credentials not set", { status: 500 });
  }

  type WebhookPayload = {
    type: "INSERT" | "UPDATE" | "DELETE";
    table: string;
    record: Record<string, unknown> | null;
    old_record: Record<string, unknown> | null;
  };

  let payload: WebhookPayload;
  try {
    payload = (await req.json()) as WebhookPayload;
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const algoliaBase = `https://${appId}-dsn.algolia.net/1/indexes/${indexName}`;
  const headers = {
    "X-Algolia-Application-Id": appId,
    "X-Algolia-API-Key": adminKey,
    "Content-Type": "application/json",
  };

  if (payload.type === "DELETE") {
    const objectId = (payload.old_record?.id as string | undefined) ?? "";
    if (!objectId) return new Response("No record id", { status: 400 });

    await fetch(`${algoliaBase}/${objectId}`, { method: "DELETE", headers });
    return Response.json({ deleted: objectId });
  }

  const record = payload.record;
  if (!record) return new Response("No record", { status: 400 });

  // Shape the Algolia object — expose only what search UI needs
  const algoliaObject = {
    objectID: record.id as string,
    slug: record.slug,
    title: record.title,
    address: record.address,
    city: record.city,
    state: record.state,
    neighborhood: record.neighborhood,
    type: record.type,
    price: record.price,
    beds: record.beds,
    baths: record.baths,
    sqft: record.sqft,
    status: record.status,
    description: record.description,
    features: record.features,
    hero_label: record.hero_label,
    _geoloc: record.lat && record.lng
      ? { lat: record.lat as number, lng: record.lng as number }
      : undefined,
    updatedAt: record.updated_at,
  };

  const res = await fetch(`${algoliaBase}/${record.id as string}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(algoliaObject),
  });

  const result = await res.json();
  return Response.json(result, { status: res.status });
});
