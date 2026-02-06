import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products.api";

interface UseProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string | null;
}

export const useProducts = (params: UseProductsParams = {}) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => fetchProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
