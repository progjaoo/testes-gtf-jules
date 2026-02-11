// contexts/EditorialContext.tsx
import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { useEditorialApi } from "@/hooks/useEditorial";
import { EditorialDTO } from "@/services/editorial/editorial.service";

export type EditorialType = 'noticias' | 'nacional' | 'esportes' | 'negocios' | 'inovacao' | 'cultura' | 'servicos';

const fallbackEditorials: EditorialDTO[] = [
  { id: 1, nome: "Notícias", slug: "noticias", temaEditorialId: 1, emissoraId: 0, tema: { id: 1, descricao: "Notícias", corPrimaria: "#E83C25", corSecundaria: "", corFonte: "", logo: "" } },
  { id: 2, nome: "Nacional", slug: "nacional", temaEditorialId: 2, emissoraId: 0, tema: { id: 2, descricao: "Nacional", corPrimaria: "#000000", corSecundaria: "", corFonte: "", logo: "" } },
  { id: 3, nome: "Esportes", slug: "esportes", temaEditorialId: 3, emissoraId: 0, tema: { id: 3, descricao: "Esportes", corPrimaria: "#06AA48", corSecundaria: "", corFonte: "", logo: "" } },
  { id: 4, nome: "Negócios", slug: "negocios", temaEditorialId: 4, emissoraId: 0, tema: { id: 4, descricao: "Negócios", corPrimaria: "#FF8000", corSecundaria: "", corFonte: "", logo: "" } },
  { id: 5, nome: "Inovação", slug: "inovacao", temaEditorialId: 5, emissoraId: 0, tema: { id: 5, descricao: "Inovação", corPrimaria: "#42CF00", corSecundaria: "", corFonte: "", logo: "" } },
  { id: 6, nome: "Cultura", slug: "cultura", temaEditorialId: 6, emissoraId: 0, tema: { id: 6, descricao: "Cultura", corPrimaria: "#038CE4", corSecundaria: "", corFonte: "", logo: "" } },
  { id: 7, nome: "Serviços", slug: "servicos", temaEditorialId: 7, emissoraId: 0, tema: { id: 7, descricao: "Serviços", corPrimaria: "#FEC508", corSecundaria: "", corFonte: "", logo: "" } },
];

interface EditorialContextType {
  editorials: EditorialDTO[];
  currentEditorial: number | null;
  setEditorial: (id: number | null) => void;
  current: EditorialDTO | undefined;
}

const EditorialContext = createContext<EditorialContextType | null>(null);

export function EditorialProvider({ children }: { children: React.ReactNode }) {
  const apiEditorials = useEditorialApi();
  const editorials = apiEditorials.length > 0 ? apiEditorials : fallbackEditorials;
  const [currentEditorial, setCurrentEditorial] = useState<number | null>(editorials[0].id);

  const current = editorials.find(e => e.id === currentEditorial) || editorials[0];

  const setEditorial = useCallback((id: number | null) => {
    setCurrentEditorial(id);
  }, []);

  const value = useMemo(() => ({
    editorials,
    currentEditorial,
    setEditorial,
    current
  }), [editorials, currentEditorial, setEditorial, current]);

  return (
    <EditorialContext.Provider value={value}>
      {children}
    </EditorialContext.Provider>
  );
}

export const useEditorial = () => useContext(EditorialContext);
