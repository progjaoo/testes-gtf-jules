import { useEffect } from "react";
import { useStation } from "@/contexts/StationContext";

interface StationRouteProps {
  stationId: string; // ← agora é string
  children: React.ReactNode;
}

export function StationRoute({ stationId, children }: StationRouteProps) {
const { setStationById } = useStation();

useEffect(() => {
  setStationById(stationId);
}, [stationId, setStationById]);


  return <>{children}</>;
}