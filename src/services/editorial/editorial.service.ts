// services/editorial.service.ts
import { api } from "../api";

export interface EditorialDTO {
  id: number;
  nome: string;
  slug: string;
  temaEditorialId: number;
  emissoraId: number;
}

export const EditorialService = {
  buscarTodos: async () => {
    const { data } = await api.get<EditorialDTO[]>(
      "/api/editorial/buscarTodos"
    );
    return data;
  },

  buscarPorEmissora: async (emissoraId: number) => {
    const { data } = await api.get<EditorialDTO[]>(
      `/api/editorial/emissora/${emissoraId}`
    );
    return data;
  }
};