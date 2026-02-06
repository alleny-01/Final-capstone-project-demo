import axios from "axios";
import { type ProductsResponse } from "../types/product.types";

const API_BASE_URL = "https://api.oluwasetemi.dev";

interface FetchProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string | null;
}

export const fetchProducts = async (
  params: FetchProductsParams = {},
): Promise<ProductsResponse> => {
  const { page = 1, limit = 10, search = "", category } = params;

  const queryParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search) {
    queryParams.append("search", search);
  }

  if (category) {
    queryParams.append("category", category);
  }

  const response = await axios.get<ProductsResponse>(
    `${API_BASE_URL}/products?${queryParams.toString()}`,
  );

  return response.data;
};
