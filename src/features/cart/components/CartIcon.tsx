import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import CartDrawer from "./CartDrawer";
import { Button } from "@/components/ui/button";

export default function CartIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <>
      <Button
        variant="ghost"
        size="md"
        onClick={() => setIsOpen(true)}
        className="relative"
      >
        <ShoppingCart className="w-6 h-6" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </Button>

      <CartDrawer open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
