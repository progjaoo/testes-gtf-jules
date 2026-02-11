import { createContext, useContext, useEffect, useState } from "react";
import { useEmissoras } from "@/hooks/useEmissora";

export interface Station {
  id: number;
  nomeSocial: string;
  temaPrincipal: string;
  slug: string; 
  logo?: string;
  ativa: boolean;
}

interface StationContextType {
  stations: Station[];
  currentStation: Station | null;
  setStationById: (id: string | number) => void;
}

const StationContext = createContext<StationContextType | undefined>(undefined);

export function StationProvider({ children }: { children: React.ReactNode }) {
  const stations = useEmissoras();
  const [currentStation, setCurrentStation] = useState<Station | null>(null);

  useEffect(() => {
    if (stations.length && !currentStation) {
      setCurrentStation(stations[0]);
    }
  }, [stations]);

  if (!currentStation) {
    return <div />; // ou um Loader
  }

  return (
    <StationContext.Provider value={{
      stations,
      currentStation,
      setStationById(id) {
        const station = stations.find(station =>
          station.id.toString() === id.toString() || station.slug === id
        );
        if (station) {
          setCurrentStation(station);
        }
      },
    }}>
      {children}
    </StationContext.Provider>
  );
}


export const useStation = () => {
  const ctx = useContext(StationContext);
  if (!ctx) throw new Error("useStation must be used inside StationProvider");
  return ctx;
};