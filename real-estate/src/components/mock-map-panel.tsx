export function MockMapPanel() {
  return (
    <div className="luxury-panel sticky top-28 overflow-hidden p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="eyebrow">Mapbox Preview</p>
          <h3 className="font-serif text-3xl">Interactive Map Placeholder</h3>
        </div>
        <div className="rounded-full bg-sky-soft px-3 py-1 text-xs font-medium text-sky">
          Mocked
        </div>
      </div>
      <div className="soft-grid relative h-[560px] overflow-hidden rounded-[24px] border border-white/30 bg-[linear-gradient(135deg,#0f172a_0%,#0ea5e9_55%,#f8fafc_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(255,255,255,0.4),transparent_20%),radial-gradient(circle_at_70%_40%,rgba(255,255,255,0.32),transparent_18%),radial-gradient(circle_at_45%_70%,rgba(255,255,255,0.3),transparent_16%)]" />
        <div className="absolute left-8 top-8 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1a1a1a]">
          Downtown Luxury Radius
        </div>
        <div className="absolute left-[18%] top-[26%] h-4 w-4 rounded-full border-4 border-white bg-sky shadow-lg" />
        <div className="absolute left-[58%] top-[44%] h-4 w-4 rounded-full border-4 border-white bg-[#1a1a1a] shadow-lg" />
        <div className="absolute left-[36%] top-[62%] h-4 w-4 rounded-full border-4 border-white bg-sky shadow-lg" />
        <div className="absolute bottom-8 left-8 max-w-sm rounded-[24px] bg-white/88 p-4 text-sm leading-6 text-muted shadow-xl backdrop-blur">
          Designed for `react-map-gl` or raw Mapbox wiring later. This template reserves the layout and visual treatment without requiring map credentials.
        </div>
      </div>
    </div>
  );
}
