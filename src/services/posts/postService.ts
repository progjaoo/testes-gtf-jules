import { strapiApi } from "../strapi.service";

export async function getArticles() {
  const response = await strapiApi.get("/articles");
  return response.data.data;
}

export async function getArticleById(id: number) {
  const response = await strapiApi.get(`/articles/${id}`);
  return response.data.data;
}