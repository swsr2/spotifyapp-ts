import { CategoryListResponse } from "../models/category";
import api from "../utils/api";

export const getCategories = async (): Promise<CategoryListResponse> => {
  try {
    const response = await api.get(`/browse/categories?country=ko_KR&limit=20`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch category");
  }
};
