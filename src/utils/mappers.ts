import { NewsItem } from "@/components/portal/NewsCard";
import { StrapiArticle } from "@/services/strapi.service";
import { EditorialType } from "@/contexts/EditorialContext";

export const mapStrapiArticleToNewsItem = (article: StrapiArticle): NewsItem => {
  return {
    id: article.id,
    titulo: article.title,
    subtitulo: article.description,
    imagem: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop", // Fallback image
    editoria: "noticias" as EditorialType, // Default editorial
    dataPublicacao: article.publishedAt,
  };
};
