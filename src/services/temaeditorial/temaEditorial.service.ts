// services/temaEditorial.service.ts
import { api } from "../api";

export interface TemaEditorial {
  id: number;
  descricao: string;
  corPrimaria: string;
  corSecundaria: string;
  corFonte: string;
  logo: string;
}


export const TemaEditorialService = {
  buscarTodos: async () => {
    const { data } = await api.get<TemaEditorial[]>(
      "/api/tema-editorial/buscarTodos"
    );
    return data;
  },

  buscarPorId: async (id: number) => {
    const { data } = await api.get<TemaEditorial>(
      `/api/tema-editorial/${id}`
    );
    return data;
  },
};