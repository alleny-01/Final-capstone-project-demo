import { useProducts } from "../hooks/useProducts";
import ProductGrid from "../components/ProductGrid";
import ProductSkeleton from "../components/ProductSkeleton";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

export default function ProductsPage() {
  const { data, isLoading, isError, error, refetch } = useProducts();

  const displayProducts = useMemo(() => {
    if (!data?.data) return [];
    return data.data.slice(0, 10);
  }, [data]);

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
    <div className="space-y-6 animate-fade-in">
      <div className="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-200 animate-fade-in-up">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full -mr-32 -mt-32 opacity-50" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-50 rounded-full -ml-24 -mb-24 opacity-50" />
        <div className="relative p-8 md:p-12">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-1 w-12 bg-red-600 rounded-full" />
            <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">
              Our Collection
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Discover Our Products
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl">
            Explore our curated collection of{" "}
            <span className="font-semibold text-red-600">
              {displayProducts.length} premium products
            </span>
            . Find exactly what you're looking for.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : (
        <ProductGrid products={displayProducts} />
      )}
    </div>
  );
}
