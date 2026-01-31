import { useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import { useProductFilters } from "../hooks/useProductFilters";
import ProductFilters from "../components/ProductFilters";
import ProductGrid from "../components/ProductGrid";
import ProductSkeleton from "../components/ProductSkeleton";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  const { data: products, isLoading, isError, error, refetch } = useProducts();
  const {
    search,
    setSearch,
    category,
    setCategory,
    filterProducts,
    clearFilters,
    hasFilters,
  } = useProductFilters();

  // Get unique categories
  const categories = useMemo(() => {
    if (!products) return [];
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  // Apply filters
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return filterProducts(products);
  }, [products, filterProducts]);

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Failed to load products
        </h3>
        <p className="text-gray-500 mb-4">
          {error?.message || "Something went wrong"}
        </p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-gray-600">Browse our collection of products</p>
      </div>

      <ProductFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
        onClearFilters={clearFilters}
        hasFilters={hasFilters}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
}
