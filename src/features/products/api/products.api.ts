import axios from "axios";
import { type ProductsResponse } from "../types/product.types";

const API_BASE_URL = "https://api.oluwasetemi.dev";

export const fetchProducts = async (): Promise<ProductsResponse> => {
  try {
    const response = await axios.get<ProductsResponse>(
      `${API_BASE_URL}/products?page=1&limit=10`,
    );

    if (!response.data?.data) {
      return {
        data: [],
        meta: {
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      data: [],
      meta: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
};
