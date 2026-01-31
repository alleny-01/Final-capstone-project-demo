import { useCartStore } from "../stores/useCartStore";
import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items } = useCartStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <Drawer open={open} onClose={onClose} title="Shopping Cart">
        <div className="p-6 text-center bg-white">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Your cart is empty
          </h3>
          <p className="text-gray-500 mb-6">Add some products to get started</p>
          <Button onClick={onClose} className="w-full">
            Continue Shopping
          </Button>
        </div>
      </Drawer>
    );
  }

  return (
    <Drawer open={open} onClose={onClose} title="Shopping Cart">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b bg-white">
          <p className="text-sm text-gray-600">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-white">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50">
          <CartSummary />
          <Button onClick={handleCheckout} className="w-full mt-4" size="lg">
            Proceed to Checkout
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
