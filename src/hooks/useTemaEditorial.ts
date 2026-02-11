// hooks/useTemaEditorial.ts
import { useEffect, useState } from "react";
import { TemaEditorialDTO, TemaEditorialService } from "@/services/temaeditorial/temaEditorial.service";

export function useTemaEditorial() {
  const [temas, setTemas] = useState<TemaEditorialDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    TemaEditorialService.buscarTodos()
      .then(setTemas)
      .finally(() => setLoading(false));
  }, []);

  return { temas, loading };
}
