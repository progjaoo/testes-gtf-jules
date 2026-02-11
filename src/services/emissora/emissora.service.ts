// services/emissora.service.ts
import { api } from "../api";

export interface EmissoraDTO {
  id: number;
  nomeSocial: string;
  temaPrincipal: string;
  logo: string;
  ativa: boolean;
}

export const EmissoraService = {
  buscarTodos: async () => {
    const { data } = await api.get<EmissoraDTO[]>(
      "/api/emissora/buscarPorId"
    );
    return data;
  },
};
