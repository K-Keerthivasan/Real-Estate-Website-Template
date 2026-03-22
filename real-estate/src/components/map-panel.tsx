"use client";

import { useCallback, useRef, useState } from "react";
import Map, { Layer, NavigationControl, Popup, Source } from "react-map-gl/mapbox";
import type { MapRef, MapMouseEvent } from "react-map-gl/mapbox";
import type { GeoJSON } from "geojson";
import type { Property } from "@/lib/site-data";
import { formatCurrency } from "@/lib/format";
import "mapbox-gl/dist/mapbox-gl.css";

type MapPanelProps = {
  properties: Property[];
  activeId?: string | null;
  onPropertyClick?: (id: string) => void;
};

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function MapPanel({ properties, activeId, onPropertyClick }: MapPanelProps) {
  const mapRef = useRef<MapRef>(null);
  const [popupProperty, setPopupProperty] = useState<Property | null>(null);

  const geojson: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: properties.map((p) => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: [p.lng, p.lat] },
      properties: { id: p.id, title: p.title, price: p.price, slug: p.slug },
    })),
  };

  const handleMapClick = useCallback(
    (event: MapMouseEvent) => {
      const features = event.features;
      if (!features?.length) {
        setPopupProperty(null);
        return;
      }
      const feature = features[0];
      if (!feature.properties) return;

      // Cluster click → zoom in
      if (feature.properties.cluster_id) {
        const clusterId = feature.properties.cluster_id as number;
        const mapboxSource = mapRef.current?.getSource("properties") as {
          getClusterExpansionZoom(id: number, cb: (err: unknown, zoom: number) => void): void;
        } | undefined;
        mapboxSource?.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;
          const geometry = feature.geometry;
          if (geometry.type === "Point") {
            mapRef.current?.easeTo({ center: geometry.coordinates as [number, number], zoom });
          }
        });
        return;
      }

      // Individual pin click
      const id = feature.properties.id as string;
      const clicked = properties.find((p) => p.id === id);
      if (clicked) {
        setPopupProperty(clicked);
        onPropertyClick?.(id);
        mapRef.current?.easeTo({ center: [clicked.lng, clicked.lat], zoom: 14 });
      }
    },
    [properties, onPropertyClick],
  );

  if (!MAPBOX_TOKEN) {
    return (
      <div className="luxury-panel sticky top-28 overflow-hidden p-5">
        <div className="mb-4">
          <p className="eyebrow">Mapbox</p>
          <h3 className="font-serif text-3xl">Map Preview</h3>
        </div>
        <div className="flex h-[560px] items-center justify-center rounded-[24px] border border-line bg-panel">
          <div className="space-y-2 text-center">
            <p className="text-sm font-medium text-foreground">No Mapbox token configured</p>
            <p className="text-xs text-muted">Add NEXT_PUBLIC_MAPBOX_TOKEN to .env.local</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="luxury-panel sticky top-28 overflow-hidden p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="eyebrow">Interactive Map</p>
          <h3 className="font-serif text-3xl">{properties.length} Listings</h3>
        </div>
        <div className="rounded-full bg-sky-soft px-3 py-1 text-xs font-medium text-sky">
          Mapbox GL
        </div>
      </div>
      <div className="relative h-[560px] overflow-hidden rounded-[24px]">
        <Map
          ref={mapRef}
          mapboxAccessToken={MAPBOX_TOKEN}
          initialViewState={{ longitude: -95, latitude: 37, zoom: 3.5 }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          interactiveLayerIds={["clusters", "unclustered-point"]}
          onClick={handleMapClick}
        >
          <NavigationControl position="top-right" />

          <Source
            id="properties"
            type="geojson"
            data={geojson}
            cluster
            clusterMaxZoom={14}
            clusterRadius={50}
          >
            {/* Cluster circles */}
            <Layer
              id="clusters"
              type="circle"
              filter={["has", "point_count"]}
              paint={{
                "circle-color": "#0ea5e9",
                "circle-radius": ["step", ["get", "point_count"], 18, 5, 24, 10, 30],
                "circle-opacity": 0.9,
              }}
            />
            {/* Cluster count labels */}
            <Layer
              id="cluster-count"
              type="symbol"
              filter={["has", "point_count"]}
              layout={{
                "text-field": "{point_count_abbreviated}",
                "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
                "text-size": 13,
              }}
              paint={{ "text-color": "#ffffff" }}
            />
            {/* Individual pins */}
            <Layer
              id="unclustered-point"
              type="circle"
              filter={["!", ["has", "point_count"]]}
              paint={{
                "circle-color": [
                  "case",
                  ["==", ["get", "id"], activeId ?? ""],
                  "#1a1a1a",
                  "#0ea5e9",
                ],
                "circle-radius": 10,
                "circle-stroke-width": 3,
                "circle-stroke-color": "#ffffff",
              }}
            />
          </Source>

          {popupProperty && (
            <Popup
              longitude={popupProperty.lng}
              latitude={popupProperty.lat}
              anchor="bottom"
              onClose={() => setPopupProperty(null)}
              closeButton
              maxWidth="220px"
            >
              <div className="space-y-1 p-1">
                <p className="text-xs font-medium uppercase tracking-wide text-[#0ea5e9]">
                  {popupProperty.neighborhood}
                </p>
                <p className="font-serif text-base leading-tight text-[#1a1a1a]">
                  {popupProperty.title}
                </p>
                <p className="text-sm font-semibold text-[#1a1a1a]">
                  {formatCurrency(popupProperty.price)}
                </p>
                <a
                  href={`/properties/${popupProperty.slug}`}
                  className="mt-2 block rounded-full bg-[#0ea5e9] px-3 py-1.5 text-center text-xs font-medium text-white"
                >
                  View property
                </a>
              </div>
            </Popup>
          )}
        </Map>
      </div>
    </div>
  );
}
