import { useEffect } from "react";
import { useStation } from "@/contexts/StationContext";
import { useParams } from "react-router-dom";

interface StationRouteProps {
  stationId?: string;
  children: React.ReactNode;
}

export function StationRoute({ stationId, children }: StationRouteProps) {
  const { setStationById } = useStation();
  const { slug } = useParams();

  const activeId = stationId || slug;

  useEffect(() => {
    if (activeId) {
      setStationById(activeId);
    }
  }, [activeId, setStationById]);


  return <>{children}</>;
}