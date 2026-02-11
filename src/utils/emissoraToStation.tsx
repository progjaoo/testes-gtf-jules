import { EmissoraDTO } from "@/services/emissora/emissora.service";

export function emissoraToStation(emissora: EmissoraDTO) {
  const slug = emissora.nomeSocial
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace("rádio", "radio");

  return {
    id: slug,                 // ex: radio88fm
    name: emissora.nomeSocial,
    color: emissora.temaPrincipal,
    logo: emissora.logo,
    homePath: `/${slug}`,
    emissoraId: emissora.id,
  };
}