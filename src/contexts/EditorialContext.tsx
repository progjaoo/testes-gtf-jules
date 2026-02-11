// contexts/EditorialContext.tsx
import React, { createContext, useContext, useState } from "react";
import { useEditorialApi } from "@/hooks/useEditorial";
import { EditorialDTO } from "@/services/editorial/editorial.service";

export type EditorialType = 'noticias' | 'nacional' | 'esportes' | 'negocios' | 'inovacao' | 'cultura' | 'servicos';

interface EditorialContextType {
  editorials: EditorialDTO[];
  currentEditorial: number | null;
  setEditorial: (id: number | null) => void;
  current: EditorialDTO | undefined;
}

const EditorialContext = createContext<EditorialContextType | null>(null);

export function EditorialProvider({ children }: { children: React.ReactNode }) {
  const editorials = useEditorialApi();
  const [currentEditorial, setCurrentEditorial] = useState<number | null>(null);

  const current = editorials.find(e => e.id === currentEditorial);

  return (
    <EditorialContext.Provider value={{
      editorials,
      currentEditorial,
      setEditorial: setCurrentEditorial,
      current
    }}>
      {children}
    </EditorialContext.Provider>
  );
}

export const useEditorial = () => useContext(EditorialContext);
