// hooks/useEmissora.ts
import { useQuery } from "@tanstack/react-query";
import { EmissoraService } from "@/services/emissora/emissora.service";
import { Station } from "@/contexts/StationContext";

export function useEmissoras(): Station[] {
  const { data = [] } = useQuery({
    queryKey: ["emissoras"],
    queryFn: EmissoraService.buscarTodos
  });

  return data;
}
