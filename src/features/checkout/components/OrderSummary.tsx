import { useCartStore } from "@/features/cart/stores/useCartStore";
import { formatCurrency } from "@/features/cart/utils/cart-calculations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrderSummary() {
  const { items, getSubtotal, getVAT, getTotal } = useCartStore();

  const subtotal = getSubtotal();
  const vat = getVAT();
  const total = getTotal();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between items-start"
            >
              <div className="flex-1">
                <h4 className="font-medium text-sm">{item.product.name}</h4>
                <p className="text-xs text-gray-600">
                  {formatCurrency(item.product.price)} × {item.quantity}
                </p>
              </div>
              <span className="font-medium text-sm">
                {formatCurrency(item.product.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Totals */}
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
      </CardContent>
    </Card>
  );
}
