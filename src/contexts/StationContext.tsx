import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
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

  // Inicializamos com a primeira estação disponível para evitar tela em branco
  const [currentStation, setCurrentStation] = useState<Station>(stations[0]);

  useEffect(() => {
    if (apiStations.length > 0) {
      // Se as estações carregarem da API, tentamos manter a selecionada ou pegamos a primeira da API
      const currentId = currentStation?.id;
      const currentSlug = currentStation?.slug;
      const found = apiStations.find(s => s.id === currentId || s.slug === currentSlug);
      if (found) {
        setCurrentStation(found);
      } else {
        setCurrentStation(apiStations[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiStations]);

  const setStationById = useCallback((id: string | number) => {
    const station = stations.find(station =>
      station.id.toString() === id.toString() || station.slug === id
    );
    if (station) {
      setCurrentStation(station);
    }
  }, [stations]);

  const value = useMemo(() => ({
    stations,
    currentStation,
    setStationById
  }), [stations, currentStation, setStationById]);

  return (
    <StationContext.Provider value={value}>
      {children}
    </StationContext.Provider>
  );
}


export const useStation = () => {
  const ctx = useContext(StationContext);
  if (!ctx) throw new Error("useStation must be used inside StationProvider");
  return ctx;
};