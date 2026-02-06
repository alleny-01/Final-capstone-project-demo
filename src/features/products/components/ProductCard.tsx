import { type Product } from "../types/product.types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/features/cart/stores/useCartStore";
import { formatCurrency } from "@/features/cart/utils/cart-calculations";
import { ShoppingCart, ImageOff } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const isOutOfStock = product.quantity === 0;

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addItem(product);
    }
  };

  const getProductImage = (images: string): string | null => {
    try {
      const parsed = JSON.parse(images);
      if (
        Array.isArray(parsed) &&
        parsed.length > 0 &&
        parsed[0] !== "https://placehold.net/default.png"
      ) {
        return parsed[0];
      }
      return null;
    } catch {
      if (images && images !== "https://placehold.net/default.png") {
        return images;
      }
      return null;
    }
  };

  const imageUrl = getProductImage(product.images);

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-200 bg-white flex flex-col h-full animate-fade-in">
      <div className="aspect-square relative overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <ImageOff className="w-16 h-16 text-gray-300" />
          </div>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="error" className="text-sm font-semibold px-4 py-2">
              Out of Stock
            </Badge>
          </div>
        )}
        {product.featured && !isOutOfStock && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-yellow-500 text-white border-0 shadow-lg font-semibold hover:bg-yellow-600">
              ⭐ Featured
            </Badge>
          </div>
        )}
        {!isOutOfStock && product.quantity < 10 && (
          <div className="absolute top-3 left-3">
            <Badge variant="error" className="shadow-lg font-semibold">
              Only {product.quantity} left!
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-5 flex-1 flex flex-col">
        {product.category && (
          <Badge
            variant="default"
            className="mb-3 bg-red-100 text-red-700 hover:bg-red-200 border-0 w-fit"
          >
            {product.category}
          </Badge>
        )}
        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-600 transition-colors min-h-14">
          {product.name.replace(/_/g, " ")}
        </h3>
        {product.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed min-h-10">
            {product.description}
          </p>
        )}
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-2">
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(product.price)}
            </p>
            {product.compareAtPrice && (
              <p className="text-sm text-gray-400 line-through">
                {formatCurrency(product.compareAtPrice)}
              </p>
            )}
          </div>
          <p className="text-xs text-gray-500 font-medium">
            {isOutOfStock ? "Out of stock" : `${product.quantity} in stock`}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0 mt-auto">
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="w-full h-11 bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          size="lg"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
