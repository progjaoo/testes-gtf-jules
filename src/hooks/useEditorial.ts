// hooks/useEditorial.ts
import { useEffect, useState } from "react";
import { EditorialDTO, EditorialService } from "@/services/editorial/editorial.service";

export function useEditorialApi() {
  const [editorials, setEditorials] = useState<EditorialDTO[]>([]);

  useEffect(() => {
    EditorialService.buscarTodos().then(setEditorials);
  }, []);

  return editorials;
}
