import { useState, useMemo } from "react";
import { type Product } from "../types/product.types";
import { useDebounce } from "@/hooks/useDebounce";

export const useProductFilters = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search, 300);

  const filterProducts = useMemo(() => {
    return (products: Product[]) => {
      return products.filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase());
        const matchesCategory = !category || product.category === category;
        return matchesSearch && matchesCategory;
      });
    };
  }, [debouncedSearch, category]);

  const clearFilters = () => {
    setSearch("");
    setCategory(null);
  };

  return {
    search,
    setSearch,
    category,
    setCategory,
    filterProducts,
    clearFilters,
    hasFilters: !!search || !!category,
  };
};
