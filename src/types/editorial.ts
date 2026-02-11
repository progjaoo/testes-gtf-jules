export interface TemaEditorial {
  id: number;
  descricao: string;
  corPrimaria: string;
  corSecundaria: string;
  corFonte: string;
  logo: string;
}

export interface Editorial {
  id: number;
  nome: string;
  slug: string;
  temaEditorial: TemaEditorial;
}
