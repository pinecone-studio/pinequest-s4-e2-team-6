"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { CircleMarker, Map as LMap, Polyline } from "leaflet";
import type { LatLngLine } from "@/lib/gems/useRoute";
import type { Coords } from "@/lib/gems/types";

type Props = { from: Coords; to: { lat: number; lng: number }; line: LatLngLine };

/** Leaflet route map with a dot that travels the polyline. The map is created
 *  once per gem and the route layers are swapped in place — never re-created on
 *  every render — which avoids Leaflet's `_leaflet_pos` teardown races. */
export function RouteMap({ from, to, line }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LMap | null>(null);
  const layers = useRef<(Polyline | CircleMarker)[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Create the map once for this gem.
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !ref.current || mapRef.current) return;
      const map = L.map(ref.current, { zoomControl: false, attributionControl: false }).setView([to.lat, to.lng], 8);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 17 }).addTo(map);
      L.circleMarker([to.lat, to.lng], { radius: 8, color: "#fff", weight: 2, fillColor: "#34e0a1", fillOpacity: 1 }).addTo(map);
      mapRef.current = map;
    })();
    return () => {
      cancelled = true;
      if (timer.current) clearTimeout(timer.current);
      mapRef.current?.remove();
      mapRef.current = null;
      layers.current = [];
    };
  }, [to.lat, to.lng]);

  // Swap the route + travelling dot whenever the line/origin changes.
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const L = (await import("leaflet")).default;
      const map = mapRef.current;
      if (cancelled || !map) return;
      if (timer.current) clearTimeout(timer.current);
      layers.current.forEach((l) => map.removeLayer(l));
      layers.current = [];
      if (!from || line.length < 2) {
        map.setView([to.lat, to.lng], 9, { animate: false });
        return;
      }
      const user = L.circleMarker([from.lat, from.lng], { radius: 7, color: "#fff", weight: 2, fillColor: "#6bcbff", fillOpacity: 1 }).addTo(map);
      const poly = L.polyline(line, { color: "#00658b", weight: 4, opacity: 0.9 }).addTo(map);
      map.fitBounds(poly.getBounds().pad(0.25), { animate: false });
      const mover = L.circleMarker(line[0], { radius: 5, color: "#fff", weight: 2, fillColor: "#ef7d3a", fillOpacity: 1 }).addTo(map);
      layers.current = [user, poly, mover];
      let i = 0;
      const step = () => {
        if (cancelled || !mapRef.current) return;
        i = (i + 1) % line.length;
        mover.setLatLng(line[i]);
        timer.current = setTimeout(step, 70);
      };
      step();
    })();
    return () => {
      cancelled = true;
      if (timer.current) clearTimeout(timer.current);
    };
  }, [from, line, to.lat, to.lng]);

  return <div ref={ref} className="h-60 w-full overflow-hidden rounded-2xl border border-white/15" />;
}
