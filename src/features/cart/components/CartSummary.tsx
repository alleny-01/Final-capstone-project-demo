import { useCartStore } from "../stores/useCartStore";
import { formatCurrency } from "../utils/cart-calculations";

export default function CartSummary() {
  const { getSubtotal, getVAT, getTotal } = useCartStore();

  const subtotal = getSubtotal();
  const vat = getVAT();
  const total = getTotal();

  return (
    <div className="border-t pt-4 space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium">{formatCurrency(subtotal)}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-gray-600">VAT (7.5%)</span>
        <span className="font-medium">{formatCurrency(vat)}</span>
      </div>

      <div className="flex justify-between text-lg font-bold border-t pt-2">
        <span>Total</span>
        <span className="text-primary">{formatCurrency(total)}</span>
      </div>
    </div>
  );
}
