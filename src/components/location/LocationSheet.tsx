import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import MapboxMap from "./MapboxMap";
import { useLocation } from "@/context/LocationContext";
import { MapPin } from "lucide-react";
import { useCallback, useRef } from "react";
import mapboxgl from "mapbox-gl";

interface LocationSheetProps {
  children: React.ReactNode;
}

export const LocationSheet = ({ children }: LocationSheetProps) => {
  const { setLocation } = useLocation();
  const mapRef = useRef<mapboxgl.Map | null>(null);

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

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle>Set your delivery location</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-4">
          <MapboxMap onReady={onReady} />
        </div>
        <SheetFooter className="mt-4">
          <Button variant="hero" onClick={useMyLocation}>
            <MapPin className="mr-2" /> Use my current location
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
