import axios from "axios";
import { type ProductsResponse } from "../types/product.types";

const API_BASE_URL = "https://api.oluwasetemi.dev";

export const fetchProducts = async (): Promise<ProductsResponse> => {
  const response = await axios.get<ProductsResponse>(
    `${API_BASE_URL}/products`,
  );

  return response.data;
};
