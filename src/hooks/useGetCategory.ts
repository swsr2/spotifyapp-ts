import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../apis/categoryApi";
import { CategoryListResponse } from "../models/category";

const useGetCategory = () => {
  return useQuery<CategoryListResponse>({
    queryKey: ["category"],
    queryFn: getCategories,
  });
};

export default useGetCategory;
