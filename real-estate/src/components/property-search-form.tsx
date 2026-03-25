export function PropertySearchForm() {
  return (
    <form
      action="/listings"
      className="luxury-panel grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto]"
    >
      <label className="space-y-2 text-sm font-medium text-foreground">
        Location
        <input
          type="text"
          name="location"
          placeholder="Tribeca, Beverly Hills, Miami Beach"
          className="w-full rounded-2xl border border-line bg-panel px-4 py-3 text-sm outline-none placeholder:text-muted/70 focus:border-sky"
        />
      </label>
      <label className="space-y-2 text-sm font-medium text-foreground">
        Property type
        <select
          name="type"
          className="w-full rounded-2xl border border-line bg-panel px-4 py-3 text-sm outline-none focus:border-sky"
          defaultValue=""
        >
          <option value="">Any type</option>
          <option value="Penthouse">Penthouse</option>
          <option value="Condo">Condo</option>
          <option value="Townhome">Townhome</option>
          <option value="Villa">Villa</option>
          <option value="Estate">Estate</option>
        </select>
      </label>
      <label className="space-y-2 text-sm font-medium text-foreground">
        Price range
        <select
          name="price"
          className="w-full rounded-2xl border border-line bg-panel px-4 py-3 text-sm outline-none focus:border-sky"
          defaultValue=""
        >
          <option value="">Any range</option>
          <option value="0-3000000">Up to $3M</option>
          <option value="3000000-6000000">$3M to $6M</option>
          <option value="6000000-10000000">$6M to $10M</option>
          <option value="10000000-99999999">$10M+</option>
        </select>
      </label>
      <button
        type="submit"
        className="mt-auto rounded-2xl bg-foreground px-5 py-3 text-sm font-medium text-background hover:bg-sky hover:text-white"
      >
        Search
      </button>
    </form>
  );
}
