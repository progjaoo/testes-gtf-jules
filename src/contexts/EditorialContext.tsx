// contexts/EditorialContext.tsx
import React, { createContext, useContext, useState } from "react";
import { useEditorialApi } from "@/hooks/useEditorial";

const EditorialContext = createContext<any>(null);

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
