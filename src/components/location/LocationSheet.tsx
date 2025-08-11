import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MapboxMap from "./MapboxMap";
import { useLocation } from "@/context/LocationContext";
import { MapPin } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

const TOKEN_KEY = "foodie.mapbox_token";

interface LocationSheetProps {
  children: React.ReactNode;
}

export const LocationSheet = ({ children }: LocationSheetProps) => {
  const { setLocation } = useLocation();
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      const t = localStorage.getItem(TOKEN_KEY);
      if (t) setToken(t);
    } catch {}
  }, []);

  const onReady = useCallback((map: mapboxgl.Map) => {
    mapRef.current = map;
  }, []);

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lng: pos.coords.longitude, lat: pos.coords.latitude };
        setLocation(coords, null);
        if (mapRef.current) {
          mapRef.current.flyTo({ center: [coords.lng, coords.lat], zoom: 13 });
          new mapboxgl.Marker().setLngLat([coords.lng, coords.lat]).addTo(mapRef.current);
        }
      },
      () => {
        // ignore errors silently
      }
    );
  };

  const saveToken = () => {
    if (!token) return;
    try { localStorage.setItem(TOKEN_KEY, token); } catch {}
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle>Set your delivery location</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">
            <Input
              placeholder="Enter Mapbox public token (pk_...)"
              value={token ?? ""}
              onChange={(e) => setToken(e.target.value)}
            />
            <Button variant="outline" onClick={saveToken}>Save token</Button>
          </div>
          <p className="text-xs text-muted-foreground">Get your token from mapbox.com &gt; Tokens.</p>
          <MapboxMap onReady={onReady} token={token} />
        </div>
        <SheetFooter className="mt-4">
          <Button variant="hero" onClick={useMyLocation} disabled={!token}>
            <MapPin className="mr-2" /> Use my current location
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
