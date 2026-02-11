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

const fallbackStations: Station[] = [
  {
    id: 1,
    nomeSocial: "Radio 88 FM",
    temaPrincipal: "#038CE4",
    slug: "radio88fm",
    ativa: true
  },
  {
    id: 2,
    nomeSocial: "Radio 89 Maravilha",
    temaPrincipal: "#FF8000",
    slug: "radio89maravilha",
    ativa: true
  },
  {
    id: 3,
    nomeSocial: "GTF News",
    temaPrincipal: "#000000",
    slug: "gtfnews",
    ativa: true
  }
];

interface StationContextType {
  stations: Station[];
  currentStation: Station | null;
  setStationById: (id: string | number) => void;
}

const StationContext = createContext<StationContextType | undefined>(undefined);

export function StationProvider({ children }: { children: React.ReactNode }) {
  const apiStations = useEmissoras();
  const stations = apiStations.length > 0 ? apiStations : fallbackStations;
  const [currentStation, setCurrentStation] = useState<Station | null>(null);

  useEffect(() => {
    if (stations.length && !currentStation) {
      setCurrentStation(stations[0]);
    }
  }, [stations, currentStation]);

  if (!currentStation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
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