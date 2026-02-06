import { type CartItem as CartItemType } from "../types/cart.types";
import { useCartStore } from "../stores/useCartStore";
import { formatCurrency } from "../utils/cart-calculations";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ImageOff } from "lucide-react";
import { toast } from "react-hot-toast";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const subtotal = item.product.price * item.quantity;

  const handleIncrement = () => {
    if (item.quantity < item.product.stock) {
      updateQuantity(item.product.id, item.quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.product.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeItem(item.product.id);
    toast.success(`${item.product.name} removed from cart`);
  };

  const isPlaceholderImage =
    !item.product.image ||
    item.product.image === "https://placehold.net/default.png" ||
    item.product.image.includes("placehold");

  return (
    <div className="flex gap-4 py-4 border-b">
      {isPlaceholderImage ? (
        <div className="w-20 h-20 rounded bg-gray-100 flex items-center justify-center shrink-0">
          <ImageOff className="w-8 h-8 text-gray-300" />
        </div>
      ) : (
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-20 h-20 object-cover rounded shrink-0"
        />
      )}
      <div className="flex-1">
        <h4 className="font-semibold text-sm mb-1">{item.product.name}</h4>
        <p className="text-sm text-gray-600 mb-2">
          {formatCurrency(item.product.price)}
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDecrement}
            disabled={item.quantity <= 1}
            className="h-8 w-8 p-0"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium w-8 text-center">
            {item.quantity}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleIncrement}
            disabled={item.quantity >= item.product.stock}
            className="h-8 w-8 p-0"
          >
            <Plus className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="ml-auto text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold">{formatCurrency(subtotal)}</p>
      </div>
    </div>
  );
}
