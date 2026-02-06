import axios from "axios";
import { type ProductsResponse, type Product } from "../types/product.types";

const API_BASE_URL = "https://api.oluwasetemi.dev";

const isValidProduct = (product: Product): boolean => {
  // Only filter out products with no price or out of stock
  return product.price > 0 && product.quantity > 0;
};

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

    // Filter out invalid products
    const validProducts = response.data.data.filter((product) => {
      const isValid = isValidProduct(product);
      if (!isValid) {
        console.log(`Filtered out: ${product.name}`, {
          price: product.price,
          quantity: product.quantity,
        });
      }
      return isValid;
    });

    console.log(`Total products fetched: ${response.data.data.length}`);
    console.log(`Valid products after filtering: ${validProducts.length}`);
    console.log(
      "Valid products:",
      validProducts.map((p) => ({
        name: p.name,
        price: p.price,
        quantity: p.quantity,
      })),
    );

    return {
      data: validProducts,
      meta: {
        total: validProducts.length,
        page: 1,
        limit: validProducts.length,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
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
