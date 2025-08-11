import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export type Coords = { lng: number; lat: number };

type LocationState = {
  coords: Coords | null;
  address: string | null;
  setLocation: (coords: Coords, address?: string | null) => void;
};

const LocationContext = createContext<LocationState | null>(null);

export const useLocation = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocation must be used within LocationProvider");
  return ctx;
};

const STORAGE_KEY = "foodie.location";

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setCoords(parsed.coords ?? null);
        setAddress(parsed.address ?? null);
      }
    } catch {}
  }, []);

  const setLocation: LocationState["setLocation"] = (c, a = null) => {
    setCoords(c);
    setAddress(a);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ coords: c, address: a }));
    } catch {}
    toast.success("Location updated", { description: a ?? `${c.lat.toFixed(3)}, ${c.lng.toFixed(3)}` });
  };

  const value = useMemo(() => ({ coords, address, setLocation }), [coords, address]);

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};
