import axios from "axios";

const STRAPI_URL = "http://localhost:1337";

export const strapiApi = axios.create({
  baseURL: `${STRAPI_URL}/api`,
});

export interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Content: string;
  image?: { data: { attributes: { url: string } } };
}

export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export const StrapiService = {
  getArticles: async () => {
    const { data } = await strapiApi.get<StrapiResponse<StrapiArticle>>("/articles");
    return data.data;
  },

  getArticleById: async (id: string | number) => {
    const { data } = await strapiApi.get<{ data: StrapiArticle }>(`/articles/${id}`);
    return data.data;
  },
};
