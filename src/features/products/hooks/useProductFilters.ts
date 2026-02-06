"use client";

import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export function useProductFilters() {
  const [filters, setFilters] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      limit: parseAsInteger.withDefault(10),
      search: parseAsString.withDefault(""),
      category: parseAsString,
    },
    { history: "push", shallow: false },
  );

  const setPage = (page: number) => setFilters({ page });
  const setLimit = (limit: number) => setFilters({ limit, page: 1 });
  const setSearch = (search: string) => setFilters({ search, page: 1 });
  const setCategory = (category: string | null) =>
    setFilters({ category, page: 1 });

  const clearFilters = () =>
    setFilters({
      page: 1,
      search: "",
      category: null,
    });

  const hasFilters = !!(filters.search || filters.category);

  return {
    filters: {
      page: filters.page,
      limit: filters.limit,
      search: filters.search,
      category: filters.category,
    },
    setPage,
    setLimit,
    setSearch,
    setCategory,
    clearFilters,
    hasFilters,
  };
}
