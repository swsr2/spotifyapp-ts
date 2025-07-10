import { Image } from "./commonType";

export interface CategoryItem {
  href: string;
  icons: Image[];
  id: string;
  name: string;
}
export interface CategoryList {
  href: string;
  items: CategoryItem[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}
export interface CategoryListResponse {
  categories: CategoryList;
}
